import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ContentImage } from '../components/ContentImage';
import { Screen, Button } from '../components/UI';
import { facts } from '../data/facts';
import { colors, shared } from '../theme';
import { shareText } from '../services/share';
export function FactsScreen() {
  const [index, setIndex] = useState(0);
  const fact = facts[index];
  const artwork = Image.resolveAssetSource(fact.image);
  return (
    <Screen motionKey={index}>
      <Text style={shared.title}>Lightning Facts</Text>
      <View style={styles.counter}>
        <Text style={shared.cyan}>
          Fact {index + 1} of {facts.length}
        </Text>
      </View>
      <View style={[shared.card, styles.card]}>
        <ContentImage
          source={fact.image}
          aspectRatio={artwork.width / artwork.height}
          borderRadius={5}
          resizeMode="contain"
        />
        <Text style={shared.heading}>{fact.title}</Text>
        <Text style={shared.body}>{fact.text}</Text>
        <Button
          title="Share"
          outline
          onPress={() => shareText(fact.title, fact.text)}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Previous"
          outline
          disabled={index === 0}
          style={styles.flex}
          onPress={() => setIndex(i => i - 1)}
        />
        <Button
          title={index === 19 ? 'Start Again' : 'Next Fact'}
          style={styles.flex}
          onPress={() => setIndex(i => (i + 1) % facts.length)}
        />
      </View>
      <View style={styles.dots}>
        {facts.map((f, i) => (
          <View
            key={f.id}
            style={[
              styles.dot,
              { backgroundColor: index === i ? colors.cyan : colors.border },
            ]}
          />
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  counter: { alignItems: 'flex-end', marginBottom: 12 },
  card: { gap: 16, borderColor: colors.pink, borderLeftWidth: 3, padding: 18 },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 20 },
  flex: { flex: 1 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    flexWrap: 'wrap',
    marginTop: 22,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
});
