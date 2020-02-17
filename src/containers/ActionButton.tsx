import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_LAUNCH_DETAILS } from '../screens/Launch';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { CenteredText, Centered } from '../components/Centered';

export { GET_LAUNCH_DETAILS };

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

const ActionButton = ({ isBooked, id, isInCart }) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ],
    },
  );

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR</CenteredText>;

  return (
    <div>
      <Button onPress={() => mutate()} data-testid={'action-button'}>
        {isBooked
          ? 'Cancel This Trip'
          : isInCart
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ActionButton;
