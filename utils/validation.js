export const validateAmount = (amount) => {
    return /^\d*\.?\d*$/.test(amount); // Allow only numbers and decimals
  };