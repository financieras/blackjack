// Simulador simplificado del juego de Blackjack

// Objeto baraja, conjunto de cartas que tienen un palo y un valor
var baraja=[];
var palos=["c","p","t","d"];
for(var i=0;i<palos.length;i++){
  for(var j=1;j<=13;j++){
    var carta={palo:palos[i],valor:j};
    baraja[baraja.length]=carta;
    document.write(palos[i]+j+"<br>");
  }
}
document.write("hola");
