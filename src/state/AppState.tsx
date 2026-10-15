import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export type Attempt = { id: string; score: number; date: string };
type Saved = {
  onboarded: boolean;
  favorites: string[];
  quiz: Attempt[];
  game: Attempt[];
};
const initial: Saved = { onboarded: false, favorites: [], quiz: [], game: [] };
const key = '@thunder-lab/state/v1';
const Context = createContext<{
  state: Saved;
  ready: boolean;
  toggleFavorite: (id: string) => void;
  completeOnboarding: () => void;
  saveAttempt: (kind: 'quiz' | 'game', score: number) => string;
}>({
  state: initial,
  ready: false,
  toggleFavorite: () => {},
  completeOnboarding: () => {},
  saveAttempt: () => '',
});
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const current = useRef(initial);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(key)
      .then(value => {
        if (!alive || !value) return;
        const data = JSON.parse(value);
        const validAttempts = (v: unknown): Attempt[] =>
          Array.isArray(v)
            ? v.filter(
                a =>
                  a &&
                  typeof a.id === 'string' &&
                  Number.isFinite(a.score) &&
                  typeof a.date === 'string',
              )
            : [];
        const loaded = {
          onboarded: data.onboarded === true,
          favorites: Array.isArray(data.favorites)
            ? data.favorites.filter((v: unknown) => typeof v === 'string')
            : [],
          quiz: validAttempts(data.quiz),
          game: validAttempts(data.game),
        };
        current.current = loaded;
        setState(loaded);
      })
      .catch(() =>
        Alert.alert(
          'Storage unavailable',
          'Saved progress could not be loaded.',
        ),
      )
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);
  const update = (change: (s: Saved) => Saved) => {
    const next = change(current.current);
    current.current = next;
    setState(next);
    writes.current = writes.current
      .then(() => AsyncStorage.setItem(key, JSON.stringify(next)))
      .catch(() => {
        Alert.alert(
          'Could not save',
          'Your changes are available for this session. Please check device storage.',
        );
      });
  };
  return (
    <Context.Provider
      value={{
        state,
        ready,
        toggleFavorite: id =>
          update(s => ({
            ...s,
            favorites: s.favorites.includes(id)
              ? s.favorites.filter(x => x !== id)
              : [...s.favorites, id],
          })),
        completeOnboarding: () => update(s => ({ ...s, onboarded: true })),
        saveAttempt: (kind, score) => {
          const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
          update(s => ({
            ...s,
            [kind]: [...s[kind], { id, score, date: new Date().toISOString() }]
              .sort((a, b) => b.score - a.score)
              .slice(0, 100),
          }));
          return id;
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useAppState = () => useContext(Context);
