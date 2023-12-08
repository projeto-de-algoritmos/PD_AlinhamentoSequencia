import inicializaMatriz from './utils/inicializaMatriz.js'
import preencheMatriz from './utils/preencheMatriz.js';
import findSolution from './utils/findSolution.js';

let htmlHorizontal='', htmlVertical='';

function alinhaStrings(stringVertical, stringHorizontal, valorGap = 2, valorMismatch = 3){
   let matriz = inicializaMatriz(stringVertical.length+1, valorGap);

   preencheMatriz(matriz, stringVertical, stringHorizontal, valorGap, valorMismatch);

   findSolution(matriz, stringHorizontal, stringVertical, stringHorizontal.length, htmlHorizontal, htmlVertical, valorGap, valorMismatch);
}

function alinharSequencias() {
   // Obter os valores dos inputs
   let campoSequencia1 = document.getElementById('sequence1');
   let campoSequencia2 = document.getElementById('sequence2');

   let seq1 = campoSequencia1.value.trim()
   let seq2 = campoSequencia2.value.trim()

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
   
      campoSequencia1.value = ""
      campoSequencia2.value = ""

      htmlVertical=''
      htmlHorizontal=''
   }
}

const botao = document.querySelector('button')
botao.addEventListener('click', alinharSequencias) 