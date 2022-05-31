<?php
declare(strict_types=1);

namespace Tests\Controller;

use App\Entity\Property; // added for the last posted property request
use App\Repository\UserRepository; // added for the login
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


/**
 * HomeControllerTest
 * 
 * @author Sandrine Manguy
 */
class HomeControllerTest extends WebTestCase
{
    /* Remark: 
        The testIndexPageIsUp has already 
        been done within the SmokeTest
    */

    // public function testIndexIsPageUp()
    // {
    //     $client = static::createClient();
    //     $client->request('GET', '/');
    //     $this->assertResponseIsSuccessful();
    // }


    public function testIndexLayout(): void 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        // $this->assertSame(200, $client->getResponse()->getStatusCode());
        // replaced by:
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Mon agence');
        self::assertSelectorExists('.jumbotron');
        self::assertSelectorTextContains('h1', 'Agence lorem ipsum');
        self::assertSelectorTextContains('h1+p', 'Lorem ipsum dolor sit amet. Ut sunt enim qui autem atque et obcaecati nihil quo dolores optio et fuga officia ut molestiae quae. Eos rerum ratione aut ipsum velit et dolore quam sit repudiandae veniam qui enim eveniet. Sit dicta nihil ea eligendi repellat et autem cumque ea sint quae.');
        self::assertSelectorTextContains('h2', 'Les derniers biens');
        // $this->assertSame(4, $crawler->filter('.card')->count());
        // can be replaced by:
        self::assertCount(4, $crawler->filter('.card')); 
    }
    
    /**
     * testPropertyCardLayout tests the property card the first time it appears
     *
     * @return void
     */
    public function testPropertyCardLayout(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        // property card
        self::assertSelectorExists('.card');
        // property image
        self::assertSelectorExists('img');
        // property title
        self::assertSelectorExists('.card-title');
        // link to the property details page
        self::assertSelectorExists('.card-title a');
        // description
        self::assertSelectorExists('.card-text');
        self::assertSelectorTextContains('.card-text', 'm²');
        self::assertSelectorExists('.formatted-price');
    }
     
    // public function testPropertyLink() {
    //     // $client = static::createClient();
    //     // $crawler = $client->request('GET', '/');
    //     // $this->assertResponseIsSuccessful();
    //     // $link = $crawler->selectLink('nobis rem est')->link();
    //     // $crawler = $client->click($link);
    //     // // redirects to the property details page
    //     // $this->assertSelectorTextContains('h1', 'nobis rem est');
    //     // $this->assertPageTitleSame('nobis rem est');
    // }

    // improved the link test selectionning the first card 
    // instead of a precise text link found in the test database
    public function testPropertyLinkText() 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $linkText = $crawler->filter('.card-title a')->text();
        return $linkText;
    }
    
    /**
     * @depends testPropertyLinkText
     * 
     * @param  string $linkText
     * @return void
     */
    public function testPropertyLink($linkText) {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink($linkText)->link();
        $crawler = $client->click($link);
        // redirects to the property details page
        self::assertSelectorTextContains('h1', $linkText);
        self::assertPageTitleSame($linkText);
    }


    public function testNavLinkHome() 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink('Mon agence immobilière')->link();
        $crawler = $client->click($link);
        // redirects to the same home page
        self::assertSelectorTextContains('h1', 'Agence lorem ipsum');
        self::assertPageTitleSame('Mon agence');
    }

    public function testNavLinkAcheter() 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink('Acheter')->link();
        $crawler = $client->click($link);
        // redirects to the properties list page
        self::assertSelectorTextContains('h1', 'Voir tous nos biens');
        self::assertPageTitleSame('Tous nos biens');
    }

    public function testNavLinkLogin() 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $link = $crawler->selectLink('Se connecter')->link();
        $crawler = $client->click($link);
        // redirects to the login page
        self::assertPageTitleSame('Se connecter');
        $label = $crawler->filter('label')->text();
        self::assertSame("Nom d'utilisateur :", $label);
    }

    public function testNavLinkLogoutNotdisplayed() 
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        self::assertSelectorNotExists('Se déconnecter');
    }

    public function testNavLinkLoginNotDisplayedWhenUserIsLogged() 
    {
        $client = static::createClient();
        // logged user
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);
        // test
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        self::assertPageTitleSame('Mon agence');
        self::assertSelectorNotExists('Se connecter');
    }

    public function testNavLinkLogoutDisplayedWhenUserIsLogged() 
    {
        $client = static::createClient();
        // logged user
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneByUsername('demo');
        $client->loginUser($testUser);
        // test
        $crawler = $client->request('GET', '/');
        self::assertResponseIsSuccessful();
        $logoutLink = $crawler->filter('nav div ul li')->last()->text();
        self::assertSame('Se déconnecter', $logoutLink);
    }

    /* Remark:
        The footer link "Grafikart" is tested using nightwatch refer to 
        the e2e_nightwatch/footerLink_test.js file    
    */

}