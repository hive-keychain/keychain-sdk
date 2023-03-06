import { KeychainRequestTypes } from 'hive-keychain-commons';

const fromCodeToText = (formParams: any, requestType: KeychainRequestTypes) => {
  if (!requestType) return;
  const capitalized =
    requestType[0].toUpperCase() +
    requestType.substring(1, requestType.length) +
    (requestType === KeychainRequestTypes.custom ? 'JSON' : '');
  const requestCapitalizedName = `Request${capitalized}`;
  const requestConstName = `request${capitalized}`;

  const requestObjectCall = !formParams.data
    ? `await sdk.${requestType}(formParamsAsObject as ExcludeCommonParams<${requestCapitalizedName}>);`
    : `await sdk.${requestType}(formParamsAsObject.data as ExcludeCommonParams<${requestCapitalizedName}>, formParamsAsObject.options);`;

  return `try {
      const sdk = new KeychainSDK(window);
      const formParamsAsObject = ${JSON.stringify(formParams)};
      const ${requestConstName} = ${requestObjectCall};
      console.log({ ${requestConstName} });
    } catch (error) {
      console.log({ error });
    }`;
};

export const Utils = { fromCodeToText };
