import { useContext } from 'react';

import { ProviderObjectContext } from 'layouts/ProviderLayout'

const useProvider = () => {
  const {
    account,
    networkID,
    connectionUrl,
    provider,
    signer,
    active,
    currency,
    connectMetamaskEther,
    connectKaikas,
    connectMetamaskKlay,
    disconnectWallet
  } = useContext(ProviderObjectContext) || {}

  return {
    account,
    networkID,
    connectionUrl,
    provider,
    signer,
    active,
    currency,
    connectMetamaskEther,
    connectKaikas,
    connectMetamaskKlay,
    disconnectWallet
  }
}

export default useProvider