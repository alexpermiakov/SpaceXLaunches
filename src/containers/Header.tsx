import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, AsyncStorage } from 'react-native';
import { decode as atob } from 'base-64';
import { unit, colors } from '../theme';

const dog1 = require('../../assets/images/dog-1.png');
const dog2 = require('../../assets/images/dog-2.png');
const dog3 = require('../../assets/images/dog-3.png');

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;

const pickAvatarByEmail = (email: string) => {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
};

const Container = styled.View`
  align-items: center;
  margin-bottom: ${unit * 4.5}px;
`;

const Image = styled.ImageBackground`
  width: 134px;
  height: 134px;
  margin-right: ${unit * 2.5}px;
  border-radius: 134px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const H2 = styled.Text`
  font-size: 36px;
  text-align: center;
`;

const H3 = styled.Text`
  font-size: 16px;
  margin-top: ${unit / 2}px;
  color: ${colors.textSecondary};
  text-align: center;
  text-transform: uppercase;
`;

const Header = ({ image, children = 'Space Explorer' }: any) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const token = await AsyncStorage.getItem('token');
      const value = token ? atob(token) : 'alex.permyakoff@gmail.com';
      setEmail(value);
    };
    fetchEmail();
  }, []);

  return (
    <Container>
      <Image source={image || pickAvatarByEmail(email)} />
      <View>
        <H2>{children}</H2>
        <H3>{email}</H3>
      </View>
    </Container>
  );
};

export default Header;
