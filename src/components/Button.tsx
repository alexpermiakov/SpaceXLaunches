import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../theme';

const Button = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  margin: 0 auto;
  padding: 0 32px;
  margin-bottom: 60px;
  border-radius: 25px;
  background-color: ${colors.accent};
  overflow: hidden;
  align-items: center;
  opacity: ${({ isLoading }) => (isLoading ? 0.3 : 1)};
`;

const ButtonLabel = styled.Text`
  font-size: 18px;
  line-height: 50px;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
`;

export default ({ isLoading = false, children, onPress }) => (
  <Button isLoading={isLoading} onPress={onPress}>
    <ButtonLabel>{children}</ButtonLabel>
  </Button>
);
