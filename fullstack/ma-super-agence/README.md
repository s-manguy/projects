# Ma Super Agence - a Real Estate Agency Website
This **PHP Symfony full-stack** project is based on a [tutorial](https://grafikart.fr/formations/symfony-4-pratique) proposed by Grafikart.   
This project uses: **Symfony 5.4**, **HTML5**, **CSS3**, **Bootstrap**, **jQuery**, Cocur/Slugify, **MySql** & MAMP, Faker, KnpPaginatorBundle, VichUploaderBundle, liip-imagine bundle, MailDev, Select2, **PHPunit**, **nightwatch**.

## Objectives:
### Tutorial given objectives:
* Use **bootstrap**, use *[Select2](https://select2.org/)* for the forms.
* Use **Symfony for both Front-end and Back-end**.
* Setup the **rooting** and use *[Cocur\Slugify](https://github.com/cocur/slugify)*.
* Create pages, controllers, twig templates. 
* Use **ORM doctrine**, **MySql**, MAMP.
* Create **fake tuplets/fixtures** using the *[Faker](https://packagist.org/packages/fzaninotto/faker)* library.
* Make the **CRUD** of the properties.
* Create a **Forms** and the **validation** of the fields.
* **Translate** the labels names.
* Add **alerts**.
* Discover the **Security** component and the roles; secure access to specific admin pages.
* **Paginate** the filter results using *[KnpPaginatorBundle](https://github.com/KnpLabs/KnpPaginatorBundle)*.
* Create property options (balcony, lift...) and manage the **Doctrine ORM Many to Many relation**.
* Create a **SearchForm** to **filter the results**.
* **Display a picture** for every property using *[VichUploaderBundle](https://github.com/dustin10/VichUploaderBundle)*.
* **Control the picture properties** (size for example) using *[liip-imagine bundle]https://github.com/liip/LiipImagineBundle)*.
* Add **a**n ImageCache**Subscriber**.
* Create a **Contact Form**.
* Display/hide the form using the JavaScript language & **jQuery**.
* Create the **HTML email notification** (set building as a newletter) using Twig.
* Use the **Symfony Mailer System** & *[MailDev](https://www.npmjs.com/package/maildev)*.
* Use **Symfony Encore**.
* Discover how to deploy the website.

### Beyond the objectives - I have:
#### UXdesign:
* Modified the colors **design**.
* Created a **camera drawing/picture** to use when there is no given property picture. 


#### Development:
* Created the **HTML email template** from scratch. 
* Adapted the project code **from Symfony-4 to Symfony-5**.
* Added **accessibility improvments** like:
  * role="button" on links with button appearence, 
  * placeholders,
  * replacing the "Se connecter" link by the "Se déconnecter" link when  user is connected,
  * grouping all the navlinks,
  * ...
* Modified the property repository to display the **properties in a DESC order** on the home page and the properties index page.  


#### Testing:
* **Tested manually** the app.
* **Written automatic tests** because this webapp was not tested at all. *Remarks:*  
  - *Do not forget to comment/uncomment the onsubmit attribute on the delete property and delete option forms.*
  - *Do not forget to start the mySql database.*
  - *Do not forget to start MailDev.*


### Go further - Improvments to work on:
* Display many pictures a property instead of one.
* Add direct links to the admin properties dashboard and the admin options dashboard in the navbar. They could be displayed when the user is connected with the logout link...  
* Add a 404 page.  

## Result
![mobile screenshot](https://github.com/s-manguy/projects/blob/main/fullstack/ma-super-agence/masuperagence__sandrinemanguy_mobile_screenshot_300.jpg) ![tablet screenshot](https://github.com/s-manguy/projects/blob/main/fullstack/ma-super-agence/masuperagence__sandrinemanguy_tablet_screenshot_450.jpg)  
![desktop screenshot](https://github.com/s-manguy/projects/blob/main/fullstack/ma-super-agence/masuperagence__sandrinemanguy_desktop_screenshot_600.jpg)


## Credits:
* Website design basis : Grafikart.
* Landscape picture by [David Hepworth](https://unsplash.com/@davidhepworth?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](http://localhost:3000/s/photos/park?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
* Camera drawing: © Sandrine Manguy. Be careful: this drawing cannot be shared, used or copied without the author authorization.


## Links to various tutorials, courses and documentations which were useful to realize this project:
* Grafikart [Symfony-4 par l'exemple](https://grafikart.fr/formations/symfony-4-pratique)
* [Build an html template from scratch](https://webdesign.tutsplus.com/articles/build-an-html-email-template-from-scratch--webdesign-12770)
* [Créer un Simple Responsive Email en HTML](https://webdesign.tutsplus.com/fr/articles/creating-a-simple-responsive-html-email--webdesign-12978)
* OpenClassrooms course [Testez unitairement votre application PHP Symfony](https://openclassrooms.com/fr/courses/4087056-testez-unitairement-votre-application-php-symfony)
* OpenClassrooms course [Testez fonctionnellement votre application](https://openclassrooms.com/fr/courses/4087076-testez-fonctionnellement-votre-application-php-symfony)
* [Surveillez la performance de votre application PHP](https://openclassrooms.com/fr/courses/4939956-surveillez-la-performance-de-votre-application-php)
* [Symfony docs](https://symfony.com/doc/5.4/index.html)
* [PHPUnit Manual](https://phpunit.readthedocs.io/fr/latest/index.html)
* [Nightwatch documentation](https://nightwatchjs.org/guide/getting-started/introduction.html)

