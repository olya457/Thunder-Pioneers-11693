import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Screen } from '../components/UI';
import { images } from '../data/images';
import { colors, shared } from '../theme';
import { useCompactLayout } from '../hooks/useCompactLayout';
import { useAppState } from '../state/AppState';
const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:transparent;overflow:hidden;width:100%;height:100%}body{display:flex;align-items:center;justify-content:center}.orb{width:14px;height:14px;border-radius:50%;background:#e8a6ed;box-shadow:0 0 12px 5px #c66ad8;animation:pulse 1s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.orb{animation:none}}@keyframes pulse{0%,100%{transform:scale(.6);opacity:.4}50%{transform:scale(1.2);opacity:1}}</style></head><body><div class="orb"></div><script>setTimeout(()=>window.ReactNativeWebView.postMessage('finished'),4000)</script></body></html>`;
export function SplashScreen({ onDone }: { onDone: () => void }) {
  const completed = useRef(false);
  const callback = useRef(onDone);
  callback.current = onDone;
  const finish = () => {
    if (!completed.current) {
      completed.current = true;
      callback.current();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completed.current) {
        completed.current = true;
        callback.current();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ImageBackground
      source={images.loader}
      style={styles.splash}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.splash}>
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          style={styles.web}
          containerStyle={styles.webContainer}
          scrollEnabled={false}
          onMessage={e => {
            if (e.nativeEvent.data === 'finished') finish();
          }}
          accessibilityLabel="Loading Thunder Lab"
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
const slides = [
  {
    image: images.origins,
    title: 'Discover the Origins of Power',
    text: 'Meet the people whose experiments with lightning and electricity helped shape the world we live in.',
  },
  {
    image: images.tools,
    title: 'Put Your Knowledge to the Test',
    text: 'Explore historical discoveries, answer quiz questions, and match fascinating facts to the minds behind them.',
  },
  {
    image: images.knowledge,
    title: 'Explore Your Storm Tools',
    text: 'Estimate lightning distance and explore approximate thunder sound levels with two simple tools.',
  },
  {
    image: images.curiosity,
    title: 'Keep Your Curiosity Charged',
    text: 'Discover short lightning facts and save your favorite articles to revisit whenever you want.',
  },
];
export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useAppState();
  const { height, width, horizontal, compact } = useCompactLayout();
  const slide = slides[step];
  return (
    <Screen
      motionKey={step}
      bottomSafe
      style={styles.onboard}
      footer={
        <View style={styles.footer}>
          <View style={styles.progress}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.segment,
                  { backgroundColor: i <= step ? colors.cyan : colors.border },
                ]}
              />
            ))}
          </View>
          <Button
            title={step === 3 ? 'Get Started' : 'Next'}
            onPress={() =>
              step === 3 ? completeOnboarding() : setStep(step + 1)
            }
          />
        </View>
      }
    >
      <View style={styles.skipRow}>
        {step < 3 && (
          <Pressable
            accessibilityRole="button"
            onPress={completeOnboarding}
            style={styles.skip}
          >
            <Text style={shared.body}>Skip</Text>
          </Pressable>
        )}
      </View>
      <Image
        source={slide.image}
        resizeMode="contain"
        style={[
          styles.art,
          {
            height: Math.min(
              Math.min(width, 620) - horizontal * 2,
              height * (compact ? 0.3 : 0.36),
            ),
          },
        ]}
      />
      <Text
        style={[
          shared.title,
          styles.slideTitle,
          compact && styles.compactTitle,
        ]}
      >
        {slide.title}
      </Text>
      <Text style={shared.body}>{slide.text}</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  splash: { flex: 1 },
  webContainer: {
    position: 'absolute',
    bottom: '6%',
    left: '40%',
    width: '20%',
    height: 80,
  },
  web: { backgroundColor: 'transparent' },
  onboard: { flexGrow: 1 },
  skipRow: { height: 38, alignItems: 'flex-end', marginBottom: 16 },
  skip: { paddingHorizontal: 12, paddingVertical: 4 },
  art: { width: '100%', borderRadius: 4 },
  compactTitle: { fontSize: 25, marginTop: 18 },
  slideTitle: { marginTop: 30, marginBottom: 12 },
  footer: {
    paddingTop: 16,
  },
  progress: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  segment: { height: 4, flex: 1, borderRadius: 3 },
});
