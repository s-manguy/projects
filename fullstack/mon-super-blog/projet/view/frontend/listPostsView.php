<?php 
    session_start(); 

    $title = 'Mon super blog' ;
    $description = 'Ce blog en PHP a été codé par Sandrine MANGUY, développeur web.';
?>


<!-- Page -->
<?php ob_start(); ?>       
    <main class="container mt-5 p-5">
        <!-- //////////////////////// -->
        <!-- ///// LOGIN ALERTS ///// -->
        <!-- //////////////////////// -->

        <!-- Welcome message Alert -->
        <?php if (isset($_GET['connection']) && $_GET['connection'] == 'connected') : ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <p>Bonjour<strong> <?= $_SESSION['pseudo']; ?></strong>. Heureux de vous revoir !</p> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>
        
        <!-- Goodbye message Alert -->
        <?php if (isset($_GET['connection']) && $_GET['connection'] == 'disconnected') : ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Vous avez été déconnecté.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <!-- ////////////////////// -->
        <!-- ///// BLOG TITLE ///// -->
        <!-- ////////////////////// -->

        <h1 class="text-center mb-5">Mon super blog !</h1>
        
        <!-- ///// Add article button ///// -->
        <?php if (isset($_SESSION['admin'])) : ?>
            <div class="d-flex flex-row-reverse mb-3">
            <button type="button" class="btn btn-primary btn-lg rounded-circle d-flex flex-row-reverse" title="Ajouter un article"><a href="index.php?action=addPost" class="text-white text-decoration-none">+</a></button></div>
            </div>    
        <?php endif; ?>   
                
        <!-- /////////////////////////// -->
        <!-- ///// ARTICLES ALERTS ///// -->
        <!-- /////////////////////////// -->

        <?php
            // added article Alert
            if (isset($_GET['alert']) AND isset($_GET['title']) AND $_GET['alert'] == 'saved')
            {
                $_GET['title'] = htmlspecialchars($_GET['title']);
            ?>

                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    L'article intitulé <strong><em><?= $_GET['title']; ?><em></strong> a été enregistré !
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>       
                </div>
            
            <?php
            }

            // deleted article Alert 
            if (isset($_GET['article']) && isset($_GET['comments']) && isset($_GET['title']))
            {
                $_GET['title'] = htmlspecialchars($_GET['title']) ; 
                
                if ($_GET['article'] == 'deleted' && $_GET['comments'] == 'none') {
                ?>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        L'article intitulé <strong><em><?= $_GET['title']; ?><em></strong> a été supprimé !
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                <?php
                }

                if ($_GET['article'] == 'deleted' && $_GET['comments'] == 'deleted') {
                ?>    
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        L'article intitulé <strong><em><?= $_GET['title']; ?><em></strong> et ses commentaires</em> ont été supprimés  !
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                <?php
                }    
            }    
        ?>

        <!-- ///////////////////////// -->
        <!-- ///// ARTICLES LIST ///// -->
        <!-- ///////////////////////// -->

        
            
        <?php
        // display the articles
        while ($data = $posts->fetch()) {
        ?>
            <article class="bg-light mb-5 p-0">
                <h3 class="bg-secondary mb-0 p-3 text-white text-center"><?= htmlspecialchars($data['title']); ?></h3>
                <div class="p-3 pb-1">
                    <!-- date -->
                    <?php if ($data['modification_date_fr'] == NULL) : ?>
                        <p class="text-end"><em>Publié le <?= $data['creation_date_fr']; ?></em></p> 
                    <?php else : ?>
                        <p class="text-end"><em>Mis à jour le <?= $data['modification_date_fr']; ?></em></p>
                    <?php endif; ?>
                    
                    <!-- content -->
                    <p><?= nl2br(htmlspecialchars($data['content'])); ?></p>
                    
                    <!-- Link to article & article comments -->
                    <!-- article displayed on page number higher than 1 -->
                    <?php if (isset($_GET['page'])) : ?>
                        <a href="index.php?action=post&article=<?= $data['id']; ?>&listpage=<?= $_GET['page']; ?>">Commentaires</a>
                    <?php else : ?>
                    <!-- first loading or root address -->
                        <a href="index.php?action=post&article=<?= $data['id']; ?>">Commentaires</a>
                    <?php endif; ?>
                </p>
                </div>
            </article>
        <?php            
        }

        // end of the request
        $posts->closeCursor();

        // Pagination links
        include(dirname(__DIR__) . '/pagination.php');
        ?>
    </main> 
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>