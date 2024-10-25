function pseudoValidator(input) {

     const reg = /^.{3,}$/;
     return reg.test(input);
}

export { pseudoValidator };
