const Validator = {
  validateEmail: (email) => {
    const regex =
      /^[a-zA-Z0-9][a-zA-Z0-9-.+]{1,19}@[\w.!$%&’*+/=?^-]{1,15}(\.[a-z]{1,5}){1,}$/;
    return regex.test(email);
  },
  validatePhone: (phone) => {
    const regex = /^(\+\d{0,2})?[ -]*([\d -]{3,}?|\([\d -]{3,}\))[\d -]*$/;
    if (phone.length > 25) return false;
    let isolatedNumber = phone.includes("+")
      ? phone.split(" ").slice(1).join(" ")
      : phone;
    isolatedNumber = isolatedNumber
      .split("")
      .filter((i) => i !== " " && !isNaN(i))
      .join("");
    if (isolatedNumber.length > 10) return false;
    return regex.test(phone);
  },
  validatePassword: (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    return regex.test(password);
  },
};
