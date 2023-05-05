import { Polybase } from '@polybase/client'
import { ethPersonalSign } from '@polybase/eth'
import { secp256k1 } from '@polybase/util'

async function createWallet () {
  // First time the user signs up to your dapp (generate key AKA wallet)
  const { privateKey, publicKey } = await secp256k1.generateKeyPair()

  const db = new Polybase({ defaultNamespace: "360nft" })

  // Add data with publicKey that will own the record
  db.collection('360nft/Playlist').record('track').call("set", [{
    genre: 'Trap',
    playlist: 'TrapCity',
  }])

  // Add signer fn
  db.signer(async (data: string) => {
    return { h: 'eth-personal-sign', sig: ethPersonalSign(privateKey, data) }
  })

  return { privateKey, publicKey }
}
