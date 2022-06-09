<?php
    use \App\Model\PostManager;
    use \App\Model\CommentManager;
    use \App\Model\UserManager;
    use \App\Pagination;
    use \App\Login;

    
    /**
     * Display all the posts/articles 
     * Display the last five articles per page
     * from the most recent to the oldest 
     * 
     *
     * @return void
     */
    function listPosts() {
        $postManager = new PostManager();
        $pagination = new Pagination();

        // Calculate the number of articles to display per page
        $itemsPerPage = 5;
        $pageLinksPerPage = 5;
        $numberOfLinks = $pagination->howManyLinks($pageLinksPerPage);
        $numberOfItems = $postManager->countPosts(); 
        $numberOfPages = $pagination->howManyPages($numberOfItems, $itemsPerPage); 
        $currentPage = $pagination->pageNumber($numberOfPages); 
        $firstItem = $pagination->firstItem($currentPage, $itemsPerPage);
        

        // Get the articles
        $posts = $postManager->findPosts($firstItem, $itemsPerPage);

        // page url basis to pages links
        $urlLink = 'index.php?';

        require('../view/frontend/listPostsView.php');
    }

    
    /**
     * Display ONE specific post 
     * Display the last five comments per page
     * from the oldest to the most recent 
     * 
     *
     * @param  int $postId id of this specific article enclose in a link 
     * @return void
     */
    function post($postId) {
        $postManager = new PostManager(); 
        $commentManager = new CommentManager(); 
        $pagination = new Pagination();
        $post = $postManager->findPost($postId);

        // Calculate the number of comments to display per page
        $numberOfItems = $commentManager->countComments($postId);
        /**
         *  The number of items (articles, comments for example)
         *  can be modified, 
         *  is five by default.
         */
        $itemsPerPage = 5;
        /**
         *  The number of links to  displayed pages
         *  can be modified,
         *  is five by default,
         *  must be uneven.
         */
        $pageLinksPerPage = 5;
        /**
         *  Calculate the number of links on each side of the current page link.
         */
        $numberOfLinks = $pagination->howManyLinks($pageLinksPerPage);
        $numberOfPages = $pagination->howManyPages($numberOfItems, $itemsPerPage);
        $currentPage = $pagination->pageNumber($numberOfPages);
        $firstItem = $pagination->firstItem($currentPage, $itemsPerPage);
        // Get the comments from the database
        $comments = $commentManager->findComments($postId, $firstItem, $itemsPerPage); 

        // page url basis to pages links
        $urlLink = 'index.php?action=post&article=' . $_GET['article'] . '&';

        require('../view/frontend/postView.php'); 
    }

    
    
    /**
     * Display the logginForm
     *
     * @return void
     */
    function logginForm() {
        require('../view/frontend/connectView.php'); 
    }

    
    /**
     * Control whether pseudo and password match one user in the database
     * Control if this user is the administrator
     * Log the user 
     *
     * @param  mixed $pseudo
     * @param  mixed $pass
     * @return void
     */
    function loggin($pseudo, $pass) {
        $user = new UserManager();

        // get user and his hashed password
        $pseudo = htmlspecialchars($pseudo);
        $existingUser = $user->findUser($pseudo);

        if ($existingUser === false ) {
            $alert_connect = 'wrong';
        } else {
            // Compare posted password & hashed password
            $isPasswordCorrect = password_verify($pass, $existingUser['pass']); // send true or false

            if ($isPasswordCorrect) {
                if ($existingUser['rights'] == 'admin') {
                    session_start();
                    $_SESSION['pseudo'] = $pseudo;
                    $_SESSION['pass'] = $existingUser['pass'];
                    $_SESSION['admin'] = "admin";
                    $alert_connect = 'connected';
                } else {
                    session_start();
                    $_SESSION['pseudo'] = $pseudo;
                    $_SESSION['pass'] = $existingUser['pass'];
                    $alert_connect = 'connected';
                }
            } else {
                // Wrong password or pseudo !;
                $alert_connect = 'wrong';
            }
        
            // set automatic connection cookies
            if ($isPasswordCorrect == true && isset($_POST['connection']) && $_POST['connection'] == 'automatic')
            {
                setcookie('login', $pseudo, Time() + 21600, null, null, false, true);
                setcookie('pass_hache',$existingUser['pass'], Time() + 21600, null, null, false, true);
                
                if ($existingUser['rights'] == "admin") {
                    setcookie('admin', $existingUser['rights'], Time() + 21600, null, null, false, true);
                }
            }

            // redirection to the initial article to post comment
            if (isset($_COOKIE['article']) && $alert_connect == 'connected') {
                header('Location: index.php?action=post&article=' . $_COOKIE['article'] . '&alert=' . $alert_connect);
            
            // redirection to the list of articles
            } elseif ($alert_connect == 'connected') {
                header('Location: index.php?connection=' . $alert_connect );
            
            // redirection to the loggin form
            } else {
                header('Location: index.php?action=connect&result=' . $alert_connect );
            }
        }
    }
    
    /**
     * Destroy the user session
     *
     * @return void
     */
    function loggout() {
        session_start();

        // Delete the session
        $_SESSION = array();
        session_destroy();
    
        // Delete the automatic connection cookies
        setcookie('login','');
        setcookie('pass_hache', '');
    
        // Delete the role connection cookies
        setcookie('LOGGED_USER','');
        setcookie('LOGGED_ADMIN','');
    
        // Redirection
        header('Location: index.php?connection=disconnected'); 
    }
    
    /**
     * display the signup form
     *
     * @return void
     */
    function signup() {
        require('../view/frontend/signupView.php'); 
    }
    
    /**
     * Check that every params are valid 
     * before sending to the database UserManager 
     * which will save the newUser and send back alert
     * and send alerts
     *
     * @param  string $pseudo typed by the user
     * @param  string $pass typed by the user
     * @param  string $checkpass typed by the user
     * @param  string $mail typed by the user
     * @param  string $checkmail typed by the user
     * @return void
     */
    function addUser($pseudo, $pass, $checkpass, $mail, $checkmail) {
        $userManager = new UserManager(); 
        
        // Check whether the requested pseudo is available
        $checkedPseudo = $userManager->findPseudo($pseudo);
        if (empty($checkedPseudo)) {
            $pseudo = htmlspecialchars($pseudo);
            $alert_pseudo = 'available';
        } else {
            $alert_pseudo = 'unavailable';
        }

        // Check password
        if (
            isset($_POST['pass']) 
            && isset($_POST['checkpass'])
            && $_POST['pass'] == $_POST['checkpass']
        ) {
            $pass = htmlspecialchars($_POST['pass']);
            $alert_password = 'valid';
        } else {
            $alert_password = 'different';
        }    
    
        // check email
        if (isset($_POST['mail'])) {
            $mail = htmlspecialchars($_POST['mail']);

            /* If no HTML validation */
            $regex_mail = '#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#';
    
            if (preg_match($regex_mail, $mail)) {
                $alert_email = 'valid';
            } else {
                $alert_email = 'invalid';
            }    
        }
     
        if (isset($_POST['checkmail'])) {
            $checkmail = htmlspecialchars($_POST['checkmail']);

            if ($alert_email == 'valid' && $mail == $checkmail) {
                $alert_email = 'valid';
            } else {
                $alert_email = 'different';
            }
        }
 
        /*///////////////////////////*/
        /* Code when no HTML control */
        /*///////////////////////////*/
        // // Check password
        // if (isset($_POST['pass'])) {
        //     $pass = htmlspecialchars($pass);        
        //     if (isset($_POST['checkpass'])) {
        //          $checkpass = htmlspecialchars($checkpass);
        //         if ($pass == $checkpass) {   
        //             $alert_password = 'valid';
        //         } else {
        //             $alert_password = 'different';
        //         }    
        //     } else {
        //         $alert_password = 'missingcheckpass'; 
        //     }
        // } else {
        //     $alert_password = 'missing';
        // }

        // // check email
        // if (isset($_POST['mail'])) {
        //     $mail = htmlspecialchars($mail);
        //     $regex_mail = '#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#';
    
        //     if (preg_match($regex_mail, $mail)) {
        //         $alert_email = 'valid';
        //     } else {
        //         $alert_email = 'invalid';
        //     }    
        // } else {
        //     $alert_email = 'missing';
        // }
     
        // if (isset($_POST['checkmail'])) { 
        //     $checkmail = htmlspecialchars($checkmail);
        //     if ($alert_email == 'valid' && $mail == $checkmail) {
        //         $alert_email = 'valid';
        //     } else {
        //         $alert_email = 'different';
        //     }
        // } else {
        //     $alert_email = 'missingcheckmail'; 
        // }
        
        // valid data
        if (
            $alert_pseudo == "available" && 
            $alert_password == 'valid' && 
            $alert_email == 'valid'
        ) {
            // hash password
            $passHash = password_hash($pass, PASSWORD_DEFAULT);
     
            // insert the new user in the database
            $newUser = $userManager->postUser($pseudo, $passHash, $mail);
             
            if ($newUser === false) {
                throw new Exception('Impossible d\'ajouter un nouvel utilisateur !');    
            } else {
                header('Location: index.php?action=signup&signup=ok&pseudo=' . $pseudo);
            }

        // invalid data
        } else {
            header('Location: index.php?action=signup&pseudo=' . $alert_pseudo . '&password=' . $alert_password . '&email=' . $alert_email);
        }
    }

    
    /**
     * Display to the contact form
     *
     * @return void
     */
    function contact() {
        require('../view/frontend/contactView.php'); 
    }
    
    /**
     * Display the sent informations from the visitor to the contact team
     *
     * @param  string $surname
     * @param  string $firstname
     * @param  string $email
     * @param  string $message
     * @return void
     */
    function contactResponse($surname, $firstname, $email, $message) {
        $surname = htmlspecialchars($surname);
        $firstname = htmlspecialchars($firstname);
        $email = htmlspecialchars($email);
        $message = htmlspecialchars($message);

        require('../view/frontend/contactSubmitView.php'); 
    }
?>