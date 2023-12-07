let htmlHorizontal='', htmlVertical='';

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
   let resultadoHorizontal='', resultadoVertical='', SequenciaAlinhada;
   let indiceHorizontal = tamanhoH, indiceVertical = tamanhoV;
   let linha = matriz.length, coluna = matriz.length;
   let  peso = 0, contadorMismatch = 0, contadorGap = 0;

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

   resultadoHorizontal = imprimirAoContrario(resultadoHorizontal);
   resultadoVertical = imprimirAoContrario(resultadoVertical);

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
      estilizaString(resultadoHorizontal, resultadoVertical)

      SequenciaAlinhada = `
      <div>
          <div class="container-string">${htmlHorizontal}</div>
          <div class="container-string">${htmlVertical}</div>
          <span class=weigth>Custo ${peso}!</span>
      </div>
      `;
   }

   responseAlinhamento(SequenciaAlinhada);
}

function responseAlinhamento(html){
   let resposta = document.getElementById('Response');
   resposta.innerHTML = html;
}

function imprimirAoContrario(str) {
   // Divide a string em um array de caracteres
   let caracteres = str.split('');
 
   // Inverte a ordem dos elementos no array
   let caracteresAoContrario = caracteres.reverse();
 
   // Une os caracteres novamente em uma string
   let strAoContrario = caracteresAoContrario.join('');
 
   // Imprime a string ao contrário
   return strAoContrario;
}

function estilizaString(resultadoHorizontal, resultadoVertical){
   for(let i = 0; i < resultadoHorizontal.length; i++){
      if(resultadoHorizontal[i] == resultadoVertical[i]){
         htmlHorizontal += `<span class=no-weigth strings>${resultadoHorizontal[i]}</span>` 
         htmlVertical += `<span class=no-weigth strings>${resultadoVertical[i]}</span>` 
      }
      else{
         if(resultadoHorizontal[i] == '-' || resultadoVertical[i] == '-'){
            htmlHorizontal += `<span class=gap strings>${resultadoHorizontal[i]}</span>` 
            htmlVertical += `<span class=gap strings >${resultadoVertical[i]}</span>` 
         }
         else{
            htmlHorizontal += `<span class=weigth strings>${resultadoHorizontal[i]}</span>` 
            htmlVertical += `<span class=weigth strings>${resultadoVertical[i]}</span>` 
         }
         }
   }
}


function alinhaStrings(stringVertical, stringHorizontal, valorGap = 2, valorMismatch = 3){
   let matriz = inicializaMatriz(stringVertical, valorGap);

   preencheMatriz(matriz, stringVertical, stringHorizontal, valorGap, valorMismatch);

   // for(let linha = 0; linha < matriz.length; linha++){
   //    console.log(`[${matriz[linha]}]`);
      
   // }

   // console.log('\n')

   findSolution(matriz, stringHorizontal, stringVertical, stringHorizontal.length, stringVertical.length, valorGap, valorMismatch);
}

function alinharSequencias() {
   // Obter os valores dos inputs
   let seq1 = document.getElementById('sequence1').value.trim();
   let seq2 = document.getElementById('sequence2').value.trim();

   //Se algum campo está vazio, alertar.
   if(seq1.length == 0 || seq2.length == 0){
      alert("Ambos os campos devem ter palavras!");
   }

   //Se as palavras não tem o mesmo tamanho, alertar.
   else if(seq1.length != seq2.length){
      alert("As palavras devem ter o mesmo tamanho!");
   }

   // Chamar a função alinhaStrings com os valores obtidos
   else{
      alinhaStrings(seq1, seq2);
   
      seq1.value = ""
      seq2.value = ""

      htmlVertical=''
      htmlHorizontal=''

   }
}
// CTACCG = String na Vertical
// TACATG = String na Horizontal