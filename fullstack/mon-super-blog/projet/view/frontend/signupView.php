<?php 
    session_start();

    $title = 'Inscription';
    $description = 'Inscrivez-vous à ce blog afin de pouvoir déposer des commentaires.';
?>

<?php ob_start(); ?>
    <!-- Page -->
    <main class="container mt-5 pe-5 ps-5 col-md-8 col-lg-6 col-xxl-4">
        <h1 class="text-center mb-5">S'inscrire !</h1>

        <!-- saved user alert -->
        <?php
            if (isset($_GET['signup']) && $_GET['signup'] == 'ok' && isset($_GET['pseudo'])) {
                $pseudo = htmlspecialchars($_GET['pseudo']);
            ?>
                <h2 class="mb-3"> Bienvenue <strong><?= $pseudo; ?></strong> !</h2>
                <div class="row alert alert-success d-flex align-items-center text-center p-3" role="alert">    
                    <p class="fs-4"> 
                            Votre inscription a bien été enregistrée !<br />
                            Vous pouvez vous connecter dès à présent pour pouvoir déposer un commentaire.
                        </p>
                        <p><button type=button class="btn btn-primary btn-lg"><a href="index.php?action=connect" class="text-white text-decoration-none">Se connecter</a></button></p>
                        <p><a href="index.php" class="alert-link">Voir les articles</a></p>
                </div>
        <?php
            } else {
        ?>
                <!-- already logged alert -->
                <?php if (
                    (isset($_SESSION['pseudo']) && isset($_SESSION['pass'])) 
                    || (isset($_COOKIE['pseudo']) && isset($_SESSION['pass_hache']))
                ) : ?> 
                    <h2> Déjà inscrit(e) !</h2>
                    <div class="row alert alert-secondary d-flex align-items-center fs-4" role="alert">
                        <p class="text-center">
                            Vous avez déjà un compte <strong><?= $_SESSION['pseudo']; ?></strong> ! <br />
                            Déconnectez-vous pour créer un nouveau compte.
                        </p>
                        <div class="mt-3 text-center">
                            <button 
                                type="button" 
                                class="btn btn-primary btn-lg">
                                <a 
                                    href="index.php?action=disconnect" 
                                    class="text-white text-decoration-none">
                                    Se déconnecter
                                </a>
                            </button>
                            <button 
                                type="button" 
                                class="btn btn-secondary btn-lg">
                                <a 
                                    href="index.php" 
                                    class="text-white text-decoration-none">
                                    Annuler
                                </a>
                            </button>
                        </div>
                    </div>   
                
                <!-- display sign-up form -->
                <?php else : ?> 
                    <div class="bg-light p-3 mb-5">
                        <form  class="row" method="post" action="index.php?action=signup_post">
                            
                            <div class="form-text text-end">Tous les champs sont requis !</div>
                            
                            <div class="mb-3">
                                <label for="pseudo" class="form-label">Pseudo : </label>
                                <input 
                                    type="text" 
                                    class="form-control form-control-lg" 
                                    name="pseudo" 
                                    id="pseudo" 
                                    placeholder="Choisissez votre pseudo." 
                                    required>

                                <?php if (isset($_GET['pseudo']) && $_GET['pseudo'] == 'unavailable') : ?>
                                <p class="form-text text-danger">
                                    Le pseudo choisi n'est pas disponible. Choisissez-en un autre.
                                </p>
                                <?php endif ; ?>
                                <br />
                            </div>

                            <div class="mb-3">

                                <label for="pass" class="form-label">Mot de passe : </label>
                                <input 
                                    type="password" 
                                    class="form-control form-control-lg" 
                                    name="pass" 
                                    id="pass" 
                                    placeholder="Choisissez votre mot de passe." 
                                    required>

                                <!-- Missing password alert -->
                                <!-- <?php //if (isset($_GET['password']) && $_GET['password'] = 'missing') : ?>
                                <p>Merci de saisir un mot de passe.</p>
                                <?php// endif; ?> -->
                            </div>

                            <div class="mb-3">

                                <label for="checkpass" class="form-label">Saisissez à nouveau votre mot de passe : </label>
                                <input 
                                    type="password" 
                                    class="form-control form-control-lg" 
                                    name="checkpass" 
                                    id="checkpass" 
                                    placeholder="Re-saisissez votre mot de passe." 
                                    required>

                                <!-- Missing check password alert -->
                                <!-- <?php //if (isset($_GET['password']) && $_GET['password'] = 'missingcheckpass') : ?>
                                <p>Merci de saisir à nouveau le mot de passe.</p>
                                <?php //endif; ?> -->

                                <!-- Different passwords alert -->
                                <?php if (isset($_GET['password']) && $_GET['password'] = 'different') : ?>
                                    <p class="form-text text-danger">
                                        Les mots de passe saisis ne sont pas identiques.<br />
                                        Merci de saisir deux fois le même mot de passe.
                                    </p>
                                <?php endif; ?>
                                <br />
                            </div>

                            <div class="mb-3">
                                <div id="emailHelp" class="form-text text-end">
                                    Nous ne revendrons pas votre adresse e-mail.
                                </div>
                                
                                <label for="mail" class="form-label">Adresse email :</label>
                                <input 
                                    type="email" 
                                    class="form-control form-control-lg" 
                                    name="mail" 
                                    id="mail" 
                                    placeholder="prenom.nom@example.com." 
                                    required 
                                    aria-describedby="emailHelp">
                                
                                <!-- Missing e-mail -->
                                <!-- <?php //if (isset($_GET['email']) AND $_GET['email'] = 'missing') : ?>
                                    <p>Merci de saisir un e-mail.</p>
                                <?php //endif; ?> -->

                                <!-- Invalid e-mail -->
                                <!-- <?php //if (isset($_GET['email']) AND $_GET['email'] = 'invalid') : ?>
                                    <p>Merci de saisir un e-mail valide.</p>
                                <?php// endif; ?> -->
                            </div>
                            <div class="mb-3">
                                <label for="checkmail" class="form-label">Saisissez à nouveau votre adresse email :</label>
                                <input type="email" class="form-control form-control-lg mb-3" name="checkmail" id="checkmail" placeholder="prenom.nom@example.com" required>
                                
                                <!-- Missing ckeck email -->
                                <!-- <?php //if (isset($_GET['email']) AND $_GET['email'] = 'missingcheckmail') : ?>
                                    <p>Merci de saisir un e-mail.</p>
                                    <?php //endif; ?> -->
                                
                                <!-- Different e-mail addresses-->
                                <?php if (isset($_GET['email']) && $_GET['email'] = 'different') : ?>
                                    <p class="form-text text-danger">
                                        Les e-mails saisis ne sont pas identiques. Merci de saisir deux fois le même l'e-mail.
                                    </p>
                                <?php endif; ?>
                                
                            </div>

                            <div class="d-grid col-12 col-md-6 col-lg-3 mx-auto mb-3">
                                <button 
                                    type="submit" 
                                    class="btn btn-primary btn-lg" 
                                    value="Envoyer">
                                    ENVOYER
                                </button>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>
        <?php
            }
        ?>        
    </main>
<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>