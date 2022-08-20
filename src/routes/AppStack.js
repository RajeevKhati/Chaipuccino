import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import BaseRecipeStack from './BaseRecipeStack';

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'center',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 18,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlignVertical: 'center',
        },
        tabBarIconStyle: {display: 'none'},
      }}
      initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="BaseRecipeTab"
        component={BaseRecipeStack}
        options={{title: 'Base Recipe'}}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
