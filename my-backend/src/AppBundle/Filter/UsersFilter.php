<?php

namespace AppBundle\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\RequestStack;
use Psr\Log\LoggerInterface;

use AppBundle\Entity\Profile;

final class UsersFilter extends AbstractFilter
{	
	protected $tokenStorage;
	protected $managerRegistry;
    protected $requestStack;
    protected $logger;
    protected $properties;

    public function __construct(TokenStorageInterface $tokenStorage, ManagerRegistry $managerRegistry, RequestStack $requestStack, LoggerInterface $logger = null, array $properties = null)
    {
		$this->tokenStorage = $tokenStorage;
        $this->managerRegistry = $managerRegistry;
        $this->requestStack = $requestStack;
        $this->logger = $logger ?? new NullLogger();
        $this->properties = $properties;
    }
	
	protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
		if ($property !== 'users_filter_by' && $value !== 'criteria') {
			return;
		}
		
		$user = $this->tokenStorage->getToken()->getUser();				
		
        // $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters
		
		$searchingGender = $user->getProfile()->getSearchingGender();
		
		$queryBuilder->resetDQLParts();
		
		$queryBuilder
			->select('u')
			->from('AppBundle\Entity\User', 'u')
			->leftJoin('u.profile', 'p')
			->leftJoin('u.relationsAsOne', 'rao')
			->leftJoin('u.relationsAsTwo', 'rat')						
		;
		
		// dump($user->getId()); exit;
		
		if ($searchingGender = $user->getProfile()->getSearchingGender()) {
			if ($searchingGender !== Profile::SEARCHING_BOTH) {
				$queryBuilder
					->andWhere('u.gender = :gender')
					->setParameter('gender', $searchingGender)				
				;			
			}			
		}
		
		if ($user->getProfile()->getSearchingAgeMin()) {
			$now = new \DateTime();								
			$intervalMin = new \DateInterval('P' . $user->getProfile()->getSearchingAgeMin() . 'Y');		
			$minBirthdate = $now->sub($intervalMin);
			
			$queryBuilder
				->andWhere('p.birthdate <= :minBirthdate')			
				->setParameter('minBirthdate', $minBirthdate)
			;			
		}
		
		if ($user->getProfile()->getSearchingAgeMax()) {
			$now = new \DateTime();
			$intervalMax = new \DateInterval('P' . $user->getProfile()->getSearchingAgeMax() . 'Y');
			$maxBirthdate = $now->sub($intervalMax);
			
			$queryBuilder
				->andWhere('p.birthdate >= :maxBirthdate')
				->setParameter('maxBirthdate', $maxBirthdate)
			;			
		}			
		
		$queryBuilder
			->andWhere($queryBuilder->expr()->orX(				
				// soit rao a un status like et l'utilisateur courant n'est pas le dernier a avoir liké
				$queryBuilder->expr()->andX(
					$queryBuilder->expr()->eq('rao.status', ':likedStatus'),					
					$queryBuilder->expr()->neq('rao.lastActionUserId', ':lastActionUserId')
				),
				// soit rat a un status like et l'utilisateur courant n'est pas le dernier a avoir liké
				$queryBuilder->expr()->andX(
					$queryBuilder->expr()->eq('rat.status', ':likedStatus'),
					$queryBuilder->expr()->neq('rat.lastActionUserId', ':lastActionUserId')					
				),		
				// soit ni rao ni rat n'a encore été défini
				$queryBuilder->expr()->andX(
					$queryBuilder->expr()->isNull('rao.status'),
					$queryBuilder->expr()->isNull('rat.status')
				)
			))			
			->setParameter('likedStatus', "1")
			->setParameter('lastActionUserId', $user->getId())			
		;
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        $description = [];
        foreach ($this->properties as $property => $strategy) {
            $description['regexp_'.$property] = [
                'property' => $property,
                'type' => 'string',
                'required' => false,
                'swagger' => ['description' => 'Filter using a regex. This will appear in the Swagger documentation!'],
            ];
        }

        return $description;
    }
}
