import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import Launches from './src/screens/Launches';
import Login from './src/screens/Login';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';
import Logout from './src/screens/Logout';
import { resolvers, typeDefs } from './src/resolvers';
import {
  StyledHomeIcon,
  StyledCartIcon,
  StyledProfileIcon,
  StyledExitIcon,
} from './src/containers/Footer';

const uri = 'http://localhost:4000';

const makeApolloClient = token => {
  const link = new HttpLink({
    uri,
    headers: {
      authorization: token,
    },
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link,
    typeDefs,
    resolvers,
  });

  client.cache.writeData({
    data: {
      isLoggedIn: !!token,
      cartItems: [],
    },
  });

  return client;
};

const { Navigator, Screen } = createBottomTabNavigator();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const mapTabIcons = {
  Home: StyledHomeIcon,
  Cart: StyledCartIcon,
  Profile: StyledProfileIcon,
  Logout: StyledExitIcon,
};

const Pages = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return React.createElement(mapTabIcons[route.name]);
        },
      })}
    >
      <Screen name="Home" component={Launches} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Logout" component={Logout} />
    </Navigator>
  </NavigationContainer>
);

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
};

const Main = () => {
  const [client, setClient] = useState(null);

  const fetchToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const client = makeApolloClient(token);
    setClient(client);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  );
};

export default Main;
