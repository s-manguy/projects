<?php

namespace App\Tests;

use App\Entity\Property;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

/**
 * SmokeTest
 * 
 * @author Sandrine Manguy
 */
class SmokeTest extends WebTestCase
{
    /**
     * tests that all the public URLs of the application 
     * are loaded
     * 
     * @dataProvider publicUrlProvider
     */
    public function testPublicPageIsSuccessful(string $url): void
    {
        $client = static::createClient();
        $client->request('GET', $url);

        // $this->assertSame(200, $client->getResponse()->getStatusCode());
        self::assertResponseIsSuccessful(
            sprintf(
            'The "%s" page is successfully loaded.',
            $url
        ));
    }


    /**
     * A good practice for tests is to not use the service container, to make
     * them more robust. However, in this example we must access to the container
     * to get the entity manager and make a database query. The reason is that
     * website property fixtures are randomly generated and there's no guarantee that
     * a given blog post slug will be available.
     */
    public function testPublicPostedProperty(): void
    {
        $client = static::createClient();
        // the service container is always available via the test client
        $postedProperty = $client->getContainer()->get('doctrine')->getRepository(Property::class)->find(1);
        $client->request('GET', sprintf('/biens/%s', $postedProperty->getSlug().'-'.$postedProperty->getId()));

        self::assertResponseIsSuccessful();
    }


    /**
     * tests that all the secure URLs of the application 
     * are redirected to the login page
     * 
     * @dataProvider secureUrlProvider
     */
    public function testSecurePage(string $url): void
    {
        $client = static::createClient();
        $client->request('GET', $url);

        self::assertResponseRedirects(
            'http://localhost/login', 
            // write the full address with localhost
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                $url
            )
        );
    }

    public function publicUrlProvider(): ?\Generator
    {
        yield ['/']; // home
        yield ['/biens']; // properties
        /* do not forget that the database used for the tests 
        is a specific one. Look at it and create the url */
        // yield ['/biens/nobis-rem-est-1']; // property 1 from the test database
    }

    public function secureUrlProvider(): ?\Generator
    {
        yield ['/admin']; // home
        yield ['/admin/property/new']; // adding property form
        yield ['/admin/property/1']; // Edit the first property (from test database) 
        yield ['/admin/option'];
        yield ['/admin/option/new'];
        yield ['/admin/option/1/edit'];
    }
}