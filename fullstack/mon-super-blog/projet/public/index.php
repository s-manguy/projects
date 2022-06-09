<?php
    require('../controller/frontend.php');
    require('../controller/backend.php');

    spl_autoload_register(static function(string $fqcn) {
        $root = '../';
        $path = $root . sprintf('%s.php', str_replace(['App', '\\'], ['src', '/'], $fqcn));

        require_once ($path);
    });

    // require_once('../src/Model/Manager.php');
    // require_once('../src/Model/PostManager.php');
    // require_once('../src/Model/CommentManager.php');
    // require_once('../src/Model/UserManager.php');
    // require_once('../src/Pagination.php');

    use src\Model\Manager;
    use src\Model\PostManager;
    use src\Model\CommentManager;
    use src\Model\UserManager;
    use src\Pagination;
    use src\Login;


    try {
        if (isset($_GET['action'])) {
            
            /////////////////////
            ///// FRONT END /////
            /////////////////////

            ///// Home /////
            if ($_GET['action'] == 'listPosts') {
                listPosts();
    
            ///// Read Article & its comments /////
            } elseif ($_GET['action'] == 'post') {
                //!!!!!!! ajouter si article > nb articles !!!!!!!!!!!!!!
                if (isset($_GET['article']) && $_GET['article'] > 0) {
                    post($_GET['article']);
                } else {
                    throw new Exception('L\'article demandé n\'existe pas.');
                }
            
            ///// Log in - Log out /////
            } else if ($_GET['action'] == 'connect') {
                logginForm();

            } else if ($_GET['action'] == 'postConnect') {
                if (isset($_POST['pseudo']) && isset($_POST['pass'])) { 
                    loggin($_POST['pseudo'], $_POST['pass']);
                } else {
                    throw new Exception('Il faut remplir tous les champs.');
                }

            } else if ($_GET['action'] == 'disconnect') {
                loggout();

            ///// Sign up /////
            } else if ($_GET['action'] == 'signup') {
                signup();

            } else if ($_GET['action'] == 'signup_post') {
                // The fields for pseudo, password, checkpassword, email & checkmail are required in HTML but double check !
                if (isset($_POST['pseudo']) && isset($_POST['pass']) && isset($_POST['checkpass']) && isset($_POST['mail']) && isset($_POST['checkmail']) ) {
                    addUser($_POST['pseudo'], $_POST['pass'], $_POST['checkpass'], $_POST['mail'], $_POST['checkmail']);
                
                } else {
                    throw new Exception('Il faut remplir tous les champs');
                }

            ///// Contact /////
            } else if ($_GET['action'] == 'contact') {
                contact();

            } else if ($_GET['action'] == 'contact_submit') {
                // All the fields are required in HTML but double check !
                if (
                    isset($_POST['surname']) && $_POST['surname'] != NULL &&
                    isset($_POST['firstname']) && $_POST['firstname'] != NULL && 
                    isset($_POST['email']) && $_POST['email'] != NULL &&
                    isset($_POST['message']) && $_POST['message'] != NULL
                ) {
                    contactResponse($_POST['surname'], $_POST['firstname'], $_POST['email'], $_POST['message']);
                
                } else {
                    header('Location: index.php?action=contact&alert=missing');
                }

            ////////////////////    
            ///// BACK END /////
            ////////////////////

            ///// Create article /////
            } elseif ($_GET['action'] == 'addPost') {
                session_start();
                // User must be logged !
                 if (isset($_SESSION['admin'])) {
                    addArticleForm();

                } else {
                    throw new Exception('Il faut être administrateur pour pouvoir ajouter un article.');
                }

            } elseif ($_GET['action'] == 'create_post') {
                if (isset($_POST['title']) && isset($_POST['content'])) {
                    addArticle($_POST['title'], $_POST['content']);
                } 
                else
                {
                    throw new Exception('Impossible d\'ajouter un article.');
                }
            
            ///// Update Article /////
            } elseif ($_GET['action'] == 'updatePost') {
                session_start();
                // User must be logged !
                if (isset($_SESSION['admin'])) {
                    if (isset($_GET['article']) && $_GET['article'] > 0) {
                        updateArticleForm($_GET['article']);
                    }else {
                        throw new Exception('Sélectionnez un article à modifier.');
                    }
                } else {
                    throw new Exception('Il faut être administrateur pour pouvoir modifier un article.');
                }

            } elseif ($_GET['action'] == 'update_post') {
                session_start();
                // User must be logged !
                if (isset($_SESSION['admin'])) {
                    if (isset($_POST['article_id']) && 
                        $_POST['article_id'] > 0 &&
                        isset($_POST['title']) && 
                        isset($_POST['content'])
                    ) {
                        updateArticle($_POST['article_id'], $_POST['title'], $_POST['content']);
                    } else {
                        throw new Exception('Sélectionnez un article à modifier.');
                    }
                    
                } else {
                    throw new Exception('Il faut être administrateur pour pouvoir modifier un article.');
                }

            ///// Delete Article /////
            } elseif ($_GET['action'] == 'deletePost') {
                session_start();

                // User must be logged !
                if (isset($_SESSION['admin'])) {
                    if (isset($_GET['article']) && $_GET['article'] > 0) {
                        articleToDelete($_GET['article']);
                    } else {
                        throw new Exception('Sélectionnez un article à modifier.');
                    }
                    
                } else {
                    throw new Exception('Il faut être administrateur pour pouvoir supprimer un article.');
                }

            } elseif ($_GET['action'] == 'confirm_delete') {
                session_start();
                // User must be logged !
                if (isset($_SESSION['admin'])) {
                    if (
                        isset($_GET['article']) && isset($_GET['title'])
                        && $_GET['article'] > 0
                    ) {
                        confirmedRemoval($_GET['article'], $_GET['title']);
                    } else {
                        throw new Exception('Sélectionnez un article à modifier.');
                    }
                
                } else {
                    throw new Exception('Il faut être administrateur pour pouvoir supprimer un article.');
                }


            ///// Add comment /////
            } elseif ($_GET['action'] == 'addComment') {
                // User must be logged !
                session_start();
                if(
                    (isset($_SESSION['pseudo']) && isset($_SESSION['pass'])) || (isset($_COOKIE['pseudo']) && isset($_COOKIE['pass_hache']))) {
                    // the field postId is hidden in HTML5 but double check !
                    if (isset($_POST['nb_article']) && $_POST['nb_article'] > 0) {
                        // the fields auteur and commentaire are required in HTML5 but double check !
                        if (!empty($_POST['author']) && !empty($_POST['comment'])) {
                            $commentAuthor = htmlspecialchars($_POST['author']);
                            $commentText = htmlspecialchars($_POST['comment']);

                            addComment($_POST['nb_article'], $commentAuthor, $commentText);

                        } else {
                            $alert = 'missing';
                            header('Location: index.php?action=post&article=' . $_POST['nb_article'] . '&alert=' . $alert);
                        }  

                    } else {
                        throw new Exception('Aucun identifiant de billet envoyé');
                    }

                } elseif (isset($_POST['nb_article']) && $_POST['nb_article'] > 0) {
                    header('Location: index.php?action=connect&article=' . $_POST['nb_article']);

                } else {

                    throw new Exception('Il faut être connecté pour envoyer un commentaire');
                }

            ///// Update comment /////
            } elseif ($_GET['action'] == 'updateComment') {
                session_start();

                // User must be logged !
                if (
                    (
                        (isset($_GET['author']) && $_GET['author'] == $_SESSION['pseudo'])
                        || isset($_SESSION['admin'])
                    ) 
                    && 
                    (
                        (isset($_SESSION['pseudo']) && isset($_SESSION['pass']))
                        || (isset($_COOKIE['pseudo']) && isset($_COOKIE['pass_hache']))
                    )
                ) {
                    if (isset($_GET['article']) 
                        && isset($_GET['comment'])
                        && $_GET['article'] > 0
                        && $_GET['comment'] > 0
                    ) {
                        commentToUpdate($_GET['article'], $_GET['comment']);
                    } else {
                        throw new Exception('Aucun identifiant de billet et/ou de commentaire envoyé(s)');
                    }

                } else {
                    throw new Exception('Il faut être administrateur ou l\'auteur d\'un commentaire pour pouvoir le modifier');
                }

            } elseif ($_GET['action'] == 'update_comment') {
                session_start();
                if (isset($_POST['article_id']) 
                    && $_POST['article_id'] > 0 
                    && isset($_POST['comment_id']) 
                    && $_POST['comment_id'] > 0  
                    && isset($_POST['author'])  
                    && isset($_POST['content'])
                ) {
                    $modifiedContent = htmlspecialchars($_POST['content']);
                    $author = htmlspecialchars($_POST['author']);

                    updateComment($_POST['article_id'], $_POST['comment_id'], $_POST['author'], $modifiedContent);
                } else {
                    echo ($_POST['article_id'] . ' ' . $_POST['comment_id'] . ' ' . $_POST['author'] .  ' ' . $_POST['content'] );
                    // throw new Exception('Sélectionnez un commentaire à modifier.');
                }


            ///// Delete Comment /////
            } elseif ($_GET['action'] == 'deleteComment') {
                session_start();

                // User must be logged !
                if ((isset($_GET['author']) && $_GET['author'] == $_SESSION['pseudo'])
                    || isset($_SESSION['admin']) 
                ) {
                    if (isset($_GET['article']) 
                        && isset($_GET['comment'])
                        && $_GET['article'] > 0
                        && $_GET['comment'] > 0
                        ) {
                        commentToDelete($_GET['article'], $_GET['comment']);

                    } else {
                        throw new Exception('Sélectionnez un commentaire à modifier.');
                    }
                } else {
                    throw new Exception('Il faut être administrateur ou auteur du commentaire pour pouvoir supprimer un article.');
                }

            } elseif ($_GET['action'] == 'confirmed_deleteComment') {
                session_start();

                // User must be logged !
                if (
                    (isset($_GET['author']) && $_GET['author'] == $_SESSION['pseudo'])
                    || isset($_SESSION['admin'])  
                ) {
                    if (isset($_GET['article']) 
                        && isset($_GET['comment'])
                        && $_GET['article'] > 0
                        && $_GET['comment'] > 0
                        ) {
                        removeComment($_GET['article'], $_GET['comment']);
                    } else {
                        throw new Exception('Le commentaire ne peut pas être supprimé.');
                    }
                } else {
                    throw new Exception('Il faut être administrateur ou auteur du commentaire pour pouvoir supprimer un article.');
                }
            }
    
        // default page
        } else { 
            listPosts();
        }
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
        /// !!!!!!!!!!!!! CREER LA PAGE !!!!!!!!!!!! ///
        // require('view/errorView.php');
    }

    

?>