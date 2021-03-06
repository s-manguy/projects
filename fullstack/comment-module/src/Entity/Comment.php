<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Entity;

use App\Controller\Api\CommentCreateController; // added by Sandrine MANGUY
use App\Controller\Api\EmptyController; // added by Sandrine MANGUY
use ApiPlatform\Core\Annotation\ApiFilter; // added by Sandrine MANGUY
use ApiPlatform\Core\Annotation\ApiResource; // added by Sandrine MANGUY
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter; // added by Sandrine MANGUY
use Doctrine\ORM\Mapping as ORM;
use function Symfony\Component\String\u;
use Symfony\Component\Serializer\Annotation\Groups; // added by Sandrine MANGUY
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="symfony_demo_comment")
 * @ApiResource(
 *      attributes={
 *          "order"={"publishedAt":"DESC"}
 *      },
 *      paginationItemsPerPage=2,
 *      normalizationContext={
 *          "groups"={"read:comment"},
 *          "openapi_definition_name"="read.collection"
 *      },
 *      collectionOperations={
 *          "GET", 
 *          "POST"={
 *              "security"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "controller"=App\Controller\Api\CommentCreateController::class,
 *              "denormalization_context"={
 *                  "groups"={"create:comment"},
 *                  "openapi_definition_name"="create"
 *              }
 *          }
 *      },
 *      itemOperations={
 *          "GET"={
 *              "normalization_context"={
 *                  "groups"={"read:comment", "read:full:comment"},
 *                  "openapi_definition_name"="read.detail"
 *              },
 *              "controller"=App\Controller\Api\EmptyController::class,
 *              "read"=false,
 *              "deserialize"=false,
 *              "openapi_context"={
 *                  "summary"="hidden",
 *              }
 *          },
 *          "PUT"={
 *              "security"="is_granted('EDIT_COMMENT', object)",
 *              "denormalization_context"={
 *                  "groups"={"update:comment"},
 *                  "openapi_definition_name"="update"
 *              }
 *          },
 *          "DELETE"={
 *              "security"="is_granted('EDIT_COMMENT', object)"
 *          }
 *      }
 * ),
 * @ApiFilter(SearchFilter::class, properties={"post":"exact"})
 *
 * Defines the properties of the Comment entity to represent the blog comments.
 * See https://symfony.com/doc/current/doctrine.html#creating-an-entity-class
 *
 * Tip: if you have an existing database, you can generate these entity class automatically.
 * See https://symfony.com/doc/current/doctrine/reverse_engineering.html
 *
 * @author Ryan Weaver <weaverryan@gmail.com>
 * @author Javier Eguiluz <javier.eguiluz@gmail.com>
 * @author Sandrine Manguy : added ApiResource(), ApiFilter(), Groups
 */
class Comment
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:comment"})
     */
    private $id;

    /**
     * @var Post
     *
     * @ORM\ManyToOne(targetEntity="Post", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:full:comment", "create:comment"})
     */
    private $post;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="comment.blank")
     * @Assert\Length(
     *     min=5,
     *     minMessage="comment.too_short",
     *     max=10000,
     *     maxMessage="comment.too_long"
     * )
     * @Groups({"read:comment", "create:comment", "update:comment"})
     */
    private $content;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Groups({"read:comment"})
     */
    private $publishedAt;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:comment"})
     */
    private $author;

    public function __construct()
    {
        $this->publishedAt = new \DateTime();
    }

    /**
     * @Assert\IsTrue(message="comment.is_spam")
     */
    public function isLegitComment(): bool
    {
        $containsInvalidCharacters = null !== u($this->content)->indexOf('@');

        return !$containsInvalidCharacters;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getPublishedAt(): \DateTime
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTime $publishedAt): void
    {
        $this->publishedAt = $publishedAt;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(User $author): void
    {
        $this->author = $author;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(Post $post): void
    {
        $this->post = $post;
    }
}
