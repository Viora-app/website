// import {cryptography} from '@liskhq/lisk-client';

// import {DERIVATION_PATH} from '../config/network';

export const extractCredentials = async (secret: string) => {
  // const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(
  //   secret,
  //   DERIVATION_PATH,
  // );
  // const publicKey = cryptography.ed.getPublicKeyFromPrivateKey(privateKey);
  // const address = cryptography.address.getLisk32AddressFromPublicKey(publicKey);
  console.log('secret', secret);

  return {
    address: '',
    publicKey: '',
    privateKey: '',
  };
};
