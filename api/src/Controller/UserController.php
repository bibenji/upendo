<?php

namespace Upendo\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Upendo\Entity\DailyProfile;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;

class UserController extends Controller
{
    public function dailyProfileAction()
    {
        $em = $this->getDoctrine()->getManager();

        $userRepository = $em->getRepository('Upendo:User');
        $user = $this->getUser();
//        $user = $userRepository->findOneBy(["username" => $this->getUser()->getUsername()]);
        $users = $userRepository->getPossibleDailyProfiles($user);

        $dailyProfile = $em->getRepository('Upendo:DailyProfile')->getDailyProfile($user);

        if (count($dailyProfile) > 0) {
            return new JsonResponse($this->serializeEntity($dailyProfile));
        } else {
            $dailyProfile = new DailyProfile();
        }

        if (count($users) > 0) {
            $newDailyProfileWith = $users[mt_rand(0, count($users)-1)];

            $dailyProfile->setUserOne($user->getId() < $newDailyProfileWith->getId() ? $user : $newDailyProfileWith);
            $dailyProfile->setUserTwo($user->getId() > $newDailyProfileWith->getId() ? $user : $newDailyProfileWith);

            $em->persist($dailyProfile);
            $em->flush();

            return new JsonResponse($this->serializeEntity($dailyProfile));
        }

        return new JsonResponse([
            'message' => 'error'
        ]);
    }

    private function serializeEntity($obj, $groups = ['daily_profile'])
    {
        $encoders = [new JsonEncoder()];
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $normalizers = [new ObjectNormalizer($classMetadataFactory)];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonContent = $serializer->serialize(
            $obj,
            'json',
            ['groups' => $groups]
        );

        return $jsonContent;
    }

    public function getContactsAction()
    {
        $em = $this->getDoctrine()->getManager();

        $userRepository = $em->getRepository('Upendo:User');
        $user = $this->getUser();
//        $user = $userRepository->findOneBy(["username" => "bibenji"]);
        $users = $userRepository->getContactsList($user);
        $dailyProfile = $userRepository->getDailyUser($user);

        $results = array_merge($users, $dailyProfile);

        return new JsonResponse($this->serializeEntity($results, ['daily_user']));
    }

    public function getDislikedProfiles()
    {
        dump('coucou les genoux !'); exit;
    }
}