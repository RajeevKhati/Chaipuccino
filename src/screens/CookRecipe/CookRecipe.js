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
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';

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
  const milkInitialTimerRef = useRef(Math.round(getTimerInSecs(reqMilk)));
  const waterInitialTimerRef = useRef(Math.round(getTimerInSecs(reqWater)));

  const [milkTimer, setMilkTimer] = useState(milkInitialTimerRef.current);
  const [waterTimer, setWaterTimer] = useState(waterInitialTimerRef.current);
  const [isActive, setIsActive] = useState({milk: false, water: false});
  const milkIncrementRef = useRef(null);
  const waterIncrementRef = useRef(null);
  const isFirstCall = useRef({water: true, timer: true});

  const [isPlaying, setIsPlaying] = useState(false);

  const alarm = useRef(
    new Sound('alarm.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    }),
  );

  useEffect(() => {
    return () => {
      milkIncrementRef.current &&
        BackgroundTimer.clearInterval(milkIncrementRef.current);
      waterIncrementRef.current &&
        BackgroundTimer.clearInterval(waterIncrementRef.current);
      alarm.current.release();
    };
  }, []);

  useEffect(() => {
    if (milkTimer === 0) {
      BackgroundTimer.clearInterval(milkIncrementRef.current);
      handleAlarm();
    }
    if (waterTimer === 0) {
      BackgroundTimer.clearInterval(waterIncrementRef.current);
      handleAlarm();
    }
    if (milkTimer === waterTimer - 1 && isFirstCall.current.water) {
      handleWaterStart();
      isFirstCall.current = {...isFirstCall.current, water: false};
    }
    if (
      milkTimer - 30 <= waterTimer &&
      isActive.milk &&
      isFirstCall.current.timer
    ) {
      handleAlarm();
      isFirstCall.current = {...isFirstCall.current, timer: false};
    }
  }, [milkTimer, waterTimer]);

  const formatTime = timer => {
    const getSeconds = `0${Math.floor((timer % 3600) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((timer % 3600) / 60)}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const renderButton = (text, onPress, isDisabled = false) => (
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
    milkIncrementRef.current = BackgroundTimer.setInterval(
      startMilkTimer,
      1000,
    );
  };

  const handleMilkPause = () => {
    if (milkTimer <= 0) return;
    setIsActive(prev => {
      return {...prev, milk: false};
    });
    BackgroundTimer.clearInterval(milkIncrementRef.current);
  };

  const handleMilkReset = () => {
    BackgroundTimer.clearInterval(milkIncrementRef.current);
    setIsActive(prev => {
      return {...prev, milk: false};
    });
    setMilkTimer(milkInitialTimerRef.current);
    isFirstCall.current = {...isFirstCall.current, water: true, timer: true};
  };
  /**milk */

  /**Water */
  const startWaterTimer = () => {
    setWaterTimer(timer => (timer <= 1 ? 0 : timer - 1));
  };

  const handleWaterStart = () => {
    if (waterTimer <= -1 || isActive.water) return;
    setIsActive(prev => {
      return {...prev, water: true};
    });
    startWaterTimer();
    waterIncrementRef.current = BackgroundTimer.setInterval(
      startWaterTimer,
      1000,
    );
  };

  const handleWaterPause = () => {
    if (waterTimer <= 0) return;
    BackgroundTimer.clearInterval(waterIncrementRef.current);
    setIsActive(prev => {
      return {...prev, water: false};
    });
  };

  const handleWaterReset = () => {
    BackgroundTimer.clearInterval(waterIncrementRef.current);
    setIsActive(prev => {
      return {...prev, water: false};
    });
    setWaterTimer(waterInitialTimerRef.current);
    isFirstCall.current = {...isFirstCall.current, water: true};
  };

  const handleAlarm = (startAlarm = true) => {
    if (startAlarm) {
      // Play the sound with infinite loop
      if (isPlaying) return;
      alarm.current.setNumberOfLoops(-1).play();
      setIsPlaying(true);
    } else {
      alarm.current.stop();
      setIsPlaying(false);
    }
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
        {renderButton('Stop Alarm', () => handleAlarm(false), !isPlaying)}
      </ContentContainer>
    </Container>
  );
};

export default CookRecipe;
