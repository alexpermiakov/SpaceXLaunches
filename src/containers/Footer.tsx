import styled from 'styled-components/native';
import HomeIcon from '../../assets/icons/home.svg';
import CartIcon from '../../assets/icons/cart.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import ExitIcon from '../../assets/icons/exit.svg';

const size = '24px';
const cfg = {
  width: size,
  height: size,
};

export const StyledHomeIcon = styled(HomeIcon).attrs(cfg)``;

export const StyledCartIcon = styled(CartIcon).attrs(cfg)``;

export const StyledProfileIcon = styled(ProfileIcon).attrs(cfg)``;

export const StyledExitIcon = styled(ExitIcon).attrs(cfg)``;
