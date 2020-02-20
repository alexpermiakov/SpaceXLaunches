import React, { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import gql from 'graphql-tag';
import { createStackNavigator } from '@react-navigation/stack';
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

const ScrollView = styled.ScrollView`
  padding: 24px;
`;

const { Navigator, Screen } = createStackNavigator();

const Cart = () => {
  const [loadCarts, { data, loading, error }] = useLazyQuery<GetCartItems>(
    GET_CART_ITEMS,
  );

  useFocusEffect(useCallback(loadCarts, []));
  useEffect(loadCarts, []);

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );

  if (error) return <CenteredText>ERROR: {error.message}</CenteredText>;

  return (
    <ScrollView>
      <Header>My Cart</Header>
      {!data || data.cartItems.length === 0 ? (
        <CenteredText>No items in your cart</CenteredText>
      ) : (
        <>
          {data.cartItems.map((launchId: any) => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data.cartItems} />
        </>
      )}
    </ScrollView>
  );
};

export default () => (
  <Navigator>
    <Screen name="Cart" component={Cart} />
  </Navigator>
);
