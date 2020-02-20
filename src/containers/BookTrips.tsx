import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from '../components/Button';
import { GET_LAUNCH } from './CartItem';
import {
  BookTrips as BookTripsType,
  BookTripsVariables,
} from './__generated__/BookTrips';
import { CenteredText } from '../components/Centered';

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

const BookTrips = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation<BookTripsType, BookTripsVariables>(
    BOOK_TRIPS,
    {
      variables: { launchIds: cartItems },
      refetchQueries: cartItems.map(launchId => ({
        query: GET_LAUNCH,
        variables: { launchId },
      })),
      update(cache) {
        cache.writeData({ data: { cartItems: [] } });
      },
    },
  );

  console.log('cartItems', cartItems, data);

  return data && data.bookTrips && !data.bookTrips.success ? (
    <CenteredText>{data.bookTrips.message}</CenteredText>
  ) : (
    <Button onPress={bookTrips}>Book All</Button>
  );
};

export default BookTrips;
