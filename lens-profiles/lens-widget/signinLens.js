import {
    SignInWithLens, Theme, Size
  } from '@lens-protocol/widgets-react'
  
  async function onSignIn(tokens, profile) {
    console.log('tokens: ', tokens)
    console.log('profile: ', profile)
  }
  
  <SignInWithLens
    onSignIn={onSignIn}
  />
  
  /* Optional parameters */
  provider: Provider
  title: string
  theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
  size: Size (small, medium, large)