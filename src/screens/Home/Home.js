import React, {useContext, useEffect, useState} from 'react';
import {
  ButtonStyled,
  ButtonWrapper,
  CalcIngBtn,
  Container,
  HeaderText,
  InputStyled,
  RowContainer,
} from './Home.style';
import {GlobalContext} from '../../context/Provider';
import {getRecipe} from '../../context/actions/recipe/getRecipe';
import {navigate} from '../../service/navigation';
import {getDecimal} from '../../helpers/method';

const Home = () => {
  const [quant, setQuant] = useState({val: '1', unit: 'litre'});
  const [inputVal, setInputVal] = useState({
    cups: '20',
    milk: '20',
    selected: 'cups',
  });

  const {recipeDispatch} = useContext(GlobalContext);

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
      console.log(typeof prev, prev, +prev.val * 1000);
      const litreToML = +prev.val * 1000;
      return {val: getDecimal(litreToML) + '', unit: 'ml'};
    });
  };

  const onCupsClick = () => {
    setInputVal(prev => {
      return {...prev, selected: 'cups', cups: prev.milk};
    });
    setQuant(prev => {
      const currentInputVal = +inputVal.milk;
      const cupsToML = currentInputVal * 50;
      const cupsToQuantVal = prev.unit === 'ml' ? cupsToML : cupsToML / 1000;
      return {...prev, val: getDecimal(cupsToQuantVal) + ''};
    });
  };

  const onMilkClick = () => {
    setInputVal(prev => {
      return {...prev, selected: 'milk', milk: prev.cups};
    });
    setQuant(prev => {
      const currentInputVal = +inputVal.cups;
      const avlMilk = currentInputVal;
      const finalMilk = (80 / 100) * avlMilk;
      const chaiQuant = (100 / 60) * finalMilk;
      const finalQuantVal = quant.unit === 'ml' ? chaiQuant : chaiQuant / 1000;
      return {...prev, val: getDecimal(finalQuantVal) + ''};
    });
  };

  return (
    <Container>
      <HeaderText>Desired Output in {quant.unit}</HeaderText>
      <RowContainer>
        <InputStyled
          onChangeText={val => {
            const currentML = quant.unit === 'ml' ? +val : +val * 1000;
            if (inputVal.selected === 'cups')
              setInputVal(prev => {
                return {...prev, cups: currentML / 50 + ''};
              });
            else
              setInputVal(prev => {
                return {...prev, milk: (currentML * 60) / 100 + ''};
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
      <RowContainer>
        <InputStyled
          onChangeText={val => {
            if (inputVal.selected === 'cups') {
              const cupsToML = +val * 50;
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
              const finalMilk = (80 / 100) * avlMilk;
              const chaiQuant = (100 / 60) * finalMilk;
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
