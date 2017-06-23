<?php

namespace Upendo\Entity;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * @ApiResource
 * @ORM\Entity
 * @ORM\Table(name="photo")
 */
class Photo
{
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(type="string")
     * @ApiProperty
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @ApiProperty
     */
    protected $path;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="photos", cascade={"all"})
     * @ApiProperty
     */
    protected $user;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getPath(): string
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
    public function getUser(): User
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
}