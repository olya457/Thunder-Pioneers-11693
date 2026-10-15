import React from 'react';
import { StyleSheet } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArticleStackParams, TabParams } from './types';
import { ArticlesScreen, ArticleScreen } from '../screens/ArticlesScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { GameScreen } from '../screens/GameScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
import { FactsScreen } from '../screens/FactsScreen';
import { Icon, IconName } from '../components/Icon';
import { colors } from '../theme';
const Tab = createBottomTabNavigator<TabParams>();
const Stack = createNativeStackNavigator<ArticleStackParams>();
const icons: Record<keyof TabParams, IconName> = {
  Discoveries: 'book',
  Quiz: 'quiz',
  Game: 'game',
  Tools: 'tools',
  Facts: 'bolt',
  Favorites: 'bookmark',
};
const tabIcons = Object.fromEntries(
  Object.entries(icons).map(([route, name]) => [
    route,
    ({ color }: { color: string }) => (
      <Icon name={name} color={color} size={23} />
    ),
  ]),
) as Record<keyof TabParams, (props: { color: string }) => React.ReactNode>;
function DiscoveriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: styles.background }}
    >
      <Stack.Screen name="List" component={ArticlesScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
}
function FavoritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: styles.background }}
    >
      <Stack.Screen name="List">
        {props => <ArticlesScreen {...props} favorites />}
      </Stack.Screen>
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
}
export function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.background,
          text: colors.text,
          primary: colors.cyan,
          border: colors.border,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.muted,
          tabBarAccessibilityLabel: route.name,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            height: 62 + Math.max(insets.bottom, 10),
            paddingTop: 10,
            paddingBottom: Math.max(insets.bottom, 10),
          },
          tabBarIcon: tabIcons[route.name],
        })}
      >
        <Tab.Screen name="Discoveries" component={DiscoveriesStack} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="Game" component={GameScreen} />
        <Tab.Screen name="Tools" component={ToolsScreen} />
        <Tab.Screen name="Facts" component={FactsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  background: { backgroundColor: colors.background },
});
