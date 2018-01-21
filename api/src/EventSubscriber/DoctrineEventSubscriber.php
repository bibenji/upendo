<?php

namespace Upendo\EventSubscriber;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpFoundation\RequestStack;

use Symfony\Component\Filesystem\Filesystem;

use Upendo\Entity\Relation;
use Upendo\Entity\Photo;
use Upendo\Entity\Conversation;

class DoctrineEventSubscriber implements EventSubscriber
{
    protected $tokenStorage;
    protected $requestStack;
    protected $shortPath;

    /**
     * @param TokenStorageInterface $tokenStorage
     * @param RequestStack $requestStack
     * @param $shortPath
     */
    public function __construct(TokenStorageInterface $tokenStorage, RequestStack $requestStack, $shortPath)
    {
        $this->tokenStorage = $tokenStorage;
        $this->requestStack = $requestStack;
        $this->shortPath = $shortPath;
    }
    
    public function getSubscribedEvents()
    {
        return array(
            'preUpdate',
            'postRemove',
        );
    }

    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        
        if ($entity instanceof Relation) {
            $requestBody = json_decode($this->requestStack->getCurrentRequest()->getContent());
                
            if ($entity->getStatus() === Relation::STATUS_ONE_LIKE && $requestBody->status === Relation::STATUS_ONE_LIKE) {
                $entity->setStatus(Relation::STATUS_BOTH_LIKE);
                
                // création d'une conversation suite au crush !
                $this->createConversation($entity, $args->getEntityManager());
            }
        }
    }
    
    public function postRemove(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        
        if ($entity instanceof Photo) {
            $fs = new Filesystem();
            $fullFilePath = $this->shortPath . $entity->getPath();
            if ($fullFilePath) {
                $fs->remove($fullFilePath);
            }
        }
    }
    
    private function createConversation(Relation $relation, $em)
    {
        $conversation = new Conversation();
        
        $conversation->addUser($relation->getUserOne());
        $conversation->addUser($relation->getUserTwo());
        
        $em->persist($conversation);
        $em->flush();
    }
}
