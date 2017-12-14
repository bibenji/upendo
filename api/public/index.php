<?php

use Symfony\Component\HttpFoundation\Request;
use Upendo\Kernel;

/*
 * @var Composer\Autoload\ClassLoader
 */
$loader = require __DIR__.'/../vendor/autoload.php';

$env = getenv('SYMFONY_ENV');
$debug = 'dev' === $env;

if ($debug) {
    \Symfony\Component\Debug\Debug::enable();
}

$kernel = new Kernel($env, $debug);
//$kernel = new AppCache($kernel);

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
//Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);