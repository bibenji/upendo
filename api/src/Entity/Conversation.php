<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Upendo\Filter\ConversationFromContactFilter;

/**
 * @ApiResource(attributes={
 * 		"normalization_context"={"groups"={"conversation"}},
 * 		"denormalization_context"={"groups"={"conversation"}},
 *      "filters"={
 *          "messages.order",
 *          ConversationFromContactFilter::class
 *     }
 * })
 * @ORM\Table(name="conversation")
 * @ORM\Entity(repositoryClass="Upendo\Repository\ConversationRepository")
 */
class Conversation
{
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(type="string")
     * @Groups({"user", "conversation"})
     */
    protected $id;

    /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="conversations")
     * @Groups({"conversation"})
     */
    protected $users;
    
    /**
     * @ORM\OneToMany(targetEntity="Message", mappedBy="conversation")
     * @Groups({"conversation"})
     */
    protected $messages;
    
    /**
     * @var Message
     * @Groups({"conversation"})
     */
    protected $lastMessage;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
        $this->users = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return ArrayCollection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @param Collection $users
     */
    public function setUsers(Collection $users)
    {
        $this->users = $users;
    }
    
    /**
     * @param User
     */
    public function addUser(User $user)
    {
        $user->addConversation($this);
        $this->users[] = $user;
    }
    
    /**
     * @return ArrayCollection
     */
    public function getMessages()
    {
        return array_reverse($this->messages->toArray());
    }

    /**
     * @param Collection $messages
     */
    public function setMessages(Collection $messages)
    {
        $this->messages = $messages;
    }
    
    public function setLastMessage($lastMessage)
    {
        // TODO : see if it's usefull
    }
    
    public function getLastMessage()
    {
        //$this->messages-
        return $this->messages->get(count($this->messages)-1);
    }
}
