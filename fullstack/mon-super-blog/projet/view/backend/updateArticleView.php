<?php
    if (session_status() != PHP_SESSION_ACTIVE) {
        session_start();
    } 

    $title = 'Admin : modifier un article';
    $description = "Se connecter à l'espace d'administration pour ajouter un article.";
?>


<!-- page -->
<?php ob_start(); ?>
    <main class="container p-5 col-md-8 col-lg-6 col-xxl-4">
        <h1 class="text-center mb-5">Modifier un article</h1>
        
        <!-- Link to previous page -->
        <p><a href="index.php?action=post&amp;article=<?= $post['id']; ?>">Retour à l'article</a></p>

        <!-- update Article form -->
        <div class="row bg-light p-3 mb-5">
            <form class="row" method="post" action="index.php?action=update_post">
                <p class="form-text text-end">Remplir tous les champs puis cliquer sur Publier.</p>
                
                <input type="text" name="article_id" value="<?= $post['id']; ?>" hidden>
                
                <div class="mb-3">
                <label for="title" class="form-label">Titre : </label>
                <input type="text" class="form-control" name="title" id="title" max="255" value="<?= $post['title']; ?>" required><br />
                </div>
                
                <div class="mb-3">
                <label for="content" class="form-label">Texte de l'article : </label>
                <textarea class="form-control" name="content" id="content" required><?= $post['content']; ?></textarea><br />
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
       