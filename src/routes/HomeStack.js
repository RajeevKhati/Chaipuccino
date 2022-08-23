import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CookRecipe, Home, Recipe} from '../screens';
import {Image, Text} from 'react-native';
import {DARK_BROWN} from '../theme/colors';
import {FONT_FAMILY_ROBOTO_REGULAR} from '../theme/fonts';

const Stack = createNativeStackNavigator();
const LogoTitle = ({title}) => {
  return (
    <>
      <Image
        style={{width: 42, height: 42}}
        source={require('../assets/images/chai-logo.png')}
      />
      <Text
        style={{
          fontSize: 22,
          color: DARK_BROWN,
          marginLeft: 10,
          fontFamily: FONT_FAMILY_ROBOTO_REGULAR,
        }}>
        {title}
      </Text>
    </>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <LogoTitle title={'Chaipuccino'} />,
        }}
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
