import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux";
import {ChakraProvider} from "@chakra-ui/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {mockTransactions} from "./mockData/mockData";
import {enableMapSet} from "immer"
enableMapSet()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const mock = new MockAdapter(axios)

mock.onGet('/transactions').reply(200, {
    transactions: mockTransactions
})

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ChakraProvider resetCSS>
              <App />
          </ChakraProvider>
      </Provider>
  </React.StrictMode>
);
