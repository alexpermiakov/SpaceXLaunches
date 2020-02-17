import React from 'react';
import styled from 'styled-components/native';
import { getBackgroundImage } from './LaunchTile';
import { unit } from '../theme';

const H3 = styled.Text`
  font-size: 36px;
`;

const H5 = styled.Text`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

const Image = styled.ImageBackground`
  height: 365px;
  margin-bottom: ${unit * 4}px;
`;

const LaunchDetail = ({ id, site, rocket }) => (
  <Image source={getBackgroundImage(id)}>
    <H3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </H3>

    <H5>{site}</H5>
  </Image>
);

export default LaunchDetail;
