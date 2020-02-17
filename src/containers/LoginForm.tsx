import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { colors, unit } from '../theme';
import Button from '../components/Button';
import Logo from '../../assets/logo.svg';
import Curve from '../../assets/curve.svg';
import Rocket from '../../assets/rocket.svg';

const space = require('../../assets/images/space.jpg');

const KeyboardView = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  flex: 1;
`;

const Container = styled.View`
  align-items: center;
  flex-grow: 1;
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

const Space = styled.ImageBackground`
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
  max-height: 406px;
  padding: ${unit * 3.5}px;
  border-radius: 3px;
  box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  margin-bottom: ${unit * 2}px;
  padding: ${unit * 1.25}px ${unit * 2.5}px;
  border: 1px solid ${colors.grey};
  font-size: 16px;
  /* :focus: {
    bordercolor: ${colors.primary};
  } */
`;

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = (event.target as HTMLInputElement).value;
      setEmail(email);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      login({ variables: { email } });
    },
    [email],
  );

  return (
    <KeyboardView>
      <ScrollView>
        <Container>
          <Space source={space} />
          <Header>
            <StyledCurve fill={colors.primary} />
            <StyledLogo fill="white" />
          </Header>
          <StyledRocket fill="white" />
          <H1>Space Explorer</H1>
          <StyledView>
            <StyledInput
              // required
              // type="email"
              // name="email"
              // placeholder="Email"
              // data-testid="login-input"
              onChangeText={handleChange}
            />
            <Button onPress={handleSubmit}>Log in</Button>
          </StyledView>
        </Container>
      </ScrollView>
    </KeyboardView>
  );
};

export default LoginForm;
