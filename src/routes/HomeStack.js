import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CookRecipe, Home, Recipe} from '../screens';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Chaipuccino'}}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={{title: 'Ingredients'}}
      />
      <Stack.Screen
        name="CookRecipe"
        component={CookRecipe}
        options={{title: 'Cook Tea'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
