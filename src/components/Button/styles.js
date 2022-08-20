import styled from 'styled-components/native';
import {TEA_BROWN} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_MEDIUM} from '../../theme/fonts';

export const ButtonStyled = styled.TouchableOpacity`
  padding: 6px;
  background-color: ${TEA_BROWN};
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  border-radius: 5px;
`;

export const BtnText = styled.Text`
  color: white;
  font-size: 24px;
  font-family: ${FONT_FAMILY_ROBOTO_MEDIUM};
`;
