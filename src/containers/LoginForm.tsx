import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { colors, unit } from '../theme';
import Button from '../components/Button';

const space = require('../assets/images/space.jpg');
const Logo = require('../assets/logo.svg');
const Curve = require('../assets/curve.svg');
const Rocket = require('../assets/rocket.svg');

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: 'white',
  backgroundColor: colors.primary,
  backgroundImage: `url(${space})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Header = styled.View`
  width: 100%;
  margin-bottom: ${unit * 5}px;
  padding: ${unit * 2.5}px;
  position: relative;
`;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto;
  position: relative;
`;

const StyledCurve = styled(Curve)`
  fill: ${colors.primary};
  position: absolute;
  top: 0;
  left: 0;
`;

const Heading = styled.Text`
  margin: ${unit * 3}px 0 ${unit * 6}px;
`;

const StyledRocket = styled(Rocket)`
  width: 250px;
`;

const StyledView = styled.View`
  width: 100%;
  max-width: 406px;
  padding: ${unit * 3.5}px;
  border-radius: 3px;
  box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
  color: ${colors.text};
  background-color: white;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  margin-bottom: ${unit * 2}px;
  padding: ${unit * 1.25}px ${unit * 2.5}px;
  border: 1px solid ${colors.grey};
  font-size: 16px;
  outline: none;
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
    <Container>
      <Header>
        <StyledCurve />
        <StyledLogo />
      </Header>
      <StyledRocket />
      <Heading>Space Explorer</Heading>
      <StyledView>
        <StyledInput
          required
          type="email"
          name="email"
          placeholder="Email"
          data-testid="login-input"
          onChange={handleChange}
        />
        <Button onPress={handleSubmit}>Log in</Button>
      </StyledView>
    </Container>
  );
};

export default LoginForm;
