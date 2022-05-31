module.exports = {
  // 'Display the comments when user is not connected': (browser) => {
  //   browser
  //     // the user arrives on the latest post page
  //     .url(
  //       'http://localhost:8000/fr/blog/posts/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit'
  //     )
  //     .waitForElementVisible('body')
  //     .assert.titleContains('Symfony Demo application')
  //     .assert.visible('h1')
  //     .execute('scrollTo(0,3000)')
  //     // comments
  //     .assert.visible('post-comments')
  //     .assert.visible('h3')
  //     .assert.textContains('h3', '28 Commentaires')
  //     // the link to the login page should be displayed
  //     .assert.visible('#post-connect')
  //     .assert.elementsCount('post-comments div div.post-comment', 2)
  //     .execute('scrollTo(0,6000)')
  //     .assert.visible('post-comments div button')
  //     .click('post-comments div button')
  //     .waitForElementVisible('post-comments div div.post-comment')
  //     .assert.elementsCount('post-comments div div.post-comment', 4)
  //     .assert.visible('post-comments div button')
  //     .assert.visible('footer')
  //     .end()
  // },

  // 'Display the comments when user is connected': (browser) => {
  //   browser
  //     // log the user
  //     .url('http://localhost:8000/fr/login')
  //     .waitForElementVisible('body')
  //     .assert.visible('form')
  //     .setValue('#username', 'john_user')
  //     .setValue('#password', 'kitten')
  //     ///////// other selector !
  //     .assert.visible('button[type=submit]')
  //     .click('button[type=submit]')
  //     .waitForElementVisible('body')
  //     // redirect to the home page
  //     .url('http://localhost:8000/fr')
  //     .waitForElementVisible('body')
  //     ///// other !
  //     .assert.visible('div.row div div.jumbotron:last-child a')
  //     .assert.textContains(
  //       'div.row div div.jumbotron:last-child a',
  //       "Naviguer sur l'application"
  //     )
  //     .click('div.row div div.jumbotron:last-child a')
  //     // redirect to the posts list
  //     .waitForElementVisible('body')
  //     // redirect to the latest post
  //     .assert.visible(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
  //     )
  //     .assert.textContains(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a',
  //       'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  //     )
  //     .click(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
  //     )
  //     .waitForElementVisible('body')
  //     .assert.visible('h1')
  //     .assert.textContains(
  //       'h1',
  //       'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  //     )
  //     .execute('scrollTo(0,3000)')
  //     .assert.visible('post-comments')
  //     .assert.visible('h3')
  //     .assert.textContains('h3', '28 Commentaires')
  //     // the form to post a comment should be displayed
  //     .assert.visible('legend')
  //     .assert.visible(
  //       'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary[type=submit]'
  //     )
  //     // the two latest comments should be displayed
  //     .assert.elementsCount('post-comments div div.post-comment', 2)
  //     .execute('scrollTo(0,6000)')
  //     .assert.visible('post-comments div button')
  //     .click('post-comments div button')
  //     .waitForElementVisible('post-comments div div.post-comment')
  //     // .assert.elementsCount('post-comments div div.post-comment', 4)
  //     .assert.visible('post-comments div button')
  //     .assert.visible('footer')
  //     // // Add a comment
  //     // .setValue('#content', 'Commentaire ajouté')
  //     // // .assert.textContains('#content', 'Commentaire ajouté')
  //     // .click(
  //     //   'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary i.fa.fa-paper-plane'
  //     // )
  //     // .waitForElementVisible('post-comments')
  //     // .assert.textContains('#content', '')
  //     // .assert.elementsCount('post-comments div div.post-comment', 3)
  //     // display two more comments
  //     .end()
  // },

  // 'Add a comment': (browser) => {
  //   browser
  //     .url(
  //       'http://localhost:8000/fr/blog/posts/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit'
  //     )
  //     .waitForElementVisible('body')
  //     .assert.titleContains('Symfony Demo application')
  //     .assert.visible('h1')
  //     .execute('scrollTo(0,3000)')
  //     // comments
  //     .assert.visible('post-comments')
  //     .assert.visible('h3')
  //     .assert.textContains('h3', '28 Commentaires')
  //     // the link to the login page should be displayed
  //     .assert.visible('#post-connect')
  //     .click('#post-connect')
  //     // redirect to the login page
  //     .waitForElementVisible('body')
  //     .assert.visible('form')
  //     .setValue('#username', 'john_user')
  //     .setValue('#password', 'kitten')
  //     .assert.visible('button[type=submit]')
  //     .click('button[type=submit]')
  //     .waitForElementVisible('body')
  //     // redirect to the home page
  //     .url('http://localhost:8000/fr')
  //     .waitForElementVisible('body')
  //     .assert.visible('div.row div div.jumbotron:last-child a')
  //     .assert.textContains(
  //       'div.row div div.jumbotron:last-child a',
  //       "Naviguer sur l'application"
  //     )
  //     .click('div.row div div.jumbotron:last-child a')
  //     // redirect to the posts list
  //     .waitForElementVisible('body')
  //     // redirect to the latest post
  //     .assert.visible(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
  //     )
  //     .assert.textContains(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a',
  //       'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  //     )
  //     .click(
  //       'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
  //     )
  //     .waitForElementVisible('body')
  //     .assert.visible('h1')
  //     .assert.textContains(
  //       'h1',
  //       'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  //     )
  //     .execute('scrollTo(0,3000)')
  //     .assert.visible('post-comments')
  //     .assert.visible('h3')
  //     .assert.textContains('h3', '28 Commentaires')
  //     // the form to post a comment should be displayed
  //     .assert.visible('legend')
  //     .assert.visible(
  //       'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary[type=submit]'
  //     )
  //     // // Add a comment
  //     .setValue('#content', 'Commentaire ajouté')
  //     // .assert.textContains('#content', 'Commentaire ajouté')
  //     .execute('scrollTo(0,4000)')
  //     .click(
  //       'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary i.fa.fa-paper-plane'
  //     )
  //     .waitForElementVisible('post-comments')
  //     .assert.textContains('#content', '')
  //     .assert.elementsCount('post-comments div div.post-comment', 3)
  //     .end()
  // },

  'Post then delete a comment': (browser) => {
    browser
      ////////////////////
      /* is on the post */
      ////////////////////

      // the user arrives on the latest post page
      .url(
        'http://localhost:8000/fr/blog/posts/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit'
      )
      .waitForElementVisible('body')
      .assert.titleContains('Symfony Demo application')
      .assert.visible('h1')
      // scrolls to the end of the page to look for the comments
      .execute('scrollTo(0,3000)')
      // the comments are loaded
      .assert.visible('post-comments')
      .assert.visible('h3')
      .assert.textContains('h3', '18 Commentaires')
      // the link to the login page should be displayed
      .assert.visible('#post-connect')
      // two comments are displayed
      .assert.elementsCount('post-comments div div.post-comment', 2)
      .execute('scrollTo(0,6000)')
      .assert.visible('post-comments div button')
      // loads 2 more comments
      .click('post-comments div button')
      .waitForElementVisible('post-comments div div.post-comment')
      .assert.elementsCount('post-comments div div.post-comment', 4)
      .assert.visible('post-comments div button')
      .assert.visible('footer')

      /////////////
      /* Logs in */
      /////////////

      // scrolls back
      .execute('scrollTo(0,4000)')
      .assert.visible('#post-connect')
      .click('#post-connect')
      // is redirected to the login page
      .waitForElementVisible('body')
      .assert.visible('form')
      // fills the login form
      .setValue('#username', 'john_user')
      .setValue('#password', 'kitten')
      .assert.visible('button[type=submit]')
      .click('button[type=submit]')
      // is redirected to the admin page 'acces denied' because has user_role only
      .waitForElementVisible('body')

      ///////////////////////////
      /* Goes back to the post */
      ///////////////////////////

      // goes to the blog home page
      .url('http://localhost:8000/fr')
      .waitForElementVisible('body')
      .assert.visible('div.row div div.jumbotron:last-child a')
      .assert.textContains(
        'div.row div div.jumbotron:last-child a',
        "Naviguer sur l'application"
      )
      // chooses to go to navigate on the blog
      .click('div.row div div.jumbotron:last-child a')
      // arrives on the posts list
      .waitForElementVisible('body')
      // chooses to read the latest post
      .assert.visible(
        'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
      )
      .assert.textContains(
        'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit'
      )
      .click(
        'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
      )
      // arrives on the latest post page
      .waitForElementVisible('body')
      .assert.visible('h1')
      .assert.textContains(
        'h1',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit'
      )
      .execute('scrollTo(0,3000)')
      .assert.visible('post-comments')
      .assert.visible('h3')
      .assert.textContains('h3', '18 Commentaires')
      // the form to post a comment should be displayed
      .assert.visible('legend')
      .assert.visible(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary[type=submit]'
      )

      ////////////////////
      /* Adds a comment */
      ////////////////////

      // writes the comment
      .setValue('#content', 'Commentaire ajouté, à modifier')
      .execute('scrollTo(0,4000)')
      // submits the comment
      .click(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary i.fa.fa-paper-plane'
      )
      .waitForElementVisible('post-comments')
      // the post comment form is reset
      .assert.textContains('#content', '')
      // the just created comment is displayed as the first comment
      .assert.textContains(
        'post-comments div div.post-comment',
        'Commentaire ajouté, à modifier'
      )
      .assert.elementsCount('post-comments div div.post-comment', 3)

      ///////////////////////////
      /* Modifies his comments */
      ///////////////////////////
      .assert.visible(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
      )
      .assert.textContains(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1',
        'Editer'
      )
      .click(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
      )
      .execute('scrollTo(0,6000)')
      // the UPDATE comment form is displayed in place of the comment text
      .assert.elementPresent(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well'
      )
      .assert.visible(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control'
      )
      // the comment content is already displayed in the textarea
      .assert.value(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
        'Commentaire ajouté, à modifier'
      )
      // modifies the comment content
      .setValue(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
        'Commentaire modifié, à supprimer'
      )
      // submit the updated comment
      .click(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-primary'
      )
      // the comment is displayed as the top of the comments list
      .waitForElementVisible(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment'
      )
      .assert.textContains(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment',
        'Commentaire modifié, à supprimer'
      )

      ///////////////////////////
      /* Deletes his comments */
      ///////////////////////////
      .assert.visible(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1'
      )
      .assert.textContains(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1',
        'Supprimer'
      )
      .click(
        'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1'
      )

      //////////////
      /* Logs out */
      //////////////

      // scrolls up to the navbar
      .execute('scrollTo(0,0)')
      // looks for the log out link
      .assert.visible('#user')
      .click('#user')
      .assert.textContains(
        'html body#blog_post_show header div.navbar.navbar-default.navbar-static-top div.container div.navbar-collapse.collapse ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu.user li:last-child a',
        'Déconnexion'
      )
      // logs out
      .click(
        'html body#blog_post_show header div.navbar.navbar-default.navbar-static-top div.container div.navbar-collapse.collapse ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu.user li:last-child a'
      )
      // is redirected to the application home page
      .waitForElementVisible('body')
      .assert.visible('h1')
      .assert.textContains('h1', "Bienvenue sur l'application Symfony Demo")
      .end()
  },

  'Write a comment with error, cancel the updating then update the comment with error, delete it':
    (browser) => {
      browser
        // the user goes to the blog home page
        .url('http://localhost:8000/fr')
        // first of all, he must log in
        .waitForElementVisible('body')
        .assert.visible(
          'html body#homepage div.container.body-container div.row div.col-sm-6:nth-child(2) div.jumbotron p a.btn.btn-primary.btn-lg[href="/fr/admin/post/"]'
        )
        .click(
          'html body#homepage div.container.body-container div.row div.col-sm-6:nth-child(2) div.jumbotron p a.btn.btn-primary.btn-lg'
        )
        // is redirected to the login page
        .waitForElementVisible('body')
        .assert.visible('form')
        // fills the login form
        .setValue('#username', 'john_user')
        .setValue('#password', 'kitten')
        .assert.visible('button[type=submit]')
        .click('button[type=submit]')
        // is redirected to the admin page 'acces denied' because has user_role only
        .waitForElementVisible('body')
        // goes to the blog home page
        .url('http://localhost:8000/fr')
        .waitForElementVisible('body')
        .assert.visible('div.row div div.jumbotron:last-child a')
        .assert.textContains(
          'div.row div div.jumbotron:last-child a',
          "Naviguer sur l'application"
        )
        // chooses to go to navigate on the blog
        .click('div.row div div.jumbotron:last-child a')
        // arrives on the posts list
        .waitForElementVisible('body')
        // chooses to read the latest post
        .assert.visible(
          'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
        )
        .assert.textContains(
          'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a',
          'Lorem ipsum dolor sit amet consectetur adipiscing elit'
        )
        .click(
          'html body#blog_index div.container.body-container div.row div#main.col-sm-9 article.post h2 a'
        )
        // arrives on the latest post page
        .waitForElementVisible('body')
        .assert.visible('h1')
        .assert.textContains(
          'h1',
          'Lorem ipsum dolor sit amet consectetur adipiscing elit'
        )
        .execute('scrollTo(0,4000)')
        .assert.visible('post-comments')
        // the form to post a comment should be displayed
        .assert.visible('legend')
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary[type=submit]'
        )
        // writes the comment
        .setValue('#content', '1234')
        .execute('scrollTo(0,5000)')
        // submits the comment
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary i.fa.fa-paper-plane'
        )
        // receives the error message
        .assert.value('#content', '1234')
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment'
        )
        .assert.not.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 p',
          '1234'
        )
        .assert.visible('#content:invalid')
        .setValue('#content', '12345')
        // the error message has disappeared
        .assert.not.elementPresent('#content:invalid')
        // submits the corrected comment
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.well form fieldset div.btn-group.pull-right button.btn.btn-primary i.fa.fa-paper-plane'
        )
        // the comment is inserted at the top of the comments list
        .waitForElementVisible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 p'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 p',
          '12345'
        )
        // as the user is the author the buttons to delete and edit the comment are displayed
        .assert.elementPresent(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1',
          'Editer'
        )
        // wants to modify his last comment
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
        )
        .execute('scrollTo(0,6000)')
        // the UPDATE comment form is displayed in place of the comment text
        .assert.elementPresent(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control'
        )
        // the comment content is already displayed in the textarea
        .assert.value(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
          '12345'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-secondary'
        )
        // decides not to modify the comment
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-secondary',
          'Annuler'
        )
        .execute('scrollTo(0,8000)')
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-secondary'
        )
        // changes mind
        .waitForElementVisible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 p'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 p',
          '12345'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1',
          'Editer'
        )
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-secondary.ml-1'
        )
        // the UPDATE form is displayed in place of the comment content
        .assert.elementPresent(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control'
        )
        // the comment content is displayed in the textarea
        .assert.value(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
          '12345'
        )
        // modifies the comment content
        .setValue(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
          'ab'
        )
        // submit the updated comment
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-primary'
        )
        // error is displayed because the content is too short
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control:invalid'
        )
        // modifies the typing
        .setValue(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.form-group textarea#contentToModify.form-control',
          'abcde'
        )
        // submits the updated comment
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.well form fieldset div.btn-group.pull-right button.btn.btn-primary'
        )
        // the comment is displayed as the first of the comments list
        .waitForElementVisible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment',
          'abcde'
        )
        // deletes his just updated comment
        .assert.elementPresent(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right'
        )
        .assert.visible(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1'
        )
        .assert.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1',
          'Supprimer'
        )
        .click(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment div.col-sm-9 div.btn-group.pull-right button.btn.btn-danger.ml-1'
        )
        // the comment is not displayed anymore
        .assert.elementPresent(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment'
        )
        .assert.not.textContains(
          'html body#blog_post_show div.container.body-container div.row div#main.col-sm-9 post-comments div div.row.post-comment',
          'abcde'
        )
    },
}
