<!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
                rel="stylesheet"
            >
            <title><?= $title ?? 'Mon super blog !' ?></title>
            <meta name="description" content="<?= $description ?>">
            <meta name="author" content="Sandrine MANGUY">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body class="d-flex flex-column min-vh-100">

            <header>
                <div class="container-fluid bg-light">
                    <div class="row">
                        <nav class="col navbar navbar-expand-lg navbar-light ">
                            <div class="container">
                            <!-- <a class="navbar-brand" href="<?php echo $rootUrl . 'index.php'; ?>">Mon super blog</a> -->
                                <a class="navbar-brand" href="index.php">Mon super blog</a>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                        <!-- Vérifier aria-current -->
                                        <!-- <a class="nav-link active" aria-current="page" href="<?php echo 'index.php'; ?>">Accueil</a> -->
                                            <a class="nav-link active" href="index.php">Accueil</a>
                                        </li>

                                        <li class="nav-item">
                                        <!-- <a class="nav-link" href="<?php echo $rootUrl . 'contact.php'; ?>">Contact</a> -->
                                            <a class="nav-link" href="index.php?action=contact">Contact</a>
                                        </li>

                                        <?php if (isset($_COOKIE['LOGGED_ADMIN'])) : ?>
                                            <li class="nav-item">
                                            <!-- <button type="button" class="btn btn-outline-primary btn-sm mb-2 ms-lg-2"><a class="nav-link" href="<?php echo $rootUrl . 'articles/create.php'; ?>"><strong>Ajouter article</strong></a></button> -->
                                            <button type="button" class="btn btn-outline-primary btn-sm mb-2 ms-lg-2"><a class="nav-link" href="index.php?action=create"><strong>Ajouter article</strong></a></button>
                                            </li>
                                        <?php endif; ?>
                                        
                                        <?php if (isset($_SESSION['pseudo']) && isset($_SESSION['pass']) || isset($_COOKIE['LOGGED_USER']) || isset($_COOKIE['LOGGED_ADMIN'])) : ?>
                                            <li class="nav-item">
                                            <!-- <button type="button" class="btn btn-outline-danger btn-sm mb-2 ms-lg-2"><a class="nav-link" href="<?php echo $rootUrl . 'disconnect.php'; ?>"><strong>Se déconnecter</strong></a></button> -->
                                            <button type="button" class="btn btn-outline-danger btn-sm mb-2 ms-lg-2"><a class="nav-link" href="index.php?action=disconnect"><strong>Se déconnecter</strong></a></button>
                                            </li>
                                        <?php else : ?>
                                            <li class="nav-item">
                                            <!-- <button type="button" class="btn btn-outline-success btn-sm mb-2 ms-lg-2"><a class="nav-link" href="<?php echo $rootUrl . 'connect.php'; ?>"><strong>Se connecter</strong></a></button> -->
                                            <button type="button" class="btn btn-outline-success btn-sm mb-2 ms-lg-2"><a class="nav-link" href="index.php?action=connect"><strong>Se connecter</strong></a></button>
                                            </li>
                                        <?php endif; ?>

                                        <li class="nav-item">
                                            <!-- <button type="button" class="btn btn-warning btn-sm mb-2 ms-lg-2"><a class="nav-link" href="<?php echo $rootUrl . 'signup.php'; ?>"><strong>S'incrire</strong></a></button> -->
                                            <button type="button" class="btn btn-warning btn-sm mb-2 ms-lg-2"><a class="nav-link" href="index.php?action=signup"><strong>S'incrire</strong></a></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
                        

                <?= $content ?>


            <footer class="bg-light text-center mt-5 position-fixed fixed-bottom">
                <div class="text-center p-3">
                    © 2021 Copyright:
                    <a class="text-dark" href="">Sandrine MANGUY</a>
                </div>
                    <!-- !!!!! Etudier système de compteur de pages vues !!!!!  -->
                <!-- <?php include_once($rootPath.'/viewed_pages.php'); ?> -->
                    <!-- !!!!! Etudier système de compteur de pages vues !!!!!  -->
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

        </body>
    </html>
        
      