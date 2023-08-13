import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks'

function MyNFT() {
  const { data } = useNFT('0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7', '20')

  return (
    <div>
      <h3>{data.metadata.name}</h3>
      <p>{data.metadata.description}</p>
      <p>Owned by: {data.nft.owner.address}</p>
    </div>
  )
}