<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController {  

    /**
     * If the user is on the admin URL, he is redirected to the admin dashboard when logged in.
     * If the user is not on the admin URL, he is redirected to home page when logged in.
     * 
     * @Route("/login", name="login")
     * @param AuthenticationUtils $AuthenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername, 
            'error' => $error,
            'current_menu' => 'login'
        ]);
    }
    
    /**
     * When logged out, the user is redirected to the home page
     * 
     * @Route("/logout", name="logout")
     *
     * @return void
     */
    public function logout(): void
    {
        throw new \Exception('This should never be reached!');
    }
}