*[see all the fullstack projects](https://github.com/s-manguy/projects/tree/main/fullstack)*

# Mon super blog  

This project, realized in February/march 2021, is taken from the [Concevez votre site web avec PHP et MySqL](https://openclassrooms.com/fr/courses/918836-concevez-votre-site-web-avec-php-et-mysql), [Adoptez une architecture MVC en PHP](https://openclassrooms.com/fr/courses/4670706-adoptez-une-architecture-mvc-en-php) courses written by Matthieu Nebra and published on the OpenCLassrooms platform.

## Objectives:
### Courses given objectives:
* Install the PHP environment (Apache web server, php, phpMyAdmin) via MAMP.
* Write instructions in PHP.
* Respect the writing code rules.
* Write functions.
* Write data into files.
* Write data in sessions and cookies.
* Relay data via $_GET(), $_POST().
* Communicate with the SQL database.
* Write basic SQL functions.
* Export database.
* Use Regex in PHP.
* Adopt the MVC architecture.
* From MVC to OOP.
* Deploy your website.
### Project Objectives - Realize a simple blog:
#### Front-end
* Realize the index.php page which display the list of the 5 last posts.
* Realize the comments.php page which display one post and its comments.
* The index page must contains:
  * The blog title.
  * The information "The last blog posts".
  * A block per post.
* The post block must contain:
  * The post title, the creation date, the creation time.
  * The post text/content.
  * A link "Comments" to redirect to the post page.
* The comments page must contain:
  * The blog title.
  * A link "Return to the posts list" to redirect to the index page.
  * The post block without the link "Comments".
  * The information "Comments".
  * The comments...
* Each comment must contain:
  * The author pseudo, the creation date and the creation time.
  * The comment text/content.
#### Database
* Create the MySql database architecture. 
  
### Far beyond the objectives - what I improved/added :
#### UI 
* used bootstrap,
#### UX
* respected the RWD rules,
* created the navigation (navbar, links, buttons),
* added alerts,
* created a dynamic navbar depending on the log in/out,
* created a pagination,
#### Features
* sign in:
  * a sign in form,
  * its congratulation alert,
* log in/out:
  * a login form,
  * its success alert,
* contact:
  * a contact form,
  * its success alert,
* CRUD when logged in:
  * a add post form and its success alert,
  * buttons to Edit or Delete post when connected as the author,
  * a form to edit the post and its success alert,
  * a delete danger alert,
  * a form to add comment and its success alert,
  * buttons to Edit or Delete a comment when connected as the author, 
  * a form to edit the comment and its success alert,
#### Architecture
* an MVC architecture,
* the OOP applied to the Managers,
* the use of templates,
* the errors management 

## Go further - possible improvments:
* OOP applied to the controllers,
* a special template for the errors

## Result and certification:
* view the [Concevez votre site web avec PHP et MySqL Certification](https://github.com/s-manguy/diploma/blob/main/PHP/certificate-php-mysql-1162704789.pdf), 
* view the [Adoptez une architecture MVC en PHP Certification](https://github.com/s-manguy/diploma/blob/main/PHP/certificate-php-mvc-7231988400.pdf)
* screenshots:  

  ![index page or posts list](https://github.com/s-manguy/projects/blob/main/fullstack/mon-super-blog/appendices/blog-php_sandrinemanguy_connected_list_300.jpg)      ![post](https://github.com/s-manguy/projects/blob/main/fullstack/mon-super-blog/appendices/blog-php_sandrinemanguy_connected_post_300.jpg)     ![post form](https://github.com/s-manguy/projects/blob/main/fullstack/mon-super-blog/appendices/blog-php_sandrinemanguy_connected_postform_300.jpg)  
