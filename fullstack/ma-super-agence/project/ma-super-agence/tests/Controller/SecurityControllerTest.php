<?php

namespace App\tests\Controller;

use App\Repository\UserRepository; // added for the login inside the logout test
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


/**
 * SecurityControllerTest
 * 
 * @author Sandrine Manguy
 */
class SecurityControllerTest extends WebTestCase 
{

    public function testLoginIsPageUp() 
    {
        $client = static::createClient();
        $client->request('GET', '/login');
        // static::assertEquals(
        //     Response::HTTP_OK,
        //     $client->getResponse()->getStatusCode()
        // );
        // Replaced by :
        self::assertResponseIsSuccessful();
    }

    public function testLoginLayout()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/login');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Se connecter');
        $currentNavLink = $crawler->selectLink("Se connecter")->attr('class');
        self::assertSame('nav-link active', $currentNavLink);
        $label = $crawler->filter('label');
        self::assertSame(2, $label->count());
        $labelUsername = $crawler->filter('label')->first()->text();
        self::assertSame("Nom d'utilisateur :", $labelUsername);
        $labelPassword = $crawler->filter('label')->last()->text();
        self::assertSame("Mot de passe :", $labelPassword);
        $button = $crawler->filter('button');
        self::assertSame(2, $button->count());
        $submitButton = $crawler->filter('button')->last()->text();
        self::assertSame("Se connecter", $submitButton);
    }

    public function testLoginFormCorrectlyFilled()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/login');
        self::assertResponseIsSuccessful();
        // this form has been inserted manually in the twig template
        // setting value solution 1:
        $form = $crawler->selectButton('Se connecter')->form([
            "_username" => "demo",
            "_password" => "demo"
        ]);
        $crawler = $client->submit($form);
        // redirection to the home page
        $crawler = $client->followRedirect();
        // echo $client->getResponse()->getContent();
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Mon agence');
        self::assertSelectorTextContains('h1', 'Agence lorem ipsum');
        // the login link is replaced by the logout link in the navbar
        self::assertSelectorNotExists('Se connecter');
        $logoutLink = $crawler->filter('nav div ul li')->last()->text();
        self::assertSame('Se déconnecter', $logoutLink);
    }

    public function testUNCORRECTFillLoginForm()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/login');
        self::assertResponseIsSuccessful();
        $form = $crawler->selectButton('Se connecter')->form();
        // this form has been inserted manually in the twig template
        // setting value solution 2:
        $crawler = $client->submit($form, [
            "_username" => "john_doe",
            "_password" => "test"
        ]);
        $crawler = $client->followRedirect();
        // redirection to the same login page
        self::assertPageTitleSame('Se connecter');
        // a danger alert is displayed
        $alert = $crawler->filter('main div div');
        $alertColor = $alert->attr('class');
        self::assertSame('alert alert-danger mt-4', $alertColor);
        self::assertSelectorTextContains('main div div', 'Identifiants invalides.');
        // the form is displayed
        self::assertSelectorExists('form');
        // the login link is not replaced by the logout link in the navbar
        self::assertSelectorNotExists('Se déconnecter');
        $loginLink = $crawler->filter('nav div ul li')->last()->text();
        self::assertSame('Se connecter', $loginLink);
    }

    public function testLogout() 
    {
        $client = static::createClient();

        /* Log in first, another solution to log in */
        // 1-get the container
        $userRepository = static::getContainer()->get(UserRepository::class);
        // 2-retrieve the test user
        $testUser = $userRepository->findOneByUsername('demo');
        // 3-simulate $testUser being logged in
        $client->loginUser($testUser);

        /* test with logged user */
        // go to the home page
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Mon agence');
        self::assertSelectorTextContains('h1', 'Agence lorem ipsum');
        // log out then
        $logoutLink = $crawler->selectLink('Se déconnecter')->link();
        $crawler = $client->click($logoutLink);
        // redirects to the home page
        $crawler = $client->followRedirect();
        self::assertSelectorTextContains('h1', 'Agence lorem ipsum');
        self::assertPageTitleSame('Mon agence');
        // the logout link is replaced by the login link in the navbar
        self::assertSelectorNotExists('Se déconnecter');
        $loginLink = $crawler->filter('nav div ul li')->last()->text();
        self::assertSame('Se connecter', $loginLink);
    }

}

