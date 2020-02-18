import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import LaunchTile from './LaunchTile';
import {
  LaunchDetails,
  LaunchDetailsVariables,
} from '../__generated__/LaunchDetails';
import { Centered, CenteredText } from '../components/Centered';
import Loading from '../components/Loading';

const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const CartItem = ({ launchId }) => {
  const { data, loading, error } = useQuery<
    LaunchDetails,
    LaunchDetailsVariables
  >(GET_LAUNCH, { variables: { launchId } });

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR</CenteredText>;
  if (!data) return <CenteredText>Not found</CenteredText>;

  return data.launch && <LaunchTile launch={data.launch} />;
};

export default CartItem;
