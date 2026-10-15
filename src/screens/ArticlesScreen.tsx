import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ArticleStackParams, TabParams } from '../navigation/types';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ContentImage } from '../components/ContentImage';
import { Button, IconButton, Screen } from '../components/UI';
import { shared } from '../theme';
import { useAppState } from '../state/AppState';
import { images } from '../data/images';
import { shareArticle } from '../services/share';
export function ArticlesScreen({
  navigation,
  favorites = false,
}: NativeStackScreenProps<ArticleStackParams, 'List'> & {
  favorites?: boolean;
}) {
  const { state } = useAppState();
  const tabs = useNavigation<BottomTabNavigationProp<TabParams>>();
  const data = favorites
    ? articles.filter(a => state.favorites.includes(a.id))
    : articles;
  return (
    <Screen scroll={false}>
      <Text style={shared.title}>
        {favorites ? 'Favorites' : 'Discoveries'}
      </Text>
      <FlatList
        data={data}
        keyExtractor={a => a.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onRead={() => navigation.navigate('Article', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Image source={images.favorites} style={styles.emptyImage} />
            <Text style={[shared.heading, shared.center]}>
              No Saved Articles Yet
            </Text>
            <Text style={[shared.body, shared.center]}>
              Save articles that spark your curiosity and find them here.
            </Text>
            <Button
              title="Explore Articles"
              onPress={() => tabs.navigate('Discoveries')}
            />
          </View>
        }
      />
    </Screen>
  );
}
export function ArticleScreen({
  route,
  navigation,
}: NativeStackScreenProps<ArticleStackParams, 'Article'>) {
  const article = articles.find(a => a.id === route.params.id);
  const { state, toggleFavorite } = useAppState();
  if (!article)
    return (
      <Screen>
        <Button title="Back to Articles" onPress={() => navigation.goBack()} />
      </Screen>
    );
  return (
    <Screen>
      <View style={[shared.row, styles.toolbar]}>
        <IconButton
          name="back"
          label="Back"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.spacer} />
        <IconButton
          name="share"
          label="Share article"
          onPress={() => shareArticle(article)}
        />
        <IconButton
          name="bookmark"
          label={
            state.favorites.includes(article.id)
              ? 'Remove from favorites'
              : 'Add to favorites'
          }
          active={state.favorites.includes(article.id)}
          onPress={() => toggleFavorite(article.id)}
        />
      </View>
      <ContentImage source={article.image} />
      <Text style={[shared.title, styles.title]}>{article.title}</Text>
      <Text style={shared.cyan}>
        {article.name} · {article.period}
      </Text>
      {article.paragraphs.map(p => (
        <Text key={p} style={[shared.body, styles.paragraph]}>
          {p}
        </Text>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  empty: { gap: 20, paddingVertical: 30 },
  emptyImage: {
    width: '85%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 32,
  },
  toolbar: { marginBottom: 20 },
  spacer: { flex: 1 },
  title: { marginTop: 20, marginBottom: 6 },
  paragraph: { fontSize: 16, lineHeight: 27, marginTop: 22 },
});
