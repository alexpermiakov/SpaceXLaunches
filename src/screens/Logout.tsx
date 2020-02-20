import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Centered } from '../components/Centered';
import Button from '../components/Button';

const { Navigator, Screen } = createStackNavigator();

const Logout = () => {
  const client = useApolloClient();
  return (
    <Centered>
      <Button
        onPress={() => {
          client.writeData({ data: { isLoggedIn: false } });
          AsyncStorage.clear();
        }}
      >
        Logout
      </Button>
    </Centered>
  );
};

export default () => (
  <Navigator>
    <Screen name="Logout" component={Logout} />
  </Navigator>
);
