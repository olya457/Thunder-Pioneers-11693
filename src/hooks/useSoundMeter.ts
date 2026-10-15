import { useEffect, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import Sound from 'react-native-nitro-sound';
import RNFS from 'react-native-fs';
let microphoneQueue = Promise.resolve();
export function useSoundMeter(enabled: boolean, onFailure: () => void) {
  const [current, setCurrent] = useState<number | null>(null);
  const [peak, setPeak] = useState<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let started = false;
    const path = `${RNFS.CachesDirectoryPath}/thunder-meter-${Date.now()}.m4a`;
    setCurrent(null);
    setPeak(null);
    const operation = microphoneQueue
      .then(async () => {
        if (cancelled) return;
        if (Platform.OS === 'android') {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Thunder Sound',
              message:
                'Allow microphone access to measure the approximate sound level around you.',
              buttonPositive: 'Continue',
              buttonNegative: 'Cancel',
            },
          );
          if (permission !== PermissionsAndroid.RESULTS.GRANTED)
            throw new Error('permission');
        }
        if (cancelled) return;
        Sound.setSubscriptionDuration(0.15);
        Sound.addRecordBackListener(event => {
          if (
            cancelled ||
            typeof event.currentMetering !== 'number' ||
            !Number.isFinite(event.currentMetering)
          )
            return;
          const value = Math.round(
            Math.max(-160, Math.min(0, event.currentMetering)),
          );
          setCurrent(value);
          setPeak(p => (p === null ? value : Math.max(p, value)));
        });
        await Sound.startRecorder(
          path,
          {
            AudioChannels: 1,
            AudioSamplingRate: 22050,
            AudioEncodingBitRate: 32000,
          },
          true,
        );
        started = true;
      })
      .catch(async () => {
        Sound.removeRecordBackListener();
        try {
          await Sound.stopRecorder();
        } catch {}
        if (!cancelled) {
          onFailure();
          Alert.alert(
            'Microphone unavailable',
            'Allow microphone access in Settings and check that another app is not using it.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Settings',
                onPress: () => {
                  Linking.openSettings().catch(() => {});
                },
              },
            ],
          );
        }
      });
    microphoneQueue = operation;
    return () => {
      cancelled = true;
      microphoneQueue = operation.then(async () => {
        Sound.removeRecordBackListener();
        if (started) {
          try {
            await Sound.stopRecorder();
          } catch {}
        }
        try {
          if (await RNFS.exists(path)) await RNFS.unlink(path);
        } catch {}
      });
    };
  }, [enabled, onFailure]);
  return { current, peak };
}
