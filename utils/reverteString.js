const reverteString = (str) => {
    // Divide a string em um array de caracteres
    let caracteres = str.split('');
  
    // Inverte a ordem dos elementos no array
    let caracteresAoContrario = caracteres.reverse();
  
    // Une os caracteres novamente em uma string
    let strAoContrario = caracteresAoContrario.join('');
  
    // Imprime a string ao contrário
    return strAoContrario;
}

export default reverteString;