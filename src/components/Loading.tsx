import React from 'react';
import { Text } from 'react-native';
// import Svg, { Path, Rect } from 'react-native-svg';
// import styled from 'styled-components/native';
// import Animated from 'react-native-reanimated';
// import { size } from 'polished';
// import { colors } from './theme';

// const { Value, interpolate } = Animated;
// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const Img = styled(require('../assets/logo.svg'));

// const Loading = () => {
//   return (
//     <Svg style={styles.svg} viewBox="0 0 100 300">
//       <AnimatedPath fill="black" {...{ d }} />
//     </Svg>
//   );
// };

// const Loading = styled.Image.attrs({
//   uri: require('../assets/logo.svg'),
// })`
//   display: 'block';
//   margin: 'auto';
//   fill: ${colors.grey};
//   path: {
//     transformorigin: 'center';
//   }
// `;

// const AnimatedImage = () => {
//   const [spinValue] = useState(new Animated.Value(0));

//   useEffect(() => {
//     Animated.timing(spinValue, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   return (
//     <Animated.Image
//       style={{
//         transform: [{ rotate: spin }],
//       }}
//     >
//       <Loading />
//     </Animated.Image>
//   );
// };

export default () => <Text>Loading...</Text>;
