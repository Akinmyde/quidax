/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RouteListType = {
  navigation: StackNavigationProp<{ Home: undefined, Details: { book: BookType }, CartScreen: undefined }>
}

export type BookType = {
  id: string,
  image_url: string,
  title: string,
  subtitle: string,
  publisher: string,
  release_date: string,
  available_copies: number,
  price: number,
  rating: number,
  likes: number,
  quantity: number,
  totalPrice: number
  number_of_purchases: number,
  full_description: string,
  authors: any,
  tags: { name: string }[],
  genres: { name: string },
}
