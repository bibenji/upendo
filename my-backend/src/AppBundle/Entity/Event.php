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
 * 		"normalization_context"={"groups"={"event"}},
 * 		"denormalization_context"={"groups"={"event"}}
 * })
 * @ORM\Entity()
 * @ORM\Table(name="event")
 */
class Event
{
    /**
     * @ORM\Column(name="id", type="string")
     * @ORM\Id()
     * @Groups({"event"})
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"event"})
     */
    protected $eventName;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"event"})
     */
    protected $eventPlace;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetimetz")
     * @Groups({"event"})
     */
    protected $eventDate;

    /**
     * @var User
     * @ORM\ManyToMany(targetEntity="User", mappedBy="participations")
     * @Groups({"event"})
     */
    protected $participants;

    public function __construct()
    {
         $this->id = Uuid::uuid4()->toString();
        $this->participants = new ArrayCollection();
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
    public function getEventName()
    {
        return $this->eventName;
    }

    /**
     * @param string $eventName
     */
    public function setEventName($eventName)
    {
        $this->eventName = $eventName;
    }

    /**
     * @return string
     */
    public function getEventPlace()
    {
        return $this->eventPlace;
    }

    /**
     * @param string $eventPlace
     */
    public function setEventPlace($eventPlace)
    {
        $this->eventPlace = $eventPlace;
    }

    /**
     * @return \DateTime
     */
    public function getEventDate()
    {
        return $this->eventDate;
    }

    /**
     * @param \DateTime $eventDate
     */
    public function setEventDate($eventDate)
    {
        $this->eventDate = $eventDate;
    }

    /**
     * @return ArrayCollection
     */
    public function getParticipants()
    {
        return $this->participants;
    }

    /**
     * @param Collection $participants
     */
    public function setParticipants(Collection $participants)
    {
        $this->participants = $participants;
    }

    /**
     * @param User
     */
    public function addUser(User $participant)
    {
        $participant->addParticipation($this);
        $this->participants[] = $participant;
    }
}
