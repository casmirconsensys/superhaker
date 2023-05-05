import { aescbc, decodeFromString, encodeToString, EncryptedDataAesCbc256 } from '@polybase/util'

export async function symmmetricEncryptString (str: string): Promise<EncryptedDataAesCbc256> {
  // This returns symmetric key as Uint8Array
  const key = aescbc.generateSecretKey()

  // Convert string value to Uint8Array so it can be encrypted
  const strDataToBeEncrypted = decodeFromString(str, 'utf8')

  // Encrypt the data, as EncryptedDataAesCbc256
  const encryptedData = await aescbc.symmetricEncrypt(key, strDataToBeEncrypted)

  // Store this data for later access
  return {
    version: encryptedData.version, // aes-cbc-256/symmetric
    nonce: encryptedData.nonce, // Uint8array
    ciphertext: encryptedData.ciphertext, // Uint8array
  }
}

export async function symmetricDecryptString (key: Uint8Array, encryptedData: EncryptedDataAesCbc256): Promise<string> {
  // Encrypt the data (as EncryptedDataAesCbc256)
  const strData = await aescbc.symmetricDecrypt(key, encryptedData)

  // Convert back from Uint8Array to string
  const str = encodeToString(strData, 'utf8')

  return str
}
