#!/usr/bin/env bash

sleep 10

php bin/rabbit vhost:reset upendo --host=$RABBITMQ_HOST --user=$RABBITMQ_LOGIN --password=$RABBITMQ_PASSWORD
php bin/rabbit vhost:mapping:create app/config/rabbitmq.yml --host=$RABBITMQ_HOST --user=$RABBITMQ_LOGIN --password=$RABBITMQ_PASSWORD
