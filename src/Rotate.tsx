import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isVisible: boolean;
  children?: React.ReactNode;
  duration?: number;
  rotateTo?: number;
};

export type RotateProps = Props;

const Rotate = ({
  isVisible,
  children,
  duration = 500,
  rotateTo = 360,
}: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(isVisible ? rotateTo : 0, {
      duration,
      easing: Easing.out(Easing.quad),
    });
  }, [isVisible, duration, rotateTo, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Rotate;
