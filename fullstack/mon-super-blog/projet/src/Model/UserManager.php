<?php
    declare(strict_types=1);

    namespace App\Model;
    require_once('Manager.php');


class UserManager extends Manager {
    
    /**
     * Check if one given pseudo exist in the users table in the database
     *
     * @param  string $pseudo is the given pseudo
     * @return  
     */
    function findPseudo($pseudo) 
    { 
        $db = $this->dbConnect();

        $isPseudo = $db->prepare('SELECT pseudo FROM users WHERE pseudo = ?');
        $isPseudo->execute(array($pseudo));
        $checkedPseudo = $isPseudo->fetch();
        $isPseudo->closeCursor();

        return $checkedPseudo;
    }
    
    /**
     * post a new user in the users table of database 
     *
     * @param  string $pseudo 
     * @param  string $pass is the hash password
     * @param  string $email
     * @return bool depending on the request achievement 
     */
    function postUser($pseudo, $pass, $email) :bool
    {
        $db = $this->dbConnect();

        $insertUser = $db->prepare('INSERT INTO users(pseudo, pass, email, inscription_date) VALUES(?, ?, ?, CURDATE())');
        $newUser = $insertUser->execute(array($pseudo, $pass, $email));
        $insertUser->closeCursor();

        return $newUser;
    }
    
    /**
     * get ONE specific user from the database
     *
     * @param  string $pseudo of the specific looked for user
     * @return array containing all the user's fields except email 
     */
    function findUser($pseudo) :array
    {
        $db = $this->dbConnect();

        $user = $db->prepare('SELECT id, pseudo, pass, rights FROM users WHERE pseudo = ?');
        $user->execute(array($pseudo));
        $checkedUser = $user->fetch(); // only one result expected
        // $user->closeCursor;

        return $checkedUser;
    }
}