import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Recipe} from '../screens';

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
    </Stack.Navigator>
  );
};

export default HomeStack;
