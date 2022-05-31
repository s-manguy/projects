<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
// use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface; // deprecated
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{    
    /**
     * @var UserPasswordHasherInterface 
     */
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $user = new User;
        $user->setUsername('demo');
        // $user->setPassword($this->encoder->encodePassword($user, 'demo'));
        $user->setPassword($this->encoder->hashPassword($user, 'demo'));
        $manager->persist($user);
        $manager->flush();
    }

    
}
