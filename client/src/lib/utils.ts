export const validateEmail = (email: string) => {
  const validRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validRegex.test(String(email).toLowerCase());
};

export const validatePhoneNum = (phoneNum: string) => {
  const validPhoneNumber = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/;
  return validPhoneNumber.test(phoneNum);
};
