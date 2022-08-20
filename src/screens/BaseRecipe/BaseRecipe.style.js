import styled from 'styled-components/native';
import Button from '../../components/Button';
import {DARK_BROWN, LIGHT_BROWN} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_BOLD} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${LIGHT_BROWN};
`;

export const MainText = styled.Text`
  font-size: 22px;
  color: ${DARK_BROWN};
  line-height: 40px;
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
`;

export const EditBtn = styled(Button)`
  margin-top: 10px;
`;
