import { useContext, useEffect, useState } from 'react';
import { AccessibilityInfo, AppState } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
export function useMotionEnabled() {
  const navigation = useContext(NavigationContext);
  const [focused, setFocused] = useState(() => navigation?.isFocused() ?? true);
  const [foreground, setForeground] = useState(
    AppState.currentState === 'active',
  );
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => {
        if (mounted) setReduced(value);
      })
      .catch(() => {});
    const preference = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduced,
    );
    const state = AppState.addEventListener('change', value =>
      setForeground(value === 'active'),
    );
    const focus = navigation?.addListener('focus', () => setFocused(true));
    const blur = navigation?.addListener('blur', () => setFocused(false));
    return () => {
      mounted = false;
      preference.remove();
      state.remove();
      focus?.();
      blur?.();
    };
  }, [navigation]);
  return focused && foreground && !reduced;
}
