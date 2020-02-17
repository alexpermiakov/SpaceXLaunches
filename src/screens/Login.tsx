import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { AsyncStorage } from 'react-native';
import LoginForm from '../containers/LoginForm';
import Loading from '../components/Loading';
import { Centered, CenteredText } from '../components/Centered';
import { login, loginVariables } from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

const Login = () => {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<login, loginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        AsyncStorage.setItem('token', login);
        client.writeData({ data: { isLoggedIn: true } });
      },
    },
  );

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR</CenteredText>;

  return <LoginForm login={login} />;
};

export default Login;
