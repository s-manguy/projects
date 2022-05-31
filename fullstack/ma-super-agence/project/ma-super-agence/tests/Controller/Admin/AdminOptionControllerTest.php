<?php

namespace Tests\Controller\Admin;

use App\Repository\UserRepository; // added for the login
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response; // added for redirection


/**
 * AdminOptionControllerTest
 * 
 * @author Sandrine Manguy
 */
class AdminOptionControllerTest extends WebTestCase
{
    ///////////////////////
    // Options dashboard //
    ///////////////////////
    
    public function testIndexIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin/option/');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/option'
            )
        );
    }

    public function testIndexPageisUpWhenLoggedIn()
    {
        $client = static::createClient();

        /* Log in first */
        // 1-get the container
        $userRepository = static::getContainer()->get(UserRepository::class);
        // 2-retrieve the test user
        $testUser = $userRepository->findOneByUsername('demo');
        // 3-simulate $testUser being logged in
        $client->loginUser($testUser);

        /* test with logged user */
        $client->request('GET', '/admin/option/');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les options');
    }

    public function testIndexLayout()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $crawler = $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/');
        // $this->assertResponseIsSuccessful();
        self::assertEquals('Gérer les options', $crawler->filter('h1')->text());
        self::assertSelectorNotExists('.alert .alert-success');
        $uppestAddButton = $crawler->filter('h1+div a');
        self::assertEquals('Créer une nouvelle option', $uppestAddButton->text());
        self::assertEquals('btn btn-primary', $uppestAddButton->attr('class'));
        self::assertEquals('button', $uppestAddButton->attr('role'));
        self::assertSelectorExists('table');
        $tableHeader = $crawler->filter('thead tr th');
        self::assertEquals('Nom', $tableHeader->first()->text());
        self::assertEquals('Actions', $tableHeader->last()->text());
        $tableBody = $crawler->filter('tbody tr td');
        self::assertNotEquals('', $tableBody->first()->text());
        $editButton = $tableBody->last()->Children()->first();
        self::assertEquals('button', $editButton->attr('role'));
        self::assertEquals('Editer', $editButton->text());
        self::assertEquals('btn btn-primary', $editButton->attr('class'));
        $deleteButton = $crawler->filter('tbody tr td+td form button');
        self::assertEquals('btn btn-danger', $deleteButton->attr('class'));
        $lowestAddButton = $crawler->filter('.container')->children()->last()->children();
        self::assertEquals('Créer une nouvelle option', $lowestAddButton->text());
        self::assertEquals('btn btn-primary', $lowestAddButton->attr('class'));
        self::assertEquals('button', $lowestAddButton->attr('role'));
    }



    ///////////////////
    // Create option //
    ///////////////////

    public function testNewIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin/option/new');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/option/new'
            )
        );
    }

    public function testNewPageisUpWhenLoggedIn()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $client->request('GET', '/admin/option/new');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Créer une nouvelle option');
    }


    public function testNewPageisUpFromIndex()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/');
        // $this->assertResponseIsSuccessful();
        $link = $crawler->filter('a[class="btn btn-primary"]')->link();
        $crawler = $client->click($link);
        self::assertPageTitleSame('Créer une nouvelle option');
    }

    public function testNewLayout()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $crawler = $client->loginUser($testUser);
        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/new');
        self::assertResponseIsSuccessful();
        self::assertEquals('Créer une nouvelle option', $crawler->filter('h1')->text());
        $form = $crawler->filter('form');
        self::assertEquals('option', $form->attr('name'));
        // server-side validation
        self::assertEquals('novalidate', $form->attr('novalidate'));
        $labelName = $crawler->filter('label[for="option_name"]');
        self::assertEquals('Name', $labelName->text());
        $inputName = $crawler->filter('input[id="option_name"]');
        self::assertEquals('option[name]', $inputName->attr('name'));
        self::assertEquals('required', $inputName->attr('required'));
        self::assertEquals('text', $inputName->attr('type'));
        self::assertEquals('255', $inputName->attr('maxlength'));
        $token = $crawler->filter('input[id="option__token"]');
        self::assertEquals('option[_token]', $token->attr('name'));
        self::assertEquals('hidden', $token->attr('type'));
        $buttonAdd = $crawler->filter('form button');
        self::assertEquals('btn btn-primary', $buttonAdd->attr('class'));
        self::assertEquals('Créer', $buttonAdd->text());
    }

    public function testNewCreateAnOption()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $crawler = $client->loginUser($testUser);
        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/new');
        self::assertResponseIsSuccessful();
        $form = $crawler->selectButton('Créer')->form();
        $crawler =  $client->submit($form, [
            'option[name]' => 'Garage',
        ]);
        $crawler = $client->followRedirect();
        self::assertPageTitleSame('Gérer les options');
        $lastAddedOption = $crawler->filter('table tbody tr')->last()->children()->first();
        self::assertEquals('Garage', $lastAddedOption->text());
    }




    ////////////////////
    // Edit an option //
    ////////////////////

    public function testEditIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin/option/1/edit');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/option/1/edit'
            )
        );
    }

    public function testEditPageisUpWhenLoggedIn()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $client->request('GET', '/admin/option/1/edit');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame("Editer l'option");
    }


    public function testEditPageisUpFromIndex()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/');
        // $this->assertResponseIsSuccessful();
        $link = $crawler->selectLink('Editer')->link(); // select the first option
        $crawler = $client->click($link);
        self::assertPageTitleSame("Editer l'option");
    }
    
    
    public function testEditLayout()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $crawler = $client->loginUser($testUser);
        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/1/edit');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame("Editer l'option");
        self::assertEquals("Editer l'option", $crawler->filter('h1')->text());
        $form = $crawler->filter('form');
        self::assertEquals('option', $form->attr('name'));
        // server-side validation
        self::assertEquals('novalidate', $form->attr('novalidate'));
        $labelName = $crawler->filter('label[for="option_name"]');
        self::assertEquals('Name', $labelName->text());
        $inputName = $crawler->filter('input[id="option_name"]');
        self::assertEquals('option[name]', $inputName->attr('name'));
        self::assertEquals('required', $inputName->attr('required'));
        self::assertEquals('text', $inputName->attr('type'));
        self::assertEquals('255', $inputName->attr('maxlength'));
        $token = $crawler->filter('input[id="option__token"]');
        self::assertEquals('option[_token]', $token->attr('name'));
        self::assertEquals('hidden', $token->attr('type'));
        $buttonAdd = $crawler->filter('form button');
        self::assertEquals('btn btn-primary', $buttonAdd->attr('class'));
        self::assertEquals('Editer', $buttonAdd->text());
       
    }

    public function testEditLastCreatedOption()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $crawler = $client->loginUser($testUser);
        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/');
        self::assertResponseIsSuccessful();
        // get the last added option edit button
        $link = $crawler->filter('tbody tr')->last()->children()->last()->children()->first()->link();
        $crawler = $client->click($link);
        self::assertPageTitleSame("Editer l'option");
        $form = $crawler->selectButton('Editer')->form(); 
        $crawler =  $client->submit($form, [
            'option[name]' => 'Jardin',
        ]);
        $crawler = $client->followRedirect();
        self::assertPageTitleSame('Gérer les options');
        $lastAddedOption = $crawler->filter('table tbody tr')->last()->children()->first();
        self::assertEquals('Jardin', $lastAddedOption->text());
    }



    //////////////////////
    // Delete an option //
    //////////////////////
    
    /**
     * testDeleteIsRedirectedWhenNotConnected
     * @return void
     */
    public function testDeleteIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('DELETE', '/admin/option/1');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/option/1'
            )
        );
    }
    
    /**
     * testDeletePageisUpWhenLoggedIn and there is no onsubmit attribute
     * DO NOT FORGET TO COMMENT/UNCOMMENT THE <form> line in the templates/admin/option/index.html.twig file
     * delete the last added option
     * @return void
     */
    public function testDeleteWithoutConfirmation()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/option/');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les options');
        // get the last Created/Updated option
        $numberOfOption = $crawler->filter('tbody tr')->count();
        $lastOption = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Jardin', $lastOption->text());
        $lastOptionForm = $crawler->filter('tbody tr')->last()->children()->last()->children()->last()->children()->last()->form();
        $crawler = $client->submit($lastOptionForm);
        $crawler = $client->followRedirect();
        self::assertPageTitleSame('Gérer les options');
        $newNumberOfOption = $crawler->filter('tbody tr')->count();
        self::assertEquals($newNumberOfOption, $numberOfOption - 1);
    }
}