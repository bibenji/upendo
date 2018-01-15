<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Upendo\Filter\RelationsFilter;

/**  
 * @ApiResource(attributes={
 * 		"normalization_context"={"groups"={"relation"}},
 * 		"denormalization_context"={"groups"={"relation"}},
 * 		"filters"={RelationsFilter::class}
 * })
 * @ORM\Entity()
 * @ORM\Table(name="relation")
 */
class Relation
{	
	const STATUS_ONE_LIKE = "1";
	const STATUS_BOTH_LIKE = "2";	
	const STATUS_ONE_DISLIKE = "3";
	
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(type="string")
	 * @Groups({"user", "relation"})
     */
    protected $id;
	
	/**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="relationsAsOne")	 
	 * @ORM\JoinColumn(name="user_one_id", referencedColumnName="id")
     * @Groups({"relation"})
     */
    protected $userOne;
	
    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="relationsAsTwo")	 
	 * @ORM\JoinColumn(name="user_two_id", referencedColumnName="id")
     * @Groups({"relation"})
     */
    protected $userTwo;
	
	/**
	 * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user", "relation"})
	 */
	protected $lastActionUserId;
	
	/**
	 * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user", "relation"})
	 */
	protected $status;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $id
     */
    // public function setId(string $id)
    // {
        // $this->id = $id;
    // }

    /**
     * @return string
     */
    public function getLastActionUserId()
    {
        return $this->lastActionUserId;
    }

    /**
     * @param string $lastActionUserId
     */
    public function setLastActionUserId(string $lastActionUserId)
    {
        $this->lastActionUserId = $lastActionUserId;
    }
	
	/**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus(string $status)
    {
        $this->status = $status;
    }
	
	/**
     * @return User
     */
    public function getUserOne()
    {		
        return $this->userOne;
    }

    /**
     * @param User $userOne
	 * @return Profile
     */
    public function setUserOne(User $userOne)
    {
        $this->userOne = $userOne;
		return $this;
    }
	
    /**
     * @return User
     */
    public function getUserTwo()
    {		
        return $this->userTwo;
    }

    /**
     * @param User $userTwo
	 * @return Profile
     */
    public function setUserTwo(User $userTwo)
    {
        $this->userTwo = $userTwo;
		return $this;
    }
}
