import { Web3Provider } from "@ethersproject/providers"



const getLibrary = (provider:any) => {

    console.log("sss");
  const library = new Web3Provider(provider)

  library.pollingInterval = 12000

  console.log(library)



  return library

}



export default getLibrary;