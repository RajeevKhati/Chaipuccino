import styled from 'styled-components/native';
import {
  BLACK,
  DARK_BROWN,
  INPUT_ACTIVE_BORDER,
  INPUT_INACTIVE_BORDER,
  WHITE,
} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_REGULAR} from '../../theme/fonts';

export const TextInputStyled = styled.TextInput`
  border-width: 1px;
  padding: 10px;
  border-radius: 8px;
  font-size: 20px;
  border: ${props =>
    props.isFocused
      ? '2px solid ' + INPUT_ACTIVE_BORDER
      : '1px solid ' + INPUT_INACTIVE_BORDER};
  background-color: ${WHITE};
  color: ${BLACK};
`;

export const Label = styled.Text`
  font-size: 20px;
  line-height: 40px;
  font-weight: 700;
  font-family: ${FONT_FAMILY_ROBOTO_REGULAR};
  color: ${DARK_BROWN};
`;
