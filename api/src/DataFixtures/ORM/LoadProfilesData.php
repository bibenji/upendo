<?php

namespace Upendo\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Upendo\Entity\Profile;

class LoadProfilesData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');
        
        for ($i=0; $i < 10; $i++) {
            $profile = new Profile();
            
            $profile->setUser($this->getReference('user'.$i));
            
            $searchingGender = $faker->randomElement([Profile::SEARCHING_MEN, Profile::SEARCHING_WOMEN, Profile::SEARCHING_BOTH]);
            $profile->setSearchingGender($searchingGender);
            
            $profile->setBirthdate($faker->dateTimeThisCentury());
            $profile->setWeight($faker->numberBetween(45, 100));
            $profile->setSize($faker->numberBetween(140, 200));
    
            $eyesColor = $faker->randomElement([Profile::EYES_BLUE, Profile::EYES_BROWN, Profile::EYES_GRAY, Profile::EYES_GREEN]);
            $profile->setEyesColor($eyesColor);
            
            $hairColor = $faker->randomElement([Profile::HAIR_BLACK, Profile::HAIR_BROWN, Profile::HAIR_BLOND, Profile::HAIR_AUBURN, Profile::HAIR_RED]);
            $profile->setHairColor($hairColor);
            
            $profile->setDescription($faker->realText(300, 2));

            $manager->persist($profile);
        }
        
        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 2;
    }
}
