<?php

namespace tests\Controller\Admin;

use App\Repository\UserRepository; // added for the login
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response; // added for redirection

/**
 * AdminPropertyControllerTest
 * 
 * @author Sandrine Manguy
 */
class AdminPropertyControllerTest extends WebTestCase
{
    /////////////////////
    // Admin dashboard //
    /////////////////////

    /* Remark: 
        The testIndexIsPageUpWhenNotConnected has already 
        been done within the SmokeTest
    */

    public function testIndexPageIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin'
            )
        );
    }

    public function testIndexIsPageUpWhenLoggedIn()
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
        $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
    }

    public function testIndexLayout()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertEquals('Gérer les biens', $crawler->filter('h1')->text());
        self::assertNotEquals('alert alert-success', $crawler->filter('body .container div')->attr('class'));
        $upperCreateButton = $crawler->filter('body .container div a');
        self::assertEquals('Créer un nouveau bien', $upperCreateButton->text());
        self::assertEquals('button', $upperCreateButton->attr('role'));
        self::assertEquals('btn btn-primary', $upperCreateButton->attr('class'));
        self::assertSelectorExists('table');
        self::assertEquals('table table-striped', $crawler->filter('table')->attr('class'));
        self::assertEquals('Titre', $crawler->filter('thead tr th')->first()->text());
        self::assertEquals('Actions', $crawler->filter('thead tr th')->last()->text());
        self::assertNotEquals('', $crawler->filter('tbody tr td')->first()->text());
        $editButton = $crawler->filter('tbody tr td')->last()->children()->first();
        self::assertEquals('button', $editButton->attr('role'));
        self::assertEquals('Editer', $editButton->text());
        self::assertEquals('btn btn-primary mb-2 mb-md-0', $editButton->attr('class'));
        $deleteButton = $crawler->filter('tbody tr td+td form button');
        self::assertEquals('Supprimer', $deleteButton->text());
        self::assertEquals('btn btn-danger', $deleteButton->attr('class'));
        $lowestEditButton = $crawler->filter('body .container div')->last()->children()->text();
        self::assertEquals('Créer un nouveau bien', $lowestEditButton);
    }





    ////////////////////////
    // Create new product //
    ////////////////////////


    public function testNewPageIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin/property/new');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/property/new'
            )
        );
    }

    public function testNewPageIsUpWhenLoggedIn()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $link = $crawler->selectLink('Créer un nouveau bien')->link();
        $crawler = $client->click($link);
        self::assertPageTitleSame('Créer un nouveau bien');
    }

    public function testNewPageIsUpWhenLoggedInWithDirectUrl()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin/property/new');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Créer un nouveau bien');
    }
    

    /**
     * testNewGlobalLayout does not test the form fields
     * @return void
     */
    public function testNewGlobalLayout()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/new');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Créer un nouveau bien');
        self::assertEquals('Créer un nouveau bien', $crawler->filter('h1')->text());
        self::assertSelectorExists('form');
        self::assertEquals('hidden', $crawler->filter('input[name="property[_token]"]')->attr('type'));
        $createButton = $crawler->filter('form')->children()->last();
        self::assertEquals('Créer', $createButton->text());
        self::assertEquals('btn btn-primary', $createButton->attr('class'));
    }
    
    /**
     * testNewFormLayout tests global form fields
     * @dataProvider fieldProvider
     * @return void
     */
    public function testNewFormLayout($field, $text, $input, $type, $name, $required, $maxlength, $pattern)
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/new');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Créer un nouveau bien');
        self::assertSelectorExists('form');
        $fieldLabel = $crawler->filter('label[for="property_' . $field . '"]');
        self::assertEquals($text, $fieldLabel->text());
        $fieldInput = $crawler->filter($input . '[id="property_' . $field . '"]');
        self::assertEquals($type, $fieldInput->attr('type'));
        $nameContent = 'property' . $name ;
        self::assertEquals($nameContent, $fieldInput->attr('name'));
        self::assertEquals($required, $fieldInput->attr('required'));
        self::assertEquals($maxlength, $fieldInput->attr('maxlength'));
        self::assertEquals($pattern, $fieldInput->attr('pattern'));
    }

    /**
     * testNewFormLayout tests specific form fields
     * @return void
     */
    public function testNewSpecificFieldsFormLayout()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/new');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Créer un nouveau bien');
        self::assertSelectorExists('form');
        self::assertEquals('Parcourir', $crawler->filter('label[for="property_imageFile"]')->attr('data-browse'));
        self::assertEquals('Sélectionner une image...', $crawler->filter('input[id="property_imageFile"]')->attr('placeholder'));
        self::assertEquals('1', $crawler->filter('input[id="property_sold"]')->attr('value'));
        self::assertEquals('0', $crawler->filter('select[id="property_heat"] option')->first()->attr('value'));
        self::assertEquals('Electrique', $crawler->filter('select[id="property_heat"] option')->first()->text());
        self::assertEquals('1', $crawler->filter('select[id="property_heat"] option')->last()->attr('value'));
        self::assertEquals('Gaz', $crawler->filter('select[id="property_heat"] option')->last()->text());
        self::assertEquals('multiple', $crawler->filter('select[id="property_options"]')->attr('multiple'));
        self::assertEquals('Garage', $crawler->filter('select[id="property_options"] option')->eq(0)->text());
        self::assertEquals('1', $crawler->filter('select[id="property_options"] option')->eq(0)->attr('value'));
        self::assertEquals('Jardin', $crawler->filter('select[id="property_options"] option')->eq(1)->text());
        self::assertEquals('2', $crawler->filter('select[id="property_options"] option')->eq(1)->attr('value'));
    }

    public function testNewFillFormWithoutError()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink('Créer un nouveau bien')->link();
        $crawler = $client->click($link);
        // arrives on the Create page
        self::assertPageTitleSame('Créer un nouveau bien');
        // fills the form and submit
        $form = $crawler->selectButton('Créer')->form();
        $form['property[title]'] = "Propriété créée pour test";
        $form['property[surface]'] = "390";
        $form['property[price]'] = "100";
        $form['property[rooms]'] = "100";
        $form['property[bedrooms]'] = "10";
        $form['property[heat]']->select('0');
        $form['property[floor]'] = "1";
        $form['property[address]'] = "101 rue des utopistes";
        $form['property[postal_code]'] = "95000";
        $form['property[city]'] = "Utopia";
        $form['property[description]'] = "Bien totalement farfelu, créé pour test uniquement.";
        $form['property[options]']->select(['1', '3', '5']);
        $crawler = $client->submit($form);
        $crawler = $client->followRedirect();
        self::assertPageTitleSame('Gérer les biens');
        self::assertEquals('Bien créé avec succès.', $crawler->filter('div[class="alert alert-success"]')->text());
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée pour test', $lastproperty->text());
        // $crawler = $client->request('GET', '/admin');
        // $this->assertResponseIsSuccessful();
        // $this->assertPageTitleSame('Gérer les biens');
        // $this->assertEquals('Propriété créée pour test', $crawler->filter('tbody tr')->last()->children()->first()->text());
    }

    public function testNewFillFormWithSameTitle()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        $lastpropertyTitle = $crawler->filter('tbody tr')->last()->children()->first()->text(); 
        $link = $crawler->selectLink('Créer un nouveau bien')->link();
        $crawler = $client->click($link);
        // arrives on the Create page
        self::assertPageTitleSame('Créer un nouveau bien');
        // fills the form and submit
        $form = $crawler->selectButton('Créer')->form();
        $form['property[title]'] = $lastpropertyTitle;
        $form['property[surface]'] = "399";
        $form['property[price]'] = "1000";
        $form['property[rooms]'] = "10";
        $form['property[bedrooms]'] = "10";
        $form['property[heat]']->select('0');
        $form['property[floor]'] = "0";
        $form['property[address]'] = "102 rue des utopistes";
        $form['property[postal_code]'] = "95000";
        $form['property[city]'] = "Utopia";
        $form['property[description]'] = "Bien totalement farfelu, créé pour test uniquement.";
        $form['property[options]']->select(['1', '4', '6']);
        $crawler = $client->submit($form);
        $titleInvalid = $crawler->filter('label[for="property_title"] span');
        self::assertEquals($titleInvalid->attr('class'), 'invalid-feedback d-block');
        $titleError = $titleInvalid->children();
        $titleBadge = $titleError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $titleBadge->attr('class'));
        self::assertEquals('Erreur', $titleBadge->text());
        $titleMessage = $titleError->children()->last();
        self::assertEquals('form-error-message', $titleMessage->attr('class'));
        self::assertEquals('Cette valeur est déjà utilisée.', $titleMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_title']")->attr('class'));   
    }


    public function testNewFillFormWithError()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink('Créer un nouveau bien')->link();
        $crawler = $client->click($link);
        // Create page
        self::assertPageTitleSame('Créer un nouveau bien');
        // fill the form and submit
        $form = $crawler->selectButton('Créer')->form();
        $form['property[title]'] = "Prop";
        $form['property[surface]'] = 1;
        $form['property[city]'] = "U";
        $form['property[postal_code]'] = "95";
        $form['property[description]'] = "Bien";
        // all the other fields are kept void.
        $crawler = $client->submit($form);
        // ...receives errors messages
        $titleInvalid = $crawler->filter('label[for="property_title"] span');
        self::assertEquals($titleInvalid->attr('class'), 'invalid-feedback d-block');
        $titleError = $titleInvalid->children();
        $titleBadge = $titleError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $titleBadge->attr('class'));
        self::assertEquals('Erreur', $titleBadge->text());
        $titleMessage = $titleError->children()->last();
        self::assertEquals('form-error-message', $titleMessage->attr('class'));
        self::assertEquals('Cette chaîne est trop courte. Elle doit avoir au minimum 5 caractères.', $titleMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_title']")->attr('class'));

        $surfaceInvalid = $crawler->filter('label[for="property_surface"] span');
        self::assertEquals($surfaceInvalid->attr('class'), 'invalid-feedback d-block');
        $surfaceError = $surfaceInvalid->children();
        $surfaceBadge = $surfaceError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $surfaceBadge->attr('class'));
        self::assertEquals('Erreur', $surfaceBadge->text());
        $surfaceMessage = $surfaceError->children()->last();
        self::assertEquals('form-error-message', $surfaceMessage->attr('class'));
        self::assertEquals('La surface doit être comprise entre 10 m² et 400 m².', $surfaceMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_surface']")->attr('class'));
        
        $postal_codeInvalid = $crawler->filter('label[for="property_postal_code"] span');
        self::assertEquals($postal_codeInvalid->attr('class'), 'invalid-feedback d-block');
        $postal_codeError = $postal_codeInvalid->children();
        $postal_codeBadge = $postal_codeError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $postal_codeBadge->attr('class'));
        self::assertEquals('Erreur', $postal_codeBadge->text());
        $postal_codeMessage = $postal_codeError->children()->last();
        self::assertEquals('form-error-message', $postal_codeMessage->attr('class'));
        self::assertEquals("Cette valeur n'est pas valide.", $postal_codeMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_postal_code']")->attr('class'));
    }





    /////////////////////
    // Edit a  product //
    /////////////////////

    public function testEditPageIsRedirectedWhenNotConnected()
    {
        $client = static::createClient();
        $client->request('GET', '/admin/property/100');
        self::assertResponseRedirects(
            'http://localhost/login', 
            // Remark: write the full address with localhost!
            Response::HTTP_FOUND, 
            // code 302
            sprintf(
                'The %s secure URL redirects to the login form.', 
                'http://localhost/admin/property/{id}'
            )
        );
    }

    public function testEditPageIsUpWhenLoggedIn()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $link = $crawler->selectLink('Editer')->link();
        $crawler = $client->click($link);
        self::assertPageTitleSame('Editer le bien');
    }

    public function testEditDirectUrlPageIsUpWhenLoggedIn()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin/property/1');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Editer le bien');
    }

    /**
     * testNewGlobalLayout does not test the form fields
     * @return void
     */
    public function testEditGlobalLayout()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/1');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Editer le bien');
        self::assertEquals('Editer le bien', $crawler->filter('h1')->text());
        self::assertSelectorExists('form');
        self::assertEquals('hidden', $crawler->filter('input[name="property[_token]"]')->attr('type'));
        $editButton = $crawler->filter('form')->children()->last();
        self::assertEquals('Editer', $editButton->text());
        self::assertEquals('btn btn-primary', $editButton->attr('class'));
    }
    
    /**
     * testNewFormLayout tests global form fields
     * @dataProvider fieldProvider
     * @return void
     */
    public function testEditFormLayout($field, $text, $input, $type, $name, $required, $maxlength, $pattern)
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/1');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Editer le bien');
        self::assertSelectorExists('form');
        $fieldLabel = $crawler->filter('label[for="property_' . $field . '"]');
        self::assertEquals($text, $fieldLabel->text());
        $fieldInput = $crawler->filter($input . '[id="property_' . $field . '"]');
        self::assertEquals($type, $fieldInput->attr('type'));
        $nameContent = 'property' . $name ;
        self::assertEquals($nameContent, $fieldInput->attr('name'));
        self::assertEquals($required, $fieldInput->attr('required'));
        self::assertEquals($maxlength, $fieldInput->attr('maxlength'));
        self::assertEquals($pattern, $fieldInput->attr('pattern'));
    }

    /**
     * testNewFormLayout tests specific form fields
     * @return void
     */
    public function testEditSpecificFieldsFormLayout()
    {
        $client = static::createClient();

        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        /* test with logged user */
        $crawler = $client->request('GET', '/admin/property/1');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Editer le bien');
        self::assertSelectorExists('form');
        self::assertEquals('Parcourir', $crawler->filter('label[for="property_imageFile"]')->attr('data-browse'));
        self::assertEquals('Sélectionner une image...', $crawler->filter('input[id="property_imageFile"]')->attr('placeholder'));
        self::assertEquals('1', $crawler->filter('input[id="property_sold"]')->attr('value'));
        self::assertEquals('0', $crawler->filter('select[id="property_heat"] option')->first()->attr('value'));
        self::assertEquals('Electrique', $crawler->filter('select[id="property_heat"] option')->first()->text());
        self::assertEquals('1', $crawler->filter('select[id="property_heat"] option')->last()->attr('value'));
        self::assertEquals('Gaz', $crawler->filter('select[id="property_heat"] option')->last()->text());
        self::assertEquals('multiple', $crawler->filter('select[id="property_options"]')->attr('multiple'));
        self::assertEquals('Garage', $crawler->filter('select[id="property_options"] option')->eq(0)->text());
        self::assertEquals('1', $crawler->filter('select[id="property_options"] option')->eq(0)->attr('value'));
        self::assertEquals('Jardin', $crawler->filter('select[id="property_options"] option')->eq(1)->text());
        self::assertEquals('2', $crawler->filter('select[id="property_options"] option')->eq(1)->attr('value'));
    }

    public function testEditFillFormWithoutError()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée pour test', $lastproperty->text());
        $lastpropertylink = $crawler->filter('tbody tr')->last()->children()->last()->children()->first()->link();
        $crawler = $client->click($lastpropertylink);
        self::assertPageTitleSame('Editer le bien');
        self::assertEquals('Propriété créée pour test', $crawler->filter('input[id="property_title"]')->attr('value'));
        $form = $crawler->selectButton('Editer')->form();
        $form['property[title]']  = 'Propriété créée et modifiée pour test';
        $crawler = $client->submit($form);
        $crawler = $client->followRedirect();
        self::assertEquals('Bien modifié avec succès.', $crawler->filter('div[class="alert alert-success"]')->text());
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée et modifiée pour test', $lastproperty->text());
    }

    public function testEditFillFormWithUsingExistingTitle()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $firstPropertyTitle = $crawler->filter('tbody tr')->first()->children()->first()->text();
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée et modifiée pour test', $lastproperty->text());
        $lastpropertylink = $crawler->filter('tbody tr')->last()->children()->last()->children()->first()->link();
        $crawler = $client->click($lastpropertylink);
        self::assertPageTitleSame('Editer le bien');
        self::assertEquals('Propriété créée et modifiée pour test', $crawler->filter('input[id="property_title"]')->attr('value'));
        $form = $crawler->selectButton('Editer')->form();
        $form['property[title]']  = $firstPropertyTitle;
        $crawler = $client->submit($form);
        $titleInvalid = $crawler->filter('label[for="property_title"] span');
        self::assertEquals($titleInvalid->attr('class'), 'invalid-feedback d-block');
        $titleError = $titleInvalid->children();
        $titleBadge = $titleError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $titleBadge->attr('class'));
        self::assertEquals('Erreur', $titleBadge->text());
        $titleMessage = $titleError->children()->last();
        self::assertEquals('form-error-message', $titleMessage->attr('class'));
        self::assertEquals('Cette valeur est déjà utilisée.', $titleMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_title']")->attr('class'));   
    }

    public function testEditFillFormWithError()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée et modifiée pour test', $lastproperty->text());
        $lastpropertylink = $crawler->filter('tbody tr')->last()->children()->last()->children()->first()->link();
        $crawler = $client->click($lastpropertylink);
        self::assertPageTitleSame('Editer le bien');
        self::assertEquals('Propriété créée et modifiée pour test', $crawler->filter('input[id="property_title"]')->attr('value'));
        $form = $crawler->selectButton('Editer')->form();
        $form['property[title]']  = 'Pro';
        $crawler = $client->submit($form);
        // ...receives errors messages
        $titleInvalid = $crawler->filter('label[for="property_title"] span');
        self::assertEquals($titleInvalid->attr('class'), 'invalid-feedback d-block');
        $titleError = $titleInvalid->children();
        $titleBadge = $titleError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $titleBadge->attr('class'));
        self::assertEquals('Erreur', $titleBadge->text());
        $titleMessage = $titleError->children()->last();
        self::assertEquals('form-error-message', $titleMessage->attr('class'));
        self::assertEquals('Cette chaîne est trop courte. Elle doit avoir au minimum 5 caractères.', $titleMessage->text());
        self::assertEquals('form-control is-invalid', $crawler->filter("input[id='property_title']")->attr('class'));
    }



    // //////////////////////
    // // Delete a product //
    // //////////////////////

    /**
    * testDeleteIsRedirectedWhenNotConnected
    * @return void
    */
   public function testDeleteIsRedirectedWhenNotConnected()
   {
       $client = static::createClient();
       $client->request('DELETE', '/admin/property/1');
       self::assertResponseRedirects(
           'http://localhost/login', 
           // Remark: write the full address with localhost!
           Response::HTTP_FOUND, 
           // code 302
           sprintf(
               'The %s secure URL redirects to the login form.', 
               'http://localhost/admin/property1'
           )
       );
    }
    
    /**
     * DO NOT FORGET TO COMMENT/UNCOMMENT THE <form> line in the templates/admin/property/index.html.twig file
     * testDelete when the onsubmit attribute is commented
     *
     * @return void
     */
    public function testDelete()
    {
        $client = static::createClient();
        /* Log in first */
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);

        $crawler = $client->request('GET', '/admin');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Gérer les biens');
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertEquals('Propriété créée et modifiée pour test', $lastproperty->text());
        $deleteButton = $crawler->filter('tbody tr')->last()->children()->last()->children()->last()->children()->last()->form();
        $crawler = $client->submit($deleteButton);
        $crawler = $client->followRedirect();
        self::assertEquals('Bien supprimé avec succès.', $crawler->filter('div[class="alert alert-success"]')->text());
        $lastproperty = $crawler->filter('tbody tr')->last()->children()->first();
        self::assertNotEquals('Propriété créée et modifiée pour test', $lastproperty->text());
    }


    public function fieldProvider()
    {
        return 
        [
            ['title', 'Titre', 'input', "text", '[title]', "required", "255", ".{5,}"],
            ['surface', 'Surface', 'input', "number", '[surface]',"required","3", ".{2,}"],
            ['price', 'Prix', 'input', "number", '[price]', "required", null, null],
            ['rooms', 'Pièces', 'input', "number", '[rooms]', "required", null, null],
            ['bedrooms', 'Chambres', 'input', "number", '[bedrooms]', "required", null, null],
            ['floor', 'Etage', 'input', "number", '[floor]', "required", null, null],
            ['imageFile', 'Ajouter une image', 'input', "file", '[imageFile]', null, null, null],
            ['address', 'Adresse', 'input', "text", '[address]', "required", "255", null],
            ['city', 'Ville', 'input', "text", '[city]', "required", "255", null],
            ['postal_code', 'Code postal', 'input', "text", '[postal_code]', "required", "255", "[0-9]{5}.*"],
            ['sold', 'Vendu', 'input', "checkbox", '[sold]', null, null, null],
            ['description', 'Description', 'textarea', null, '[description]', null, null, null],
            ['options', 'Options', 'select', null, '[options][]', null, null, null],
            ['heat', 'Chauffage', 'select', null, '[heat]', null, null, null],
        ];
    }
}