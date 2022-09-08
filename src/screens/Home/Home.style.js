import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {DARK_BROWN, LIGHT_BROWN} from '../../theme/colors';
import {
  FONT_FAMILY_ROBOTO_BOLD,
  FONT_FAMILY_ROBOTO_REGULAR,
} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 26px;
  background-color: ${LIGHT_BROWN};
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  color: ${DARK_BROWN};
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
  margin: 15px 0px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: 20px;
  font-weight: 700;
  font-family: ${FONT_FAMILY_ROBOTO_REGULAR};
  color: ${DARK_BROWN};
  align-self: flex-start;
  margin-bottom: 8px;
`;

export const InputStyled = styled(Input)`
  flex-basis: 46%;
`;

export const ButtonWrapper = styled.View`
  flex-basis: 54%;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px 10px 3px;
  align-self: flex-end;
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
