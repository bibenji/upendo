#!/usr/bin/env bash

cd api
composer install --prefer-dist --no-interaction --no-scripts --no-suggest --no-progress
php bin/phpstan analyse src tests
php bin/phpunit tests

