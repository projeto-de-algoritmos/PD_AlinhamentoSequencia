const estilizaString = (resultadoHorizontal, resultadoVertical, htmlHorizontal, htmlVertical) => {
    for(let i = 0; i < resultadoHorizontal.length; i++){
       if(resultadoHorizontal[i] == resultadoVertical[i]){
          htmlHorizontal += `<span class=no-weigth strings>${resultadoHorizontal[i]} </span>` 
          htmlVertical += `<span class=no-weigth strings>${resultadoVertical[i]} </span>` 
       }
       else{
          if(resultadoHorizontal[i] == '-' || resultadoVertical[i] == '-'){
             htmlHorizontal += `<span class=gap strings>${resultadoHorizontal[i]} </span>` 
             htmlVertical += `<span class=gap strings >${resultadoVertical[i]} </span>` 
          }
          else{
             htmlHorizontal += `<span class=weigth strings>${resultadoHorizontal[i]} </span>` 
             htmlVertical += `<span class=weigth strings>${resultadoVertical[i]} </span>` 
          }
        }
    }
    
    const htmls = {
        htmlHorizontal: htmlHorizontal,
        htmlVertical: htmlVertical
    }

    return htmls;
}

export default estilizaString;