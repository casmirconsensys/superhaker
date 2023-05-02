import {
    ShareToLens, Theme, Size
  } from '@lens-protocol/widgets-react'
  
  <ShareToLens
    content="Hello World!"
  />
  
  /* Optional parameters */
  url: string = "https://your-awesome-app.com"
  hashtags: string = "web3,social,blockchain"
  via: string =  "YourAwesomeApp"
  title: string = "Share your post on Lens 🌿"
  theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
  size: Size (small, medium, large)