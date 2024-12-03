import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Fade from './Fade';
import Slide from './Slide';

type SLideDirection = 'up' | 'down' | 'left' | 'right';

type Props = {
  isVisible: boolean;
  duration?: number;
  direction?: SLideDirection;
  spacing?: number;
  defaultComponent: React.ReactNode;
  children: React.ReactNode[];
};

const DIRECTION_CONFIG = {
  up: { marginStyle: { marginTop: 5 }, slideDirection: 'down' },
  down: { marginStyle: { marginBottom: 5 }, slideDirection: 'up' },
  left: { marginStyle: { marginLeft: 5 }, slideDirection: 'right' },
  right: { marginStyle: { marginRight: 5 }, slideDirection: 'left' },
};

function getDirectionConfig(direction: SLideDirection) {
  return DIRECTION_CONFIG[direction] || DIRECTION_CONFIG.up;
}

const Stack = ({
  isVisible,
  duration = 500,
  direction = 'up',
  spacing = 20,
  defaultComponent,
  children,
}: Props) => {
  const { marginStyle, slideDirection } = getDirectionConfig(direction);
  const isHorizontal = direction === 'left' || direction === 'right';

  const ChildComponents = useMemo(
    () =>
      children.map((child, index) => (
        <Slide
          key={index}
          isVisible={isVisible}
          direction={slideDirection as SLideDirection}
          distance={spacing * (index + 1)}
          duration={duration}
        >
          <Fade isVisible={isVisible} duration={duration}>
            <View style={[styles.child, marginStyle]}>{child}</View>
          </Fade>
        </Slide>
      )),
    [children, isVisible, duration, spacing, slideDirection, marginStyle]
  );

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isHorizontal ? 'row' : 'column' },
      ]}
    >
      {(direction === 'right' || direction === 'down') && (
        <View>{defaultComponent}</View>
      )}
      <View style={{ flexDirection: isHorizontal ? 'row' : 'column' }}>
        {ChildComponents}
      </View>
      {(direction === 'up' || direction === 'left') && (
        <View>{defaultComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  child: {
    marginVertical: 5,
  },
});

export default Stack;
