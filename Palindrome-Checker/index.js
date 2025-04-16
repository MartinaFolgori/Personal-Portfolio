// https://palindrome-checker.freecodecamp.rocks/
/* 
You should have an input element with an id of "text-input".
You should have a button element with an id of "check-btn".
You should have a div, span or p element with an id of "result".
When you click on the #check-btn element without entering a value into the #text-input element, an alert should appear with the text Please input a value.

When the #text-input element only contains the letter A and the #check-btn element is clicked, the #result element should contain the text A is a palindrome.
When the #text-input element contains the text eye and the #check-btn element is clicked, the #result element should contain the text eye is a palindrome.
When the #text-input element contains the text _eye and the #check-btn element is clicked, the #result element should contain the text _eye is a palindrome.
When the #text-input element contains the text race car and the #check-btn element is clicked, the #result element should contain the text race car is a palindrome.
When the #text-input element contains the text not a palindrome and the #check-btn element is clicked, the #result element should contain the text not a palindrome is not a palindrome.
When the #text-input element contains the text A man, a plan, a canal. Panama and the #check-btn element is clicked, the #result element should contain the text A man, a plan, a canal. Panama is a palindrome.
When the #text-input element contains the text never odd or even and the #check-btn element is clicked, the #result element should contain the text never odd or even is a palindrome.
When the #text-input element contains the text nope and the #check-btn element is clicked, the #result element should contain the text nope is not a palindrome.
When the #text-input element contains the text almostomla and the #check-btn element is clicked, the #result element should contain the text almostomla is not a palindrome.
When the #text-input element contains the text My age is 0, 0 si ega ym. and the #check-btn element is clicked, the #result element should contain the text My age is 0, 0 si ega ym. is a palindrome.
When the #text-input element contains the text 1 eye for of 1 eye. and the #check-btn element is clicked, the #result element should contain the text 1 eye for of 1 eye. is not a palindrome.
When the #text-input element contains the text 0_0 (: /-\ :) 0-0 and the #check-btn element is clicked, the #result element should contain the text 0_0 (: /-\ :) 0-0 is a palindrome.
When the #text-input element contains the text five|\_/|four and the #check-btn element is clicked, the #result element should contain the text five|\_/|four is not a palindrome.
Fulfill the user stories and pass all the tests below to complete this project. Give it your own personal style. Happy Coding!
*/

// associo id
let checkBtn = document.querySelector('#check-btn');
let textInput = document.querySelector('#text-input');
let result = document.querySelector('#result');

// funzione al click del btn
checkBtn.addEventListener('click', () => {

    // salvo in variabile
    let input = textInput.value;

    // .trim() per rimozione di eventuali spazi iniziali/finali
    // se input è vuoto allora alert
    if (input.trim() === '') {
        alert('Please input a value');
        return;
    }

    // .replace() per rimozione di eventuali caratteri alfanumerici e simboli
    // toLowerCase() per considerare in minuscolo anche eventuale maiuscolo
    let cleaned = input.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    // .split('') per dividere stringa in array di lettere separando quindi ogni singolo carattere e creando un array es. ciao ["c", "i", "a", "o"]
    // .reverse() per invertire l'ordine degli elementi dell'array es. ciao ["o", "a", "i", "c"]
    // .join('') per riunire lettere invertite della stringa in una nuova stringa es. oaic
    // questo perché se una parola è uguale all'inverso allora è un palindromo es anna
    let reversed = cleaned.split('').reverse().join('');

    // per confrontare testo con il suo inverso, se uguali è un palindrono se diversi non è un palindromo
    let isPalindrome = cleaned === reversed;

    // per verificare il risultato
    if (isPalindrome) {
        result.textContent = `${input} is a palindrome`;
    } else {
        result.textContent = `${input} is not a palindrome`;
    }

});
