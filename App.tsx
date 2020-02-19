import 'react-native-gesture-handler';
import React from 'react';
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
import { resolvers, typeDefs } from './src/resolvers';
import {
  StyledHomeIcon,
  StyledCartIcon,
  StyledProfileIcon,
  StyledExitIcon,
} from './src/containers/Footer';
import { Rect } from 'react-native-svg';

const uri = 'http://192.168.44.148:4000';
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

const { Navigator, Screen } = createBottomTabNavigator();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

initApolloClient();

const mapTabIcons = {
  Home: StyledHomeIcon,
  Cart: StyledCartIcon,
  Profile: StyledProfileIcon,
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
