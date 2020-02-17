import React, { Fragment } from 'react';
import { useQuery } from 'apollo/react-hooks';
import gql from 'graphql-tag';
import { Centered, CenteredText } from '../components/Centered';
import LaunchTile from '../containers/LaunchTile';
import Loading from '../components/Loading';
import Header from '../containers/Header';
import { LAUNCH_TILE_DATA } from './launches';
import { GetMyTrips } from './__generated__/GetMyTrips';

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
  const { data, loading, error } = useQuery<GetMyTrips, any>(GET_MY_TRIPS, {
    fetchPolicy: 'network-only',
  });

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
    <Fragment>
      <Header>My Trips</Header>
      {me && me.trips.length ? (
        me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <CenteredText>You haven't booked any trips</CenteredText>
      )}
    </Fragment>
  );
};

export default Profile;
