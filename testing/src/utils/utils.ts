import { Asset } from '@hiveio/dhive';

const generateRandomString = () => {
  const randomString = Math.random() + 1;
  const dictionary: { [key: string]: string } = {
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

const withCommas = (nb: string, decimals = 3) => {
  const currency = nb.split(' ')[1];

  const value = parseFloat(nb).toFixed(decimals);
  var parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let finalNumber = parts.join('.');
  if (currency) {
    finalNumber = finalNumber + ' ' + currency;
  }
  return finalNumber;
};

const formatCurrencyValue = (value: string | Asset | number, digits = 3) => {
  if (value === undefined || value === null) {
    return '...';
  }
  return withCommas(
    value.toString().replace('HBD', '').replace('HIVE', '').trim(),
    digits,
  );
};

export default { generateRandomString, formatCurrencyValue };
