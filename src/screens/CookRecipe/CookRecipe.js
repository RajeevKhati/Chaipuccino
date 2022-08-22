import React, {useContext, useEffect, useRef, useState} from 'react';
import Button from '../../components/Button';
import {GlobalContext} from '../../context/Provider';
import {
  Container,
  ContentContainer,
  HeadText,
  Ingredients,
  ItemText,
  Row,
  TimerButtonWrapper,
  TimerContainer,
  TimerText,
} from './CookRecipe.style';

const CookRecipe = ({route}) => {
  const {recipeState} = useContext(GlobalContext);
  const {heatDuration} = recipeState.recipe;
  const {
    reqMilk,
    reqWater,
    sugarQuant,
    chaipattiQuant,
    gingerQuant,
    elaichiQuant,
  } = route.params;

  /**
   * Assumption: for 1 litre/1000 ml it takes 'heatDuration' min to evaporate 20%.
   * Duration is calculated solely based on quantity.
   */
  const getTimerInSecs = quantInML => ((quantInML * heatDuration) / 1000) * 60;
  const milkInitialTimerRef = useRef(10);
  const waterInitialTimerRef = useRef(4);

  const [milkTimer, setMilkTimer] = useState(milkInitialTimerRef.current);
  const [waterTimer, setWaterTimer] = useState(waterInitialTimerRef.current);
  const milkIncrement = useRef(null);
  const waterIncrement = useRef(null);
  const isFirstCall = useRef(true);

  useEffect(
    () => () => {
      milkIncrement.current && clearInterval(milkIncrement.current);
      waterIncrement.current && clearInterval(waterIncrement.current);
    },
    [],
  );

  useEffect(() => {
    if (milkTimer === 0) clearInterval(milkIncrement.current);
    if (waterTimer === 0) clearInterval(waterIncrement.current);
  }, [milkTimer, waterTimer]);

  const handleWaterStart = () => {
    waterIncrement.current = setInterval(() => {
      setWaterTimer(timer => (timer <= 1 ? 0 : timer - 1));
    }, 1000);
  };

  const handleStart = (setTimerCallback, incrementRef, type) => {
    if (
      (type === 'milk' && milkTimer <= 0) ||
      (type === 'water' && waterTimer <= 0)
    )
      return;

    incrementRef.current = setInterval(() => {
      setTimerCallback(timer => {
        if (timer <= 1) return 0;
        if (
          type === 'milk' &&
          timer - 1 === waterTimer &&
          isFirstCall.current
        ) {
          handleWaterStart();
          isFirstCall.current = false;
        }
        return timer - 1;
      });
    }, 1000);
  };

  const handlePause = incrementRef => {
    clearInterval(incrementRef.current);
  };

  const handleResume = (setTimerCallback, incrementRef, type) => {
    if (
      (type === 'milk' && milkTimer <= 0) ||
      (type === 'water' && waterTimer <= 0)
    )
      return;
    incrementRef.current = setInterval(() => {
      setTimerCallback(timer => (timer <= 1 ? 0 : timer - 1));
    }, 1000);
  };

  const handleReset = (setTimerCallback, incrementRef, type) => {
    clearInterval(incrementRef.current);
    if (type === 'milk') {
      setTimerCallback(milkInitialTimerRef.current);
      isFirstCall.current = true;
    } else setTimerCallback(waterInitialTimerRef.current);
  };

  const formatTime = timer => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const renderButton = (text, onPress, isDisabled) => (
    <Button text={text} onPress={onPress} disabled={isDisabled} />
  );

  const renderTimerButtons = (
    setTimerCallback,
    incrementRef,
    isDisabled = false,
    type,
  ) => (
    <>
      <TimerButtonWrapper>
        {renderButton(
          'Start',
          () => handleStart(setTimerCallback, incrementRef, type),
          isDisabled,
        )}
        {renderButton(
          'Reset',
          () => handleReset(setTimerCallback, incrementRef, type),
          isDisabled,
        )}
      </TimerButtonWrapper>
      <TimerButtonWrapper>
        {renderButton('Pause', () => handlePause(incrementRef), isDisabled)}
        {renderButton(
          'Resume',
          () => handleResume(setTimerCallback, incrementRef, type),
          isDisabled,
        )}
      </TimerButtonWrapper>
    </>
  );

  return (
    <Container>
      <ContentContainer>
        <Ingredients>Ingredients:</Ingredients>
        <Row>
          <ItemText>milk : {reqMilk} ml, </ItemText>
          <ItemText>water : {reqWater} ml, </ItemText>
          <ItemText>sugar : {sugarQuant} gm, </ItemText>
          <ItemText>chaipatti : {chaipattiQuant} gm, </ItemText>
          <ItemText>ginger : {gingerQuant} gm, </ItemText>
          <ItemText>elaichi : {elaichiQuant} gm, </ItemText>
        </Row>
        <TimerContainer>
          <HeadText>Milk Timer</HeadText>
          <TimerText>{formatTime(milkTimer)}</TimerText>
          {renderTimerButtons(setMilkTimer, milkIncrement, null, 'milk')}
        </TimerContainer>
        <TimerContainer>
          <HeadText>Water Timer</HeadText>
          <TimerText>{formatTime(waterTimer)}</TimerText>
          {renderTimerButtons(
            setWaterTimer,
            waterIncrement,
            milkTimer - 2 > waterTimer,
            'water',
          )}
        </TimerContainer>
      </ContentContainer>
    </Container>
  );
};

export default CookRecipe;
