import React, { useEffect } from 'react';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
};

export type SlideProps = Props;

const Slide = ({
  isVisible,
  duration = 500,
  direction = 'left',
  distance = 100,
  children,
}: Props) => {
  const translateValue = useSharedValue(
    isVisible ? 0 : getInitialPosition(direction, distance)
  );

  useEffect(() => {
    translateValue.value = withTiming(
      isVisible ? 0 : getInitialPosition(direction, distance),
      {
        duration,
        easing: Easing.out(Easing.quad),
      }
    );
  }, [isVisible, direction, distance, duration, translateValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return direction === 'left' || direction === 'right'
      ? { transform: [{ translateX: translateValue.value }] }
      : { transform: [{ translateY: translateValue.value }] };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Slide;

function getInitialPosition(direction: string, distance: number) {
  switch (direction) {
    case 'left':
      return -distance;
    case 'right':
      return distance;
    case 'up':
      return -distance;
    case 'down':
      return distance;
    default:
      return 0;
  }
}
