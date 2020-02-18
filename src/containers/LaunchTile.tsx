import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
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

const Tile = styled.TouchableHighlight`
  height: 193px;
  width: 100%;
  margin-top: ${padding}px;
  margin-bottom: ${padding * 2}px;
`;

const Img = styled.ImageBackground`
  flex: 1;
  border-radius: 7px;
  overflow: hidden;
  padding: ${unit * 4}px ${unit * 5}px;
`;

const H3 = styled(Text)`
  font-size: 36px;
  color: white;
`;

const H5 = styled(Text)`
  font-size: 16px;
  color: white;
`;

export default ({ launch }: any) => {
  const { navigate } = useNavigation();
  const { id: launchId, mission, rocket } = launch;

  return (
    <Tile onPress={() => navigate('Launch', { launchId })}>
      <Img source={getBackgroundImage(launchId)}>
        <H3>{mission.name}</H3>
        <H5>{rocket.name}</H5>
      </Img>
    </Tile>
  );
};
