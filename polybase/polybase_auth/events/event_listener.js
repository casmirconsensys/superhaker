import { Auth } from '@polybase/auth'

const auth = new Auth()

auth.onAuthUpdate((authState) => {
  if (authState) {
    // User is logged in, show button to dashboard
  } else {
    // User is NOT logged in, show login button
  }
})
