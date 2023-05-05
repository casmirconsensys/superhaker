import { Auth } from '@polybase/auth'

const auth = new Auth()

db.signer(async (data) => {
  return {
    h: 'eth-personal-sign',
    sig: await auth.ethPersonalSign(data)
  }
})
