export const validateAmount = (amount) => {
    // Allow only numbers and one optional decimal point
    const isValidFormat = /^\d*\.?\d*$/.test(amount);
  
    // Ensure no leading zeros (except for "0" or "0.xxx")
    const hasNoLeadingZeros = /^(?!0\d)\d*\.?\d*$/.test(amount);
  
    // Ensure no more than 2 decimal places
    const hasValidDecimals = /^\d*\.?\d{0,2}$/.test(amount);
  
    // Ensure the amount is within a valid range
    const numericValue = parseFloat(amount);
    const isWithinRange = numericValue >= 0 && numericValue <= 1000;
  
    return isValidFormat && hasNoLeadingZeros && hasValidDecimals && isWithinRange;
  };