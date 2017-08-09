<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**  
 * @ApiResource(attributes={
 * 		"normalization_context"={"groups"={"user"}}, 
 * 		"denormalization_context"={"groups"={"user"}}, 
 * 		"filters"={"users_filter"}
 * })
 * @ORM\Entity()
 * @ORM\Table(name="users")
 */ 
class User implements UserInterface
{
	const ROLE_DEFAULT = 'ROLE_USER';
	 
	const GENDER_MAN = 'M';
	const GENDER_WOMAN = 'W';

    /**
     * @var string
	 * @ORM\Column(type="string")
     * @ORM\Id
	 * @Groups({"user", "relation", "conversation", "message"})
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(name="username", type="string")
	 * @Groups({"user", "conversation", "message", "event"})
     */
    protected $username;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $email;
	
	/**
     * @var string
     * @ORM\Column(type="string")
     */
	protected $password;
	
	/**
     * @var string
	 * @Groups({"user"})
	 */
	protected $plainPassword;
	
	/**
	 * @var string
	 * @ORM\Column(type="string", nullable=true)
	 */
	protected $apikey;
	
	/**
     * @var array
     * @ORM\Column(type="json_array")	 
     */
	protected $roles;
	
	/**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $gender;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $phone;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $firstname;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $lastname;

    /**
     * @ORM\OneToMany(targetEntity="Photo", mappedBy="user")
	 * @Groups({"user", "conversation"})
     */
    protected $photos;
	
	/**	 
     * @ORM\OneToOne(targetEntity="Profile", mappedBy="user", cascade={"all"})
	 * @Groups({"user"})
     */
    protected $profile;
	
	/**
     * @ORM\OneToMany(targetEntity="Relation", mappedBy="userOne")	 
     */
    protected $relationsAsOne;
	
	/**
     * @ORM\OneToMany(targetEntity="Relation", mappedBy="userTwo")	 
     */
    protected $relationsAsTwo;
	
	/**     
	 * @Groups({"user"})
     */
	protected $relations;
		
	/**
	 * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
	 */
	protected $region;
	
	/**
	 * @var Conversation
	 * @ORM\ManyToMany(targetEntity="Conversation", inversedBy="users")
	 */
	protected $conversations;
	
	/**
	 * @var Message
	 * @ORM\OneToMany(targetEntity="Message", mappedBy="from")
	 */
	protected $messagesSent;

    /**
     * @var Event
     * @ORM\ManyToMany(targetEntity="Event", inversedBy="participants")
     */
    protected $participations;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
        $this->photos = new ArrayCollection();         
		$this->roles = [self::ROLE_DEFAULT];	
		$this->relationsAsOne = new ArrayCollection(); 
		$this->relationsAsTwo = new ArrayCollection(); 		
		// $this->relations = new ArrayCollection(); 		
		$this->conversations = new ArrayCollection(); 		
		$this->messagesSent = new ArrayCollection(); 		
		$this->participations = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }
	
	/**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }
	
	/**
     * @return mixed
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
    }
	
	/**
     * @return string
     */
    public function getApikey()
    {
        return $this->apikey;
    }

    /**
     * @param string $apikey
     */
    public function setApikey($apikey)
    {
        $this->apikey = $apikey;
    }
	
	 /**
     * @param $role
     * @return $this
     */
    public function addRole($role)
    {
        $this->roles[] = $role;
        return $this;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        if (null === $this->roles) {
            return ['ROLE_USER'];
        }
		
        return $this->roles;
    }

    /**
     * @param array $roles
     * @return $this
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }

    /**
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    /**
     * @return string
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * @param string $gender
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    /**
     * @return ArrayCollection
     */
    public function getPhotos()
    {
        return $this->photos;
    }

    /**
     * @param Collection $photos
     */
    public function setPhotos(Collection $photos)
    {
        $this->photos = $photos;
    }
	
	/**
     * Set profile
     *
     * @param Profile $profile
     *
     * @return User
     */
    public function setProfile($profile)
    {
		$profile->setUser($this);
        $this->profile = $profile;

        return $this;
    }

    /**
     * Get profile
     *
     * @return Profile
     */
    public function getProfile()
    {
        return $this->profile;
    }
	
	/**
     * @return string
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * @param string $region
     */
    public function setRegion($region)
    {
        $this->region = $region;
    }

    /**
     * Add photo
     *
     * @param \AppBundle\Entity\Photo $photo
     *
     * @return User
     */
    public function addPhoto(\AppBundle\Entity\Photo $photo)
    {
        $this->photos[] = $photo;

        return $this;
    }

    /**
     * Remove photo
     *
     * @param \AppBundle\Entity\Photo $photo
     */
    public function removePhoto(\AppBundle\Entity\Photo $photo)
    {
        $this->photos->removeElement($photo);
    }
	
	public function getRelationsAsOne()
	{		
		return $this->relationsAsOne;
	}
	
	public function setRelationsAsOne($relationsAsOne)
	{
		$this->relationsAsOne = $relationsAsOne;
	}
	
	public function getRelationsAsTwo()
	{		
		return $this->relationsAsTwo;
	}
	
	public function setRelationsAsTwo($relationsAsTwo)
	{
		$this->relationsAsTwo = $relationsAsTwo;
	}
	
	public function getRelations()
	{		
		$relations = [];
		
		$allRelations = array_merge($this->relationsAsOne->toArray(), $this->relationsAsTwo->toArray());
				
		foreach ($allRelations as $relation) {
			$currentUser = ($relation->getUserOne()->getId() === $this->id ? $relation->getUserOne() : $relation->getUserTwo());			
			$otherUser = ($relation->getUserOne()->getId() !== $this->id ? $relation->getUserOne() : $relation->getUserTwo());			
			$index = $otherUser->getId();
			$relations[$index] = [
				'id' => $relation->getId(),				
				'lastActionUserId' => $relation->getLastActionUserId(),
				'status' => $relation->getStatus(),
				'currentUser' => $currentUser,
				'otherUser' => $otherUser,								
			];			
		}
		
		return $relations;
	}
		
    /**
     * @return ArrayCollection
     */
    public function getConversations()
    {
        return $this->conversations;
    }

    /**
     * @param Collection $conversations
     */
    public function setConversations(Collection $conversations)
    {
        $this->conversations = $conversations;
    }
	
	/**
	 * @param Conversation $conversation
	 */
	public function addConversation(Conversation $conversation)
	{
		$this->conversations[] = $conversation;
	}
		
    /**
     * @return ArrayCollection
     */
    public function getMessagesSent()
    {
        return $this->messagesSent;
    }

    /**
     * @param Collection $messagesSent
     */
    public function setMessagesSent(Collection $messagesSent)
    {
        $this->messagesSent = $messagesSent;
    }

    /**
     * @return ArrayCollection
     */
    public function getParticipations()
    {
        return $this->participations;
    }

    /**
     * @param Collection $participations
     */
    public function setParticipations(Collection $participations)
    {
        $this->participations = $participations;
    }

    /**
     * @param Event $event
     */
    public function addParticipation(Event $participation)
    {
        $this->participations[] = $participation;
    }
	
    public function getSalt()
    {
        // return $this->salt;
    }
	
	public function eraseCredentials()
    {
    }
}