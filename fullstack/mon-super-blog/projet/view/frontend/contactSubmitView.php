<?php
    session_start();

    $title = 'Message soumis';
    $description = 'Confirmation d\'envoi d\'un message à l\'équipe de Mon super blog !';
?>

<?php ob_start(); ?>
    <main class="container mt-5 p-5 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 ">
        <h1 class="text-center mb-5">Message bien reçu !</h1>
        <div class="text-center mb-5">
            <a class="pe-1" href="index.php">Liste des articles</a>
            <a class="ps-1" href="index.php?action=contact">Nouveau message</a>
        </div>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title mb-3">Rappel de vos informations</h5>
                <p class="card-text"><strong>Nom</strong> : <?=$surname; ?></p>
                <p class="card-text"><strong>Prénom</strong> : <?= $firstname; ?></p>
                <p class="card-text"><strong>Email</strong> : <?=$email; ?></p>
                <p class="card-text"><strong>Message</strong> : <?= strip_tags($message); ?></p>
            </div>
        </div>   
    </main>
<?php $content = ob_get_clean(); ?>      

<?php require (dirname(__DIR__) . '/template.php'); ?>