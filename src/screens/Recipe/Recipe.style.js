import styled from 'styled-components/native';
import Button from '../../components/Button';
import {DARK_BROWN, LIGHT_BROWN, TEA_BROWN} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_BOLD} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${LIGHT_BROWN};
`;

export const MainText = styled.Text`
  font-size: 28px;
  color: ${DARK_BROWN};
  letter-spacing: 1px;
  line-height: 40px;
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
`;

export const SubMainText = styled(MainText)`
  color: ${TEA_BROWN};
`;

export const MarginLeft = styled.View`
  margin-left: 30px;
`;

export const StartBtn = styled(Button)`
  margin-top: 20px;
`;
