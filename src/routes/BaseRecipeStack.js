import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BaseRecipe, BaseRecipeForm} from '../screens';

const Stack = createNativeStackNavigator();
const BaseRecipeStack = () => {
  return (
    <Stack.Navigator initialRouteName="BaseRecipe">
      <Stack.Screen
        name="BaseRecipe"
        component={BaseRecipe}
        options={{title: 'Base Recipe'}}
      />
      <Stack.Screen
        name="BaseRecipeForm"
        component={BaseRecipeForm}
        options={{title: 'Edit Base Recipe'}}
      />
    </Stack.Navigator>
  );
};

export default BaseRecipeStack;
