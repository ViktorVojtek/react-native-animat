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
  scaleTo: number;
  scaleFrom?: number;
};

export type ScaleProps = Props;

const Scale = ({
  children,
  isVisible,
  duration = 500,
  scaleTo = 1.5,
  scaleFrom = 1,
}: Props) => {
  const scale = useSharedValue(isVisible ? scaleTo : scaleFrom);

  useEffect(() => {
    scale.value = withTiming(isVisible ? scaleTo : scaleFrom, {
      duration,
      easing: Easing.out(Easing.quad),
    });
  }, [isVisible, duration, scale, scaleTo, scaleFrom]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Scale;
