import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import router from 'next/router'
import Loader from '../../components/basic/loader/Loader'



const Drop = () => {
    const { Moralis, enableWeb3, web3 } = useMoralis()
    const { data: feedData, error, isLoading, fetch} = useMoralisCloudFunction('getNonSentNFTs')

    const walletAddress = useSelector(state => state.user.walletAddress)

    const sendToken = async(receiver, id) => {
        if (!receiver) {
            alert('Please enter wallet address of the receipient')
            return
        }
        const options = {type: "erc721",  
            receiver: receiver,
            contractAddress: '0xB262E527ac2C2c788316421aD9129B5B3ccFfd0C',
            tokenId: id
        }
        await Moralis.transfer(options)
        .then(async (data) => {
            const ItemClass = await Moralis.Object.extend('Item')
            const query = new Moralis.Query(ItemClass).equalTo('tokenId', id)
            const results = await query.find()
            const user = JSON.parse(JSON.stringify(results))
            const objId = (user[0].objectId)
            const userObj = await new Moralis.Query(ItemClass).get(objId)
            userObj.set('nftSent', true)
            await userObj.save()
            console.log(data);
            alert(data.message)
        })
        .catch((err) => alert(err.message))

    }

    
   
    useEffect(() => {
        enableWeb3()
        if (walletAddress != 0x5D25Da9379943E88A35954dB0F5fe218f50AC00E) {
            alert('Unauthorized!')
            router.push('/feed')
        }
    }, [])

    return (
        <div>
            { isLoading ? <div className='centerDivItems'><Loader/></div> : (feedData && 
                                (
                                    feedData.length >= 1 ? 
                                        feedData.slice(0).reverse().map((res, ind) => (
                                            <li key={ind}>
                                                <p>Title: {res.title}</p>
                                                <p>Desc: {res.description}</p>
                                                <p>Artist: {res.artist}</p>
                                                <p>Buyer: {res.receiver}</p>
                                                {web3.utils.isAddress(res.receiver) ?
                                                    <button onClick={() => sendToken(res.receiver, res.id)}>Send to buyer</button>
                                                    :
                                                    <div>
                                                        <input id={`input${res.id}`} type="text" placeholder='Enter Wallet Address' />
                                                        <button onClick={() => sendToken(document.getElementById(`input${res.id}`).value, res.id)}>Send to buyer</button><span>{res.name}</span>
                                                    </div>}
                                                <hr/>
                                            </li>))
                                    :
                                    <h1>Nothing to show</h1>
                                ))
                            }
        </div>
    )
}

export default Drop
