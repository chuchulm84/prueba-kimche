import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  
  document.getElementById('root')
);

