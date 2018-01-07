<?php

namespace Upendo\Filter;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use Doctrine\ORM\QueryBuilder;
use Upendo\Entity\Conversation;
use Upendo\Entity\User;
use Upendo\Entity\Profile;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\RequestStack;
use Psr\Log\LoggerInterface;

/**
 * Class ConversationFromContactFilter
 *
 * This class is use to create a new conversation when a conversation doesn't exists between to users
 *
 * @package Upendo\Filter
 */
final class ConversationFromContactFilter extends AbstractFilter
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
        if (
            $property !== 'conversation_from_contact' || null === $value || '' === $value) {
            return;
        }

        /** @var User $user */
        $user = $this->tokenStorage->getToken()->getUser();

        if ($user === 'anon.') { // ne doit jamais arriver
            return;
        }

        // 0. get user from id
        $ur = $this->managerRegistry->getRepository('Upendo:User');
        $otherUser = $ur->findOneBy([
            'id' => $value
        ]);

        if (!$otherUser instanceof User) {
            return;
        }

        // 1. try to find if there already exists a conversation
        $cr = $this->managerRegistry->getRepository('Upendo:Conversation');
        $conversation = $cr->getConversationForUsers($user, $otherUser);

        // 2. create if needed and allowed a new conversation
        if (!isset($conversation[0]) || !($conversation[0] instanceof Conversation)) {

            // check if allowed to create a new conversation
            $otherUserInContactsList = $this->isOtherUserInContactsList($ur, $user, $otherUser);
            if (!$otherUserInContactsList) {
                return;
            }

            $conversation = new Conversation();
            $conversation->addUser($user);
            $conversation->addUser($otherUser);

            $em = $this->managerRegistry->getEntityManager();
            $em->persist($conversation);
            $em->flush();
        } else {
            $conversation = $conversation[0];
        }

        $queryBuilder
            ->andWhere('o.id = :id')
            ->setParameters([
                'id' => $conversation->getId()
            ])
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

    /**
     * @param $ur
     * @param $user
     * @param $otherUser
     * @return bool
     */
    protected function isOtherUserInContactsList($ur, $user, $otherUser): bool
    {
        $contactsList = $ur->getContactsList($user);
        $dailyUser = $ur->getDailyUser($user);
        $allContacts = array_merge($contactsList, $dailyUser);

        $otherUserInContactsList = false;

        foreach ($allContacts as $oneContact) {
            if ($oneContact === $otherUser) {
                $otherUserInContactsList = true;
            }
        }

        return $otherUserInContactsList;
    }
}
