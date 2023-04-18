import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { store } from '../features/store'
import { SSRProvider } from '@react-aria/ssr'
import { MoralisProvider } from 'react-moralis';
import { RouteGuard } from '../components/RouteGuard';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotificationProvider } from "quick-react-notification";

function MyApp({ Component, pageProps }) {
  
  let persistor = persistStore(store)
  useEffect(() => {
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="pvo286ZJiSIl4BNnqTkGYSHnqaQwwAaP";;analytics.SNIPPET_VERSION="4.15.3";
    analytics.load("pvo286ZJiSIl4BNnqTkGYSHnqaQwwAaP");
    analytics.page();
    }}();
  }, [])
   
  return <SSRProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {typeof window !== 'undefined' && <MoralisProvider appId={process.env.appId} serverUrl={process.env.serverUrl}>
                <RouteGuard>
                <NotificationProvider>
                  <Component {...pageProps} />
                  </NotificationProvider>
                </RouteGuard>
              </MoralisProvider>}
            </PersistGate>
        </Provider>
        </SSRProvider>
}

export default MyApp
