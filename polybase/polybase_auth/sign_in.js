import { Auth } from '@polybase/auth'

const auth = new Auth()

// Show the login modal (if not logged in), and wait for a response
const authState = await auth.signIn()

//Get Public Key with Metamask
//Metamask does not currently provide the publicKey directly but it can be obtained by signing a request.



const msg = 'Login to app'
const sig = await auth.ethPersonalSign(msg)
const publicKey = ethPersonalSignRecoverPublicKey(sig, msg)
