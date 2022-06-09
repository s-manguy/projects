<?php
    declare(strict_types=1);

    namespace App\Model;
    require_once('Manager.php');

    final class PostManager extends Manager
    {    
        /**
         * Give the number of the posts saved in the database
         *
         * @return string 
         */
        public function countPosts(): string
        {
            $_db = $this->dbConnect();

            $articlesNumber = $_db->query('SELECT COUNT(id) AS number_articles FROM articles');
            $data = $articlesNumber->fetch();
            $numberOfItems = $data['number_articles'];
            $articlesNumber->closeCursor();

            return $numberOfItems;
        }
        
                
        /**
         * Get all the posts from the database
         *
         * @param  int $firstItem represents the first post to dipslay on the page
         * @param  int $itemsPerPage
         * @return object containing all the fields of every posts
         */
        public function findPosts(int $firstItem, int $itemsPerPage): object 
        {
            $db = $this->dbConnect();

            $getArticles = $db->query('SELECT id, title, content, DATE_FORMAT(creation_date, \'%d/%m/%Y à %Hh%imin%ss\') AS creation_date_fr, DATE_FORMAT(modification_date, \'%d/%m/%Y à %Hh%imin%ss\') AS modification_date_fr FROM articles ORDER BY creation_date DESC LIMIT ' . $firstItem .', ' . $itemsPerPage );

            return $getArticles;
        }
        
        /**
         * get ONE specific post from the database
         *
         * @param  int $postId is the id of the specific post
         * @return array containing all the fields of this post
         */
        public function findPost(int $postId): array 
        { 
            $db = $this->dbConnect();

            $getArticle = $db->prepare('SELECT id, title, content, DATE_FORMAT(creation_date, \'%d/%m/%Y à  %Hh%imin%ss\') AS creation_date_fr, DATE_FORMAT(modification_date, \'%d/%m/%Y à  %Hh%imin%ss\') AS modification_date_fr FROM articles WHERE id = ?');
            $getArticle->execute(array($postId));
            $post = $getArticle->fetch();

            return $post;
        }
        
        /**
         * get the last article posted in the database
         *
         * @return array containing all the fields of this specific post
         */
        public function findLastPost(): array 
        {
            $db = $this->dbConnect();

            $articleId = $db->query('SELECT id, title FROM articles ORDER BY id DESC');
            $lastPost = $articleId->fetch();
            // $lastPost = $data[0];

            return $lastPost;
        }
        
        /**
         * post ONE article in the database
         *
         * @param  string $title is the title of the article
         * @param  string $content is the article body text 
         * @return bool depending on the achievement of the query
         */
        function postArticle(string $title, string $content): bool 
        {
            $db = $this->dbConnect();

            $article = $db->prepare('INSERT INTO articles(title, content, creation_date) VALUES(?, ?, NOW())');
            $affectedLines = $article->execute(array($title, $content));

            return $affectedLines;
        }
        
        /**
         * Get one specific article and modify the fields as indicated
         *
         * @param  int $postId id of the article to modify
         * @param  string $modifiedTitle is the new title text to replace the previous one
         * @param  string $modifiedContent is the new article body text to replace the previous one
         * @return bool depending on the achievement of the updating
         */
        public function updatedArticle(int $postId, string $modifiedTitle, string $modifiedContent): bool 
        {
            $db = $this->dbConnect();

            $updatePost = $db->prepare('UPDATE articles SET title = ?, content = ?, modification_date = NOW() WHERE Id = ?');
            $updatedPost = $updatePost->execute(array($modifiedTitle, $modifiedContent, $postId));
            if ($updatedPost === false) {
                throw new \Exception("Impossible de modifier l'enregistrement $postId dans la table {$this->table}");
            }
            return $updatedPost;
        }

        // public function updatedArticle(Articles $post): bool 
        // {
        //     $db = $this->dbConnect();

        //     $updatePost = $db->prepare("UPDATE {$this->table} SET title = :title, content = :content, modification_date = NOW() WHERE Id = :id");
        //     $updatedPost = $updatePost->execute([
        //         'title' => $post->getTitle(),
        //         'content' => $post->getContent(),
        //         'id' => $post->getId()
        //     ]);
        //     if ($updatedPost === false) {
        //         throw new \Exception("Impossible de modifier l'enregistrement $postId dans la table {$this->table}");
        //     }
        //     return $updatedPost;
        // }
        
        /**
         * Get and delete ONE specific post/article from the database
         * Throw an Exception if the post cannot be deleted
         *
         * @param  int $postId is the id of the specific article
         * @return bool depending on the achievement of the deletion
         */
        function deletePost(int $postId): bool 
        {
            $db = $this->dbConnect();

            $deleteArticle = $db->prepare('DELETE FROM articles WHERE id = ?');
            $deletedArticle = $deleteArticle->execute(array($postId));
            if ($deletedArticle === false) {
                throw new \Exception("Impossible de supprimer l'enregistrement $postId dans la table {$this->table}");
            }
            return $deletedArticle;
        }
    }

?>