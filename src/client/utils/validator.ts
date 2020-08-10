export const MIN_LENGTH = (val: number) => {
  return {
    type: 'MIN_LENGTH',
    val,
  };
};

export const MAX_LENGTH = (val: number) => {
  return {
    type: 'MAX_LENGTH',
    val,
  };
};

export const isValid = (value: any, validators: any[]) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === 'MIN_LENGTH') {
      isValid = isValid && value.length >= validator.val;
    }

    if (validator.type === 'MAX_LENGTH') {
      isValid = isValid && value.length <= validator.val;
    }
  }

  return isValid;
};
