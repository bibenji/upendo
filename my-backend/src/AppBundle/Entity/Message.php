<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(attributes={
 * 		"normalization_context"={"groups"={"message"}}, 
 * 		"denormalization_context"={"groups"={"message"}} 
 * })
 * @ORM\Entity()
 * @ORM\Table(name="message")
 */
class Message
{     
	/**
	 * @ORM\Column(name="id", type="integer")
	 * @ORM\Id()
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @Groups({"conversation", "message"})
	 */	 
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"conversation", "message"})
     */
    protected $content;			
	
	/**
     * @var \DateTime
     * @ORM\Column(type="datetimetz")
	 * @Groups({"user", "conversation", "message"})
     */
    protected $messageDate;		
	
    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="messagesSent")
	 * @Groups({"conversation", "message"})
     */
    protected $from;
	
	/**
     * @var Conversation
     * @ORM\ManyToOne(targetEntity="Conversation", inversedBy="messages")
	 * @Groups({"message"})
     */
	protected $conversation;
	
	/**
	 * @var array
     * @ORM\Column(type="array")
	 */
	protected $seenBy;

    public function __construct()
    {
        // $this->id = Uuid::uuid4()->toString();
		$this->messageDate = new \DateTime();
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent(string $content)
    {
        $this->content = $content;
    }
	
	/**
     * Set messageDate
     * @param \DateTime $messageDate
     * @return Profile
     */
    public function setMessageDate($messageDate)
    {
        $this->messageDate = $messageDate;
        return $this;
    }

    /**
     * Get messageDate
     * @return \DateTime
     */
    public function getMessageDate()
    {
        return $this->messageDate;
    }

    /**
     * @return User
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @param User $from
     */
    public function setFrom(User $from)
    {
        $this->from = $from;
    }
	
	/**
     * @return Conversation
     */
    public function getConversation()
    {
        return $this->conversation;
    }

    /**
     * @param Conversation $conversation
     */
    public function setConversation(Conversation $conversation)
    {
        $this->conversation = $conversation;
    }
}
