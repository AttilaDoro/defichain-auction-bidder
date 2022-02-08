// eslint-disable-next-line import/prefer-default-export
export const giveAllCheckboxesTheSameValue = (tokens, newValue) => tokens.reduce((acc, token) => {
  const newAcc = { ...acc };
  newAcc[token] = newValue;
  return newAcc;
}, {});
