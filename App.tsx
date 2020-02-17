import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import Launches from './src/screens/Launches';
import LaunchDetail from './src/containers/LaunchDetail';
import Login from './src/screens/Login';
import { resolvers, typeDefs } from './src/resolvers';

let client;

const initApolloClient = async () => {
  const cache = new InMemoryCache();

  const link = new HttpLink({
    uri: 'http://192.168.1.209:4000',
    headers: {
      authorization: await AsyncStorage.getItem('token'),
    },
  });

  client = new ApolloClient({
    cache,
    link,
    typeDefs,
    resolvers,
  });

  cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('token'),
      cartItems: [],
    },
  });
};

initApolloClient();
const { Navigator, Screen } = createStackNavigator();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={data.isLoggedIn ? Launches : Login} />
          <Screen name="LaunchDetail" component={LaunchDetail} />
        </Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
