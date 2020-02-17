import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Centered, CenteredText } from '../components/Centered';
import LaunchDetail from '../containers/LaunchDetail';
import Header from '../containers/Header';
import Loading from '../components/Loading';
import ActionButton from '../containers/ActionButton';
import {
  LaunchDetails,
  LaunchDetailsVariables,
} from '../__generated__/LaunchDetails';
import { LAUNCH_TILE_DATA } from './Launches';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => {
  const { data, loading, error } = useQuery<
    LaunchDetails,
    LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR</CenteredText>;
  if (!data) return <CenteredText>Not found</CenteredText>;

  const { launch } = data;

  return (
    <>
      <Header image={launch && launch.mission && launch.mission.missionPatch}>
        {launch && launch.mission && launch.mission.name}
      </Header>
      <LaunchDetail {...launch} />
      <ActionButton {...launch} />
    </>
  );
};

export default Launch;
