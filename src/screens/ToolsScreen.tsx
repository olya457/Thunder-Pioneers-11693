import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Pressable, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Button, Screen } from '../components/UI';
import { colors, shared } from '../theme';
import { distanceResult } from '../utils/science';
import { useSoundMeter } from '../hooks/useSoundMeter';
export function ToolsScreen() {
  const [tab, setTab] = useState<'distance' | 'sound'>('distance');
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const started = useRef(0);
  const [measuring, setMeasuring] = useState(false);
  const focused = useIsFocused();
  const stopMeasuring = useCallback(() => setMeasuring(false), []);
  const { current, peak } = useSoundMeter(
    measuring && focused && tab === 'sound',
    stopMeasuring,
  );
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () => setSeconds((Date.now() - started.current) / 1000),
      30,
    );
    return () => clearInterval(timer);
  }, [running]);
  useEffect(() => {
    if (!focused) {
      setRunning(false);
      setFinished(false);
      setMeasuring(false);
    }
    const listener = AppState.addEventListener('change', state => {
      if (state === 'background') {
        setMeasuring(false);
        setRunning(false);
        setFinished(false);
      }
    });
    return () => listener.remove();
  }, [focused]);
  const result = distanceResult(seconds);
  const reset = () => {
    setRunning(false);
    setFinished(false);
    setSeconds(0);
  };
  return (
    <Screen>
      <Text style={shared.title}>Storm Tools</Text>
      <View style={styles.tabs}>
        {(['distance', 'sound'] as const).map(value => (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === value }}
            key={value}
            onPress={() => {
              setTab(value);
              setMeasuring(false);
              reset();
            }}
            style={[styles.tab, tab === value && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === value && shared.cyan]}>
              {value === 'distance' ? 'Lightning Distance' : 'Thunder Sound'}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[shared.body, styles.description]}>
        {tab === 'distance'
          ? 'Start when you see the flash. Stop when you hear the thunder.'
          : 'Use your microphone to explore approximate sound levels.'}
      </Text>
      {tab === 'distance' ? (
        <View style={shared.gap}>
          <Metric
            label="Timer"
            value={`${seconds.toFixed(2).padStart(5, '0')} s`}
            large
          />
          <Metric
            label="Approximate distance"
            value={
              finished ? `Approx. ${(seconds * 0.343).toFixed(1)} km` : '— km'
            }
          />
          <View style={shared.row}>
            <Button
              title="Start"
              disabled={running}
              style={styles.flex}
              onPress={() => {
                started.current = Date.now();
                setSeconds(0);
                setFinished(false);
                setRunning(true);
              }}
            />
            <Button
              title="Stop"
              outline
              disabled={!running}
              style={styles.flex}
              onPress={() => {
                setSeconds((Date.now() - started.current) / 1000);
                setRunning(false);
                setFinished(true);
              }}
            />
            <Button title="Reset" outline style={styles.flex} onPress={reset} />
          </View>
          <Text style={styles.note}>
            Distance is approximate and does not indicate a safe location.
          </Text>
          {finished && (
            <View style={shared.gap}>
              <Text style={shared.heading}>{result.title}</Text>
              <Text style={shared.body}>{result.text}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={shared.gap}>
          <Metric
            label="Current reading · approximate"
            value={current === null ? '— dBFS' : `${current} dBFS`}
            large
          />
          <Metric
            label="Peak reading"
            value={peak === null ? '— dBFS' : `${peak} dBFS`}
          />
          <View style={shared.row}>
            <Button
              title={
                measuring && current === null ? 'Starting…' : 'Start Measuring'
              }
              disabled={measuring}
              style={styles.flex}
              onPress={() => setMeasuring(true)}
            />
            <Button
              title="Stop"
              outline
              disabled={!measuring}
              style={styles.flex}
              onPress={stopMeasuring}
            />
          </View>
          <Text style={styles.note}>
            Relative microphone level (dBFS), not calibrated sound pressure.
            Values nearer 0 are louder. Readings depend on your microphone and
            surrounding noise. Temporary audio is deleted after measuring.
          </Text>
        </View>
      )}
    </Screen>
  );
}
function Metric({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <View style={[shared.card, styles.metric]}>
      <Text style={styles.note}>{label}</Text>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.value, large && styles.large]}
      >
        {value}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: { backgroundColor: colors.surface, borderColor: colors.cyan },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.muted,
  },
  description: { marginTop: 22, marginBottom: 16 },
  flex: { flex: 1 },
  metric: { gap: 8 },
  note: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  value: { fontSize: 29, fontWeight: '700', color: colors.text },
  large: { fontSize: 48 },
});
