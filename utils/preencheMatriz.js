const preencheMatriz = (matriz, stringVertical, stringHorizontal, valorGap, valorMismatch) => {
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

export default preencheMatriz;