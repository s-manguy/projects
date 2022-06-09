<?php
    declare(strict_types=1);

    namespace App;

class Pagination
{
    public function howManyPages(int $numberOfItems, int $itemsPerPage): float 
    {
        $numberOfPages = CEIL($numberOfItems / $itemsPerPage);
        return $numberOfPages;
    }

    public function pageNumber(int $numberOfPages): int 
    {
        if (isset($_GET['page'])) {
            $currentPage = (int) $_GET['page']; 

            if ($currentPage > $numberOfPages) {
                $currentPage = $numberOfPages;
            } elseif ($currentPage < 1) {
                $currentPage = 1;
            }    
        } else {
            $currentPage = 1;
        }

        return $currentPage;
    }

    public function firstItem(int $currentPage, int $itemsPerPage): int 
    {
        $firstItem = ($currentPage - 1) * $itemsPerPage;

        return $firstItem;
    }

    public function howManyLinks(int $pageLinksPerPage): float
    {
        $numberOfLinks = FLOOR(($pageLinksPerPage -1) / 2);
        return $numberOfLinks;
    }

    public function linkAspect(int $i, int $currentPage, string $urlLink )
    {
        if ($i == $currentPage) {
            echo '<span class="inline-block ps-3"><strong>' . $i . '</strong></span>';
        } else {
            echo '<a class="inline-block ps-3" href="' . $urlLink . 'page='. $i . '" >' . $i . '</a>';
        }
    }
}

?>