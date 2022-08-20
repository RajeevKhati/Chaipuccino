import React, {useContext, useEffect, useState} from 'react';
import {
  ButtonStyled,
  ButtonWrapper,
  CalcIngBtn,
  Container,
  CupText,
  CupWrapper,
  HeaderText,
  InputStyled,
  RowContainer,
} from './Home.style';
import {GlobalContext} from '../../context/Provider';
import {getRecipe} from '../../context/actions/recipe/getRecipe';
import {navigate} from '../../service/navigation';

const Home = () => {
  const [quant, setQuant] = useState({val: '1', unit: 'litre'});
  const [numOfCups, setNumOfCups] = useState('20');

  const {recipeDispatch} = useContext(GlobalContext);

  useEffect(() => {
    getRecipe()(recipeDispatch);
  }, []);

  const onLitreClick = () => {
    if (quant.unit === 'litre') return;
    setQuant(prev => {
      const mlToLitre = +prev.val / 1000;
      return {val: mlToLitre + '', unit: 'litre'};
    });
  };

  const onMLClick = () => {
    if (quant.unit === 'ml') return;
    setQuant(prev => {
      const litreToML = +prev.val * 1000;
      return {val: litreToML + '', unit: 'ml'};
    });
  };

  return (
    <Container>
      <HeaderText>Desired Output in {quant.unit}</HeaderText>
      <RowContainer>
        <InputStyled
          onChangeText={val => {
            const currentML = quant.unit === 'ml' ? +val : +val * 1000;
            setNumOfCups(currentML / 50 + '');
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
            const cupsToML = +val * 50;
            const cupsToQuantVal =
              quant.unit === 'ml' ? cupsToML : cupsToML / 1000;
            setQuant(prev => {
              return {...prev, val: cupsToQuantVal + ''};
            });
            setNumOfCups(val);
          }}
          value={numOfCups}
          keyboardType="numeric"
        />
        <CupWrapper>
          <CupText>Cups</CupText>
        </CupWrapper>
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
