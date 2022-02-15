/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { Route } from './route';
import CartScreen from '../screens/CartScreen';
import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';
import { client } from '../queries';

export default function Navigation() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <SearchProvider>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name={Route.HOME} component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name={Route.DETAILS} component={DetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name={Route.CART} component={CartScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SearchProvider>
      </CartProvider>
    </ApolloProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator();
