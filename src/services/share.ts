import { Alert, Share } from 'react-native';
import { Article } from '../data/articles';
export async function shareText(title: string, message: string) {
  try {
    await Share.share({ title, message: `${title}\n\n${message}` });
  } catch {
    Alert.alert('Sharing unavailable', 'Please try again.');
  }
}
export const shareArticle = (article: Article) =>
  shareText(
    article.title,
    `${article.name} · ${article.period}\n\n${article.paragraphs.join('\n\n')}`,
  );
