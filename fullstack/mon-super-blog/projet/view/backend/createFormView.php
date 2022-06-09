<?php
    if (session_status() != PHP_SESSION_ACTIVE) {
        session_start();
    }

    $title = 'Admin : ajouter un billet';
    $description = "Se connecter à l'espace d'administration pour ajouter un article";
?>

<!-- page -->
<?php ob_start(); ?>
    <main class="container p-5 col-md-8 col-lg-6 col-xxl-4">
        <h1 class="text-center">Ajouter un article !</h1>

        <p><a href="index.php">Voir tous les articles</a></p>

        <div class=" row bg-light p-3 mb-5">
            
            <!-- added article alert -->
            <?php if (isset($_GET['alert']) && $_GET['alert']='saved') : ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Votre article <strong><em><a class="alert-link" href="index.php?action=post&amp;article=<?= $lastPost['id']; ?>" title="Voir article"><?= $lastPost['title']; ?></a><em></strong> a été enregistré !
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>
            
            <!-- add article form -->
            <form class="row" method="post" action="index.php?action=create_post">
                <p class="form-text text-end">Remplissez tous les champs puis publiez.</p>
                <div class="mb-3">
                    <label for="title" class="form-label">Titre : </label>
                    <input type="text" class="form-control" name="title" id="tile" max="255" required><br />
                </div>
                
                <div class="mb-3">
                    <label for="content" class="form-label">Texte de l'article : </label>
                    <textarea class="form-control" name="content" id="content" required></textarea><br />
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