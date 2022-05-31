<?php

namespace App\Tests\Controller;

use App\Entity\Property; // added for the show page test
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\DomCrawler\Link;

/**
 * PropertyControllerTest
 * 
 * @author Sandrine Manguy
 */
class PropertyControllerTest extends WebTestCase
{
    /////////////////////////////////////////////////////
    /////* "/biens" page or page linked as Acheter */////
    /////////////////////////////////////////////////////

    /* Remark: 
        The testIndexPageIsUp has already been done 
        within the SmokeTest
    */
    
    // public function testIndexIsPageUp()
    // {
    //     $client = static::createClient();
    //     $client->request('GET', '/biens');
    //     $this->assertResponseIsSuccessful();
    // }

    public function testIndexLayout()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/biens');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Tous nos biens');
        // h1
        self::assertSelectorTextSame('h1', 'Voir tous nos biens');
        // search form
        self::assertSelectorExists('.jumbotron');
        $submitButton = $crawler->filter('button[type="submit"]')->text();
        self::assertSame($submitButton, 'Rechercher');
        // properties cards
        self::assertCount(12, $crawler->filter('.card'));
        // pagination links
        self::assertSelectorExists('.pagination nav ul li+li');
    }
    
    /**
     * testIndexSearchForm tests PropertySearchType
     *
     * @return void
     */
    public function testIndexSearchForm()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/biens');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Tous nos biens');
        $form = $crawler->selectButton('Rechercher')->form();
        $form['minSurface'] = '90';
        $form['maxPrice'] = '500000';
        // $form['options']->select();
        $crawler= $client->submit($form);
        // echo $client->getResponse()->getContent();
        $numberOfPaginationLinks = $crawler->filter('.pagination nav ul li')->count();
        self::assertEquals(5, $numberOfPaginationLinks);
    }
    

    /* Remark: 
        Property card already tested 
        within the HomeControllerTest
    */

    
    // /**
    //  * testIndexPagination considering that 
    //  * there are more than 12 properties
    //  *
    //  * @return void
    //  */
    // public function testIndexPagination()
    // {
    //     $client = static::createClient();
    //     $crawler = $client->request('GET', '/biens');
    //     $this->assertResponseIsSuccessful();
    //     $this->assertPageTitleSame('Tous nos biens');
    //     $link1 = $crawler->filter('.pagination nav ul li+li');
    //     $link2 = $crawler->filter('.pagination nav ul li+li+li');
    //     $linkPrevious = $crawler->filter('.pagination nav ul li')->first();
    //     $linkNext = $crawler->filter('.pagination nav ul li')->last();
    //     $this->assertSelectorTextSame('.pagination nav ul li+li', '1');
    //     $this->assertSame('page-item active', $link1->attr('class'));
    //     $this->assertSame('page-item disabled', $linkPrevious->attr('class'));
    //     $this->assertSelectorTextSame('.pagination nav ul li+li+li', '2');
    //     $this->assertNotSame('page-item active', $link2->attr('class'));
    //     $this->assertNotSame('page-item disabled', $link2->attr('class'));
    //     $this->assertNotSame('page-item disabled', $linkNext->attr('class'));
    //     // from page 1 to page 2 via the link "2"
    //     $clickedLink2 = $crawler->selectLink('2')->link();
    //     $crawler = $client->click($clickedLink2);
    //     $link2page2 = $crawler->filter('.pagination nav ul li+li+li');
    //     $this->assertSame('page-item active', $link2page2->attr('class'));
    //     // from page 2 to page 1 via the link "1"
    //     $clickedLink1 = $crawler->selectLink('1')->link();
    //     $crawler = $client->click($clickedLink1);
    //     $link1page1 = $crawler->filter('.pagination nav ul li+li');
    //     $this->assertSame('page-item active', $link1page1->attr('class'));
    //     // from page 1 to page 2 via the link "Suivant >>"
    //     $linkNextPage2 = $crawler->filter('.pagination nav ul li')->last()->text();
    //     $clickedLinkNext = $crawler->selectLink($linkNextPage2)->link();
    //     $crawler = $client->click($clickedLinkNext);
    //     $this->assertSelectorTextSame('.pagination nav ul li+li+li', '2');
    //     $link2page2 = $crawler->filter('.pagination nav ul li+li+li');
    //     $this->assertSame('page-item active', $link2page2->attr('class'));
    //     $link1page2 = $crawler->filter('.pagination nav ul li+li');
    //     $this->assertNotSame('page-item active', $link1page2->attr('class'));
    //     $linkPreviousPage2 = $crawler->filter('.pagination nav ul li')->first();
    //     $this->assertNotSame('page-item disabled', $linkPreviousPage2->attr('class')); 
    //     // from page 2 to page 1 via the link "<< Précédent"
    //     $linkPreviousPage2 = $crawler->filter('.pagination nav ul li')->first()->text();
    //     $clickedLinkPrevious = $crawler->selectLink($linkPreviousPage2)->link();
    //     $crawler = $client->click($clickedLinkPrevious);
    //     $link1page1 = $crawler->filter('.pagination nav ul li+li');
    //     $this->assertSelectorTextSame('.pagination nav ul li+li', '1');
    //     $this->assertSame('page-item active', $link1page1->attr('class'));   
    // }

    public function testIndexPagination()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/biens');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Tous nos biens');
        /* Remarks:
            - .pagination does not exist if there is 0 or 1 page of results
            - when pagination is displayed there the links:
                - previous, 
                - pages links :
                    - as pages links as number of page if less than 8 pages,
                      eg. 1 2 3  or 1 2 3 4 5 or 1 2 3 4 5 6 7
                    - or the first 5 pages links, a ... void link & the last page link
                      eg. 1 2 3 4 5 ... 8
                - next link
            ! here, the page is tested when no specific search has been requested.
        */
        

        if ($this->assertSelectorExists('.pagination')) {
            
            // page 1 layout
            $numberOfLinks = $crawler->filter('.pagination nav ul')->count();
            $links = $crawler->filter('.pagination nav ul')->extract(['_text']);
            /* Remarks:
             - the first index is 0 
             - so the last index is count result minus 1
             - so every page of result number has its page number as index
             - the first index is the previous page link
             - the last index is the next page link
             - the last page index is count result minus 2
             - the ... link is placed just before the last page
             - the ... link index index is count result minus 3 
             */
            self::assertSelectorTextSame($links[0], '<< Précédent');
            self::assertSelectorTextSame($links[1], '1');
            self::assertSelectorTextSame($links[2], '2');
            $nextLinkIndex = $links-1;
            self::assertSelectorTextSame($links[$nextLinkIndex], 'Suivant >>');
            $linkPrevious = $crawler->filter($links[0]);
            self::assertSame('page-item disabled', $linkPrevious->attr('class'));
            $link1 = $crawler->filter($links[1]);
            self::assertSame('page-item active', $link1->attr('class'));
            $link2 = $crawler->filter($links[2]);
            self::assertNotSame('page-item active', $link2->attr('class'));
            $linkNext = $crawler->filter($links[$nextLinkIndex]);
            self::assertNotSame('page-item disabled', $linkNext->attr('class'));

            if ($numberOfLinks > 9) { // more than 7 pages of results
                $voidLinkIndex = $links - 3;
                self::assertSelectorTextSame($links[$voidLinkIndex], '...');
                $link5 = $links - 4;
                self::assertSelectorTextSame($links[$link5], '5');
            }
            
            // from page 1 to page 2 via the link "2"
            self::assertNotSame('page-item disabled', $link2->attr('class'));
            $clickedLink2 = $crawler->selectLink('2')->link();
            $crawler = $client->click($clickedLink2);

            // page 2 layout
            $numberOfLinksPage2 = $crawler->filter('.pagination nav ul')->count();
            self::assertEquals($numberOfLinks, $numberOfLinksPage2);
            $linksPage2 = $crawler->filter('.pagination nav ul')->extract(['_text']);
            $link2page2 = $crawler->filter($linksPage2[2]);
            self::assertSame('page-item active', $link2page2->attr('class'));
            $link1page2 = $crawler->filter($linksPage2[1]);
            self::assertNotSame('page-item active', $link1page2->attr('class'));
            $linkPreviousPage2 = $crawler->filter($linksPage2[0]);
            self::assertNotSame('page-item disabled', $linkPreviousPage2->attr('class')); 
            
            $nextLinkIndex = $linksPage2-1;
            $linkNextPage2 = $crawler->filter($linksPage2[$nextLinkIndex]);
            if ($numberOfLinksPage2 > 4) { // more than 2 pages of results
                self::assertNotSame('page-item disabled', $linkNext->attr('class'));
            } else {
                self::assertSame('page-item disabled', $linkNext->attr('class'));
            }

            // from page 2 to page 1 via the link "1"
            $clickedLink1 = $crawler->selectLink('1')->link();
            $crawler = $client->click($clickedLink1);
            $link1page1 = $crawler->filter($links[1]);
            self::assertSame('page-item active', $link1page1->attr('class'));

            // from page 1 to page 2 via the link "Suivant >>"
            $clickedLinkNext = $crawler->selectLink($linkNext)->link();
            $crawler = $client->click($clickedLinkNext);
            self::assertSelectorTextSame($link2page2, '2');
            self::assertSame('page-item active', $link2page2->attr('class'));  

            // from page 2 to page 1 via the link "<< Précédent"
            $clickedLinkPrevious = $crawler->selectLink($linkPreviousPage2)->link();
            $crawler = $client->click($clickedLinkPrevious);
            self::assertSelectorTextSame($links[1], '1');
            self::assertSame('page-item active', $link1page1->attr('class')); 
            
            // from page 1 to the last page via the last page number link
            $lastPageLinkIndex = $numberOfLinks - 2;
            $linkLastPage = $crawler->filter($links[$lastPageLinkIndex]);
            $clickedLinkLastPage = $crawler->selectLink($linkLastPage)->link();
            $crawler = $client->click($clickedLinkLastPage);
            self::assertSame('page-item active', $linkLastPage->attr('class'));

            // last page layout
            $linkNext = $crawler->filter($links[$nextLinkIndex]);
            self::assertSame('page-item disabled', $linkNext->attr('class'));
        };
    
        return 
            $text = 'There is no result or only one page of results';
            echo $text;
        
    }


    // ////////////////////////////////////////////////////
    // /////* "/biens/{slug}{id}" page or show page  */////
    // ////////////////////////////////////////////////////

    
    /* Remarks: 
        - The testIndexPageIsUp has already been done 
        within the SmokeTest.
        - Reaching a property details page from a card
        has already been tested within the HomeControllerTest.
    */
    
    // public function testShowIsPageUp()
    // {
    //     $client = static::createClient();
    //     $lastPostedProperty//////////;
    //     $client->request('GET', $lastPostedProperty);
    //     $this->assertResponseIsSuccessful();
    // }

   
    
    /**
     * testShowLayout
     *
     * @return void
     */
    public function testShowLayout()
    {
        $client = static::createClient();
        $postedProperty = $client->getContainer()->get('doctrine')->getRepository(Property::class)->find(1);
        $postedPropertyTitle = $postedProperty->getTitle();
        $crawler = $client->request('GET', sprintf('/biens/%s', $postedProperty->getSlug().'-'.$postedProperty->getId()));
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame($postedPropertyTitle);
        self::assertSelectorExists('.jumbotron');
        self::assertSelectorNotExists('div[class="alert alert-success"]');
        self::assertSelectorNotExists('div[class="alert alert-danger"]');
        self::assertSelectorExists('img');
        self::assertEquals("card-img-top", $crawler->filter('img')->attr('alt'));
        self::assertEquals("front-picture", $crawler->filter('img')->attr('class'));
        $postedPropertyImageFileName = $postedProperty->getFileName();
        $expectedFileSrc = 'http://localhost/media/cache/medium/images/properties/' . $postedPropertyImageFileName;
        if (self::assertNotEquals($expectedFileSrc, $crawler->filter('img')->attr('src'))) {
            self::assertEquals('http://localhost/media/cache/medium/images/properties/empty.jpg', $crawler->filter('img')->attr('src') );
        }
        self::assertSelectorExists('h1');
        $headingText = $crawler->filter('h1')->text();
        self::assertSame($postedPropertyTitle, $headingText);
        $postedPropertyRooms = $postedProperty->getRooms();
        $postedPropertySurface = $postedProperty->getSurface();
        $headingDetails = $crawler->filter('h1+h2')->text();
        self::assertSame($postedPropertyRooms . ' pièces - ' . $postedPropertySurface . ' m²', $headingDetails);
        $postedPropertyPrice = $postedProperty->getFormattedPrice();
        $price = $crawler->filter('.formatted-price_show')->text();
        self::assertSame($postedPropertyPrice . ' €', $price);
        $contactButton = $crawler->filter('a[id="contactButton"]')->text();
        self::assertSame("Contacter l'agence", $contactButton);
        $contactButtonDisplay = $crawler->filter('a[id="contactButton"]')->attr('style');
        self::assertNotSame('display: none;', $contactButtonDisplay);
        self::assertSelectorExists('form');
        $formDisplay = $crawler->filter('div[id="contactForm"]')->attr('style');
        self::assertSame('display: none;', $formDisplay);
        $postedPropertyDescription = $postedProperty->getDescription();
        $description = $crawler->filter('.container p')->text();
        self::assertSame($postedPropertyDescription, $description);
        $caracteristiques = $crawler->filter('table')->previousAll()->text();
        self::assertEquals($caracteristiques, 'Caractéristiques');
        self::assertSame($postedPropertyDescription, $description);
        self::assertSelectorExists('table');
        $details = $crawler->filter('table tr')
                            ->each(
                                function(Crawler $node, $i) {
                                    return $node->text();
                            });
        $postedPropertyBedrooms = $postedProperty->getBedrooms();
        $postedPropertyFloor = $postedProperty->getFloor();
        $postedPropertyHeating = $postedProperty->getHeatType();
        $propertyDetails = [
            'Surface habitable ' . $postedPropertySurface . ' m²',
			'Pièces ' . $postedPropertyRooms,
			'Chambres ' . $postedPropertyBedrooms,
			'Etage '. $postedPropertyFloor,
		    'Chauffage ' . $postedPropertyHeating,
        ];
        self::assertEquals(count($propertyDetails), count($details));
        for ($detail = 0; $detail < count($details); $detail++) {
            self::assertEquals($propertyDetails[$detail], $details[$detail]);
        }

        $specificities = $crawler->filter('body div+div p+div div+div h2');
        self::assertEquals('Spécificités', $specificities->text());

        $postedPropertyOptions = $postedProperty->getOptions();
        $numberOfOptions = count($postedPropertyOptions);

        if ($numberOfOptions > 0) {
            $numberOfSpecifities = $specificities->nextAll()->children()->count();

            $specificiedOptions = $specificities->nextAll()
            ->each(
                function(Crawler $node, $i) {
                    return $node->text();
            });

            if (self::assertSame($numberOfOptions, $numberOfSpecifities)) {
                for ( $i = 0; $i < $numberOfOptions;  $i ++ ) {
                    for ( $specifity = $i; $specifity < $numberOfSpecifities; $specifity++) {
                        self::assertEquals($postedPropertyOptions[$i], $specificiedOptions[$i] );
                    }    
                }
            };
        }
    }




    

    public function  testShowContactFormLayout() {
        $client = static::createClient();
        $postedProperty = $client->getContainer()->get('doctrine')->getRepository(Property::class)->find(1);
        $postedPropertyTitle = $postedProperty->getTitle();
        $crawler = $client->request('GET', sprintf('/biens/%s', $postedProperty->getSlug().'-'.$postedProperty->getId()));
        self::assertResponseIsSuccessful();
        self::assertEquals('Prénom', $crawler->filter('label[for="contact_firstname"]')->text());
        self::assertEquals('text', $crawler->filter('input[id="contact_firstname"]')->attr('type'));
        self::assertEquals('required', $crawler->filter('input[id="contact_firstname"]')->attr('required'));
        self::assertEquals('Nom', $crawler->filter('label[for="contact_lastname"]')->text());
        self::assertEquals('text', $crawler->filter('input[id="contact_lastname"]')->attr('type'));
        self::assertEquals('required', $crawler->filter('input[id="contact_lastname"]')->attr('required'));
        self::assertEquals('Email', $crawler->filter('label[for="contact_email"]')->text());
        self::assertEquals('email', $crawler->filter('input[id="contact_email"]')->attr('type'));        
        self::assertEquals('required', $crawler->filter('input[id="contact_email"]')->attr('required'));  
        self::assertEquals('Téléphone', $crawler->filter('label[for="contact_phone"]')->text());
        self::assertEquals('text', $crawler->filter('input[id="contact_phone"]')->attr('type')); 
        self::assertEquals('required', $crawler->filter('input[id="contact_phone"]')->attr('required')); 
        self::assertEquals('Message', $crawler->filter('label[for="contact_message"]')->text());
        self::assertSelectorExists('textarea[id="contact_message"]'); 
        self::assertEquals('required', $crawler->filter('textarea[id="contact_message"]')->attr('required'));
        $submitButton = $crawler->filter('form div')->last()->children();
        self::assertEquals('Envoyer', $submitButton->text()); 
        self::assertEquals('submit', $submitButton->attr('type'));
    }

    public function testShowDisplayAndFillContactFormWithoutError()
    {
        $client = static::createClient();
        $postedProperty = $client->getContainer()->get('doctrine')->getRepository(Property::class)->find(1);
        $postedPropertyTitle = $postedProperty->getTitle();
        $crawler = $client->request('GET', sprintf('/biens/%s', $postedProperty->getSlug().'-'.$postedProperty->getId()));
        self::assertResponseIsSuccessful();
        // The user shows the form...
        $link = $crawler->selectLink('Contacter l\'agence')->link();
        $crawler = $client->click($link);

        /* Remark: 
            as the style attributes are modified using JavaScript language,
            the below assertions cannot been tested via phpunit
                // $this->assertEquals('display: none;', $crawler->filter('a[id="contactButton"]')->attr('style'));
                // $this->assertNotEquals('display: none;', $crawler->filter('form')->attr('style'));
        */
        
        // ...fills and submits the form...
        $form = $crawler->selectButton('Envoyer')->form();
        $form->setValues([
            'contact[firstname]' => 'Jane',
            'contact[lastname]' => 'Doe',
            'contact[email]' => 'Jane.Doe@test.com',
            'contact[phone]' => '0600000000',
            'contact[message]' => 'I am interested in visiting this property.',
        ]);
        $crawler = $client->submit($form);
        $crawler = $client->followRedirect();
        // ...is redirected to the same page with success alert message and not displayed void form
        self::assertEquals('alert alert-success', $crawler->filter('body .jumbotron .container div')->attr('class'));
        self::assertEquals('Votre message a bien été envoyé', $crawler->filter('body .jumbotron .container div')->text());
        self::assertNotEquals('display: none;', $crawler->filter('a[id="contactButton"]')->attr('style'));
        self::assertEquals('', $crawler->filter('input[id="contact_firstname"]')->attr('value'));
        self::assertEquals('', $crawler->filter('input[id="contact_lastname"]')->attr('value'));
        self::assertEquals('', $crawler->filter('input[id="contact_phone"]')->attr('value'));
        self::assertEquals('', $crawler->filter('input[id="contact_email"]')->attr('value'));
        self::assertEquals('', $crawler->filter('textarea[id="contact_message"]')->attr('value'));
        // An email is received by the real estate agency.
    }
    
    /**
     *
     * @dataProvider errorsProvider
     * @param  mixed $field
     * @param  mixed $errorMessage
     * @return void
     */
    public function testShowDisplayAndFillContactFormWithError($field, $type, $errorMessage)
    {
        $client = static::createClient();
        $postedProperty = $client->getContainer()->get('doctrine')->getRepository(Property::class)->find(1);
        $postedPropertyTitle = $postedProperty->getTitle();
        $crawler = $client->request('GET', sprintf('/biens/%s', $postedProperty->getSlug().'-'.$postedProperty->getId()));
        self::assertResponseIsSuccessful();
        // The user shows the form...
        $link = $crawler->selectLink('Contacter l\'agence')->link();
        $crawler = $client->click($link);

        /* Remark:
            the below assertions cannot be tested because they are treated in javascript
                // $this->assertEquals('display: none;', $crawler->filter('a[id="contactButton"]')->attr('style'));
                // $this->assertNotEquals('display: none;', $crawler->filter('form')->attr('style'));
        
            They are tested using nightwatch refer to the e2e_nightwatch\contact_test.je file.
         */

        // ...fills and submits the form...
        $form = $crawler->selectButton('Envoyer')->form();
        /* Remark: 
            the below submitted not filled form cannot be tested because the HTML5
            required attribute is directly treated by the browser with pop-up help
            indications. No alert message is displayed until one caractère (at least)
            is written in every output.
                // $form->setValues([
                //     'contact[firstname]' => '',
                //     'contact[lastname]' => '',
                //     'contact[email]' => '',
                //     'contact[phone]' => '',
                //     'contact[message]' => '',
                // ]);
                // $crawler= $client->submit($form);
        */
        
        $form->setValues([
            'contact[firstname]' => 'a',
            'contact[lastname]' => 'a',
            'contact[phone]' => 'a',
            'contact[email]' => 'a.a@com',
        ]);
        $crawler= $client->submit($form);
        // ...receives errors messages
        self::assertEquals('alert alert-danger', $crawler->filter('body .jumbotron .container div')->attr('class'));
        self::assertEquals('Erreur : le message n\'a pas pu être envoyé !', $crawler->filter('body .jumbotron .container div')->text());
        $fieldLabelSelector = 'label[for="contact_' . $field . '"] span';
        $fieldInvalid = $crawler->filter($fieldLabelSelector);
        self::assertEquals($fieldInvalid->attr('class'), 'invalid-feedback d-block', );
        $fieldError = $fieldInvalid->children();
        $fieldBadge = $fieldError->children()->first();
        self::assertEquals('form-error-icon badge badge-danger text-uppercase', $fieldBadge->attr('class'));
        self::assertEquals('Erreur', $fieldBadge->text());
        $fieldMessage = $fieldError->children()->last();
        self::assertEquals('form-error-message', $fieldMessage->attr('class'));
        self::assertEquals($errorMessage, $fieldMessage->text());
        $fieldInputSelector =  $type . "[id='contact_" . $field . "']";
        self::assertEquals('form-control is-invalid', $crawler->filter($fieldInputSelector)->attr('class'));
        // echo 'the ' . $field . ' field has been tested. ';
    }
    
    /**
     * errorsProvider indicates the fields and the fields error message
     * 
     * @return void
     */
    public function errorsProvider()
    {
        return [
            ["firstname", "input", 'Cette chaîne est trop courte. Elle doit avoir au minimum 2 caractères.'],
            ["lastname", "input", 'Cette chaîne est trop courte. Elle doit avoir au minimum 2 caractères.'],
            ["phone", "input", "Cette valeur n'est pas valide."],
            ["email", "input", "Cette valeur n'est pas une adresse email valide."],
            ["message", "textarea", "Cette valeur ne doit pas être vide."],
        ];
    }

}


