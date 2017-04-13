<?php

namespace App\GraphQL;

use Youshido\GraphQL\Schema\AbstractSchema;
use Youshido\GraphQL\Config\Schema\SchemaConfig;
use Youshido\GraphQL\Type\Scalar\StringType;

class Schema extends AbstractSchema
{
    public function build(SchemaConfig $config)
    {
        $config->getQuery()->addFields([
            'hello' => [
                'type'    => new StringType(),
                'args'    => [
                    'name' => [
                        'type' => new StringType(),
                        'default' => 'Stranger'
                    ]
                ],
                'resolve' => function ($context, $args) {
                    return 'Hello ' . $args['name'];
                }
            ]
        ]);
    }

}

