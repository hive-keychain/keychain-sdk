import { Asset, DynamicGlobalProperties } from '@hiveio/dhive';

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
    value
      .toString()
      .replace('HBD', '')
      .replace('HIVE', '')
      .replace('VESTS', '')
      .trim(),
    digits,
  );
};

const checkAndFormatAmount = (amount: string | Asset, digits?: number) => {
  return typeof amount === 'string'
    ? {
        amount: formatCurrencyValue(amount.split(' ')[0], digits),
        currency: amount.split(' ')[1],
      }
    : {
        amount: formatCurrencyValue(amount.amount, digits),
        currency: amount.symbol,
      };
};

const toHP = (vests: string, props?: DynamicGlobalProperties) =>
  props
    ? (parseFloat(vests) * parseFloat(props.total_vesting_fund_hive + '')) /
      parseFloat(props.total_vesting_shares + '')
    : 0;

export default {
  generateRandomString,
  formatCurrencyValue,
  checkAndFormatAmount,
  toHP,
};
