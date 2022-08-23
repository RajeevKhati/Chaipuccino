import styled from 'styled-components/native';
import {DARK_BROWN, DARK_BROWN_LESS, LIGHT_BROWN} from '../../theme/colors';
import {
  FONT_FAMILY_ROBOTO_BOLD,
  FONT_FAMILY_ROBOTO_MEDIUM,
} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${LIGHT_BROWN};
`;

export const ContentContainer = styled.View`
  align-items: center;
`;

export const Ingredients = styled.Text`
  font-size: 22px;
  color: ${DARK_BROWN};
  letter-spacing: 1px;
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
`;

export const ItemText = styled.Text`
  font-size: 20px;
  color: ${DARK_BROWN_LESS};
  letter-spacing: 1px;
  font-family: ${FONT_FAMILY_ROBOTO_MEDIUM};
`;

export const TimerContainer = styled.View`
  width: 100%;
  align-items: center;
  margin: 20px 0px;
`;

export const TimerButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  padding: 10px 0px 5px;
`;

export const HeadText = styled.Text`
  font-size: 24px;
  color: ${DARK_BROWN};
  letter-spacing: 1px;
  line-height: 35px;
  font-family: ${FONT_FAMILY_ROBOTO_BOLD};
`;

export const TimerText = styled(HeadText)`
  font-size: 28px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
