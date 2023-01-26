"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomString = () => {
    const randomString = Math.random() + 1;
    const dictionary = {
        '0': 'A',
        '1': 'Keychain-',
        '2': 'x',
        '3': 'E',
        '4': 'S',
        '5': 's',
        '6': 'l',
        '7': '#',
        '8': 'P',
        '9': '&',
        '.': 'SDK Login',
    };
    return randomString
        .toString()
        .split('')
        .map((char) => dictionary[char])
        .join('');
};
exports.default = { generateRandomString };
