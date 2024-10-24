function passwordValidator(input) {
    let strength = false;

    //au moins 6 char
    const least = /^.{6,}$/;
    if (least.test(input)) strength = 1;

    //si 6+ et symbole/nombre --> moyen
    const mid = /^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()\-"']).{6,}$/;
    if (mid.test(input)) strength = 2;

    //si 9+ et symbole+nombre --> fort 
    const strong = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-"'])(?=.*\d).{9,}$/;
    if (strong.test(input)) strength = 3;

    return strength;
}

export { passwordValidator };
