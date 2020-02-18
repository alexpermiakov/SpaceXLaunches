import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../components/MenuItem';
import LogoutButton from '../containers/LogoutButton';
import HomeIcon from '../../assets/icons/home.svg';
import CartIcon from '../../assets/icons/cart.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import { colors, unit } from '../theme';

const StyledHomeIcon = styled(HomeIcon).attrs({
  width: '60px',
  height: '60px',
  fill: colors.secondary,
})`
  margin: 0 auto;
`;

const StyledCartIcon = styled(CartIcon).attrs({
  width: '60px',
  height: '60px',
  fill: colors.secondary,
})`
  margin: 0 auto;
`;

const StyledProfileIcon = styled(ProfileIcon).attrs({
  width: '60px',
  height: '60px',
  fill: colors.secondary,
})`
  margin: 0 auto;
`;

const Text = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  margin-top: ${unit}px;
  text-align: center;
  color: ${colors.text};
`;

const Container = styled.View`
  background-color: white;
  color: ${colors.textSecondary};
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const InnerContainer = styled.View`
  align-items: center;
  max-width: 460px;
  padding: ${unit * 2.5}px;
  margin: 0 auto;
  flex-direction: row;
`;

const Footer = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <InnerContainer>
        <MenuItem onPress={() => navigate('Home')}>
          <>
            <StyledHomeIcon />
            <Text>Home</Text>
          </>
        </MenuItem>
        <MenuItem onPress={() => navigate('Cart')}>
          <>
            <StyledCartIcon />
            <Text>Cart</Text>
          </>
        </MenuItem>
        <MenuItem onPress={() => navigate('Profile')}>
          <>
            <StyledProfileIcon />
            <Text>Profile</Text>
          </>
        </MenuItem>
        <LogoutButton />
      </InnerContainer>
    </Container>
  );
};

export default Footer;
