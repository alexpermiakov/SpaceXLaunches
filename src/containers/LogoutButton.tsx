import React from 'react';
import styled from 'styled-components/native';
import { AsyncStorage } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import ExitIcon from '../assets/icons/exit.svg';

const StyledButton = styled.Button``;

export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        AsyncStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}
