<?php

namespace Upendo\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity()
 * @ORM\Table(name="profile") 
 */
class Profile
{
    const SEARCHING_AREA_REGION = 'same_region';
    const SEARCHING_AREA_CITY = 'same_city';
    const SEARCHING_AREA_EVERYWHERE = 'everywhere';

	const SEARCHING_MEN = 'M';
	const SEARCHING_WOMEN = 'W';
	const SEARCHING_BOTH = 'B';
	
	const EYES_BLUE = 'blue';
	const EYES_BROWN = 'brown';
	const EYES_GRAY = 'gray';
	const EYES_GREEN = 'green';
	
	const HAIR_BLACK = 'black';
	const HAIR_BROWN = 'brown';
	const HAIR_BLOND = 'blond';
	const HAIR_AUBURN = 'auburn';
	const HAIR_RED = 'red';

    /**
     * @var string
     * @ORM\Column(type="string")
     * @ORM\Id
	 * @Groups({"user"})
     */
    protected $id;
	
	/**     
     * @ORM\OneToOne(targetEntity="User", inversedBy="profile")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")	 
     */    
    private $user;
		
	/**
     * @var \DateTime
     * @ORM\Column(type="datetimetz")
	 * @Groups({"user"})
     */
	protected $birthdate;

    /**
     * @var null|string
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"user"})
     */
	protected $searchingArea;
		
	/**
     * @var string
     * @ORM\Column(type="string")
	 * @Groups({"user"})
     * @Assert\Choice(callback = "getGenres")
     */
    protected $searchingGender;
	
	/**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
	 * @Groups({"user"})
     */
    protected $searchingAgeMin;
	
	/**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
	 * @Groups({"user"})
     */
    protected $searchingAgeMax;
	
	/**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
	 * @Groups({"user"})
     */
    protected $weight;
	
	/**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
	 * @Groups({"user"})
     */
    protected $size;
	
	/**
     * @var string
     * @ORM\Column(type="string", nullable=true)
	 * @Groups({"user"})
     * @Assert\Choice(callback = "getEyesColors")
     */
    protected $eyesColor;
	
	/**
     * @var string
     * @ORM\Column(type="string", nullable=true)
	 * @Groups({"user"})
     * @Assert\Choice(callback = "getHairColors")
     */
    protected $hairColor;
	
	/**
     * @var string
     * @ORM\Column(type="text", nullable=true)
	 * @Groups({"user"})
     */
    protected $description;
	
	/**
	 * @var array
     * @ORM\Column(type="array")
	 * @Assert\Collection(
     *     fields = {	 
     *         "music" = @Assert\Type(type="string"),
     *         "cinema" = @Assert\Type(type="string"),
     *         "books" = @Assert\Type(type="string"),
     *         "hobbies" = @Assert\Type(type="string"),
     *         "traveling" = @Assert\Type(type="string"),
     *         "television" = @Assert\Type(type="string"),
     *         "sports" = @Assert\Type(type="string"),
     *     },
     *     allowMissingFields = true
	 * )
	 * @Groups({"user"})
	 */
	protected $profileLikes = [
		'music' => null,
		'cinema' => null,
		'books' => null,
		'hobbies' => null,
		'traveling' => null,
		'television' => null,
		'sports' => null,
	];
	
	/**
	 * @var array
     * @ORM\Column(type="array")
	 * @Assert\Collection(
     *     fields = {	 
     *         "proudest_of" = @Assert\Type(type="string"),
     *         "dream_life" = @Assert\Type(type="string"),
     *     },
     *     allowMissingFields = true
	 * )
	 * @Groups({"user"})
	 */
	protected $profileAnswers = [
		'proudest_of' => null,
		'dream_life' => null,		
	];
		
	public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();             
    }

    public function getGenres()
    {
        return [self::SEARCHING_BOTH, self::SEARCHING_WOMEN, self::SEARCHING_BOTH];
    }

    public function getEyesColors()
    {
        return [self::HAIR_BLACK, self::HAIR_BROWN, self::HAIR_BLOND, self::HAIR_AUBURN, self::HAIR_RED];
    }

    public function getHairColors()
    {
        return [self::EYES_BLUE, self::EYES_BROWN, self::EYES_GRAY, self::EYES_GREEN];
    }
	
    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
	
    /**
     * Set user
     * @param User $user
     * @return Profile
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * Get user
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return null|string
     */
    public function getSearchingArea()
    {
        return $this->searchingArea;
    }

    /**
     * @param string $searchingArea
     * @return $this
     */
    public function setSearchingArea(string $searchingArea)
    {
        $this->searchingArea = $searchingArea;
        return $this;
    }

    /**
     * @param string $searchingGender
     * @return $this
     */
    public function setSearchingGender(string $searchingGender)
	{
		$this->searchingGender = $searchingGender;
		return $this;
	}
	
	/**
	 * @return string
	 */
	public function getSearchingGender()
	{
		return $this->searchingGender;
	}	
	
	/**
	 * @param mixed $searchingAgeMin
	 * @return Profile
	 */
    public function setSearchingAgeMin($searchingAgeMin)
	{
		$this->searchingAgeMin = $searchingAgeMin;
		return $this;
	}
	
	/**
	 * @return int
	 */
	public function getSearchingAgeMin()
	{
		return $this->searchingAgeMin;
	}
	
	/**
	 * @param mixed $searchingAgeMax
	 * @return Profile
	 */
    public function setSearchingAgeMax($searchingAgeMax)
	{
		$this->searchingAgeMax = $searchingAgeMax;
		return $this;
	}
	
	/**
	 * @return int
	 */
	public function getSearchingAgeMax()
	{
		return $this->searchingAgeMax;
	}	
	
    /**
     * Set birthdate
     * @param \DateTime $birthdate
     * @return Profile
     */
    public function setBirthdate($birthdate)
    {
        $this->birthdate = $birthdate;
        return $this;
    }

    /**
     * Get birthdate
     * @return \DateTime
     */
    public function getBirthdate()
    {
        return $this->birthdate;
    }
	
	/**
	 * @param mixed $weight
	 * @return Profile
	 */
    public function setWeight($weight)
	{
		$this->weight = (int) $weight;
		return $this;
	}
	
	/**
	 * @return int
	 */
	public function getWeight()
	{
		return $this->weight;
	}
	
	/**
	 * @param mixed $size
	 * @return Profile
	 */
    public function setSize($size)
	{		
		$this->size = (int) $size;
		return $this;
	}
	
	/**
	 * @return int
	 */
	public function getSize()
	{
		return $this->size;
	}
	
	/**
	 * @param mixed $eyesColor
	 * @return Profile
	 */
    public function setEyesColor($eyesColor)
	{
		if (is_string($eyesColor)) {			
			$this->eyesColor = $eyesColor;
		}
		
		return $this;
	}
	
	/**
	 * @return string
	 */
	public function getEyesColor()
	{
		return $this->eyesColor;
	}
	
	/**
	 * @param mixed $hairColor
	 * @return Profile
	 */
    public function setHairColor($hairColor)	
	{
		if (is_string($hairColor)) {			
			$this->hairColor = $hairColor;
		}
		
		return $this;
	}
	
	/**
	 * @return string
	 */
	public function getHairColor()
	{
		return $this->hairColor;
	}	
	
    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description)
    {
        $this->description = $description;
    }
	
	public function getProfileLikes()
	{
		return $this->profileLikes;
	}
	
	public function setProfileLikes($profileLikes)
    {		
        $this->profileLikes = $profileLikes;
    }
	
	public function getProfileAnswers()
	{
		return $this->profileAnswers;
	}
	
	public function setProfileAnswers($profileAnswers)
    {
        $this->profileAnswers = $profileAnswers;
    }

    /**
     * Set id
     *
     * @param string $id
     *
     * @return Profile
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }
}
