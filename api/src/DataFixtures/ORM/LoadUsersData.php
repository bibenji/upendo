<?php

namespace Upendo\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\User;

class LoadUsersData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');
		
		for ($i=0; $i < 9; $i++) {
			$user = new User();			
						
			$user->setUsername($faker->userName());
			$user->setGender($faker->randomElement([User::GENDER_MAN, User::GENDER_WOMAN]));
			$user->setFirstname($faker->firstName($user->getGender()));
			$user->setLastname($faker->lastName());
			$user->setEmail($faker->email());			
			$user->setPlainPassword('pwd');			
			$user->setPhone($faker->phoneNumber());
			$user->setRegion($faker->region());
			
			$this->addReference('user'.$i, $user);
			$manager->persist($user);
		}
        
		$bibenji = $this->createBibenji();
		$manager->persist($bibenji);	
		
        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
	
	public function createBibenji()
	{
		$user = new User();	
		$user->setUsername('bibenji');
		$user->setGender(User::GENDER_MAN);
		$user->setFirstname('Benjamin');
		$user->setLastname('Billette');
		$user->setEmail('benjamin.billette@hotmail.fr');			
		$user->setPlainPassword('bibenji');			
		$user->setPhone('0674224322');
		$user->setRegion('Paris');		
		$this->addReference('user9', $user);
		return $user;
	}
}