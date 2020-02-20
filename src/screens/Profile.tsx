import React, { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import gql from 'graphql-tag';
import { Centered, CenteredText } from '../components/Centered';
import LaunchTile from '../containers/LaunchTile';
import Loading from '../components/Loading';
import Header from '../containers/Header';
import { GetMyTrips } from './__generated__/GetMyTrips';

const { Navigator, Screen } = createStackNavigator();

const ScrollView = styled.ScrollView`
  padding: 24px;
`;

const Text = styled.Text`
  text-align: center;
`;

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

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Profile = () => {
  const [loadTrips, { data, loading, error }] = useLazyQuery<GetMyTrips, any>(
    GET_MY_TRIPS,
    {
      fetchPolicy: 'network-only',
    },
  );

  useFocusEffect(useCallback(loadTrips, []));
  useEffect(loadTrips, []);

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR: {error.message}</CenteredText>;
  if (!data) return <CenteredText>Not found</CenteredText>;

  const { me } = data;

  return (
    <ScrollView>
      <Header>My Trips</Header>
      {me && me.trips.length ? (
        me.trips.map(launch => <LaunchTile key={launch.id} launch={launch} />)
      ) : (
        <Text>You haven't booked any trips</Text>
      )}
    </ScrollView>
  );
};

export default () => (
  <Navigator>
    <Screen name="Profile" component={Profile} />
  </Navigator>
);
