<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\User;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('john.doe');
        $user->setFirstname('John');
        $user->setLastname('Doe');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('brian.lester');
        $user->setFirstname('Brian');
        $user->setLastname('Lester');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('jack.gill');
        $user->setFirstname('Jack');
        $user->setLastname('Gill');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('olivia.pace');
        $user->setFirstname('Olivia');
        $user->setLastname('Pace');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('nolaweaver');
        $user->setFirstname('Nola');
        $user->setLastname('Weaver');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('orentyler');
        $user->setFirstname('Oren');
        $user->setLastname('Tyler');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('warren.spencer');
        $user->setFirstname('Warren');
        $user->setLastname('Spencer');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('jacob.gallegos');
        $user->setFirstname('Jacob');
        $user->setLastname('Gallegos');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('jordan.saunders');
        $user->setFirstname('Jordan');
        $user->setLastname('Saunders');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('xavier.stein');
        $user->setFirstname('Xavier');
        $user->setLastname('Stein');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('beck.nash');
        $user->setFirstname('Beck');
        $user->setLastname('Nash');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('ann.perry');
        $user->setFirstname('Ann');
        $user->setLastname('Perry');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('chase.hoffman');
        $user->setFirstname('Chase');
        $user->setLastname('Hoffman');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('gregory.joyner');
        $user->setFirstname('Gregory');
        $user->setLastname('Joyner');
        $manager->persist($user);
        $manager->flush();

        $user->setUsername('dexter.schwartz');
        $user->setFirstname('Dexter');
        $user->setLastname('Schwartz');
        $manager->persist($user);
        $manager->flush();
    }

    public function getOrder()
    {
        return 1;
    }
}