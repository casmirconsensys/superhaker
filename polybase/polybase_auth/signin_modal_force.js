import { Auth } from '@polybase/auth'

const auth = new Auth()

const authState = await auth.signIn({ force: true })
