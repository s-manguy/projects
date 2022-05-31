<?php

namespace App\Notification;

use App\Entity\Contact;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;


class ContactNotification {
    
    /**
     * @var MailerInterface
     */
    private $sendmail;
    

    public function __construct(MailerInterface $sendmail)
    {
        $this->sendmail = $sendmail;
    }

    public function notify(Contact $contact)
    {
        $message = (new TemplatedEmail()) // Email if no twig
            ->from('noreply@agence.fr')
            ->to('contact@agence.fr')
            ->replyTo($contact->getEmail())
            ->subject('Agence : ' . $contact->getProperty()->getTitle())
            ->htmlTemplate('emails/contact.html.twig')
            ->context([
                'contact'   => $contact
            ])
        ;
        // When sending only some text
        // $message = (new Email()) // Email if no twig
        //     ->from('noreply@agence.fr')
        //     ->to('contact@agence.fr')
        //     ->replyTo($contact->getEmail())
        //     ->subject('Agence : ' . $contact->getProperty()->getTitle())
        //     ->text('Sending mails could be fun !')
        // ;
        $this->sendmail->send($message);
    }
}