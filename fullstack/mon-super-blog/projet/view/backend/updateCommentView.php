<?php
    if (session_status() != PHP_SESSION_ACTIVE) {
        session_start();
    } 

    $title = 'Admin : modifier un commentaire';
    $description = "Se connecter à l'espace d'administration pour modifier un commentaire.";
?>


<!-- page -->
<?php ob_start(); ?>
    <main class="container p-5 col-md-8 col-lg-6 col-xxl-4">
        <h1 class="text-center mb-5">Modifier un commentaire</h1>

        <!-- Link to previous page -->
        <p><a href="index.php?action=post&amp;article=<?= $postId; ?>">Retour à l'article</a></p>

        <!-- Update Comment form -->
        <div class="row bg-light p-3 mb-5">
            <form class="row" method="post" action="index.php?action=update_comment">
                <p class="form-text text-end">Remplir tous les champs puis cliquer sur Publier.</p>
                
                <input type="text" name="article_id" value="<?= $postId; ?>" hidden>
                <input type="text" name="comment_id" value="<?= $comment['id']; ?>" hidden>

                <div class="mb-3">
                <!-- <label for="author" class="form-label hidden">Auteur : </label>
                <input type="text" class="form-control" name="author" id="author" value="<?= $comment['author']; ?>" required disabled><br /> 
                the disabled attribute stop the name attribute propagation. So the comment cannot be updated
                solution below: give the input aspect and send the information via an hidden input -->
                    <p class="form-label hidden">Auteur : </p>
                    <p class="form-control"><?= $comment['author']; ?></p>
                    <input type="text" name="author" value="<?= $comment['author']; ?>" hidden>
                </div>
                
                <div class="mb-3">
                <label for="content" class="form-label">Texte du commentaire : </label>
                <textarea class="form-control" name="content" id="content" required><?= $comment['comment']; ?></textarea>
                <br />
                </div>
                
                <div class="d-grid col-12 col-md-6 col-lg-3 mx-auto mb-3">
                    <button 
                        type="submit" 
                        class="btn btn-primary btn-lg">
                        PUBLIER
                    </button>
                </div>

            </form>
        </div>  
    </main>
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>
       