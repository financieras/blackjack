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
  generaBaraja();                                 //es imprescindible ejecutar este programa para generar nueva baraja
  for(i=0;i<52;i++){
    document.write(naipes[i].palo+naipes[i].valor+" ");
  }
  document.write("<br>");
  jugando = true;
  manoJ[0]=naipes[0];                             //la primera carta de la baraja va para el Jugador
  manoJ[1]=naipes[1];                             //la segunda carta de la baraja va para el Jugador
  usadas=2;                                       //ya se han usado 2 cartas del total de 52
  totalJ=puntuar(manoJ);                          //puntuamos las dos primeras cartas de la mano del Jugador
  document.write("mano inicial del Jugador:  "+manoJ[0]+" "+manoJ[1]);
  document.writ("puntos iniciales del Jugador: "+totalJ);
  //blackjackJ();                                   //llama a la función que analiza si existe blackjack del jugador al inicio
}

function puntuar(mano){                           //vamos a calcular la puntuación de una mano
  var valor=0;                                    //es el numerito de la carta, es 1, 2, 3,..., 9,10, 11, 12 o 13
  var puntos=0;                                   //son los puntos considerando las figuras como 10
  var hayAs=false;                                //boolean que considera si hay o no un as en la mano
  for(var i=0;i<mano.length;i++){                 //recorremos todos los los elementos del array mano
    valor = mano[i].valor;
    if(valor===11){valor = 10}                    //hacemos que las figuras tengan valor 10
    if(valor===12){valor = 10}
    if(valor===13){valor = 10}
    if(valor===1){hayAs=true}                     //tomamos nota si exite algún as
    puntos = puntos + valor;                      //puntos de momento nos da la puntuación considerando que el as vale 1
  }
  if(hayAs && puntos+10<=21){puntos=puntos+10}    //ahora puntos ya considera el as como 11 siempre que no te pases de 21
  return puntos;
}


blackjack();
