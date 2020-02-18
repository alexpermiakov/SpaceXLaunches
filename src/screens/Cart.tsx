import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Header from '../containers/Header';
import Loading from '../components/Loading';
import CartItem from '../containers/CartItem';
import BookTrips from '../containers/BookTrips';
import { Centered, CenteredText } from '../components/Centered';
import { GetCartItems } from './__generated__/GetCartItems';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart = () => {
  const { data, loading, error } = useQuery<GetCartItems>(GET_CART_ITEMS);

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );

  if (error) return <CenteredText>ERROR: {error.message}</CenteredText>;

  return (
    <>
      <Header>My Cart</Header>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <CenteredText>No items in your cart</CenteredText>
      ) : (
        <>
          {!!data &&
            data.cartItems.map((launchId: any) => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
          <BookTrips cartItems={!!data ? data.cartItems : []} />
        </>
      )}
    </>
  );
};

export default Cart;
