import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Centered, CenteredText } from '../components/Centered';
import LaunchDetail from '../containers/LaunchDetail';
import Header from '../containers/Header';
import Loading from '../components/Loading';
import ActionButton, { GET_LAUNCH_DETAILS } from '../containers/ActionButton';
import {
  LaunchDetails,
  LaunchDetailsVariables,
} from '../__generated__/LaunchDetails';

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
