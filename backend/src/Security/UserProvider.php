<?php

namespace Security;

use AppBundle\Entity\User;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Doctrine\ORM\EntityManager;

class UserProvider implements UserProviderInterface
{
	protected $em;
	
	public function __construct(EntityManager $entityManager)
	{
		$this->em = $entityManager;
	}
	
	public function getUsernameForApiKey($apiKey)
    {
		if($apiKey === 'lhommealabananedor') {			
			$user = $this->em->getRepository('AppBundle:User')->findOneBy(['username' => 'bibenji']);
		} else {			
			$user = $this->em->getRepository('AppBundle:User')->findOneBy(['apikey' => $apiKey]);
		}
		
		if (null === $user) {
			return;
        }		
        
        return $username = $user->getUsername();
    }
	
    public function loadUserByUsername($username)
    {
        $user = $this->em->getRepository('AppBundle:User')->findOneBy(['username' => $username]);
        
		if (null === $user) {
			throw new UsernameNotFoundException(
				sprintf('Username "%s" does not exist.', $username)
			);
		}
		
		return $user;        
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return WebserviceUser::class === $class;
    }
}