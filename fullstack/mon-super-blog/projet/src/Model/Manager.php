<?php
    declare(strict_types=1);

    namespace App\Model;
    use \PDO;

    abstract class Manager
    {
        private const MYSQL_HOST = 'localhost';
        private const MYSQL_NAME = 'your_own_database_name';// replace by yours
        // private const MYSQL_PORT = 3306;
        private const MYSQL_USER = 'your_own_username';// replace by yours
        private const MYSQL_PASSWORD = 'your_own_password';// replace by yours
        
        /**
         * connect to the mysql database
         *
         * @return void
         */
        protected function dbConnect() // could be named getPDO
        { 
            // other possibility : public static 
            // in that case refer to the function this way in the other files :
            // $db = Manager::dbConnect 
            
            // $mysqlClient = new PDO(
            //     sprintf('mysql:host=%s;dbname=%s;port=%s;charset=utf8;', MYSQL_HOST, MYSQL_NAME, MYSQL_PORT),
            //     MYSQL_USER,
            //     MYSQL_PASSWORD
            // );

            $db = new PDO(
                sprintf('mysql:host=%s;dbname=%s;charset=utf8', self::MYSQL_HOST, self::MYSQL_NAME),
                self::MYSQL_USER,
                self::MYSQL_PASSWORD
            );
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $db;
        }
    }

