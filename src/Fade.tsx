import React, { useEffect } from 'react';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  isVisible: boolean;
  duration?: number;
  children: React.ReactNode;
};

export type FadeProps = Props;

const Fade = ({ isVisible = true, duration = 500, children }: FadeProps) => {
  const opacity = useSharedValue(isVisible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(isVisible ? 1 : 0, {
      duration,
      easing: Easing.linear,
    });
  }, [isVisible, duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Fade;
