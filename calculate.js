const digits = {
    'C': 100,
    'XC': 90,
    'L': 50,
    'XL': 40,
    'X': 10,
    'IX': 9,
    'V': 5,
    'IV': 4,
    'I': 1
}

function stringValidation (string) {
    let letters = /[^IVXLC0-9+*\/-\s]/g
    if ([...string.matchAll(letters)].length >= 1) {
        throw new Error ("Используются некорректные символы")
    }
}

function getOperation (string) {
    const result = string.match(/[+*\/-]/g)
        if (result == null) {
            throw new Error('Это не математическая операция')
        }
    return result[0]
}

function getNums (string) {
    return string.split(/[+*\/-]/g).map(num => num.trim())
}

function romanToArab (string) {
    return string.split('').reduce((prevVal, currVal, i, arr) => {
        const [a, b, c] = [
            digits[arr[i]],
            digits[arr[i + 1]],
            digits[arr[i+ 2]]
        ]
        return b > a ? prevVal - a : prevVal + a;
    }, 0)
}

function arabToRoman(num) {
    let result = '';
    for (let key in digits)
        while (digits[key] <= num) {
            result += key;
            num -= digits[key];
        }
        return result;
}

function isRoman (string) {
    const letters = /^[IVXLC]+$/
    let arrNums = string.split(/[+*\/-]/g).map(num => num.trim())
    if (arrNums.length !== 2) {
        throw new Error ('Должно быть 2 операнда и 1 оператор')
    }
    var countRoman = arrNums.reduce((prevVal, currVal) => prevVal + letters.test(currVal), 0)
    if (countRoman === 1) {
        throw new Error ('Оба числа должны быть римскими или арабскими')
    } else if (countRoman === 2) {
    return true 
    } else {
        return false
    }
}

function sum (nums) {
    return nums.reduce((a, b) => a + b)
}

function mult (nums) {
    return nums.reduce((a, b) => a * b)
}

function division (nums) {
    return Math.floor(nums.reduce((a, b) => a / b))
}

function substraction (nums) {
    return nums.reduce((a, b) => a - b)
}

function checkOperation (str, nums) {
    let result ;
    if ( str === '+') {
       result = sum(nums)
    } else if(str === '*') {
        result =  mult(nums)
    } else if(str === '/') {
        result = division(nums)
    } else if(str === '-') {
        result = substraction(nums)
    }
    return result
}

function calculate (string) {
    const isValid = stringValidation (string)
    const operation = getOperation(string)
    let nums = getNums(string)
    const roman = isRoman(string)
    if (roman) {
        nums = nums.map(num => romanToArab(num))
    }
    nums = nums.map(num =>  +num)
    if (nums.some(num => num < 1 || num > 10)) {
        throw new Error ('Допускаются операнды от 1 до 10 включительно')
    }
    const result = checkOperation(operation, nums)
    return roman === false ? result.toString() : arabToRoman(result)
}
