<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(iri="http://schema.org/Photo")
 * @ORM\Entity()
 * @ORM\Table(name="photo")
 */
class Photo
{
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user", "conversation", "daily_user"})
     */
    protected $path;			

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="photos")
     */
    protected $user;

    /**
     * @var bool
     * @ORM\Column(type="boolean", options={"default" : 0})
     * @ORM\ManyToOne(targetEntity="User", inversedBy="photos")
     */
    protected $main = false;

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
    public function setId(string $id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @param string $path
     */
    public function setPath(string $path)
    {
        $this->path = $path;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return bool
     */
    public function isMain(): bool
    {
        return $this->main;
    }

    /**
     * @param bool $main
     */
    public function setMain(bool $main): void
    {
        $this->main = $main;
    }
}
