import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shared } from '../theme';
import { Icon, IconName } from './Icon';
import { MotionScene, useSceneMotion } from './Motion';
import { useCompactLayout } from '../hooks/useCompactLayout';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function Button({
  title,
  onPress,
  disabled = false,
  outline = false,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const motionEnabled = useSceneMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const press = (toValue: number) =>
    Animated.spring(scale, {
      toValue: motionEnabled ? toValue : 1,
      speed: 30,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  return (
    <AnimatedPressable
      onPressIn={() => press(0.97)}
      onPressOut={() => press(1)}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { transform: [{ scale }] },
        outline && styles.outline,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {!outline && (
        <LinearGradient
          pointerEvents="none"
          colors={['#AF83DB', '#9D73CF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text style={outline ? styles.outlineText : styles.buttonText}>
        {title}
      </Text>
    </AnimatedPressable>
  );
}
export function IconButton({
  name,
  label,
  onPress,
  active = false,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.iconButton}
    >
      <Icon
        name={name}
        color={active ? colors.pink : colors.muted}
        filled={active}
      />
    </Pressable>
  );
}
export function Screen({
  children,
  scroll = true,
  style,
  footer,
  bottomSafe = false,
  motionKey,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  footer?: React.ReactNode;
  bottomSafe?: boolean;
  motionKey?: string | number;
}) {
  const { compact, horizontal } = useCompactLayout();
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [motionKey]);
  return (
    <SafeAreaView
      edges={
        bottomSafe
          ? ['top', 'bottom', 'left', 'right']
          : ['top', 'left', 'right']
      }
      style={styles.screen}
    >
      <MotionScene trigger={motionKey}>
        <View style={[styles.brand, compact && styles.compactBrand]}>
          <Text style={styles.brandText}>Thunder Lab</Text>
        </View>
        {scroll ? (
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={[
              styles.content,
              { paddingHorizontal: horizontal },
              style,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.content,
              styles.flex,
              { paddingHorizontal: horizontal },
              style,
            ]}
          >
            {children}
          </View>
        )}
        {footer && (
          <View
            style={[
              styles.content,
              styles.fixedFooter,
              { paddingHorizontal: horizontal },
            ]}
          >
            {footer}
          </View>
        )}
      </MotionScene>
    </SafeAreaView>
  );
}
export function Intro({
  image,
  title,
  description,
  button,
  onPress,
}: {
  image: ImageSourcePropType;
  title: string;
  description: string;
  button: string;
  onPress: () => void;
}) {
  const { height, width, horizontal, compact } = useCompactLayout();
  const imageSize = Math.min(
    width - horizontal * 2,
    height * (compact ? 0.32 : 0.4),
    400,
  );
  return (
    <Screen style={styles.intro}>
      <Image
        source={image}
        style={[styles.hero, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
      <View style={shared.gap}>
        <Text style={[shared.title, styles.introTitle]}>{title}</Text>
        <Text style={shared.body}>{description}</Text>
        <Button title={button} onPress={onPress} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  compactBrand: { paddingBottom: 12 },
  introTitle: { marginBottom: 0 },
  screen: { flex: 1, backgroundColor: colors.background },
  brand: {
    paddingHorizontal: 32,
    paddingTop: 4,
    paddingBottom: 24,
    alignItems: 'flex-end',
  },
  brandText: { color: colors.muted, fontSize: 12 },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },
  flex: { flex: 1 },
  scroll: { flex: 1, minHeight: 0 },
  fixedFooter: { flexShrink: 0, paddingBottom: 12 },
  disabledButton: { opacity: 0.4 },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 52,
    flexShrink: 0,
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#241E30',
    textAlign: 'center',
  },
  outlineText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: { flexGrow: 1, justifyContent: 'space-evenly', gap: 28 },
  hero: { alignSelf: 'center', borderRadius: 8 },
});
