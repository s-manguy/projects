<?php
    if (session_status() != PHP_SESSION_ACTIVE) {
        session_start();
    }

    $title = 'Admin : supprimer un billet';
    $description = 'Se connecter à l\'espace d\'administration pour ajouter un article.';
?>

<!-- page -->
<?php ob_start(); ?>
    <main class="container p-5 col-md-8 col-lg-6 col-xxl-4">
        <h1 class="text-center mb-5">Supprimer un article</h1>
        <p><a href="index.php?action=post&article=<?= $_GET['article']; ?>">Retour à l'article</a></p>

        <div class="p-3 mb-5 row">
            <div class="alert alert-secondary text-center">
                <p><strong>Voulez-vous réellement supprimer l'article ci-dessous?<br > 
                La suppression est définitive !</strong></p>
                <div>
                    <button 
                        type="button" 
                        class="btn btn-danger btn-sm">
                        <a 
                            href="index.php?action=confirm_delete&article=<?= $post['id']; ?>&title=<?= $post['title']; ?>" 
                            class="text-white text-decoration-none">
                            SUPPRIMER
                        </a>
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-secondary btn-sm">
                        <a 
                            href="index.php?action=post&article=<?= $post['id']; ?>" 
                            class="text-white text-decoration-none">
                            ANNULER
                        </a>
                    </button>
                </div>
            </div>  
            
            <div class="mt-3 p-3 bg-light">
                <p class="text-center" aria-label="article-title"><strong>Article à supprimer</strong></p>
                
                <div>
                    <article>
                        <h3 class="text-center"><?= htmlspecialchars($post['title']); ?></h3>
                        
                        <!-- date -->
                        <?php if (isset($_GET['alert']) && $_GET['alert'] == 'modified') : ?> 
                            <p class="text-end"><em>modifié le <?= $post['modification_date_fr']; ?></em></p>   
                        <?php else : ?>
                            <p class="text-end"><em>publié le <?= $post['creation_date_fr']; ?></em></p>
                        <?php endif; ?>

                        <!-- content -->
                        <p><?= nl2br(htmlspecialchars($post['content'])); ?></p>
                    </article>
                </div>
        </div>    
    </main>
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>