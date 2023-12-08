import reverteString from "./reverteString.js";
import estilizaString from "./estilizaString.js"
import resultado from "./resultado.js";

const findSolution = (matriz, stringHorizontal, stringVertical, tamanhoString, htmlHorizontal, htmlVertical, valorGap, valorMismatch) => {
    let resultadoHorizontal='', resultadoVertical='', SequenciaAlinhada;
    let indiceHorizontal = tamanhoString, indiceVertical = tamanhoString;
    let linha = matriz.length, coluna = matriz.length;
    let peso = 0, contadorMismatch = 0, contadorGap = 0;
    let gapVertical, gapHorizontal, mismatch;
 
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
          
             contadorMismatch++;
          }
 
          else if(gapHorizontal == Math.min(gapVertical, gapHorizontal, mismatch)){
 
             if(stringHorizontal[indiceHorizontal])
                resultadoHorizontal = resultadoHorizontal + stringHorizontal[indiceHorizontal];
 
             resultadoVertical = resultadoVertical + '-';
 
 
             peso += valorGap;
 
             linha--;
             indiceHorizontal--;
 
             contadorGap++;
 
          }
 
          else if(gapVertical == Math.min(gapVertical, gapHorizontal, mismatch)){
             resultadoHorizontal = resultadoHorizontal + '-';
 
             if(stringVertical[indiceVertical])
                resultadoVertical = resultadoVertical + stringVertical[indiceVertical];
 
 
             peso += valorGap;
 
             coluna--;
             indiceVertical--;
 
             contadorGap++;
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
 
    resultadoHorizontal = reverteString(resultadoHorizontal);
    resultadoVertical = reverteString(resultadoVertical);
 
    if(peso == 0){
       SequenciaAlinhada = `
       <div>
          <div class="container-string">
             <p class="strings no-weigth">${resultadoHorizontal}</p>
          </div>
          <div class="container-string">
             <p class="strings no-weigth">${resultadoVertical}</p>
          </div>
          <span class=no-weigth>Sem custo!</span>
       </div>
       `;
    }
    else{
       let {htmlHorizontal: htmlH, htmlVertical :htmlV } = estilizaString(resultadoHorizontal, resultadoVertical, htmlHorizontal, htmlVertical)
 
       SequenciaAlinhada = `
       <div>
           <div class="container-string">${htmlH}</div>
           <div class="container-string">${htmlV}</div>
           <span class=weigth>Custo ${peso}!</span>
       </div>
       `;
    }
 
    resultado(SequenciaAlinhada);
 }

export default findSolution;