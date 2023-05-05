import lighthouse from '@lighthouse-web3/sdk'

const generateCAR = async() =>{
  const path = "C:/Users/.../test" // Give path to the file
  const apiKey = "YOUR_API_KEY"

  // Get an auth token for the data depot service
  // Note: you can use this token multiple times it expires in 20 days
  const authToken = await lighthouse.dataDepotAuth(apiKey)
  // Create CAR
  const response = await lighthouse.createCar(path, authToken.data.access_token)
  
  console.log(response)
  /*
    { data: 'Uploaded the files successfully' }
  */
}

generateCAR()