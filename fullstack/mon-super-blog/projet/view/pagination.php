<!-- Display pages links -->
<div class="text-center fs-5 mt-5 mb-5">

    <!-- If there is one item at least -->
    <?php if ($numberOfPages != 0) : ?>
        <p ><strong>Page :</strong>
    <?php endif; ?>

    <!-- "first" & "previous" before the mumeric links with title in order to let the user know which previous page number will be display  -->
    <?php 
        if ($currentPage > 2) {
            $firstPage = 1;
            echo '<a href="' . $urlLink . 'page='. $firstPage . '" title="page ' . $firstPage . '" class="inline-block ps-1"><<</a>';
        }

        if ($currentPage != 1) {
            $previousPage = $currentPage - 1;
            echo '<a href="' . $urlLink . 'page='. $previousPage . '" title="page ' . $previousPage . '" class="inline-block ps-3"><</a>';
        }
    ?>
    

     <!-- links to the pages -->
    <?php
        if ($numberOfPages > $pageLinksPerPage) {
            if ($currentPage <= $pageLinksPerPage) {
                for ($i = 1; $i <= $pageLinksPerPage; $i++){
                    // if ($i == $currentPage)
                    // {
                    //     echo '<span class="inline-block ps-3"><strong>' . $i . '</strong></span>';
                    // }
                    // else
                    // {
                    //     echo '<a class="inline-block ps-3" href="' . $urlLink . 'page='. $i . '" >' . $i . '</a>';
                    // }
                    $pagination->linkAspect($i, $currentPage, $urlLink);
                }
            } elseif (
                $currentPage >= $pageLinksPerPage &&
                $currentPage <= ($numberOfPages - $numberOfLinks)
            ) {
                for ($i = ($currentPage - $numberOfLinks); $i <= ($currentPage + $numberOfLinks); $i++){
                    $pagination->linkAspect($i, $currentPage, $urlLink);
                }
            } elseif (
                $currentPage >= ($numberOfPages - $numberOfLinks) 
            ) {
                for ($i = ($currentPage - $numberOfLinks); $i <= $numberOfPages; $i++){
                    $pagination->linkAspect($i, $currentPage, $urlLink);
                }
    
            }    
        } else {
            for ($i = 1; $i <= $numberOfPages; $i++){
                $pagination->linkAspect($i, $currentPage, $urlLink);
            }
        }
    ?>

    <!--  "Next" & "Last" after the numeric links with title in order to let the user know which next page number will be display  -->
    <?php
        if ($currentPage < $numberOfPages) {
            $nextPage = $currentPage + 1;
            echo '<a class="inline-block ps-3" href="' . $urlLink . 'page='. $nextPage . '" title="page ' . $nextPage . '">></a>';
        }

        if ($currentPage < ( $numberOfPages - 2)) {
            $lastPage = $numberOfPages;
            echo '<a class="inline-block ps-3" href="' . $urlLink . 'page='. $lastPage . '" title="page ' . $lastPage . '">>></a>';
        }

        echo '</p>';
    ?>
</div>