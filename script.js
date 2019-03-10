/*
    Thanks for SpongeBob pic :D
    Ok OOP is here. It might be greater if you declared tile class as well
*/
class Game{
    constructor(arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' ']){
        /*
            Get cells once and store them as instance field
            don't query them every time
        */
        const $items = document.querySelectorAll('td');

        for (let i = 0; i < arr.length; i++) {
            $items[i].innerHTML = arr[i];
        }
    }  

    shuffle(){
        const $items = document.querySelectorAll('td');
        const valueArr = [];

        for (let i = 0; i < $items.length; i++) {
            valueArr.push($items[i].innerHTML);
        }

        /*
            Why don't you randomized values in the loop above
            This sort will do more iterations than 1
            alghorithm complexity is roughly O(n log n)
        */
        valueArr.sort( (a,b) => Math.random() - 0.5 );

        /*
            Creating new instance inside existing instance and overriding global
            variable that holds this instance...

            This is very obscure! Mne razorvalo shablon
        */
        myGame = new Game(valueArr);
    }

    checkWin(){
        const $items = document.querySelectorAll('td');
        const arr = [];

        for (let i = 0; i < $items.length; i++) {
            arr.push($items[i].innerHTML);
        }

        const patternWin = '123456789101112131415 ',
            patternWin2 = ' 123456789101112131415',
            patternWin3 = '159132610143711154812 ';

        let resultGame = arr.join('');

        /*
            Could use single pattern like
            const pattern = '123456789101112131415 | 123456789101112131415|159132610143711154812 ';

            if (patternWin.indexOf(resultGame) > -1) {}
        */
        if (patternWin === resultGame || patternWin2 === resultGame || patternWin3 === resultGame) {
            document.querySelector('.modalWrap').style.display = 'flex';
        }
    }

    moveElem(event){
            /*
                You declared class
                but don't keep its context inside methods

                get element from event.target and keep intance context
            */
            const currentElem = event.target;
            let $items = document.querySelectorAll('td');
            let currentElemPos = +currentElem.id;

            /*
                And we dont nee all these variables :)

                currentElemVal = currentElem.innerHTML;
            let topElem,
                topElemVal,
                bottomElem,
                bottomElemVal,
                rightElem,
                rightElemVal,
                leftElem,
                leftElemVal;
            */
        /*
            Very complicated verification
            a lot of code that can be optimized
        */
            /*_________TOP CHECK___________*/ 
            // if ($items[currentElemPos - 4]) {
            //     topElem = $items[currentElemPos - 4];
            //     topElemVal = topElem.innerHTML;
            // }

            // if (topElemVal == ' ') {
            //     topElem.innerHTML = currentElemVal;
            //     currentElem.innerHTML = topElemVal;
            // }
            this.swapCells(currentElem, $items[currentElemPos - 4]);
            /*_______________BOTTOM CHECK__________ */

             // if ($items[currentElemPos + 4]) {
             //    bottomElem = $items[currentElemPos + 4];
             //    bottomElemVal = bottomElem.innerHTML;
             // }

             // if (bottomElemVal == ' ') {
             //     bottomElem.innerHTML = currentElemVal;
             //     currentElem.innerHTML = bottomElemVal;
             // }
             this.swapCells(currentElem, $items[currentElemPos + 4]);
             /*___________RIGHT CHECK______________*/

             // if ($items[currentElemPos + 1]) {
             //    if (!($items[currentElemPos + 1].id % 4 == 0)) {
             //        rightElem = $items[currentElemPos + 1];
             //        rightElemVal = rightElem.innerHTML;
             //    }
             // }

             // if (rightElemVal == ' ') {
             //     rightElem.innerHTML = currentElemVal;
             //     currentElem.innerHTML = rightElemVal;
             // }

             if ($items[currentElemPos + 1] && $items[currentElemPos + 1].id % 4 != 0) {
                this.swapCells(currentElem, $items[currentElemPos + 1]);
             }
             /*_________LEFT CHECK_____________ */

             // if ($items[currentElemPos - 1]) {
             //     if (!($items[currentElemPos - 1].id % 4 == 3)) {
             //        leftElem = $items[currentElemPos - 1];
             //        leftElemVal = leftElem.innerHTML;
             //     }
             // }
             
             // if (leftElemVal == ' ') {
             //     leftElem.innerHTML = currentElemVal;
             //     currentElem.innerHTML = leftElemVal;
             // }

             if ($items[currentElemPos - 1] && $items[currentElemPos - 1].id % 4 != 3) {
                this.swapCells(currentElem, $items[currentElemPos - 1]);
             }

             /*
                Runs on every click
                No matter if real move was done

                refering to global variable`s method instead of calling instance method from context
             */
             this.checkWin();
        }

    swapCells(cell, testee) {
        if (testee && testee.innerHTML == ' ') {
             testee.innerHTML = cell.innerHTML;
             cell.innerHTML = ' ';
         }
    }
}

const $items = document.querySelectorAll('td');
let myGame = new Game();

document.querySelector('.shuffle').addEventListener('click', myGame.shuffle);

for (let i = 0; i < $items.length; i++) {
    $items[i].addEventListener('click', myGame.moveElem.bind(myGame));
}

document.querySelector('.modal a').addEventListener('click', function () {
    document.querySelector('.modalWrap').style.display = 'none';
});