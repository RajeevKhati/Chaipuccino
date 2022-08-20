import React, {useContext} from 'react';
import {View} from 'react-native';
import {GlobalContext} from '../../context/Provider';
import {navigate} from '../../service/navigation';
import {Container, EditBtn, MainText} from './BaseRecipe.style';

const BaseRecipe = () => {
  const {recipeState} = useContext(GlobalContext);
  const {
    minTemp,
    maxTemp,
    heatDuration,
    evapRate,
    quantity,
    water,
    milk,
    chaipatti,
    elaichi,
    ginger,
    sugar,
  } = recipeState.recipe;

  const getText = (caption, value) => (
    <MainText>
      {caption} : {value}
    </MainText>
  );

  return (
    <Container>
      <View>
        {getText('Minimum Temperature', minTemp + '°C')}
        {getText('Maximum Temperature', maxTemp + '°C')}
        {getText('Heat Duration', heatDuration + ' min')}
        {getText('Evaporation Rate', evapRate + '%')}
        {getText('Standard Quantity', quantity + ' ml')}
        {getText('Water', water + '%')}
        {getText('Milk', milk + '%')}
        {getText('Chaipatti', chaipatti + ' gm')}
        {getText('Elaichi', elaichi + ' gm')}
        {getText('Ginger', ginger + ' gm')}
        {getText('Sugar', sugar + ' gm')}
        <EditBtn text={'Edit'} onPress={() => navigate('BaseRecipeForm')} />
      </View>
    </Container>
  );
};

export default BaseRecipe;
