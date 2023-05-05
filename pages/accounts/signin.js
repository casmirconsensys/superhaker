import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import fonts from '../../styles/Fonts.module.css'
import Button from '../../components/basic/button/Button'
import styles from '../../styles/Accounts.module.css'
// import Loader from '../../components/basic/loader/Loader';
import LAccountsCol from '../../components/LAccountsCol'
import RAccountsCol from '../../components/sections/racol/RAccountsCol'
import { useMediaQuery } from 'react-responsive'
import { LoginButton } from '@lens-protocol/react-web'

const Signin = () => {

    const router = useRouter()
    const dispatch = useDispatch()

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
                                <Button className= 'lens-signin'type='social' bg='google' iconClass='icon-metamask'>
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
                            {/* <Button isLink={1} href='https://www.facebook.com/nftrapchain' type='social' bg='facebook' iconClass='icon-facebook'/> */}
                            {/* <LoginButton/> */}
                            <span className='margin-right-wide'></span>
                            <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'/>
                            <span className='margin-right-wide'></span>
                            <Button isLink={1} href='https://twitter.com/nftrapchain' type='social' bg='twitter' iconClass='icon-twitter'/>
                        </div>
                        }
                    </>
                </RAccountsCol>
            </div>

        </Layout>
    </>
  )
}

export default Signin