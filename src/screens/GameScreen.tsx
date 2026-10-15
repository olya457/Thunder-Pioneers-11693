import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParams } from '../navigation/types';
import { Button, Intro, Screen } from '../components/UI';
import { Results } from '../components/Results';
import { articles } from '../data/articles';
import { gameFacts } from '../data/quiz';
import { images } from '../data/images';
import { shuffle } from '../utils/science';
import { colors, shared } from '../theme';
import { Reveal } from '../components/Motion';
import { useCompactLayout } from '../hooks/useCompactLayout';
import { useAppState } from '../state/AppState';
function makeRound() {
  const fact = shuffle(gameFacts)[0];
  return {
    fact,
    figures: shuffle([
      articles.find(a => a.id === fact.articleId)!,
      ...shuffle(articles.filter(a => a.id !== fact.articleId)).slice(0, 2),
    ]),
  };
}
function FallingRound({
  round,
  score,
  active,
  onAnswer,
}: {
  round: ReturnType<typeof makeRound>;
  score: number;
  active: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  const [size, setSize] = useState({ width: 300, height: 360 });
  const [elapsed, setElapsed] = useState(0);
  const time = useRef(0);
  const answered = useRef(false);
  const callback = useRef(onAnswer);
  callback.current = onAnswer;
  const duration = Math.max(3800, 10500 - score * 250);
  const correctIndex = round.figures.findIndex(
    a => a.id === round.fact.articleId,
  );
  useEffect(() => {
    if (!active) return;
    let previous = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      time.current += now - previous;
      previous = now;
      setElapsed(time.current);
      if (time.current >= duration + correctIndex * 700 && !answered.current) {
        answered.current = true;
        callback.current(false);
      }
    }, 32);
    return () => clearInterval(timer);
  }, [active, duration, correctIndex]);
  return (
    <View style={styles.arena} onLayout={e => setSize(e.nativeEvent.layout)}>
      {round.figures.map((a, i) => {
        const progress = (elapsed - i * 700) / duration;
        const y = -112 + progress * (size.height + 112);
        return (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={a.name}
            disabled={!active || answered.current}
            onPress={() => {
              if (!answered.current) {
                answered.current = true;
                onAnswer(a.id === round.fact.articleId);
              }
            }}
            style={[
              styles.figure,
              {
                width: Math.min(96, size.width / 3),
                left:
                  (size.width / 3) * i +
                  (size.width / 3 - Math.min(96, size.width / 3)) / 2,
                transform: [{ translateY: y }],
              },
            ]}
          >
            <Image source={a.image} style={styles.portrait} />
            <Text numberOfLines={2} style={styles.name}>
              {a.name}
            </Text>
          </Pressable>
        );
      })}
      <View style={styles.boundary} />
      {!active && (
        <View style={styles.pause}>
          <Text style={shared.heading}>Game paused</Text>
        </View>
      )}
    </View>
  );
}
export function GameScreen({
  navigation,
}: BottomTabScreenProps<TabParams, 'Game'>) {
  const { compact, narrow } = useCompactLayout();
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [round, setRound] = useState(makeRound);
  const [roundId, setRoundId] = useState(0);
  const [attemptId, setAttemptId] = useState('');
  const [foreground, setForeground] = useState(
    AppState.currentState === 'active',
  );
  const [paused, setPaused] = useState(false);
  const focused = useIsFocused();
  const { state, saveAttempt } = useAppState();
  useEffect(() => {
    const listener = AppState.addEventListener('change', s =>
      setForeground(s === 'active'),
    );
    return () => listener.remove();
  }, []);
  const start = () => {
    scoreRef.current = 0;
    setScore(0);
    setRound(makeRound());
    setRoundId(i => i + 1);
    setPaused(false);
    setPhase('playing');
  };
  const answer = (correct: boolean) => {
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setRound(makeRound());
      setRoundId(i => i + 1);
    } else {
      setAttemptId(saveAttempt('game', scoreRef.current));
      setPhase('result');
    }
  };
  if (phase === 'intro')
    return (
      <Intro
        image={images.game}
        title="Match the Mind"
        description="Read the fact and tap the matching historical figure. A wrong choice or missed figure ends the game."
        button="Start Game"
        onPress={start}
      />
    );
  if (phase === 'result')
    return (
      <Screen motionKey="game-result">
        <Text style={shared.title}>Game Over</Text>
        <Results score={score} attempts={state.game} currentId={attemptId} />
        <View style={styles.actions}>
          <Button title="Play Again" onPress={start} />
          <Button
            title="Back to Articles"
            outline
            onPress={() => {
              setPhase('intro');
              navigation.navigate('Discoveries');
            }}
          />
        </View>
      </Screen>
    );
  return (
    <Screen scroll={false} motionKey="game-playing">
      <View style={styles.top}>
        <Text style={[shared.heading, shared.cyan]}>Score: {score}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setPaused(p => !p)}
          style={styles.pauseButton}
        >
          <Text style={shared.body}>{paused ? 'Resume' : 'Pause'}</Text>
        </Pressable>
      </View>
      <Reveal
        trigger={roundId}
        style={[
          shared.card,
          compact ? styles.compactFactCard : styles.factCard,
        ]}
      >
        <ScrollView>
          <Text style={[shared.heading, narrow && styles.compactFact]}>
            {round.fact.text}
          </Text>
        </ScrollView>
      </Reveal>
      <FallingRound
        key={roundId}
        round={round}
        score={score}
        active={focused && foreground && !paused}
        onAnswer={answer}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  compactFactCard: { maxHeight: 110 },
  factCard: { maxHeight: 180 },
  compactFact: { fontSize: 17, lineHeight: 24 },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pauseButton: { padding: 8 },
  arena: { flex: 1, minHeight: 180, overflow: 'hidden', marginTop: 12 },
  figure: {
    position: 'absolute',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 3,
  },
  portrait: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  name: {
    fontSize: 11,
    color: colors.text,
    textAlign: 'center',
    backgroundColor: colors.background,
  },
  boundary: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    left: 0,
    right: 0,
    backgroundColor: colors.border,
  },
  pause: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#26232FEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { gap: 12, marginTop: 24 },
});
