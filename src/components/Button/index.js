import React from 'react';
import {BtnText, ButtonStyled} from './styles';

const Button = ({text, onPress, ...props}) => {
  return (
    <ButtonStyled onPress={onPress} {...props}>
      <BtnText>{text}</BtnText>
    </ButtonStyled>
  );
};

export default Button;
