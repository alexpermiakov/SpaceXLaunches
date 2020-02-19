import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import { Centered, CenteredText } from '../components/Centered';
import LaunchDetail from '../containers/LaunchDetail';
import Header from '../containers/Header';
import Loading from '../components/Loading';
import ActionButton, { GET_LAUNCH_DETAILS } from '../containers/ActionButton';
import { useRoute } from '@react-navigation/native';
import {
  LaunchDetails,
  LaunchDetailsVariables,
} from '../__generated__/LaunchDetails';

const View = styled.View`
  margin: 24px;
`;

const Launch = () => {
  const { params } = useRoute();
  const { launchId } = params as any;

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
  const { mission } = launch;

  return (
    <View>
      {mission && (
        <Header image={{ uri: mission.missionPatch }}>{mission.name}</Header>
      )}
      <LaunchDetail {...launch} />
      <ActionButton {...launch} />
    </View>
  );
};

export default Launch;
