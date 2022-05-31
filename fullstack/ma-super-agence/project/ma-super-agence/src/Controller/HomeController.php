<?php
    namespace App\Controller;

    use App\Repository\PropertyRepository;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Twig\Environment;

    class HomeController{        
        /**
         * @var Twig\Environment
         */
        private $twig;

        public function __construct (Environment $twig)
        {
            $this->twig = $twig;
        }

        
        /**
         * index
         * @Route("/", name="home")
         * @return Response
         */
        public function index (PropertyRepository $repository): Response
        {
            // return new Response('Salut les gens');
            $properties = $repository->findLatest();
            return new Response ($this->twig->render('pages/home.html.twig', [
                'properties' => $properties,
                'current_menu' => 'home'
            ]));
        }
    }