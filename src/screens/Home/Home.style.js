import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {DARK_BROWN, LIGHT_BROWN, TEA_BROWN} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_BOLD} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  background-color: ${LIGHT_BROWN};
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  color: ${DARK_BROWN};
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
  margin: 15px 0px;
`;

export const InputStyled = styled(Input)`
  flex-basis: 50%;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;

export const ButtonWrapper = styled.View`
  flex-basis: 50%;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px 10px;
`;

export const ButtonStyled = styled(Button)`
  flex-basis: 48%;
  border-radius: 24px;
`;

export const CalcIngBtn = styled(Button)`
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
`;
