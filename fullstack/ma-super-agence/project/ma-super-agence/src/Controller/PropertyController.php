<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Entity\Property;
use App\Entity\PropertySearch;
use App\Form\ContactType;
use App\Form\PropertySearchType;
use App\Notification\ContactNotification;
use App\Repository\PropertyRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class PropertyController extends AbstractController {    
        
    /**
     * @var PropertyRepository
     */
    private $repository;

    public function __construct(PropertyRepository $repository)
    {
        $this->repository = $repository;
    }
    
    /**
     * index render the paginated properties list and a search form
     * 
     * @Route("/biens", name="property.index")
     * @param  PaginatorInterface $paginator 
     * @return Response
     */    
    public function index (PaginatorInterface $paginator, Request $request): Response
    {  
        // Gérer le traitement dans le contrôleur
        // La query pourrait avoir en paramètre la recherche
        $search = new PropertySearch;
        $form = $this->createForm(PropertySearchType::class, $search);
        $form->handleRequest($request);
        $properties = $paginator->paginate(
            $this->repository->findAllVisibleQuery($search), /* initial query */ /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            12 /*limit per page*/
        );
        return $this->render('property/index.html.twig', [
            'current_menu'  => 'properties',
            'properties'    => $properties,
            'form'          => $form->createView()
        ]);
    }
    
    // /**
    //  * @Route("/biens/{slug}-{id}", name="property.show", requirements={"slug": "[a-z0-9\-]*"})
    //  *
    //  * @return Response
    //  */
    // public function show ($slug, $id): Response
    // {
    //     $property = $this->repository->find($id);
    //     return $this->render('pages/show.html.twig', [
    //         'property' => $property,
    //         'current_menu' => 'properties'
    //     ]);
    // }

    /**
     * show render a specific property details and a contact form
     * 
     * @Route("/biens/{slug}-{id}", name="property.show", requirements={"slug": "[a-z0-9\-]*"})
     *
     * @return Response
     */
    public function show (Property $property, string $slug, Request $request, ContactNotification $notification): Response
    {
        if ($property->getSlug() !== $slug) {
            return $this->redirectToRoute('property.show', [
                'id' => $property->getId(),
                'slug' => $property->getSlug()
            ], 301);
        }

        $contact = new Contact();
        $contact->setProperty($property);
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isvalid()) {
            $notification->notify($contact);
            $this->addFlash('success', 'Votre message a bien été envoyé');
            
            return $this->redirectToRoute('property.show', [
                'id' => $property->getId(),
                'slug' => $property->getSlug()
            ]);
        }
        
        return $this->render('pages/show.html.twig', [
            'property'      => $property,
            'current_menu'  => 'properties',
            'form'          => $form->createView()
        ]);
    }
}