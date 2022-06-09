<?php 
    session_start(); 

    $title = 'Nous contacter';
    $description = 'Pour toute demande d\'information ou toute suggestion, n\'hésitez pas à contacter l\'équipe de Mon super blog !';

?>


<?php ob_start(); ?>
        <!-- page -->
        <main class="container mt-5 p-5 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 ">
            <h1 class="text-center mb-5">Nous contacter !</h1>

            <!-- alert -->
            <?php if (isset($_GET['alert']) && $_GET['alert'] == 'missing') : ?>
                <div class="alert alert-warning d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                    Remplir tous les champs avant de soumettre le formulaire.
                    </div>
                </div>
            <?php endif ; ?>
            
            <div class="bg-light p-3">
                <form class="row" method="post" action="index.php?action=contact_submit">
                    <div class="form-text text-end">Champs* obligatoires</div>
                    <div class="mb-3">
                        <label for="surname" class="form-label">Nom* : </label>
                        <input type="text" class="form-control" id="surname" name="surname" placeholder="Saisissez votre nom ici." required>
                    </div>
                    <div class="mb-3">
                        <label for="firstname" class="form-label">Prénom* : </label>
                        <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Saisissez votre prénom ici." required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">E-mail* : </label>
                        <input type="email" class="form-control" id="email" name="email" aria-describedby="email-help" placeholder="Saisissez votre e-mail ici."  required>
                        <div class="form-text text-end" id="email-help">Nous ne revendrons pas votre email.</div>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Votre message* : </label>
                        <textarea id="message" class="form-control mb-3" name="message" placeholder="Ecrivez votre message ici..." required></textarea>
                    </div>

                    <div class="d-grid col-12 col-md-6 col-lg-3 mx-auto mb-3">
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-lg">
                            ENVOYER
                        </button>
                    </div>
                </form>
            </div>
        </main>

<?php $content = ob_get_clean(); ?>

<?php require (dirname(__DIR__) . '/template.php'); ?>