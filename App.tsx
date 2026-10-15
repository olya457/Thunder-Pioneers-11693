import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateProvider, useAppState } from './src/state/AppState';
import { SplashScreen, OnboardingScreen } from './src/screens/StartupScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
function Content() {
  const [loaded, setLoaded] = useState(false);
  const { ready, state } = useAppState();
  if (!loaded || !ready) return <SplashScreen onDone={() => setLoaded(true)} />;
  return state.onboarded ? <AppNavigator /> : <OnboardingScreen />;
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppStateProvider>
        <Content />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
