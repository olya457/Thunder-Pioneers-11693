import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ContentImage } from './ContentImage';
import { Article } from '../data/articles';
import { shared } from '../theme';
import { Button, IconButton } from './UI';
import { useAppState } from '../state/AppState';
import { shareArticle } from '../services/share';
export function ArticleCard({
  article,
  onRead,
}: {
  article: Article;
  onRead: () => void;
}) {
  const { state, toggleFavorite } = useAppState();
  const saved = state.favorites.includes(article.id);
  return (
    <View style={[shared.card, styles.card]}>
      <ContentImage source={article.image} borderRadius={3} />
      <Text style={shared.heading}>{article.title}</Text>
      <Text style={shared.cyan}>
        {article.name} · {article.period}
      </Text>
      <Text style={shared.body}>{article.description}</Text>
      <View style={shared.row}>
        <Button title="Read" onPress={onRead} style={styles.read} />
        <IconButton
          name="share"
          label={`Share ${article.title}`}
          onPress={() => shareArticle(article)}
        />
        <IconButton
          name="bookmark"
          label={saved ? 'Remove from favorites' : 'Add to favorites'}
          active={saved}
          onPress={() => toggleFavorite(article.id)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { gap: 10, marginBottom: 16 },
  read: { flex: 1 },
});
