<?php
    if (session_status() != PHP_SESSION_ACTIVE) {
        session_start();
    } 

    $title = 'Admin : supprimer un commentaire';
    $description = 'Se connecter à l\'espace d\'administration pour ajouter un article';
?>

<?php ob_start(); ?>
    <main class="container p-5 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <h1 class="text-center mb-5">Supprimer un commentaire !</h1>
        
        <p><a href="index.php?action=post&amp;article=<?= $postId ; ?>">Retour à l'article</a>
                        
        <div class="row alert alert-secondary d-flex align-items-center text-center">
            <p><strong>
                Voulez-vous réellement supprimer le commentaire ci-dessous ?
                <br />La suppression est définitive !
            </strong></p>
            <div class="text-center">
                <button type="button" class="btn btn-danger btn-sm">
                    <a 
                        href="index.php?action=confirmed_deleteComment&article=<?= $postId; ?>&amp;comment=<?= $commentId; ?>&author=<?= $comment['author']; ?>" 
                        class="text-white text-decoration-none">
                        SUPPRIMER
                    </a>
                </button>
                <button 
                    type="button" 
                    class="btn btn-secondary btn-sm">
                    <a 
                        href="index.php?action=post&article=<?= $postId; ?>" 
                        class="text-white text-decoration-none">
                        ANNULER
                    </a>
                </button>
            </div>    
        </div>  
                        
        <div class="row bg-light p-3">
            <p class="text-center"><strong>Commentaire à supprimer</strong></p>
            <p><strong><?= htmlspecialchars($comment['author']); ?></strong> le <?=htmlspecialchars($comment['comment_date_fr']); ?></p>
            <p><?= nl2br(htmlspecialchars($comment['comment'])); ?></p><br />
        </div>   
    </main>
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>