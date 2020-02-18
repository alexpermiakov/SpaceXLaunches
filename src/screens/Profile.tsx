import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Centered, CenteredText } from '../components/Centered';
import LaunchTile from '../containers/LaunchTile';
import Loading from '../components/Loading';
import Header from '../containers/Header';
import { GetMyTrips } from './__generated__/GetMyTrips';
import Footer from '../containers/Footer';

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
    <>
      <Header>My Trips</Header>
      {me && me.trips.length ? (
        me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <CenteredText>You haven't booked any trips</CenteredText>
      )}
      <Footer />
    </>
  );
};

export default Profile;
