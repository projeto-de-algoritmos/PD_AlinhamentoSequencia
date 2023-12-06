function alinhaStrings(stringA, stringB, valorGap=2, valorMismatch=3){
   let matriz = new Array(stringA.length+1).fill().map(_ => new Array(stringA.length+1).fill(0))

   //Inicializa primeira coluna
   for(let i = 0; i <= stringA.length; i++){
      matriz[i][0] = valorGap * i;
   }

   //Inicializa primeira linha
   for(let j = 0; j <= stringA.length; j++){
      matriz[0][j] = valorGap * j;
   }
   console.log(matriz)
}