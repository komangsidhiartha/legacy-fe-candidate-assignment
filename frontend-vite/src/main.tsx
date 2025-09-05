import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import './index.css'
import App from './App.tsx'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DynamicContextProvider 
      settings={{
        environmentId: '32b41800-ce86-46f1-b1ab-4facee926e73',
        coinbaseWalletPreference: 'all',
        walletConnectors: [EthereumWalletConnectors]
      }}
    >
      <App />
    </DynamicContextProvider>
  </StrictMode>,
)
