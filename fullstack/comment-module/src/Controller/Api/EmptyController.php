<?php

/**
 * Controller added by Sandrine MANGUY
 */

namespace App\Controller\Api;

use Symfony\Component\HttpFoundation\Response;

/**
 * @author Sandrine Manguy
 */
class EmptyController
{
    public function __invoke()
    {
        return new Response();
    }

}