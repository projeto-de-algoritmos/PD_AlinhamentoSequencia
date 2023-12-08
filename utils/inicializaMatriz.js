const inicializaMatriz = (tamanho, valorGap) => {
    let matriz = new Array(tamanho).fill().map(_ => new Array(tamanho).fill(0))
 
    //Inicializa primeira coluna
    for(let i = 0; i < tamanho; i++){
       matriz[i][0] = valorGap * i;
    }
 
    //Inicializa primeira linha
    for(let j = 0; j < tamanho; j++){
       matriz[0][j] = valorGap * j;
    }
 
    return matriz;
}

export default inicializaMatriz;