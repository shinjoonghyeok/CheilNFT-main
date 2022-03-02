import { Web3Provider } from "@ethersproject/providers"



const getLibrary = (provider:any) => {

  const library = new Web3Provider(provider)

  library.pollingInterval = 12000

  console.log(library)
  console.log("123")



  return library

}



export default getLibrary;