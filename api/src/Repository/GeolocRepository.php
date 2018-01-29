<?php

namespace Upendo\Repository;

use Doctrine\DBAL\Connection;

class GeolocRepository
{
    protected $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    public function getDistinctRegions()
    {
//        $this->conn->createQueryBuilder();
    }

    public function getVillesForRegion($region)
    {

    }
}