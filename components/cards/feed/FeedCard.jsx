import Button from '../../basic/button/Button'
import styles from './FeedCard.module.css'
import fonts from '../../../styles/Fonts.module.css'
import { setStreamUrl } from '../../../features/redux/player-slice'
import { useDispatch, useSelector} from 'react-redux'
import {useState, useRef} from 'react'
import { useMediaQuery } from 'react-responsive'
import { useMoralis } from 'react-moralis'
import { marketPlaceABI } from '../../../public/contract/abi'
import { useNotification } from 'quick-react-notification'
import router from 'next/router'
import { PayPalButton } from 'react-paypal-button-v2';
import Link from 'next/dist/client/link'

const clientId = '';
const currency = 'USD';


const FeedCard = ({ feed }) => {

    const { Moralis, enableWeb3, web3 } = useMoralis()
    const { showNotification } = useNotification();

    const [showAll, setShowAll] = useState(false)
    const dispatch = useDispatch()
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const [buying, setBuying] = useState(false)

    const buyItem = async (id, email, fname) => {
        setBuying(true)
        const ItemClass = await Moralis.Object.extend('Item')
        const query = new Moralis.Query(ItemClass).equalTo('tokenId', id)
        const results = await query.find()
        const user = JSON.parse(JSON.stringify(results))
        const objId = (user[0].objectId)
        const userObj = await new Moralis.Query(ItemClass).get(objId)
        userObj.set('buyerEmail', email)
        userObj.set('buyerName', fname)
        await userObj.save()
        setBuying(false)
        router.reload()
    }

    const payWithWallet = async (id) => {
        await enableWeb3()
        await Moralis.getChainId().then(async (data) => {
            if (data === 1 || data === 56)
            {
                let amount = '0.00031'
                if (data === 56) amount = '0.0023'
                const options = {type: 'native', amount: Moralis.Units.ETH(amount), receiver: '0xa63F77c709e87E0d1CaC383137C568D7835d9103'}
                let result = await Moralis.transfer(options)
                    .then(async (data) => {
                        buyItem(id, data.from, 'none')
                    })
                    .catch(async(error) => {
                            showNotification({type: 'error', message: error.message})
                    })
            }
            else
                showNotification({type: 'error', message: 'Make sure you are on ETH or BNB Network'})
        }).catch(async(error) => {
            showNotification({type: 'error', message: 'Crypto wallet client not found'})
        })
    }

    // const buyItem = async (id, price) => {
    //     Moralis.Web3.authenticate({signingMessage:'Trapchain Authentication'}).then(async (user) => {
    //         await Moralis.getChainId().then(async (data) => {
    //             chainId.current = data
    //             switch (chainId.current) {
    //                 case 3:
    //                     MARKETPLACE_CONTRACT_ADDRESS.current = web3.utils.toChecksumAddress('0x941569323CdE0F2AA6ECd3965d7f5Ce75d93cF7a') //ROPSTEN TESTNET
    //                     break;
    //                 case 19877346431401:
    //                     MARKETPLACE_CONTRACT_ADDRESS.current = web3.utils.toChecksumAddress('0xF91e3F6438dbA8C42612958CAe9b88bCE8dAC55E') //SKALE TESTNET
    //                     break;
    //             }
    //             console.log(MARKETPLACE_CONTRACT_ADDRESS.current);
    //             const marketPlaceContract = new web3.eth.Contract(marketPlaceABI, MARKETPLACE_CONTRACT_ADDRESS.current)
    //             const receipt = await marketPlaceContract.methods.buyItem(id).send({from: walletAddress, value: price})
    //             console.log(receipt);
    //         })
    //     })
    // }options={{ currency, clientId, disableFunding: 'credit' }}


    return (      
         isPortrait ?
            <div style={{color: 'white'}} className={`${styles.cardContainer} ${fonts.mont}`}>
                <div className={styles.metaContainer}>
                    {
                        feed && (feed.fileType.startsWith('audio') ? 
                        (
                            <img className={`${styles.playlistArt}`} src={feed.albumArt?._url} onClick={() => dispatch(setStreamUrl(feed.image))}/>
                        )
                        : 
                        (feed.fileType.startsWith('video') ? 
                            <video className={styles.playlistArt} muted autoPlay={1} loop={1} src={feed.image}></video>
                            :
                            <img className={styles.playlistArt} src={feed.image}/>
                        )
                    ) 
                    }
                    <div className={styles.metaText}>
                        <div className={styles.topRowContainer}>
                            <p className={`${feed.feedType == 'Token' ? styles.badgeToken : styles.badgePlaylist} ${styles.badge}`}>{feed.feedType}</p>
                            <Button type='secondary' iconOpacity={1} iconClass='icon-kebab-horizontal' onClick={() => router.push(feed.metapath)}/>
                        </div>
                        <h3 className={styles.playlistTitle}>{feed.title} {feed.artist && <span className={styles.artist}>{feed.artist}</span>}</h3>
                        <h4 className={styles.username}>{feed.username}</h4>
                        <h5 className={styles.username} style={{marginBottom: '28px'}}>{feed.description.slice(0, 35)}...</h5>
                    </div>
                    
                </div>
                <div className={styles.bottomRowContainer}>
                            {/* {feed.subscribelink ? 
                                <Button bg='teal' type='secondary' isOutline={1} text='Subscribe'/> :
                                <Button type='secondary' isOutline={1} onClick={() => buyItem(feed.id, Moralis.Units.FromWei(feed.price))}>
                                    <span style={{fontSize: '14px', whiteSpace: 'nowrap'}}>{`${feed.price} ${feed.currency}`}</span>
                                </Button>
                            } */}
                            {/* <div style={{marginRight: '16px'}}></div>
                            <Button type='secondary'isOutline={1} iconOpacity={1} iconClass='icon-share'>
                                <span style={{fontSize: '14px'}}>{feed.total}</span>
                            </Button>
                            <div style={{marginRight: '16px'}}></div>
                            <Button type='secondary' isOutline={1} iconOpacity={1} iconClass='icon-favorite-border'>
                                <span style={{fontSize: '14px'}}>{feed.likes}</span>
                            </Button> */}
                </div>
                <div style={{marginBottom: '16px'}}></div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <PayPalButton amount='10.00' currency={currency} catchError={(err) => showNotification({type: 'error', message: err})} options={{ currency, clientId, disableFunding: 'credit' }} shippingPreference='NO_SHIPPING'
                        onSuccess={(details, data) => {
                            showNotification({type: 'success', message: 'Transaction completed by ' + details.payer.name.given_name})
                            buyItem(feed.id, details.payer.email_address, details.payer.name.given_name)
                        }}
                        onError={(err) => showNotification({type: 'error', message: err})                    }
                    />
                    <Button type='secondary' isOutline={1} text='Pay With Crypto' onClick={() => payWithWallet(feed.id)}/>
                    </div>
                {feed.feedType === 'Playlist' &&
                <>
                    {feed.playlist.slice(0, showAll ? feed.playlist.length: 3).map((item) => (
                        <div key={item.id}>
                            <div className={styles.playlistToken}>
                                <p className={styles.trackNumber}>{item.id}</p>
                                <p className={styles.trackTitle}>{item.title}</p>
                                <p className={styles.trackDuration}>{item.duration}</p>
                            </div>
                        </div>
                    ))}
                    
                    {!showAll && <button type='button' onClick={()=> setShowAll(true)} className='btn btn-secondary btn-block playlist-view-more'>View {feed.playlist.length} tokens</button>}
                    {/* {!showAll && <Button type='secondary' bg='common' onClick={()=> setShowAll(true)} text={`View ${pl.length} tokens`} className={`btn btn-secondary btn-lg btn-block ${styles.playlistViewMore}`}/>} */}
                </>
                }
            </div>

            :
            
            <div style={{color: 'white'}} className={`${styles.cardContainer} ${fonts.mont}`}>
                <div className={styles.metaContainer}>
                    {
                        feed && (feed.fileType.startsWith('audio') ? 
                                    (
                                        <img className={`${styles.playlistArt}`} src={feed.albumArt?._url} onClick={() => dispatch(setStreamUrl(feed.image))}/>
                                    )
                                    : 
                                    (feed.fileType.startsWith('video') ? 
                                        <video className={styles.playlistArt} muted autoPlay={1} loop={1} src={feed.image}></video>
                                        :
                                        <img className={styles.playlistArt} src={feed.image}/>
                                    )
                                ) 
                    }
                    <div className={styles.metaText}>
                        <div className={styles.topRowContainer}>
                            <p className={`${feed.feedType == 'Token' ? styles.badgeToken : styles.badgePlaylist} ${styles.badge}`}>{feed.feedType}</p>
                            <Button type='secondary' iconOpacity={1} iconClass='icon-kebab-horizontal' onClick={() => router.push(feed.metapath)}/>
                        </div>
                        <h3 className={styles.playlistTitle}>{feed.title} {feed.artist && <span className={styles.artist}>{feed.artist}</span>}</h3>
                        <h4 className={styles.username}>{feed.username}</h4>
                        <h5 className={styles.username} style={{marginBottom: '28px'}}>{feed.description}</h5>
                        <div className={styles.bottomRowContainer}>
                            {/* {feed.subscribelink ? 
                                <Button bg='teal' type='secondary' isOutline={1} text='Subscribe to see user&apos;s posts'/> :
                                <Button type='secondary' isOutline={1} text={`${feed.price} ${feed.currency}`} onClick={() => buyItem(feed.id, Moralis.Units.FromWei(feed.price))}/>
                               
                            } */}
                            {/* <div className='spacer'></div>
                            <Button type='secondary' marginRight='24px' isOutline={1} iconOpacity={1} iconClass='icon-share' text={feed.total}/>
                            <Button type='secondary' isOutline={1} iconOpacity={1} iconClass='icon-favorite-border' text={feed.likes}/> */}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <PayPalButton amount='10.00' currency={currency} catchError={(err) => showNotification({type: 'error', message: err})} options={{ currency, clientId, disableFunding: 'credit' }} shippingPreference='NO_SHIPPING'
                        onSuccess={(details, data) => {
                            showNotification({type: 'success', message: 'Transaction completed by ' + details.payer.name.given_name})
                            buyItem(feed.id, details.payer.email_address, details.payer.name.given_name)
                        }}
                        onError={(err) => showNotification({type: 'error', message: err})
                        
                    }
                    />
                    <Button type='secondary' isOutline={1} text='Pay With Crypto' onClick={() => payWithWallet(feed.id)}/>
                    </div>
                </div>

                {feed.feedType === 'Playlist' &&
                <>
                    {feed.playlist.slice(0, showAll ? feed.playlist.length: 3).map((item) => (
                        <div key={item.id}>
                            <div className={styles.playlistToken}>
                                <p className={styles.trackNumber}>{item.id}</p>
                                <p className={styles.trackTitle}>{item.title}</p>
                                <p className={styles.trackDuration}>{item.duration}</p>
                            </div>
                        </div>
                    ))}
                    
                    {!showAll && <button type='button' onClick={()=> setShowAll(true)} className='btn btn-secondary btn-lg btn-block playlist-view-more'>View {feed.playlist.length} tokens</button>}
                    {/* {!showAll && <Button type='secondary' bg='common' onClick={()=> setShowAll(true)} text={`View ${pl.length} tokens`} className={`btn btn-secondary btn-lg btn-block ${styles.playlistViewMore}`}/>} */}
                </>

                }
            </div>

    )
}

export default FeedCard

//Get Mime Type

// import React, { useState } from 'react';
// import './styles.css';
// import FileType from 'file-type/browser';

// export default function App() {
//   const [mimeType, setMimeType] = useState('-');
//   const [mimeTypeMN, setMimetypeMN] = useState('-');
//   const url =
//     'https://ipfs.moralis.io:2053/ipfs/QmfLm1xL9hSHzpfWQ68aZurKkJyuNFyubRRcFHamS72kDN';

//   const changeHandler = (event) => {
//     (async () => {
//       const response = await fetch(url);
//       const fileType = await FileType.fromStream(response.body);
//       setMimeType(fileType.mime);
//       setMimetypeMN(fileType.ext);
//       //=> {ext: 'jpg', mime: 'image/jpeg'}
//     })();
//   };

//   return (
//     <div className='App'>
//       <h1>File type checker</h1>
//       <input type='file' name='file' onChange={changeHandler} />
//       <p>Mime type using object type: {mimeType}</p>
//       <p>Mime type using magic numbers: {mimeTypeMN}</p>
//     </div>
//   );
// }
