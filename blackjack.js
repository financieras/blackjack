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
  jugando = true;
  generaBaraja();                                 //es imprescindible ejecutar este programa para generar nueva baraja
  for(i=0;i<52;i++){
    document.write(naipes[i].palo+naipes[i].valor+" ");
  }
  document.write("<br>");
  manoJ[0]=naipes[0];                             //la primera carta de la baraja va para el Jugador
  manoJ[1]=naipes[1];                             //la segunda carta de la baraja va para el Jugador
  usadas=2;                                       //ya se han usado 2 cartas del total de 52
  document.write("mano inicial del Jugador:  "+manoJ[0].palo+manoJ[0].valor+" "+manoJ[1].palo+manoJ[1].valor);
  document.write("<br>");
  totalJ=puntuar(manoJ);                          //puntuamos las dos primeras cartas de la mano del Jugador
  document.write("puntos iniciales del Jugador: "+totalJ);
  document.write("<br>");
  blackjackJ();                                   //llama a la función que analiza si existe blackjack del jugador al inicio
//  while(jugando){                                 //mientras el juego continúe
    pideJ();                                      //llamamos a una función que determina si pide el Jugador y cuantas veces
//  }
}

function pideJ(){                                 //veamos si pide el Jugador y cuantas veces lo hace
  while (totalJ<17){
    document.write("El Jugado pide nueva carta.")
    usadas++;                                     //se ha usado una nueva carta: usadas=usadas+1 
    manoJ[usadas-1] = naipes[usadas-1];           //tomamos la carta de la baraja y se la añadimos a la mano del Jugador
    totalJ=puntuar(manoJ);
    finalJ;                                       //mientras existen iteraciones no es final de J pero nos interesa que imprima resultados
  }
  if(totalJ>21){                                  //ahora veamos si el Jugador se ha pasado o es el turno del Croupier
    jugando=false;                                 //anotamos que termina el juego
    finalJ();
    document.write("<br>El Jugador se ha pasado. Gana el Croupier.");
  } 
  else {
    document.write("<br>El Jugador se planta");
    finalJ;                                       //no el final del juego, simplemente del Jugador, queremos que se imprima su resultado 
  }
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

function blackjackJ(){                            //analiza si el jugador ha hecho blackjack a inicio
  if(totalJ===21){                                //veamos el resultado del juego si el Jugador tiene Blackjack
    jugando=false;                                 //anotamos que termina el juego
    finalJ();                                     //llamamos a la función finalJ. A esta función tb se llama desde pideJ
    document.write("El Jugador es el ganador porque ha obtenido Blackjack.");
  }
}

function finalJ(){                               //a esta función la llaman blacjackJ y pideJ
  var texto="";                                  //la variable texto se construye concatenando una frase y la mano del Juegador
  for(var i=0;i<manoJ.length;i++){
    texto+=manoJ[i].palo+manoJ[i].valor+" - ";            //+= es para hacer un acumulador de la variable texto
  }
  texto=texto.substring(texto.length-3, 0);     //quitamos los trés último caracteres para que no se vea " - "
  document.write("La mano del Jugador es:  "+texto);
  document.write("<br>");
  document.write("La puntuación del Jugador es "+totalJ);
  document.write("<br>");
}

blackjack();
