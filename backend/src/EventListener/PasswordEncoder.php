<?php

namespace EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoder
{
	protected $encoder;
	
	public function __construct(UserPasswordEncoderInterface $encoder)
	{
		$this->encoder = $encoder;		
	}
	
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        
        if (!$entity instanceof User) {			
            return;
        }
				
		$encoded = $this->encoder->encodePassword($entity, $entity->getPlainPassword());
		$entity->setPassword($encoded);
    }
}