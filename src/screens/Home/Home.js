import React, {useContext, useEffect, useState} from 'react';
import {
  ButtonStyled,
  ButtonWrapper,
  CalcIngBtn,
  Container,
  HeaderText,
  InputLabel,
  InputStyled,
  RowContainer,
} from './Home.style';
import {GlobalContext} from '../../context/Provider';
import {getRecipe} from '../../context/actions/recipe/getRecipe';
import {navigate} from '../../service/navigation';
import {getDecimal} from '../../helpers/method';

const ML_PER_CUP = 50;

const Home = () => {
  const [quant, setQuant] = useState({val: '1', unit: 'litre'});
  const [inputVal, setInputVal] = useState({
    cups: '20',
    milk: '20',
    selected: 'cups',
  });

  const {recipeState, recipeDispatch} = useContext(GlobalContext);

  const {evapRate, milk: stdMilkInPercent} = recipeState.recipe;

  useEffect(() => {
    getRecipe()(recipeDispatch);
  }, []);

  const onLitreClick = () => {
    if (quant.unit === 'litre') return;
    setQuant(prev => {
      const mlToLitre = +prev.val / 1000;
      return {val: getDecimal(mlToLitre) + '', unit: 'litre'};
    });
  };

  const onMLClick = () => {
    if (quant.unit === 'ml') return;
    setQuant(prev => {
      const litreToML = +prev.val * 1000;
      return {val: getDecimal(litreToML) + '', unit: 'ml'};
    });
  };

  const onCupsClick = () => {
    setInputVal(prev => {
      const reqMilk = +prev.milk;
      const desiredMilk = ((100 - evapRate) / 100) * reqMilk;
      const finalChai = (100 / stdMilkInPercent) * desiredMilk;
      return {...prev, selected: 'cups', cups: finalChai / ML_PER_CUP + ''};
    });
  };

  const onMilkClick = () => {
    setInputVal(prev => {
      const finalChaiInML = +prev.cups * ML_PER_CUP;
      const desiredMilk = (stdMilkInPercent / 100) * finalChaiInML;
      const reqMilk = (100 / (100 - evapRate)) * desiredMilk;
      return {...prev, selected: 'milk', milk: reqMilk + ''};
    });
  };

  return (
    <Container>
      <HeaderText>IT'S CHAI TIME!!</HeaderText>
      <InputLabel>Desired Output in {quant.unit}</InputLabel>
      <RowContainer>
        <InputStyled
          onChangeText={val => {
            const finalChaiInML = quant.unit === 'ml' ? +val : +val * 1000;
            if (inputVal.selected === 'cups')
              setInputVal(prev => {
                return {...prev, cups: finalChaiInML / ML_PER_CUP + ''};
              });
            else
              setInputVal(prev => {
                const desiredMilk = (stdMilkInPercent / 100) * finalChaiInML;
                const reqMilk = (100 / (100 - evapRate)) * desiredMilk;
                return {...prev, milk: reqMilk + ''};
              });
            setQuant(prev => {
              return {...prev, val};
            });
          }}
          value={quant.val}
          keyboardType="numeric"
        />
        <ButtonWrapper>
          <ButtonStyled
            disabled={quant.unit === 'litre'}
            text={'litre'}
            onPress={onLitreClick}
          />
          <ButtonStyled
            disabled={quant.unit === 'ml'}
            text={'ml'}
            onPress={onMLClick}
          />
        </ButtonWrapper>
      </RowContainer>
      <InputLabel>Available (1 cup is 50ml, milk is in ml)</InputLabel>
      <RowContainer>
        <InputStyled
          onChangeText={val => {
            if (inputVal.selected === 'cups') {
              const cupsToML = +val * ML_PER_CUP;
              const cupsToQuantVal =
                quant.unit === 'ml' ? cupsToML : cupsToML / 1000;
              setQuant(prev => {
                return {...prev, val: getDecimal(cupsToQuantVal) + ''};
              });
              // setNumOfCups(val);
              setInputVal(prev => {
                return {...prev, cups: val};
              });
            } else {
              const avlMilk = +val;
              const finalMilk = ((100 - evapRate) / 100) * avlMilk;
              const chaiQuant = (100 / stdMilkInPercent) * finalMilk;
              const finalQuantVal =
                quant.unit === 'ml' ? chaiQuant : chaiQuant / 1000;
              setQuant(prev => {
                return {...prev, val: getDecimal(finalQuantVal) + ''};
              });
              setInputVal(prev => {
                return {...prev, milk: val};
              });
            }
          }}
          value={inputVal.selected === 'cups' ? inputVal.cups : inputVal.milk}
          keyboardType="numeric"
        />
        <ButtonWrapper>
          <ButtonStyled
            disabled={inputVal.selected === 'cups'}
            text={'Cups'}
            onPress={onCupsClick}
          />
          <ButtonStyled
            disabled={inputVal.selected === 'milk'}
            text={'Milk'}
            onPress={onMilkClick}
          />
        </ButtonWrapper>
      </RowContainer>
      <CalcIngBtn
        text={'Calculate Ingredients'}
        onPress={() =>
          navigate('Recipe', {
            quantInML: quant.unit === 'ml' ? +quant.val : +quant.val * 1000,
          })
        }
      />
    </Container>
  );
};

export default Home;
