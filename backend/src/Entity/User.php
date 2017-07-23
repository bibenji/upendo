<?php

namespace AppBundle\Entity;

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
 *     "normalization_context"={"groups"={"user"}}, 
 *     "denormalization_context"={"groups"={"user"}}, 
 * })
 * @ORM\Entity() 
 */
class User implements UserInterface
{
	const ROLE_DEFAULT = 'ROLE_USER';
	 
	const GENDER_MAN = 'M';
	const GENDER_WOMAN = 'W';
	
    /**     
	 * @ORM\Column(type="guid")
	 * @ORM\Id
 	 * @ORM\GeneratedValue(strategy="UUID")	 
	 * @Groups({"user"})
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(name="username", type="string")
	 * @Groups({"user"})
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
	 * @Groups({"user"})
     */
    protected $photos;
	
	/**	 
     * @ORM\OneToOne(targetEntity="Profile", mappedBy="user", cascade={"all"})
	 * @Groups({"user"})
     */
    protected $profile;
	
	/**
	 * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
	 */
	protected $region;

    public function __construct()
    {
        // $this->id = Uuid::uuid4()->toString();
        $this->photos = new ArrayCollection(); 
		$this->roles = [self::ROLE_DEFAULT];		
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
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $password
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

    public function getSalt()
    {
        // return $this->salt;
    }
	
	public function eraseCredentials()
    {
    }
}
