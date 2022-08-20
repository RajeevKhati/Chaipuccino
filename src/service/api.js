import firestore from '@react-native-firebase/firestore';

export const getBaseRecipe = () => {
  return firestore().collection('baseRecipe').doc('9HRMI4BxYw2Y6V481JOl').get();
};

export const updateBaseRecipe = payload => {
  return firestore()
    .collection('baseRecipe')
    .doc('9HRMI4BxYw2Y6V481JOl')
    .update(payload);
};
