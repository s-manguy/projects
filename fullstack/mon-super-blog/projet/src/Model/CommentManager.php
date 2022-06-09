<?php
    declare(strict_types=1);

    namespace App\Model;
    require_once('Manager.php');

    final class CommentManager extends Manager
    {        
        /**
         * Count how many comments are in the database for a specific post id 
         *
         * @param  int $postId
         * @return string representing the number of entries (items)
         */
        public function countComments(int $postId): string 
        {
            $db = $this->dbConnect();
            $howManyComments = $db->prepare('SELECT COUNT(id) AS number_comments FROM comments where article_id = ?');
            $howManyComments->execute(array($postId));
            $data = $howManyComments->fetch();
            $numberOfComments = $data['number_comments'];
            $howManyComments->closeCursor();

            return $numberOfComments;
        }
                
        /**
         * Get comments for a specific post id from the database
         *
         * @param  int $postId
         * @param  int $firstItem to display on the page
         * @param  int $itemsPerPage
         * @return object containing all the fields for every entries
         */
        public function findComments(int $postId, int $firstItem, int $itemsPerPage): object 
        { 
            $db = $this->dbConnect();

            $comments = $db->prepare('SELECT id, article_id, author, comment, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin%ss\') AS comment_date_fr, DATE_FORMAT(modification_date, \'%d/%m/%Y à %Hh%imin%ss\') AS modification_date_fr FROM comments WHERE article_id = ? ORDER BY comment_date LIMIT ' . $firstItem . ', ' . $itemsPerPage);
            $comments->execute(array($postId));

            return $comments;
        }
        
        /**
         * Get one specific comment from the database
         *
         * @param  int $commentId
         * @return array of all the fields of the specific entry 
         */
        public function findComment(int $commentId): array 
        {
            $db = $this->dbConnect();

            $req = $db->prepare('SELECT id, article_id, author, comment, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin%ss\') AS comment_date_fr FROM comments WHERE id = ?');
            $req->execute(array($commentId));
            $comment = $req->fetch();

            return $comment;
        }
        
        /**
         * insert all the fields of ONE comment in the database
         *
         * @param  int $postiId post id to which the comment is linked
         * @param  string $author is named by pseudo
         * @param  string $comment is the text
         * @return bool depending on the insert achievement
         */
        public function postComment(int $postiId, string $author, string $comment): bool
        {
            $db = $this->dbConnect();

            $comments = $db->prepare('INSERT INTO comments(article_id, author, comment, comment_date) VALUES( ?, ?, ?, NOW())');
            $affectedLines = $comments->execute(array($postiId, $author, $comment));

            return $affectedLines;
        }
                
        /**
         * remove all the comments of one specific post 
         *
         * @param  int $postId the specific post id teh comments are related to
         * @return array
         */
        public function deleteComments(int $postId): array  
        {
            $db = $this->dbConnect();

            $delete = $db->prepare('DELETE FROM comments WHERE article_id = ?');
            $deletedComments = $delete->execute(array($postId));

            return $deletedComments;
        }
        
        /**
         * get one specific comment in the database and 
         * modify the comment text field 
         * with the given new text
         * insert the modification date in the modification_date field
         * which is void until the first modification
         *
         * @param  int $commentId id representing the specific comment to  modify
         * @param  string $modifiedContent is the new text used to replace the previous one
         * @return bool depending on the updating achievement
         */
        public function updateComment(int $commentId, string $modifiedContent): bool
        {
            $db = $this->dbConnect();

            $updateComment = $db->prepare('UPDATE comments SET comment = ?, modification_date = NOW() WHERE id = ?');
            $updatedComment = $updateComment->execute(array($modifiedContent, $commentId));

            return $updatedComment;
        }
            
        /**
         * get one specific comment and remove it from the database
         *
         * @param  int $commentId is the id of the specific comment
         * @return bool depending on the deletion achievement
         */
        public function deleteComment(int $commentId): bool  
        {
            $db = $this->dbConnect();

            $removeComment = $db->prepare('DELETE FROM comments WHERE id = ?');
            $deletedComment = $removeComment->execute(array($commentId));

            return $deletedComment;
        }
    }
?>