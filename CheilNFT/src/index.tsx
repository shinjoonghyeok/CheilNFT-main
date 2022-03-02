import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route,} from 'react-router-dom';
import './index.css';
import Header from './Header';
import App from './components/App';
import reportWebVitals from './reportWebVitals';


import { Web3ReactProvider } from "@web3-react/core";

import getLibrary from './library';
import Desktop1 from './components/Desktop1';
import Desktop2 from './components/Desktop2';
import Desktop3 from './components/Desktop3';
import Desktop4 from './components/Desktop4';
import CreatePage from './components/CreatePage';



ReactDOM.render(
  
  <Web3ReactProvider getLibrary={getLibrary}>
    <React.StrictMode>
     
     <BrowserRouter>
     <Header />
       <Switch>
         <Route exact path="/"><Desktop1/></Route>
         <Route exact path="/2"><CreatePage /></Route>
         <Route exact path="/3"><Desktop2/></Route>
         <Route exact path="/4"><Desktop3/></Route>
         <Route exact path="/5"><Desktop4/></Route>
       </Switch>
     </BrowserRouter>
    </React.StrictMode>
  </Web3ReactProvider>
  ,
  document.getElementById('root')
);