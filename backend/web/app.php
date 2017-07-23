<?php

use Symfony\Component\Debug\Debug;
use Symfony\Component\HttpFoundation\Request;

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#checking-symfony-application-configuration-and-setup
// for more information
//umask(0000);

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.
//$whitelistedIps = ['127.0.0.1', '::1'];
//if ($dockerBridgeIp = getenv('DOCKER_BRIDGE_IP')) {
//    $whitelistedIps[] = $dockerBridgeIp;
//}
//if (isset($_SERVER['HTTP_CLIENT_IP'])
//    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
//    || !(in_array(@$_SERVER['REMOTE_ADDR'], $whitelistedIps) || php_sapi_name() === 'cli-server')
//) {
//    header('HTTP/1.0 403 Forbidden');
//    exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
//}

/** @var \Composer\Autoload\ClassLoader $loader */
$loader = require __DIR__.'/../vendor/autoload.php';
Debug::enable();

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);

exit;

//use Symfony\Component\HttpFoundation\Request;

/*
 * @var Composer\Autoload\ClassLoader
 */
$loader = require __DIR__.'/../vendor/autoload.php';

$env = getenv('SYMFONY_ENV');
$debug = 'dev' === $env;

if ($debug) {
    \Symfony\Component\Debug\Debug::enable();
}

$kernel = new AppKernel($env, $debug);
//$kernel = new AppCache($kernel);

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
//Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);