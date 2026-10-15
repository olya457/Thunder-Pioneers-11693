import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Attempt } from '../state/AppState';
import { colors, shared } from '../theme';
export function Results({
  score,
  attempts,
  currentId,
  quiz = false,
}: {
  score: number;
  attempts: Attempt[];
  currentId: string;
  quiz?: boolean;
}) {
  return (
    <View style={shared.gap}>
      <View style={[shared.card, styles.scoreCard]}>
        <Text style={styles.score}>
          {quiz ? `${score}/10` : `Score: ${score}`}
        </Text>
        <Text style={[shared.body, shared.center]}>
          {quiz
            ? 'Keep exploring the stories behind electricity.'
            : `Best score: ${Math.max(score, ...attempts.map(a => a.score))}`}
        </Text>
      </View>
      <Text style={[shared.body, styles.label]}>Top 3 Attempts</Text>
      {attempts.slice(0, 3).map((attempt, i) => (
        <View
          key={attempt.id}
          style={[
            shared.card,
            shared.row,
            attempt.id === currentId && styles.current,
          ]}
        >
          <Text style={shared.cyan}>{i + 1}</Text>
          <Text style={[shared.body, styles.attempt]}>
            {attempt.id === currentId ? 'This attempt' : 'Attempt'}
          </Text>
          <Text style={shared.heading}>
            {attempt.score}
            {quiz ? '/10' : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  scoreCard: { alignItems: 'center', paddingVertical: 28, gap: 12 },
  score: { fontSize: 52, fontWeight: '800', color: colors.cyan },
  label: { fontWeight: '600', marginTop: 4 },
  attempt: { flex: 1, marginLeft: 12 },
  current: { borderColor: colors.purple },
});
