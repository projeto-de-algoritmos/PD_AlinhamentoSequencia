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

function findSolution(matriz, stringHorizontal, stringVertical, tamanhoH, tamanhoV, valorGap, valorMismatch){
   let resultadoHorizontal='', resultadoVertical='', peso = 0;
   let indiceHorizontal = tamanhoH, indiceVertical = tamanhoV;
   let linha = matriz.length, coluna = matriz.length;
   while(linha != 0 && coluna != 0){

      if(stringHorizontal[indiceHorizontal] === stringVertical[indiceVertical]){
         if(stringHorizontal[indiceHorizontal])
            resultadoHorizontal = resultadoHorizontal + stringHorizontal[indiceHorizontal];
         if(stringVertical[indiceVertical])
            resultadoVertical = resultadoVertical + stringVertical[indiceVertical];
         
         linha--;
         coluna--;

         indiceHorizontal--;
         indiceVertical--;

      }
      else{
         gapVertical = matriz[linha-1][coluna];
         gapHorizontal = matriz[linha][coluna-1];
         mismatch = matriz[linha-1][coluna-1];

         if(mismatch == Math.min(gapVertical, gapHorizontal, mismatch)){
            if(stringHorizontal[indiceHorizontal])
               resultadoHorizontal = resultadoHorizontal + stringHorizontal[indiceHorizontal];
            if(stringVertical[indiceVertical])
               resultadoVertical = resultadoVertical + stringVertical[indiceVertical];

            peso += valorMismatch;
            
            linha--;
            coluna--;
            indiceHorizontal--;
            indiceVertical--;
         
         }

         else if(gapHorizontal == Math.min(gapVertical, gapHorizontal, mismatch)){

            if(stringHorizontal[indiceHorizontal])
               resultadoHorizontal = resultadoHorizontal + stringHorizontal[indiceHorizontal];

            resultadoVertical = resultadoVertical + '-';


            peso += valorGap;

            linha--;
            indiceHorizontal--;

         }

         else if(gapVertical == Math.min(gapVertical, gapHorizontal, mismatch)){
            resultadoHorizontal = resultadoHorizontal + '-';

            if(stringVertical[indiceVertical])
               resultadoVertical = resultadoVertical + stringVertical[indiceVertical];


            peso += valorGap;

            coluna--;
            indiceVertical--;

         }
      }
   }
   if(coluna > 0){
      for(coluna;coluna>0;coluna--){
         resultadoVertical = resultadoVertical + stringVertical[indiceVertical];
         resultadoHorizontal = resultadoHorizontal + '-';
         indiceVertical--;
         peso += valorGap
      }
   }
   if(linha > 0){
      for(linha;linha>0;linha--){
         resultadoHorizontal = resultadoHorizontal + stringHorizontal[indiceHorizontal];
         resultadoVertical = resultadoVertical + '-';
         indiceHorizontal--;
         peso += valorGap
      }
   }
   imprimirAoContrario(resultadoHorizontal)
   imprimirAoContrario(resultadoVertical)
   
   console.log(peso)
   
}

function imprimirAoContrario(str) {
   // Divide a string em um array de caracteres
   let caracteres = str.split('');
 
   // Inverte a ordem dos elementos no array
   let caracteresAoContrario = caracteres.reverse();
 
   // Une os caracteres novamente em uma string
   let strAoContrario = caracteresAoContrario.join('');
 


   // Imprime a string ao contrário
   console.log(strAoContrario);
 }

function alinhaStrings(stringVertical, stringHorizontal, valorGap = 2, valorMismatch = 3){
   let matriz = inicializaMatriz(stringVertical, valorGap);

   preencheMatriz(matriz, stringVertical, stringHorizontal, valorGap, valorMismatch);

   for(let linha = 0; linha < matriz.length; linha++){
      console.log(`[${matriz[linha]}]`);
      
}

   console.log('\n')

   findSolution(matriz, stringHorizontal, stringVertical, stringHorizontal.length, stringVertical.length, valorGap, valorMismatch);
}

alinhaStrings("ACACTAG", "CTAGACA")
// CTACCG = String na Vertical
// TACATG = String na Horizontal