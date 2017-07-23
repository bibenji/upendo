#!/usr/bin/env bash
php bin/console doctrine:migrations:migrate --no-interaction

if [ "$SYMFONY_ENV" = "dev" ]; then
    php bin/console doctrine:fixture:load --purge-with-truncate --no-interaction
fi
