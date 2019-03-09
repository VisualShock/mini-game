class Game{
    constructor(arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' ']){
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
        valueArr.sort( (a,b) => Math.random() - 0.5 );
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
        if (patternWin === resultGame || patternWin2 === resultGame || patternWin3 === resultGame) {
            document.querySelector('.modalWrap').style.display = 'flex';
        }
    }
    moveElem(){
            const currentElem = this;
            let $items = document.querySelectorAll('td'),
                currentElemPos = +currentElem.id,
                currentElemVal = currentElem.innerHTML;
            let topElem,
                topElemVal,
                bottomElem,
                bottomElemVal,
                rightElem,
                rightElemVal,
                leftElem,
                leftElemVal;

            /*_________TOP CHECK___________*/ 
            if ($items[currentElemPos - 4]) {
                topElem = $items[currentElemPos - 4];
                topElemVal = topElem.innerHTML;
            }

            if (topElemVal == ' ') {
                topElem.innerHTML = currentElemVal;
                currentElem.innerHTML = topElemVal;
            }

            /*_______________BOTTOM CHECK__________ */

             if ($items[currentElemPos + 4]) {
                bottomElem = $items[currentElemPos + 4];
                bottomElemVal = bottomElem.innerHTML;
             }

             if (bottomElemVal == ' ') {
                 bottomElem.innerHTML = currentElemVal;
                 currentElem.innerHTML = bottomElemVal;
             }

             /*___________RIGHT CHECK______________*/

             if ($items[currentElemPos + 1]) {
                if (!($items[currentElemPos + 1].id % 4 == 0)) {
                    rightElem = $items[currentElemPos + 1];
                    rightElemVal = rightElem.innerHTML;
                }
             }

             if (rightElemVal == ' ') {
                 rightElem.innerHTML = currentElemVal;
                 currentElem.innerHTML = rightElemVal;
             }

             /*_________LEFT CHECK_____________ */

             if ($items[currentElemPos - 1]) {
                 if (!($items[currentElemPos - 1].id % 4 == 3)) {
                    leftElem = $items[currentElemPos - 1];
                    leftElemVal = leftElem.innerHTML;
                 }
             }
             
             if (leftElemVal == ' ') {
                 leftElem.innerHTML = currentElemVal;
                 currentElem.innerHTML = leftElemVal;
             }
             myGame.checkWin();
        }

}
const $items = document.querySelectorAll('td');
let myGame = new Game();
document.querySelector('.shuffle').addEventListener('click', myGame.shuffle);
for (let i = 0; i < $items.length; i++) {
    $items[i].addEventListener('click', myGame.moveElem);
}
document.querySelector('.modal a').addEventListener('click', function () {
    document.querySelector('.modalWrap').style.display = 'none';
});