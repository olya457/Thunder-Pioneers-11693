import React, { createContext, useContext, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useMotionEnabled } from '../hooks/useMotionEnabled';
import { colors } from '../theme';
const MotionContext = createContext(false);
export const useSceneMotion = () => useContext(MotionContext);
export function Reveal({
  children,
  trigger,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  trigger?: string | number;
  style?: StyleProp<ViewStyle>;
  delay?: number;
}) {
  const enabled = useContext(MotionContext);
  const value = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    value.stopAnimation();
    if (!enabled) {
      value.setValue(1);
      return;
    }
    value.setValue(0);
    const animation = Animated.timing(value, {
      toValue: 1,
      duration: 420,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [enabled, trigger, delay, value]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: value,
          transform: [
            {
              translateY: value.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
export function MotionScene({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger?: string | number;
}) {
  const enabled = useMotionEnabled();
  const drift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!enabled) {
      drift.setValue(0);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 4800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 4800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [drift, enabled]);
  return (
    <MotionContext.Provider value={enabled}>
      <View style={styles.scene}>
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={StyleSheet.absoluteFill}
        >
          <Animated.View
            style={[
              styles.orbit,
              {
                opacity: drift.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.05, 0.13],
                }),
                transform: [
                  {
                    translateY: drift.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-15, 20],
                    }),
                  },
                  {
                    scale: drift.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.08],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.spark,
              {
                opacity: drift.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.35],
                }),
                transform: [
                  {
                    translateY: drift.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -26],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <Reveal trigger={trigger} style={styles.scene}>
          {children}
        </Reveal>
      </View>
    </MotionContext.Provider>
  );
}
export function EnergyPulse({ active }: { active: boolean }) {
  const enabled = useContext(MotionContext);
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active || !enabled) {
      pulse.setValue(0);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [active, enabled, pulse]);
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      style={styles.energy}
    >
      {[0, 1, 2, 3, 4].map(i => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            active ? styles.activeBar : styles.idleBar,
            {
              transform: [
                {
                  scaleY: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: i % 2 ? [0.3, 1] : [1, 0.3],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  scene: { flex: 1, minHeight: 0 },
  orbit: {
    position: 'absolute',
    width: 240,
    height: 240,
    right: -130,
    top: 90,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: colors.cyan,
    backgroundColor: colors.motionGlow,
  },
  spark: {
    position: 'absolute',
    bottom: 100,
    left: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  energy: { height: 28, flexDirection: 'row', gap: 4, alignItems: 'center' },
  activeBar: { opacity: 0.85 },
  idleBar: { opacity: 0.25 },
  bar: { width: 4, height: 24, borderRadius: 2, backgroundColor: colors.cyan },
});
