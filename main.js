// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate Event Listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol,
        length
    );
});

// Generate Password Function
function generatePassword(upper, lower, number, symbol, length) {
    // 1 - Initialise password variable
    let generatedPassword = '';

    const typesCount = upper + lower + number + symbol;

    // console.log('typesCount: ' + typesCount);

    // 2 - Filter out unchecked types
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    // console.log(typesArr);

    if (typesCount === 0) {
        return '';
    }

    // 3 - Loop over length and call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ' + funcName);
            generatedPassword += randomFunc[funcName]();
        });
    }

    // 4 - Add final password to password variable and return
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Copy Password to Clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied');
});

// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
