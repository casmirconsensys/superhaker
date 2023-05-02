import {
    Profile, Theme
  } from '@lens-protocol/widgets-react'
  
  <Profile
    handle="stani"
  />
  
  /* Optional parameters */
  handle: string
  ethereumAddress: string
  profileId: string
  theme: Theme (default, dark)
  onClick: () => void
  containerStyle: css style