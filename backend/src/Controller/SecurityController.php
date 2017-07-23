<?php

namespace Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends Controller
{    
    public function loginAction(Request $request)
    {
    }

    public function testAction(Request $request)
    {
        echo 'coucou testAction';
    }
}