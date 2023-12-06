function inicializaMatriz(stringVertical, valorGap){
   let matriz = new Array(stringVertical.length+1).fill().map(_ => new Array(stringVertical.length+1).fill(0))

   //Inicializa primeira coluna
   for(let i = 0; i <= stringVertical.length; i++){
      matriz[i][0] = valorGap * i;
   }

   //Inicializa primeira linha
   for(let j = 0; j <= stringVertical.length; j++){
      matriz[0][j] = valorGap * j;
   }

   return matriz;
}

function preencheMatriz(matriz, stringVertical, stringHorizontal, valorGap, valorMismatch){
   let gapVertical, gapHorizontal, mismatch;
   let indiceVertical = 0, indiceHorizontal;

   for(let linha = 1; linha < matriz.length; linha++){
      indiceHorizontal = 0; 

      //Compara o primeiro caractere da stringVertical com todos da stringHorizontal
      for(let coluna = 1; coluna < matriz.length; coluna++){

         //Se forem o mesmo caractere, mismatch com custo 0
         if(stringVertical[indiceVertical] == stringHorizontal[indiceHorizontal]){
            matriz[linha][coluna] = matriz[linha-1][coluna-1];
         }

         /*Se não forem o mesmo caractere, faz os custos dos gaps e do mismatch
         e fica com o menor*/
         else{
            gapVertical = matriz[linha-1][coluna] + valorGap;
            gapHorizontal = matriz[linha][coluna-1] + valorGap;
            mismatch = matriz[linha-1][coluna-1] + valorMismatch;

            matriz[linha][coluna] = Math.min(gapVertical, gapHorizontal, mismatch);
         }

         indiceHorizontal++;
      }
      indiceVertical++;
   }
}

function alinhaStrings(stringVertical, stringHorizontal, valorGap = 2, valorMismatch = 3){
   let matriz = inicializaMatriz(stringVertical, valorGap);

   preencheMatriz(matriz, stringVertical, stringHorizontal, valorGap, valorMismatch);

   for(let linha = 0; linha < matriz.length; linha++){
         console.log(`${matriz[linha]}  `);
   }
}

alinhaStrings("CTACCG", "TACATG")

// CTACCG = String na Vertical
// TACATG = String na Horizontal