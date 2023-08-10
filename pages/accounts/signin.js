/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setPic, setWalletAddress, setUName, setName, setEmail } from '../../features/redux/user/user-slice';
import { Web3AuthModalPack, Web3AuthConfig, CHAIN_NAMESPACES } from '@safe-global/auth-kit';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../../features/redux/user/user-slice';
import Layout from '../../components/Layout';
import LAccountsCol from '../../components/sections/LAccountsCol';
import RAccountsCol from '../../components/sections/racol/RAccountsCol';
import fonts from '../../styles/Fonts.module.css';
import Button from '../../components/basic/button/Button';
import styles from '../../styles/Accounts.module.css';
import Loader from '../../components/basic/loader/Loader';
import { useMediaQuery } from 'react-responsive';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// import { useTheGraph } from '@theGraph/client';

    const SignIn = () => {
        const address = useAddress();

            return (
                <>
                <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
                <YourApp />
                <div>
                <ConnectWallet />
                <div>
                <p>Address: {address}</p>
                </div>
                </div>
                </ThirdwebProvider>

                
               
                    <Layout backgroundImage='signin'>
                

                
                    {/* { !isAuthenticated ? */}
                        <div className='row'>
                            <LAccountsCol logo='../images/accounts/theGraphin.svg' image='../images/accounts/sign-in-banner.jpg' alt=''/>
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
                                        <span className={`color-accent-blue ${fonts.gilroy}`}>theGraph </span>NFT 
                                    </h1>
                                    {isPortrait ?
                                        <div className={styles.buttonsContainerMobile}>
                                            <Button type='social' bg='google' iconClass='icon-metamask'>
                                                <span style={{paddingLeft: 12}}>Log in with Metamask</span>
                                            </Button>
                                            {/* <Button onClick={() => authenticate({ signingMessage: "theGraphchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                                    {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                                    : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                            </Button> */}
                                            <div style={{paddingBottom: '10px'}} ></div>
                                            <Button isLink={1} href='https://www.facebook.com/nftheGraphchain' type='social' bg='facebook' iconClass='icon-facebook'>
                                                <span style={{paddingLeft: 12}}>Visit us on Facebook</span>
                                            </Button>
                                            <div style={{paddingBottom: '10px'}} ></div>
                                            <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'>
                                                <span style={{paddingLeft: 12}}>Join us on Discord</span>
                                            </Button>
                                            <div style={{paddingBottom: '10px'}} ></div>
                                            <Button isLink={1} href='https://twitter.com/nftheGraphchain' type='social' bg='twitter' iconClass='icon-twitter'>
                                                <span style={{paddingLeft: 12}}>Visit us on Twitter</span>
                                            </Button>
                                        </div>
                                        :
                                    <div className={styles.buttonsContainer}>
                                        {/* <Button onClick={() => authenticate({ signingMessage: "theGraphchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                                {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                                : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                        </Button> */}
                                        <Button type='social' bg='google' iconClass='icon-metamask'>
                                            <span style={{paddingLeft: 12}}>Log in with Metamask</span>
                                        </Button>
                                        <span className='margin-right-wide'></span>
                                        <Button isLink={1} href='https://www.facebook.com/nftheGraphchain' type='social' bg='facebook' iconClass='icon-facebook'/>
                                        <span className='margin-right-wide'></span>
                                        <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'/>
                                        <span className='margin-right-wide'></span>
                                        <Button isLink={1} href='https://twitter.com/nftheGraphchain' type='social' bg='twitter' iconClass='icon-twitter'/>
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
        );
    };

export default SignIn
