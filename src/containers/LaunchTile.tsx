import React from 'react';
import styled from 'styled-components/native';
import { unit } from '../theme';

const galaxy = require('../../assets/images/galaxy.jpg');
const iss = require('../../assets/images/iss.jpg');
const moon = require('../../assets/images/moon.jpg');

const backgrounds = [galaxy, iss, moon];

export const getBackgroundImage = (id: string) =>
  backgrounds[Number(id) % backgrounds.length];

const padding = unit * 2;

const Text = styled.Text`
  /* font-family: 'sans-serif'; */
`;

const Img = styled.ImageBackground`
  border-radius: 7px;
  padding: ${unit * 4}px ${unit * 5}px;
  height: 193px;
  margin-top: ${padding}px;
  margin-bottom: ${padding * 2}px;
  overflow: hidden;
`;

const H3 = styled(Text)`
  font-size: 36px;
  color: white;
`;

const H5 = styled(Text)`
  font-size: 16px;
  color: white;
`;

const Link = ({ id, navigation, children, ...props }) => (
  <Img
    {...props}
    source={getBackgroundImage(id)}
    onPress={() => navigation.navigate('Launch', { id })}
  >
    {children}
  </Img>
);

export default ({ launch, navigation }: any) => {
  const { id, mission, rocket } = launch;

  return (
    <Link navigation={navigation} id={id}>
      <H3>{mission.name}</H3>
      <H5>{rocket.name}</H5>
    </Link>
  );
};
