<?php
    session_start();

    $title = 'Se connecter';
    $description = 'Page de connexion à mon super blog.';

    // set the navigation previous page informations in a cookie
    if (isset($_GET['article']) && $_GET['article'] > 0) {
        $articleId = $_GET['article'];

        // 15 minutes delay to let time to the user to connect or signup & connect
        setcookie('article', $articleId,  time() + 60 * 15, null, null, false, true);
    }
?>


<?php ob_start(); ?>
        <!-- Page -->
        <main class="container mt-5 pe-5 ps-5 col-md-8 col-lg-6 col-xxl-4">
            <h1 class="text-center mb-5">Se connecter</h1>

            <!-- Already connected alert -->
            <?php if (isset($_SESSION['pseudo']) && isset($_SESSION['pass']) || isset($_COOKIE['LOGGED_USER']) || isset($_COOKIE['LOGGED_ADMIN']) && $_GET['connection'] !== 'connected') : ?>
                <h2>Bonjour <strong><?= $_SESSION['pseudo'] ; ?></strong></h2>
                <div class="alert alert-secondary text-center" role="alert">
                    <p class="fs-4">
                        Vous êtes déjà connecté !
                    </p>
                    <a href="index.php" class="alert-link">Voir les articles</a>
            </div>

            <!-- Not connected -> display login form -->
            <?php  else: ?> 
                <div class="bg-light p-3">

                    <form class="row" method="post" action="index.php?action=postConnect">
                        <div class="form-text text-end">Champs* obligatoires</div>

                        <!-- alert -->
                        <?php if (isset($_GET['result']) && $_GET['result'] == 'wrong'): ?>
                            <p class="form-text text-danger">Mauvais identifiant ou mot de passe !</p>
                        <?php endif; ?>

                        <div class="mb-3">
                            <label for="pseudo" class="form-label">Pseudo :</label>
                            <input type="text" class="form-control form-control-lg" name="pseudo" id="pseudo" placeholder="Saisissez votre pseudo ici." required><br />
                        </div>
                        
                        <div class="mb-3">
                            <label for="pass" class="form-label">Mot de passe :</label>
                            <input type="password" class="form-control form-control-lg" name="pass" id="pass" placeholder="Saisissez votre mot de passe ici." required><br />
                        </div>
                        
                        <div class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="automatic" name="connection" id="connexionDefault">
                                <label class="form-check-label" for="connexionDefault">
                                Connexion automatique
                                </label>
                            </div>
                        </div>
                        
                        <div class="d-grid col-12 col-lg-8 col-xl-6 mx-auto mb-3">
                                <button 
                                    type="submit" 
                                    class="btn btn-primary btn-lg" 
                                    value="Envoyer">
                                    SE CONNECTER
                                </button>
                        </div>
                    </form>

                    <div class="mb-3 mt-3 text-center">
                        Pas de compte ? <a href="index.php?action=signup">Créer un compte</a>
                    </div>
                </div>
            <?php endif; ?> 
        </main>
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>




