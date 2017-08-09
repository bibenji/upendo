<?php

namespace Upendo\Security;

use Upendo\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use GuzzleHttp\Client;
use Symfony\Component\Serializer\Serializer;
use Ramsey\Uuid\Uuid;

class SuccessHandler implements AuthenticationSuccessHandlerInterface
{
    /**
     * @var EntityManager
     */
    protected $em;

    public function __construct(EntityManager $em)
    {       
        $this->em = $em;
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @return JsonResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
		$apikey = str_replace('-', '', Uuid::uuid4()->toString());
		
		$user = $token->getUser();
		$user->setApikey($apikey);
		$this->em->persist($user);
		$this->em->flush();
		
		$response = new JsonResponse(array(
			'apikey' => $apikey,
			'id' => $user->getId()
		));
        return $response;
    }
}
