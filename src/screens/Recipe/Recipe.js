import React, {useContext} from 'react';
import {View} from 'react-native';
import {GlobalContext} from '../../context/Provider';
import {getDecimal} from '../../helpers/method';
import {navigate} from '../../service/navigation';
import {
  Container,
  MainText,
  MarginLeft,
  StartBtn,
  SubMainText,
} from './Recipe.style';

const Recipe = ({route}) => {
  const {recipeState} = useContext(GlobalContext);
  const {
    evapRate,
    quantity: stdQuantity,
    water,
    milk,
    chaipatti,
    elaichi,
    ginger,
    sugar,
  } = recipeState.recipe;

  const {quantInML} = route.params;
  const calcQuant = val => getDecimal((val * quantInML) / stdQuantity);
  const desiredMilk = getDecimal(quantInML * (milk / 100));
  const reqMilk = getDecimal(desiredMilk * (100 / (100 - evapRate)));
  const desiredWater = getDecimal(quantInML * (water / 100));
  const reqWater = getDecimal(desiredWater * (100 / (100 - evapRate)));
  const sugarQuant = calcQuant(sugar);
  const chaipattiQuant = calcQuant(chaipatti);
  const gingerQuant = calcQuant(ginger);
  const elaichiQuant = calcQuant(elaichi);

  return (
    <Container>
      <View>
        <MainText>Milk:</MainText>
        <MarginLeft>
          <SubMainText>Required: {reqMilk} ml</SubMainText>
          <SubMainText>Desired: {desiredMilk} ml</SubMainText>
        </MarginLeft>
        <MainText>Water:</MainText>
        <MarginLeft>
          <SubMainText>Required: {reqWater} ml</SubMainText>
          <SubMainText>Desired: {desiredWater} ml</SubMainText>
        </MarginLeft>
        <MainText>Sugar: {sugarQuant} gm</MainText>
        <MainText>Chaipatti: {chaipattiQuant} gm</MainText>
        <MainText>Ginger: {gingerQuant} gm</MainText>
        <MainText>Elaichi: {elaichiQuant} gm</MainText>
        <StartBtn
          text={'Start'}
          onPress={() =>
            navigate('CookRecipe', {
              reqMilk,
              reqWater,
              sugarQuant,
              chaipattiQuant,
              gingerQuant,
              elaichiQuant,
            })
          }
        />
      </View>
    </Container>
  );
};

export default Recipe;
