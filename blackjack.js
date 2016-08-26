// Simulador simplificado del juego de Blackjack
document.write('<h1>'+"Simulación básica del juego de Blackjack"+'</h1>'); 
//Juego de Blackjack. Simulación básica del juego, programado para ejecutar en la consola

                                                  //creación de variables globales
var naipes=[];                                    //contendrá la baraja completa y desordenada
var usadas=0;                                     //cartas usadas de entre las 52 de naipes
var manoJ=[];                                     //vector con la mano del Jugado
var manoC=[];                                     //vector con la mano del Crupier
var jugando= false;                               //indica si estoy jugando o el juego ha terminado
var totalJ=0;                                     //maxima puntuación del Jugador considerando el as como 1 o como 11
var totalC=0;                                     //maxima puntuación del Croupier considerando el as como 1 o como 11


function generaBaraja(){                          //Función que da naipes con 52 cartas barajeadas
	var palos=["c","d","p","t"];                    //1º: generamos la baraja ordenada
	for(i=0;i<palos.length;i++){
		for(j=1;j<=13;j++){
			 var carta={palo:palos[i],valor:j};
			naipes[naipes.length]=carta;
		}
	}
  for(k=1;k<=100;k++){                            //2º: ahora la barajeamos
  	var una=Math.floor(52*Math.random());
  	var otra=Math.floor(52*Math.random());
  	var temp={};
  	temp=naipes[una];
  	naipes[una]=naipes[otra];
  	naipes[otra]=temp;
  }
	return naipes;
}

function blackjack(){
  generaBaraja();	
  document.write(naipes);  
}



blackjack();
