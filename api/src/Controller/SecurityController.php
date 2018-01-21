<?php

namespace Upendo\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends Controller
{
    public function loginAction(Request $request)
    {
    }

    public function testAction()
    {
        return new JsonResponse([
            "test" => "test réussi!",
            "user" => $this->getUser()
        ]);
    }
}
