//Ethereum Personal Sign
//Ethereum Personal Sign is the signing mechanism used by Polybase (and many other dapps) to authenticate ownership of a public key and to sign data.

import { Auth } from '@polybase/auth'

const auth = new Auth()

const signatureHex = await auth.ethPersonalSign(data)
