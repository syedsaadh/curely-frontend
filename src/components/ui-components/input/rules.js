const mobile = {
  pattern: '^[2-9]{1}[0-9]{9}$',
  message: 'Phone Number is Incorrect',
};
const email = {
  type: 'email',
};
const pincode = {
  pattern: '^[1-9]?[0-9]+$',
  len: 6,
  message: 'Pincode must be of 6 digits',
};
const integer = {
  pattern: '^[-+]?[0-9]+$',
  message: 'Only Integers are allowed',
};

const float = {
  message: 'Only Float are allowed',
  pattern: '^[-+]?[0-9]+.[0-9]+$',
};

const number = {
  message: 'Only Numbers are allowed',
  pattern: '^[+]?[0-9]+(.[0-9]+)?$',
};

const amount = {
  message: 'Amount is Incorrect',
  pattern: '^[+]?[0-9]+(.[0-9]+)?$',
};

const positiveNumber = {
  pattern: '^[+]?[0-9]+$',
  message: 'Only Number are allowed',
};
const pannumber = {
  message: 'Pan Number must be exactly 10 characters',
  len: 10,
};
const rules = {};
rules.mobile = mobile;
rules.email = email;
rules.number = number;
rules.amount = amount;
rules.pannumber = pannumber;
rules.positiveNumber = positiveNumber;
rules.pincode = pincode;
export default rules;
