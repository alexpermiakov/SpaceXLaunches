import React from 'react';
import styled from 'styled-components/native';
import { AsyncStorage } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import ExitIcon from '../../assets/icons/exit.svg';
import MenuItem from '../components/MenuItem';
import { colors, unit } from '../theme';

const Text = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  margin-top: ${unit}px;
  text-align: center;
  color: ${colors.text};
`;

const StyledExitIcon = styled(ExitIcon).attrs({
  width: '60px',
  height: '60px',
  fill: colors.secondary,
})`
  margin: 0 auto;
`;

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <MenuItem
      onPress={() => {
        client.writeData({ data: { isLoggedIn: false } });
        AsyncStorage.clear();
      }}
    >
      <>
        <StyledExitIcon />
        <Text>Logout</Text>
      </>
    </MenuItem>
  );
};

export default LogoutButton;
