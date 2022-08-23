import React, {useState} from 'react';
import {Keyboard, TextInput, View} from 'react-native';
import {Label, TextInputStyled} from './styles';

const Input = ({label, value, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {label && <Label>{label}</Label>}
      <TextInputStyled
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value && value + ''}
        maxLength={12}
        {...props}
      />
    </>
  );
};

export default Input;
