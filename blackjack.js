// Simulador simplificado del juego de Blackjack
document.write('<h1>'+"Simulación básica del juego de Blackjack"+'</h1>'); 
// Objeto baraja, conjunto de cartas que tienen un palo y un valor
var baraja=[];
var palos=["c","p","t","d"];
var texto="";
for(var i=0;i<palos.length;i++){
  for(var j=1;j<=13;j++){
    var carta={palo:palos[i],valor:j};
    baraja[baraja.length]=carta;
    texto=texto+(j+palos[i]+" - ");
    //document.write("\n"); permite un cambio de línea. equivale a <br> en html
  }
}
document.write(texto.substring(0, texto.length-3));
