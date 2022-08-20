import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (routeName, params) => {
  navigationRef?.navigate(routeName, params);
};
