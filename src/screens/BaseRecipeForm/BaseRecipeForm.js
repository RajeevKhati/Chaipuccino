import React, {useContext, useState} from 'react';
import {
  Container,
  HeadText,
  InputWrapper,
  Row,
  ScrollContainer,
  SubmitBtn,
} from './BaseRecipeForm.style';
import Input from '../../components/Input';
import {GlobalContext} from '../../context/Provider';
import {updateRecipe} from '../../context/actions/recipe/updateRecipe';
import {View} from 'react-native';

const BaseRecipeForm = () => {
  const {recipeState, recipeDispatch} = useContext(GlobalContext);
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

  const [minTempVal, setMinTempVal] = useState(minTemp);
  const [maxTempVal, setMaxTempVal] = useState(maxTemp);
  const [heatDurationVal, setHeatDurationVal] = useState(heatDuration);
  const [evapRateVal, setEvapRateVal] = useState(evapRate);
  const [quantityVal, setQuantityVal] = useState(quantity);
  const [waterVal, setWaterVal] = useState(water);
  const [milkVal, setMilkVal] = useState(milk);
  const [chaipattiVal, setChaipattiVal] = useState(chaipatti);
  const [elaichiVal, setElaichiVal] = useState(elaichi);
  const [gingerVal, setGingerVal] = useState(ginger);
  const [sugarVal, setSugarVal] = useState(sugar);

  const onFormSubmit = () => {
    const updatedValue = {
      minTemp: minTempVal,
      maxTemp: maxTempVal,
      heatDuration: heatDurationVal,
      evapRate: evapRateVal,
      quantity: quantityVal,
      water: waterVal,
      milk: milkVal,
      chaipatti: chaipattiVal,
      elaichi: elaichiVal,
      ginger: gingerVal,
      sugar: sugarVal,
    };
    updateRecipe(updatedValue)(recipeDispatch);
  };

  const renderInput = (label, value, setValue, half = false) => (
    <InputWrapper half={half}>
      <Input
        label={label}
        value={value}
        onChangeText={val => setValue(+val)}
        keyboardType="numeric"
      />
    </InputWrapper>
  );

  return (
    <ScrollContainer>
      <Container>
        <HeadText>Temperature in °C</HeadText>
        <Row>
          {renderInput('Minimum', minTempVal, setMinTempVal, true)}
          {renderInput('Maximum', maxTempVal, setMaxTempVal, true)}
        </Row>
        {renderInput(
          'Heat Duration in min',
          heatDurationVal,
          setHeatDurationVal,
        )}
        {renderInput('Evaporation Rate in %', evapRateVal, setEvapRateVal)}
        {renderInput(
          'Standard Tea Quantity in ml',
          quantityVal,
          setQuantityVal,
        )}
        {renderInput('Water in %', waterVal, setWaterVal)}
        {renderInput('Milk in %', milkVal, setMilkVal)}
        {renderInput('Chaipatti in gm', chaipattiVal, setChaipattiVal)}
        {renderInput('Elaichi in gm', elaichiVal, setElaichiVal)}
        {renderInput('Ginger in gm', gingerVal, setGingerVal)}
        {renderInput('Sugar in gm', sugarVal, setSugarVal)}
        <SubmitBtn text={'Save'} onPress={onFormSubmit} />
      </Container>
    </ScrollContainer>
  );
};

export default BaseRecipeForm;
