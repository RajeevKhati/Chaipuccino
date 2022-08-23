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
  const milkInitialTimerRef = useRef(getTimerInSecs(reqMilk));
  const waterInitialTimerRef = useRef(getTimerInSecs(reqWater));

  const [milkTimer, setMilkTimer] = useState(milkInitialTimerRef.current);
  const [waterTimer, setWaterTimer] = useState(waterInitialTimerRef.current);
  const [isActive, setIsActive] = useState({milk: false, water: false});
  const milkIncrementRef = useRef(null);
  const waterIncrementRef = useRef(null);
  const isFirstCall = useRef(true);

  useEffect(
    () => () => {
      milkIncrementRef.current && clearInterval(milkIncrementRef.current);
      waterIncrementRef.current && clearInterval(waterIncrementRef.current);
    },
    [],
  );

  useEffect(() => {
    if (milkTimer === 0) clearInterval(milkIncrementRef.current);
    if (waterTimer === 0) clearInterval(waterIncrementRef.current);
    if (milkTimer === waterTimer - 1 && isFirstCall.current) {
      handleWaterStart();
      isFirstCall.current = false;
    }
  }, [milkTimer, waterTimer]);

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

  /**milk */
  const startMilkTimer = () => {
    setMilkTimer(timer => {
      if (timer <= 1) return 0;
      return timer - 1;
    });
  };

  const handleMilkStart = () => {
    if (milkTimer <= 0 || isActive.milk) return;
    setIsActive(prev => {
      return {...prev, milk: true};
    });
    startMilkTimer();
    milkIncrementRef.current = setInterval(startMilkTimer, 1000);
  };

  const handleMilkPause = () => {
    if (milkTimer <= 0) return;
    setIsActive(prev => {
      return {...prev, milk: false};
    });
    clearInterval(milkIncrementRef.current);
  };

  const handleMilkReset = () => {
    clearInterval(milkIncrementRef.current);
    setIsActive(prev => {
      return {...prev, milk: false};
    });
    setMilkTimer(milkInitialTimerRef.current);
    isFirstCall.current = true;
  };
  /**milk */

  /**Water */
  const startWaterTimer = () => {
    setWaterTimer(timer => (timer <= 1 ? 0 : timer - 1));
  };

  const handleWaterStart = () => {
    if (waterTimer <= 0 || isActive.water) return;
    setIsActive(prev => {
      return {...prev, water: true};
    });
    startWaterTimer();
    waterIncrementRef.current = setInterval(startWaterTimer, 1000);
  };

  const handleWaterPause = () => {
    if (waterTimer <= 0) return;
    clearInterval(waterIncrementRef.current);
    setIsActive(prev => {
      return {...prev, water: false};
    });
  };

  const handleWaterReset = () => {
    clearInterval(waterIncrementRef.current);
    setIsActive(prev => {
      return {...prev, water: false};
    });
    setWaterTimer(waterInitialTimerRef.current);
    isFirstCall.current = true;
  };

  /**Water */
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
          {/* {milk} */}
          <TimerButtonWrapper>
            {renderButton(
              'Start',
              handleMilkStart,
              milkTimer === 0 || isActive.milk,
            )}
            {renderButton(
              'Pause',
              handleMilkPause,
              milkTimer === 0 || !isActive.milk,
            )}
            {renderButton('Reset', handleMilkReset)}
          </TimerButtonWrapper>
          {/* {milk} */}
        </TimerContainer>
        <TimerContainer>
          <HeadText>Water Timer</HeadText>
          <TimerText>{formatTime(waterTimer)}</TimerText>
          {/* {water} */}
          <TimerButtonWrapper>
            {renderButton(
              'Start',
              handleWaterStart,
              waterTimer === 0 || milkTimer - 2 > waterTimer || isActive.water,
            )}
            {renderButton(
              'Pause',
              handleWaterPause,
              waterTimer === 0 || milkTimer - 2 > waterTimer || !isActive.water,
            )}
            {renderButton('Reset', handleWaterReset)}
          </TimerButtonWrapper>
          {/* {water} */}
        </TimerContainer>
      </ContentContainer>
    </Container>
  );
};

export default CookRecipe;
