<?php

/**
 * Decorator added by Sandrine MANGUY
 */

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\OpenApi;
use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;

/**
 * @author Sandrine Manguy
 */
class OpenApiFactory implements OpenApiFactoryInterface
{    
    /**
     * @var OpenApiFactoryInterface
     */
    private $decorated;
    
    public function __construct(OpenApiFactoryInterface $decorated)
    {
        $this->decorated = $decorated;
    }
    
    public function __invoke(array $context =[]): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);

        /** @var PathItem $path */
        foreach($openApi->getPaths()->getPaths() as $key => $path) {
            if ($path->getGet() && $path->getGet()->getSummary() === 'hidden') {
                $openApi->getPaths()->addPath($key, $path->withGet(null));
            }
        }

        return $openApi;
    }
}