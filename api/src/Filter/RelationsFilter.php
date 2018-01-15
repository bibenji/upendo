<?php

namespace Upendo\Filter;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use Doctrine\ORM\QueryBuilder;
use Upendo\Entity\User;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\RequestStack;
use Psr\Log\LoggerInterface;

final class RelationsFilter extends AbstractFilter
{
	protected $tokenStorage;
	protected $managerRegistry;
    protected $requestStack;
    protected $logger;
    protected $properties;

    public function __construct(ManagerRegistry $managerRegistry, RequestStack $requestStack, LoggerInterface $logger, TokenStorage $tokenStorage)
    {
        parent::__construct($managerRegistry, $requestStack, $logger);
        $this->tokenStorage = $tokenStorage;
        $this->properties = [];
    }

	protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
		if ($property !== 'relations_filter_by' || $value !== 'disliked') {
			return;
		}

		/** @var User $user */
		$user = $this->tokenStorage->getToken()->getUser();				

		if ($user === 'anon.') { // ne doit jamais arriver
		    return;
        }

        $queryBuilder->resetDQLParts();

		$queryBuilder
            ->addSelect('o')
			->from('Upendo\Entity\Relation', 'o')
			->leftJoin('o.userOne', 'usero_a1')
			->leftJoin('o.userTwo', 'usert')
			->leftJoin('usero_a1.profile', 'po')
			->leftJoin('usert.profile', 'pt')
		;

		$queryBuilder
            ->where('o.status = :dislikedStatus')
            ->andWhere($queryBuilder->expr()->orX(
                $queryBuilder->expr()->eq('usero_a1', ':currentUser'),
                $queryBuilder->expr()->eq('usert', ':currentUser')
            ))
            ->setParameter('dislikedStatus', "3")
            ->setParameter('currentUser', $user)
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
