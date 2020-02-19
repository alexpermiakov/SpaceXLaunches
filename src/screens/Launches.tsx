import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { ScrollView } from 'react-native';
import {
  launchListVariables as GetLaunchListVariables,
  launchList as GetLaunchList,
} from '../__generated__/launchList';
import Loading from '../components/Loading';
import LaunchTile from '../containers/LaunchTile';
import { padding } from '../theme';
import Header from '../containers/Header';
import Button from '../components/Button';
import { Centered, CenteredText } from '../components/Centered';
import Launch from './Launch';

const StyledButton = styled(Button)``;

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

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const { Navigator, Screen } = createStackNavigator();

const Launches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error, fetchMore } = useQuery<
    GetLaunchList,
    GetLaunchListVariables
  >(GET_LAUNCHES);

  const handleClick = useCallback(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    fetchMore({
      variables: {
        after: data.launches.cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoading(false);
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          launches: {
            ...fetchMoreResult.launches,
            launches: [
              ...prev.launches.launches,
              ...fetchMoreResult.launches.launches,
            ],
          },
        };
      },
    });
  }, [data, fetchMore, isLoading]);

  if (loading)
    return (
      <Centered>
        <Loading />
      </Centered>
    );
  if (error) return <CenteredText>ERROR</CenteredText>;
  if (!data) return <CenteredText>Not found</CenteredText>;

  const {
    launches: { launches, hasMore },
  } = data;

  return (
    <>
      <ScrollView style={{ padding }}>
        <Header />
        {launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
        {hasMore && (
          <StyledButton isLoading={isLoading} onPress={handleClick}>
            Load More
          </StyledButton>
        )}
      </ScrollView>
    </>
  );
};

export default () => (
  <Navigator>
    <Screen name="Launches" component={Launches} />
    <Screen name="Launch" component={Launch} />
  </Navigator>
);
