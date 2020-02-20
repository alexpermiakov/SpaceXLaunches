import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { colors, unit } from '../theme';
import Button from '../components/Button';
import Logo from '../../assets/logo.svg';
import Curve from '../../assets/curve.svg';
import Rocket from '../../assets/rocket.svg';

const space = require('../../assets/images/space.jpg');

const KeyboardView = styled.KeyboardAvoidingView.attrs({
  behavior: 'position',
})`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  min-height: 100%;
`;

const Container = styled.View`
  align-items: center;
  min-height: 100%;
  padding-bottom: ${unit * 6}px;
`;

const Header = styled.View`
  width: 100%;
  margin-bottom: ${unit * 5}px;
  padding: ${unit * 2.5}px;
  position: relative;
`;

const StyledLogo = styled(Logo)`
  margin: 14px auto 0 auto;
  position: relative;
  height: 56px;
  width: 56px;
`;

const StyledCurve = styled(Curve)`
  height: 96px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const SpaceBackground = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const H1 = styled.Text`
  margin: ${unit * 3}px 0 ${unit * 6}px;
  font-size: 48px;
  font-weight: 600;
  color: white;
`;

const StyledRocket = styled(Rocket)`
  width: 250px;
  height: 312px;
`;

const StyledView = styled.View`
  width: 100%;
  max-height: 200px;
  padding: ${unit * 3.5}px;
  border-radius: 3px;
  box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const EmailInput = styled.TextInput.attrs({
  autoCompleteType: 'email',
  keyboardType: 'email-address',
  autoCapitalize: 'none',
})`
  width: 100%;
  margin-bottom: ${unit * 5}px;
  padding: ${unit * 1.25}px ${unit * 2.5}px;
  border: 1px solid ${colors.grey};
  font-size: 16px;
  /* :focus: {
    bordercolor: ${colors.primary};
  } */
`;

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');

  const handleChange = useCallback(text => {
    setEmail(text);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!/^\S+@\S+$/.test(email)) {
        Alert.alert('Email is not valid');
        return;
      }
      login({ variables: { email } });
    },
    [email],
  );

  return (
    <KeyboardView>
      <ScrollView>
        <Container>
          <SpaceBackground source={space} />
          <Header>
            <StyledCurve fill={colors.primary} />
            <StyledLogo fill="white" />
          </Header>
          <StyledRocket fill="white" />
          <H1>Space Explorer</H1>
          <StyledView>
            <EmailInput onChangeText={handleChange} value={email} />
            <Button onPress={handleSubmit}>Log in</Button>
          </StyledView>
        </Container>
      </ScrollView>
    </KeyboardView>
  );
};

export default LoginForm;
