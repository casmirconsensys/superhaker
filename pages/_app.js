import '@/styles/globals.css'
import { useEffect } from 'react'
import { RouteGuard } from '../components/RouteGuard';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../features/store'

export default function App({ Component, pageProps }) {

  let persistor = persistStore(store)


  return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <RouteGuard> */}
                <Component {...pageProps} />
              {/* </RouteGuard> */}
            </PersistGate>

          </Provider>

}
