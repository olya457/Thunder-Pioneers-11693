import React from 'react';
import { Text } from 'react-native';
import Renderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { articles } from '../src/data/articles';
import { questions, newQuiz, gameFacts } from '../src/data/quiz';
import { facts } from '../src/data/facts';
import { distanceResult, shuffle } from '../src/utils/science';
import { AppStateProvider, useAppState } from '../src/state/AppState';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

test('all educational content is complete and linked to local portraits', () => {
  expect(articles).toHaveLength(12);
  articles.forEach(a => {
    expect(a.paragraphs).toHaveLength(2);
    a.paragraphs.forEach(p => expect(p.match(/\.(?:\s|$)/g)).toHaveLength(4));
    expect(a.image).toBeDefined();
  });
  expect(questions).toHaveLength(36);
  articles.forEach(a =>
    expect(questions.filter(q => q.answer === a.id)).toHaveLength(3),
  );
  questions.forEach(q => {
    expect(new Set(q.options.map(o => o.id)).size).toBe(4);
    expect(q.options.some(o => o.id === q.answer)).toBe(true);
  });
  expect(facts).toHaveLength(20);
  expect(new Set(facts.map(f => f.title)).size).toBe(20);
  expect(gameFacts).toHaveLength(24);
  gameFacts.forEach(f =>
    expect(articles.some(a => a.id === f.articleId)).toBe(true),
  );
});
test('quiz sessions contain ten unique valid questions', () => {
  for (let i = 0; i < 100; i++) {
    const session = newQuiz();
    expect(session).toHaveLength(10);
    expect(new Set(session.map(q => q.id)).size).toBe(10);
  }
});
test('shuffle preserves its input', () => {
  const items = [1, 2, 3, 4];
  expect(shuffle(items).sort()).toEqual(items);
  expect(items).toEqual([1, 2, 3, 4]);
});
test.each([
  [2.99, 'Very Close Lightning'],
  [3, 'Nearby Lightning'],
  [6, 'A Longer Sound Journey'],
  [10, 'Several Kilometers Away'],
  [15, 'Distant Lightning'],
  [30, 'A Long Delay'],
])('distance boundary %s seconds', (seconds, title) => {
  expect(distanceResult(Number(seconds)).title).toBe(title);
});
test('five seconds gives approximately 1.7 km', () =>
  expect(distanceResult(5).text).toContain('1.7 km'));
test('favorites, onboarding and real attempts survive a remount', async () => {
  await AsyncStorage.clear();
  let api: ReturnType<typeof useAppState>;
  let tree: Renderer.ReactTestRenderer;
  function Probe() {
    api = useAppState();
    return <Text>{api.ready ? 'ready' : 'loading'}</Text>;
  }
  await act(async () => {
    tree = Renderer.create(
      <AppStateProvider>
        <Probe />
      </AppStateProvider>,
    );
  });
  expect(api!.state.favorites).toEqual([]);
  expect(api!.state.quiz).toEqual([]);
  await act(async () => {
    api!.toggleFavorite(articles[0].id);
    api!.completeOnboarding();
    api!.saveAttempt('quiz', 8);
    api!.saveAttempt('game', 4);
  });
  await act(async () => tree!.unmount());
  await act(async () => {
    tree = Renderer.create(
      <AppStateProvider>
        <Probe />
      </AppStateProvider>,
    );
  });
  expect(api!.state.favorites).toEqual([articles[0].id]);
  expect(api!.state.onboarded).toBe(true);
  expect(api!.state.quiz[0].score).toBe(8);
  expect(api!.state.game[0].score).toBe(4);
  await act(async () => api!.toggleFavorite(articles[0].id));
  expect(api!.state.favorites).toEqual([]);
  await act(async () => tree!.unmount());
});
