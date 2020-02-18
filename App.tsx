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
import Launch from './src/screens/Launch';
import Login from './src/screens/Login';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';
import { resolvers, typeDefs } from './src/resolvers';

const uri = 'http://192.168.1.51:4000';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri,
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

const initApolloClient = async () => {
  const token = await AsyncStorage.getItem('token');

  const link = new HttpLink({
    uri,
    headers: {
      authorization: token,
    },
  });

  client.cache.writeData({
    data: {
      isLoggedIn: !!token,
      cartItems: [],
    },
  });

  client.link = link;
};

const { Navigator, Screen } = createStackNavigator();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

initApolloClient();

const Pages = () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="Home" component={Launches} />
      <Screen name="Launch" component={Launch} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  </NavigationContainer>
);

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  if (!data) {
    return null;
  }
  return data.isLoggedIn ? <Pages /> : <Login />;
};

const App = () => (
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>
);

export default App;
