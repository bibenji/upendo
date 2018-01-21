<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="Upendo\Repository\DailyProfileRepository")
 * @ORM\Table(name="daily_profile")
 */
class DailyProfile
{
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(type="string")
     * @Groups({"daily_profile"})
     */
    protected $id;
    
    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="dailyProfileAsOne")
     * @ORM\JoinColumn(name="user_one_id", referencedColumnName="id")
     * @Groups({"daily_profile"})
     */
    protected $userOne;
    
    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="dailyProfileAsTwo")
     * @ORM\JoinColumn(name="user_two_id", referencedColumnName="id")
     * @Groups({"daily_profile"})
     */
    protected $userTwo;
    
    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     * @Groups({"daily_profile"})
     */
    protected $date;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
        $this->date = new \DateTime();
        $this->date = new \DateTime($this->date->format('Y-m-d')); // pour mettre l'heure à 0
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
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
     * @return DailyProfile
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
     * @return DailyProfile
     */
    public function setUserTwo(User $userTwo)
    {
        $this->userTwo = $userTwo;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     */
    public function setDate(\DateTime $date): void
    {
        $this->date = $date;
    }
}
