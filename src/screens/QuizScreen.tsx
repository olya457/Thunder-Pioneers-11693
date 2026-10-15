import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParams } from '../navigation/types';
import { Button, Intro, Screen } from '../components/UI';
import { Results } from '../components/Results';
import { newQuiz } from '../data/quiz';
import { images } from '../data/images';
import { colors, shared } from '../theme';
import { Reveal } from '../components/Motion';
import { useCompactLayout } from '../hooks/useCompactLayout';
import { useAppState } from '../state/AppState';
export function QuizScreen({
  navigation,
}: BottomTabScreenProps<TabParams, 'Quiz'>) {
  const { narrow } = useCompactLayout();
  const [session, setSession] = useState(newQuiz);
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptId, setAttemptId] = useState('');
  const lock = useRef(false);
  const { state, saveAttempt } = useAppState();
  const q = session[index];
  const start = () => {
    setSession(newQuiz());
    setIndex(0);
    setSelected(undefined);
    setConfirmed(false);
    setScore(0);
    lock.current = false;
    setPhase('playing');
  };
  const advance = () => {
    if (lock.current) return;
    lock.current = true;
    if (!confirmed) {
      if (!selected) {
        lock.current = false;
        return;
      }
      if (selected === q.answer) setScore(s => s + 1);
      setConfirmed(true);
    } else if (index === 9) {
      setAttemptId(saveAttempt('quiz', score));
      setPhase('result');
    } else {
      setIndex(i => i + 1);
      setSelected(undefined);
      setConfirmed(false);
    }
    setTimeout(() => {
      lock.current = false;
    }, 200);
  };
  if (phase === 'intro')
    return (
      <Intro
        image={images.quiz}
        title="Test Your Knowledge"
        description="Answer 10 questions about the people and discoveries behind electrical science. Each session draws from 36 questions."
        button="Start Quiz"
        onPress={start}
      />
    );
  if (phase === 'result')
    return (
      <Screen motionKey="quiz-result">
        <Text style={shared.title}>Quiz Complete</Text>
        <Results
          score={score}
          attempts={state.quiz}
          currentId={attemptId}
          quiz
        />
        <View style={styles.actions}>
          <Button title="Try Again" onPress={start} />
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
    <Screen motionKey={`question-${index}`}>
      <View style={shared.row}>
        <Text style={[shared.body, styles.grow]}>Question</Text>
        <Text style={[shared.heading, shared.cyan]}>{index + 1}/10</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(index + 1) * 10}%` }]} />
      </View>
      <Text style={[shared.title, styles.question]}>{q.prompt}</Text>
      <View style={shared.gap}>
        {q.options.map(option => {
          const correct = confirmed && option.id === q.answer;
          const wrong = confirmed && option.id === selected && !correct;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{
                selected: option.id === selected,
                disabled: confirmed,
              }}
              disabled={confirmed}
              onPress={() => setSelected(option.id)}
              style={[
                shared.card,
                styles.option,
                narrow && styles.stackedOption,
                selected === option.id && !confirmed && styles.selected,
                correct && styles.correct,
                wrong && styles.wrong,
              ]}
            >
              <Text style={[shared.body, styles.optionText]}>
                {option.label}
              </Text>
              {correct && <Text style={shared.cyan}>✓ Correct</Text>}
              {wrong && <Text style={styles.wrongText}>✕ Incorrect</Text>}
            </Pressable>
          );
        })}
        {confirmed && (
          <Reveal style={shared.card}>
            <Text style={shared.body}>{q.explanation}</Text>
          </Reveal>
        )}
        <Button
          title={confirmed ? (index === 9 ? 'See Results' : 'Next') : 'Confirm'}
          disabled={!selected}
          onPress={advance}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  grow: { flex: 1 },
  track: {
    height: 4,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 24,
    borderRadius: 3,
  },
  fill: { height: 4, backgroundColor: colors.cyan, borderRadius: 3 },
  question: { fontSize: 25, lineHeight: 32 },
  option: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 8 },
  stackedOption: { flexDirection: 'column', alignItems: 'stretch' },
  optionText: { color: colors.text, flex: 1 },
  selected: { backgroundColor: '#645078', borderColor: colors.purple },
  correct: { backgroundColor: '#30444D', borderColor: colors.cyan },
  wrong: { backgroundColor: '#503847', borderColor: colors.danger },
  wrongText: { color: colors.danger },
  actions: { gap: 12, marginTop: 24 },
});
