*[see all the fullstack projects](https://github.com/s-manguy/projects/tree/main/fullstack)*


# A blog - a Symfony, SQL, Apiplatform, React Full stack project

This fullstack project (Symfony, API Platform & React) is based on a Grafikart [tutorial](https://grafikart.fr/tutoriels/module-commentaires-api-platform-1310) project idea.
  
First the comments were displayed with the post. **Replacing the server-side comments system by a dynamic one uploading the comments when the user has scrolled to the bottom of the page improves the performance**. Moreover avoiding a too many number of keywords, the SEO will be improved. 
The use of React implies the use of an APIRest to retrieve the comments. As the initial project was coded in PHP via the Symfony framework, the **API Rest is built with API Platform**.

The comments are displayed in pairs to be easily tested. Obviously, in real context, there would be more comments displayed at one go!

## Objectives:

### Tutorial Objectives:

- Use **Symfony Demo full stack blog** project as basis.
- Add an APIRest for the comments using **Apiplatform**.
- Create endpoints:
  - Retrieve paginated comments per post.
  - Create a comment when logged in.
  - Modify a comment when the user is logged in and the author of the comment.
  - Delete a comment when the user is logged in and the author of the comment.
- Add a dynamic Comment module using **React via a Custom HTML element**.
- Use the **hydra information from the JSON-LD API response** to supply the path to the linked resources (previous and next pages, resource and the total amount of items).
- Use the **IntersectionsObserver** to download the comments when scrolling to the bottom of the page only.
- Load more comments via clicking on a button.
- Use **React.memo** and **UseCallback()**.

### Beyond the objectives - What I have modified/improved or added:

#### **User stories**:
Have a look at some [react comment module user stories](https://github.com/s-manguy/projects/blob/main/appendices/User%20storie.pdf).


#### **API documentation**:

- Hidden the GET /comments/{id} endpoint from Postman.
- Hidden the GET item operations (documentation, Entity, OpenApiFactory, services.yaml). 

*Remark: the documentation is displayed on localhost:3000/api.*

#### **UI**:

- POST comment form : Moved the "Envoyer" button from left to right.
- UPDATE comment form : Moved the "Supprimer" and "Editer" buttons from left to right.
- UPDATE comment form : Reversed the "Supprimer" and "Editer" buttons.
- Put the buttons in a .btn-group div.
- RWD : Added a bottom margin to the "Charger plus de commentaires" button to create a spacing between this button and the "aside" column on the mobile version.
- Added a link to the login page above the comments list.

#### **Accessibility**:

- Added type="submit" to the form button.
- Added method="POST" to the POST Comment form.
- Added method="PUT" to the POST Comment form.
- Inserted different id/name as Textarea arguments depending on the the POST/UPDATE form (#content & #contentToModify) to avoid having same id in the page.

#### **Clean code**:

- **Deleted/commented the useless Symfony files** due to React module:

  - src/Controller/BlogController::commentForm
  - templates/blog/\_comment_form.html.twig
  - src/Controller/BlogController::commentNew
  - blog/comment_form_error.html.twig
  - src/Form/CommentType.php
  - tests/Controller/BlogcontrollerTest::testNewComment

- **Modified the project architecure**:
  - Renamed Comment.jsx into Index.jsx.
  - Cut the Index.jsx into different components files.

#### **Added the React module Testing**:

- Tested all the features manually.
- Coded Unit tests,
- Coded Integration tests using React-Testing-Library.
- Coded E2E tests using Nightwatch.

### Go further - possibilities to work on:

- Redirection after log in instead of the "Acces denied" answer when role is User.
- Loader when loading the comments.
- ...

## Result:
* link to the website
* postpage screenshots below:  

  when the user is not logged in.  

  ![comment-module desktop version by Sandrine Manguy](https://github.com/s-manguy/projects/blob/main/fullstack/comment-module/comment_module_sandrinemanguy_desktop_400.png)  
  
  when the user is logged in.  



![comment-module desktop version when logged_by Sandrine Manguy](https://github.com/s-manguy/projects/blob/main/fullstack/comment-module/comment_module_sandrinemanguy_desktop_logged_400.png)   

  when the user is updating one of his comments.  



![comment-module desktop version by Sandrine Manguy](https://github.com/s-manguy/projects/blob/main/fullstack/comment-module/comment_module_sandrinemanguy_desktop_update_400.png)  

## Interesting links to help to achieve this project:

- Grafikart, [Module de commentaire - partie 1](https://grafikart.fr/tutoriels/module-commentaires-api-platform-1310)
- Grafikart, [Module de commentaire - partie 2](https://grafikart.fr/tutoriels/module-commentaires-react-1311)
- Grafikart, [Découverte d'APIplatform](https://grafikart.fr/formations/api-plaform)
- Grafikart, [Apprendre SQL](https://grafikart.fr/formations/apprendre-sql)
- OpenClassrooms, [Débutez avec React](https://openclassrooms.com/fr/courses/7008001-debutez-avec-react)
- OpenClassrooms, [Créez une application React complète](https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete)
- OpenClassrooms, [Tester vos applications front-end avec javascript](https://openclassrooms.com/fr/courses/7159306-testez-vos-applications-front-end-avec-javascript)

---

## Symfony Demo Application

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/gitpod-io/symfony-demo)

The "Symfony Demo Application" is a reference application created to show how
to develop applications following the [Symfony Best Practices][1].

### Requirements

- PHP 7.2.9 or higher;
- PDO-SQLite PHP extension enabled;
- and the [usual Symfony application requirements][2].

### Installation

[Download Symfony][4] to install the `symfony` binary on your computer and run
this command:

```bash
$ symfony new --demo my_project
```

Alternatively, you can use Composer:

```bash
$ composer create-project symfony/symfony-demo my_project
```

### Usage

There's no need to configure anything to run the application. If you have
[installed Symfony][4] binary, run this command:

```bash
$ cd my_project/
$ symfony serve
```

Then access the application in your browser at the given URL (<https://localhost:8000> by default).

If you don't have the Symfony binary installed, run `php -S localhost:8000 -t public/`
to use the built-in PHP web server or [configure a web server][3] like Nginx or
Apache to run the application.

### Tests

Execute this command to run tests:

```bash
$ cd my_project/
$ ./bin/phpunit
```

[1]: https://symfony.com/doc/current/best_practices.html
[2]: https://symfony.com/doc/current/reference/requirements.html
[3]: https://symfony.com/doc/current/cookbook/configuration/web_server_configuration.html
[4]: https://symfony.com/download
