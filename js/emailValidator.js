function emailValidator(input) {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(input);

  //const reg = /^(?<=(?<=(\w(?<=\w)@))\w)[.]$/;
  // return reg.exec(input);
}

export { emailValidator };
