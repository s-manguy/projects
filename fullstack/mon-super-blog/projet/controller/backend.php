<?php
        use \App\Model\PostManager;
        use \App\Model\CommentManager;


    function addArticleForm() {
        $postManager = new PostManager(); 
        $lastPost = $postManager->findLastPost(); 

        require('../view/backend/createFormView.php');
    }

    function addArticle($title, $content) {
        $postManager = new PostManager(); 
        $affectedLines = $postManager->postArticle($title, $content); 

        if ($affectedLines === false) {
            throw new Exception('Impossible d\'ajouter un article !');
            
        } else {
            header('Location: index.php?action=addPost&alert=saved');
        }
    }

    function updateArticleForm($postId) {
        $postManager = new PostManager(); 
        $post = $postManager->findPost($postId); 

        if ($post === false) {
            throw new Exception('L\'article demandé n\'existe pas !');
            
        } else {
            require('../view/backend/updateArticleView.php');
        }    
    }


    function updateArticle($postId, $postTitle, $postContent) {
        $modifiedTitle = htmlspecialchars($postTitle);
        $modifiedContent = htmlspecialchars($postContent);

        $postManager = new PostManager(); 
        $updatedPost = $postManager->updatedArticle($postId, $modifiedTitle, $modifiedContent); 

        if ($updatedPost === false) {
            throw new Exception('Les modifications n\'ont pas pu être enregistrées !');
            
        } else {
            header('Location: index.php?action=post&article=' . $postId . '&alert=modified');
        }    
    }


    function articleToDelete($postId) {
        $postManager = new PostManager(); 
        $post = $postManager->findPost($postId); 
        
        if ($post === false) {
            throw new Exception('L\'article demandé n\'existe pas !');
            
        } else {
            require('../view/backend/deleteArticleView.php');
        }
  
    }


    function confirmedRemoval($postId, $postTitle) {
        $postTitle = htmlspecialchars($postTitle);

        $postManager = new PostManager(); 
        $commentManager = new CommentManager();  
        $post = $postManager->findPost($postId); 

        if ($post === false) {
            throw new Exception('L\'article à supprimer n\'existe pas !');
            
        } elseif ($postTitle === $post['title']) {

            $numberOfComments = $commentManager->countComments($postId); 

            if ($numberOfComments > 0) {
                
                $deletedComments = $commentManager->deleteComments($postId); 
                $comments = 'deleted';
            } else {
                $comments = 'none';
            }

            $deletedArticle = $postManager->deletePost($postId); 

            $article = 'deleted';

            header('Location: index.php?article=' . $article. '&comments=' . $comments . '&title=' . $postTitle);

        } else {
                throw new Exception('Le numéro de l\'article et le titre ne correspondent pas !');
        } 
    }

    function addComment($postId, $author, $comment) {
        $commentManager = new CommentManager();
        $affectedLines = $commentManager->postComment($postId, $author, $comment); 

        if ($affectedLines === false) {
            throw new Exception('Impossible d\'ajouter un commentaire !');
            
        } else {
            $alert = 'saved';
            // header('Location: index.php?action=post&article=' . $postId . '&listpage=' . $articlePage . '&alert=' . $alert);
            header('Location: index.php?action=post&article=' . $postId . '&alert=' . $alert);
        }
    }

    function commentToUpdate($postId, $commentId) {
        $commentManager = new CommentManager(); 
        $comment = $commentManager->findComment($commentId);

        if ($comment === false) {
            throw new Exception('Le commentaire demandé n\'existe pas !');
        } elseif ($postId === $comment['article_id']) {
            require('../view/backend/updateCommentView.php');
        } else {
            throw new Exception('Les numéros de l\'article et du commentaire ne correspondent pas !');
        }
    }

    function updateComment($postId, $commentId, $commentAuthor, $modifiedContent) {
        $commentManager = new CommentManager(); 
        $comment = $commentManager->findComment($commentId);
        
        if ($comment === false) {
            throw new Exception('Le commentaire demandé n\'existe pas !');
        } elseif ($postId === $comment['article_id']) {
            $updatedComment = $commentManager->updateComment($commentId, $modifiedContent);
            header('Location: index.php?action=post&article=' . $postId . '&alert=updated');
        } else {
            throw new Exception('Les numéro de l\'article et du commentaire ne correspondent pas !');
        }
    }

    function commentToDelete($postId, $commentId) {
        $commentManager = new CommentManager(); 
        $comment = $commentManager->findComment($commentId); 

        if ($comment === false) {
            throw new Exception('Le commentaire demandé n\'existe pas !');
        } elseif ($postId === $comment['article_id']) {
            require('../view/backend/deleteCommentView.php');
        } else {
            throw new Exception('Les numéro de l\'article et du commentaire ne correspondent pas !');
        }
    }

    function removeComment($postId, $commentId) {
        $commentManager = new CommentManager(); 
        $comment = $commentManager->findComment($commentId); 

        if ($comment === false) {
            throw new Exception('Le commentaire à supprimer n\'existe pas !');    
        } elseif ($postId === $comment['article_id']) {
            $deletedComment = $commentManager->deleteComment($commentId);
            header('Location: index.php?action=post&article=' . $postId . '&alert=deleted');      
        } else {
            throw new Exception('Les numéro de l\'article et du commentaire ne correspondent pas !');
        }
    }
?>