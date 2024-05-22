const sortButton = document.getElementById('sort');

const sortInputArray = (event) => {
    event.preventDefault();

    const inputValues = [
        ...document.getElementsByClassName("values-dropdown")
    ].map((dropdown ) => Number(dropdown.value)); 
    // .getElementsByClassName() returns an array-like object. The spread operator is used to convert it into an array.
    // .map() iterate on each value. Number() transforms string value to number value.

    // const sortedValues = bubbleSort(inputValues);
    // const sortedValues = selectionSort(inputValues);
    // const sortedValues = insertionSort(inputValues);
    const sortedValues = inputValues.sort((a, b) => {
        return a - b;
    });

    updateUI(sortedValues); 
    
};

const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;
    });
};

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length -1; j++) {
            // This loop should iterate through every element in the array except the last one. 
            // console.log(array, array[j], array[j+1]) // For debugging

            if (array[j] > array[j+1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
};

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            // This loop needs to start at the index after i and iterate through the rest of the array.

            // console.log(array, array[j], array[minIndex]); // to display all the steps of the sorting

            if (array[j] < array[minIndex]) {
                minIndex = j;
            };
        }

        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    return array;
};

const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        const currValue = array[i];
        let j = i-1;

        while (j >= 0 && array[j] > currValue) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = currValue;
    }

    return array;
  }

sortButton.addEventListener('click', sortInputArray);
