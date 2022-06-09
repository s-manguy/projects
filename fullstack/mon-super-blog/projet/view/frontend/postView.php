<?php 
    session_start(); 
?>
<?php 

    $title = htmlspecialchars($post['title']);
    $description = 'Ce blog a été codé en PHP par Sandrine MANGUY, développeur web'
?>

<!-- page -->
<?php ob_start(); ?>
    <main class="container mt-1 p-5">
         <!-- Link : Go back to the previous articles list page  -->
         <?php if (isset($_GET['listpage']) && $_GET['listpage'] > 0) : ?>
            <a href="index.php?page=<?= $_GET['listpage']; ?>">Liste des articles</a>
        <?php else : ?>
            <a href="index.php">Liste des articles</a>
        <?php endif;?>
        
        <!-- ///// ARTICLE ///// -->
        <article class="mt-3 mb-5 p-0 bg-light">
            <h1 class="bg-secondary mb-0 p-3 text-white text-center"><?= htmlspecialchars($post['title']); ?></h1>

            <!-- Modified article alert -->
            <?php if(isset($_GET['alert']) && $_GET['alert'] == 'modified') : ?>
                <div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                    <div>
                        L'article a bien été modifié.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>    
            <?php endif;?>           
            
            <div class="p-3">
                <!-- date -->
                <?php if ($post['modification_date_fr'] == NULL) : ?>
                    <p class="text-end"><em>Publié le <?= $post['creation_date_fr']; ?></em></p> 
                <?php else : ?>
                    <p class="text-end"><em>Mis à jour le <?= $post['modification_date_fr']; ?></em></p>
                <?php endif; ?>
            
                <!-- content -->
                <p ><?= nl2br(htmlspecialchars($post['content'])); ?></p>
                
                <!-- buttons -->
                <?php if (isset($_SESSION['admin'])) : ?>
                    <div class="d-flex flex-row-reverse">
                        <button 
                            type="button" 
                            class="btn btn-danger btn-sm ms-2">
                            <a 
                                href="index.php?action=deletePost&article=<?= $post['id']; ?>" 
                                class="text-white text-decoration-none">
                                SUPPRIMER
                            </a>
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-primary btn-sm ms-2">
                            <a 
                                href="index.php?action=updatePost&article=<?= $post['id']; ?>" 
                                class="text-white text-decoration-none">
                                MODIFIER
                            </a>
                        </button>
                    </div>
                <?php endif; ?>
            </div>
            
        </article>
    
        <!-- ///////////////////// -->
        <!-- ////// COMMENTS ///// -->
        <!-- ///////////////////// -->

        <div>
            <h2 class="mb-3">Commentaires</h2>

            <!-- ///// Alerts ///// -->
            <!-- Added comment alert -->
            <?php if (isset($_GET['alert']) AND $_GET['alert'] == 'saved') : ?>
                <div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                    <div>
                        Votre commentaire a été enregistré.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Updated comment alert -->
            <?php if (isset($_GET['alert']) AND $_GET['alert'] == 'updated') : ?>
                <div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                    <div>
                        Votre commentaire a été modifié.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Deleted comment alert -->
            <?php if(isset($_GET['alert']) && $_GET['alert'] == 'deleted') : ?>
                    <div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                        <div>
                            Le commentaire a bien été supprimé.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>    
            <?php endif;?>


            <!-- ////// Comment FORM ///// -->
            <div class="container bg-light mt-2 mb-5 p-3 pb-5 col-11 col-md-9 col-xl-7 col-xxl-6">
                <p class="text-center"><strong>Ajouter un commentaire</strong></p>

                <!-- login alert -->
                <?php if(!(
                        (isset($_SESSION['pseudo']) && isset($_SESSION['pseudo'])) || 
                        (isset($_COOKIE['login']) && isset($_COOKIE['pass_hache']))
                )): ?>
                    <div class="row text-center alert alert-warning">
                        <p><strong>Vous devez être connecté(e) pour pouvoir laisser un commentaire</strong></p>
                        <p>
                            <button class="btn btn-warning">
                                <a 
                                    class="alert-link text-decoration-none" 
                                    href="index.php?action=connect&article=<?= $post['id']; ?>">
                                    Se connecter
                                </a>
                            </button>
                        </p>
                    </div>
                <?php endif; ?>

                <!-- Welcome message alert -->
                <?php if(isset($_GET['alert']) && $_GET['alert'] == 'connected') : ?>
                    <div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                        <div>
                            <p class="fs-4">
                            Bonjour <strong><?= $_SESSION['pseudo']; ?></strong>. Heureux de vous revoir.
                            </p>   
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>    
                <?php endif;?> 

                <!-- form -->
                <form class="row" action="index.php?action=addComment" method="post">
                    <p class="form-text text-end">Tous les champs* sont requis ! </p>
                    
                    <input type="hidden" name="nb_article" value="<?= $post['id']; ?>">

                    <div class="mb-3">
                        <label for="pseudo" class="form-label">Pseudo* : </label>
                        <!-- fill pseudo field when user is logged -->
                        <?php if (isset($_SESSION['pseudo'])) : ?>
                            <input 
                                type="text" 
                                class="form-control form-control-lg" 
                                name="author" 
                                id="pseudo" 
                                value="<?= $_SESSION['pseudo']; ?>" 
                                required><br />
                        <?php else : ?>
                            <input 
                                type="text" 
                                class="form-control form-control-lg"
                                name="author" 
                                id="pseudo" 
                                required><br />
                        <?php endif;  ?>
                    </div>

                    <div class="mb-3">
                    <label for="comment" class="form-label">Commentaire* : </label><textarea class="form-control form-control-lg" name="comment" id="comment" placeholde="Ajoutez votre commentaire ici" required></textarea>
                    </div>

                    <button type="submit"  class="btn btn-primary btn-lg col-11 col-md-6 col-lg-3 mx-auto" >ENVOYER</button>
                </form>
            </div>

            <!-- ///// Displayed comments ////// -->
            <!-- get the article comments -->
            <?php while ($comment = $comments->fetch()) : ?>
                <div class="p-3 col-11 col-xl-9 m-auto" aria-label="comment">
                    <p>
                        <strong><?= htmlspecialchars($comment['author']); ?></strong>
                        <?php if($comment['modification_date_fr'] != NULL) : ?>
                            modifié le <?= htmlspecialchars($comment['modification_date_fr']); ?>
                        <?php else: ?>
                            publié le <?= htmlspecialchars($comment['comment_date_fr']); ?>
                        <?php endif; ?>
                    </p>
                    <p><?= nl2br(htmlspecialchars($comment['comment'])); ?></p>
                    
                    <div class="d-flex flex-row-reverse">
                        <?php if (isset($_SESSION['admin']) || (isset($_SESSION['pseudo']) && $comment['author'] == $_SESSION['pseudo'])) : ?>
                            <button type="button" class="btn btn-danger btn-sm text-center ms-1">
                                <a 
                                    href="index.php?action=deleteComment&article=<?= $comment['article_id']; ?>&comment=<?= $comment['id']; ?>&author=<?= $comment['author']; ?>" 
                                    class="text-white text-decoration-none">
                                    SUPPRIMER
                                </a>
                            </button>
                        <? endif; ?>
                        <?php if (isset($_SESSION['pseudo'])  && $comment['author'] == $_SESSION['pseudo']) : ?>
                            <button type="button" class="btn btn-primary btn-sm text-center ms-1">
                                <a 
                                    href="index.php?action=updateComment&article=<?= $comment['article_id']; ?>&comment=<?= $comment['id']; ?>&author=<?= $comment['author']; ?>" 
                                    class="text-white text-decoration-none">
                                    MODIFIER
                                </a>
                            </button>
                        <? endif; ?>  
                    </div>
                </div>    
            <?php endwhile; ?>

            <!-- display the pages links -->
            <?php include(dirname(__DIR__) . '/pagination.php'); ?>

            <!-- clean cookie to avoid being redirected to the article page in loggin made from another page -->
            <?php setcookie('article', '$articleId',  time() - 60 * 30, null, null, false, true); ?>

        </div>
    </main>                                               
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>      