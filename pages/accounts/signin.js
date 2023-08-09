/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setPic, setWalletAddress, setUName, setName, setEmail } from '../../features/redux/user/user-slice';
// import { useMoralis } from 'react-moralis';
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { setMoralisUserName, setUserLoggedIn } from '../../features/redux/user/user-slice'

import Layout from '../../components/Layout';
import LAccountsCol from '../../components/sections/LAccountsCol';
import RAccountsCol from '../../components/sections/racol/RAccountsCol';
import fonts from '../../styles/Fonts.module.css';
import Button from '../../components/basic/button/Button';
import styles from '../../styles/Accounts.module.css';
import Loader from '../../components/basic/loader/Loader';
import { useMediaQuery } from 'react-responsive';


const SignIn = () => {
   
    const router = useRouter()
    const dispatch = useDispatch()
    // const { authenticate, isAuthenticating, isAuthenticated, authError, user: moralisUser, Moralis } = useMoralis()
    // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
    const options = {
        clientId: process.env.YOUR_WEB3_AUTH_CLIENT_ID, // https://dashboard.web3auth.io/,
        web3AuthNetwork: 'testnet',
        chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x5',
            rpcTarget: 'https://rpc.ankr.com/eth_goerli'
        },
        uiConfig: {
            theme: 'dark',
            loginMethodsOrder: ['google', 'facebook']
        }
    };
    
        // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
    const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
        label: 'torus',
        showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
        label: 'metamask',
        showOnDesktop: true,
        showOnMobile: false
        }
    }

    const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      });
      
    let mUname = ''//replace Moralis
    // useEffect( async () => {
    //     if (isAuthenticated) {
    //         mUname = moralisUser.get('username')
    //         dispatch(setMoralisUserName(mUname))
    //         dispatch(setWalletAddress(moralisUser.get('ethAddress')))
    //         const UserClass = await Moralis.Object.extend('User')
    //         const query = new Moralis.Query(UserClass).equalTo('username', mUname)
    //         const results = await query.find()
    //         const user = JSON.parse(JSON.stringify(results))
    //         const objId = (user[0].objectId)
    //         const userObj = await new Moralis.Query(UserClass).get(objId)
    //         const trapUsername = userObj.get('trapUsername')
    //         if (trapUsername) {
    //             dispatch(setUserLoggedIn(true))
    //             const image = userObj.get('avatar')
    //             const name = userObj.get('name')
    //             const email = userObj.get('email')
    //             image && dispatch(setPic(image?._url))
    //             dispatch(setName(name))
    //             dispatch(setUName(trapUsername))
    //             email && dispatch(setEmail(email))
    //             // const returnUrl = router.query.r || '/feed';
    //             // console.log(returnUrl)
    //             router.push('/feed')
    //         } else
    //             router.push('/accounts/signup')
    //     }
    
    // }, [])

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    return (
        <>
            <Layout backgroundImage='signin'>


            
                {/* { !isAuthenticated ? */}
                    <div className='row'>
                        <LAccountsCol logo='../images/accounts/360in.svg' image='../images/accounts/sign-in-banner.jpg' alt=''/>
                        <RAccountsCol>
                            <>
                                {/* { authError && <Alert variant='danger'>
                                                    <Alert.Heading>Authentication has failed</Alert.Heading>
                                                    <p>{authError.message}</p>
                                                </Alert>
                                } */}
                                <h1 className={`color-primary ${fonts.druk}`} style={{marginBottom: 32}}>
                                    LOG IN
                                    <br/>
                                    <span className={`color-accent-blue ${fonts.gilroy}`}>360 </span>NFT 
                                </h1>
                                {isPortrait ?
                                    <div className={styles.buttonsContainerMobile}>
                                        <Button type='social' bg='google' iconClass='icon-metamask'>
                                            <span style={{paddingLeft: 12}}>Log in with Metamask</span>
                                        </Button>
                                        {/* <Button onClick={() => authenticate({ signingMessage: "Trapchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                                {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                                : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                        </Button> */}
                                        <div style={{paddingBottom: '10px'}} ></div>
                                        <Button isLink={1} href='https://www.facebook.com/nftrapchain' type='social' bg='facebook' iconClass='icon-facebook'>
                                            <span style={{paddingLeft: 12}}>Visit us on Facebook</span>
                                        </Button>
                                        <div style={{paddingBottom: '10px'}} ></div>
                                        <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'>
                                            <span style={{paddingLeft: 12}}>Join us on Discord</span>
                                        </Button>
                                        <div style={{paddingBottom: '10px'}} ></div>
                                        <Button isLink={1} href='https://twitter.com/nftrapchain' type='social' bg='twitter' iconClass='icon-twitter'>
                                            <span style={{paddingLeft: 12}}>Visit us on Twitter</span>
                                        </Button>
                                    </div>
                                    :
                                <div className={styles.buttonsContainer}>
                                    {/* <Button onClick={() => authenticate({ signingMessage: "Trapchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                            {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                            : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                    </Button> */}
                                    <Button type='social' bg='google' iconClass='icon-metamask'>
                                        <span style={{paddingLeft: 12}}>Log in with Metamask</span>
                                    </Button>
                                    <span className='margin-right-wide'></span>
                                    <Button isLink={1} href='https://www.facebook.com/nftrapchain' type='social' bg='facebook' iconClass='icon-facebook'/>
                                    <span className='margin-right-wide'></span>
                                    <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'/>
                                    <span className='margin-right-wide'></span>
                                    <Button isLink={1} href='https://twitter.com/nftrapchain' type='social' bg='twitter' iconClass='icon-twitter'/>
                                </div>
                                }
                            </>
                        </RAccountsCol>
                    </div>
                    :
                    <div className='centerDivItems' style={{flexDirection: 'column', height: '100vh'}}>
                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300, paddingTop: '50px'}}>Signing You In</h1>
                        <br/>
                        <Loader/>
                    </div>
                {/* } */}
            </Layout>
        </>
    )
}

export default SignIn
