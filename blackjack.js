// Simulador simplificado del juego de Blackjack
document.write("<h1>Simulación básica del juego de Blackjack</h1>"); 

                                                  //creación de variables globales
var naipes=[];                                    //contendrá la baraja completa y desordenada
var usadas=0;                                     //cartas usadas de entre las 52 de naipes
var manoJ=[];                                     //vector con la mano del Jugador
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
  naipes[0]={palo:"c",valor:1};
  naipes[1]={palo:"c",valor:4};
  naipes[2]={palo:"c",valor:6};
  return naipes;
}

function blackjack(){
  jugando = true;
  generaBaraja();                                 //es imprescindible ejecutar este programa para generar nueva baraja
  document.write("<br><h3>Generamos las 52 cartas de la Baraja</h3><br>");
  for(i=0;i<52;i++){
    document.write(naipes[i].palo+naipes[i].valor+" ");
  }
  manoJ[0]=naipes[0];                             //la primera carta de la baraja va para el Jugador
  manoJ[1]=naipes[1];                             //la segunda carta de la baraja va para el Jugador
  usadas=2;                                       //ya se han usado 2 cartas del total de 52
  document.write("<br><h3>Mano inicial del Jugador</h3>");
  document.write("<br>Mano inicial del Jugador:  "+manoJ[0].palo+manoJ[0].valor+" - "+manoJ[1].palo+manoJ[1].valor);
  totalJ=puntuar(manoJ);                          //puntuamos las dos primeras cartas de la mano del Jugador
  document.write("<br>Puntos iniciales del Jugador: "+totalJ);
  blackjackJ();                                   //llama a la función que analiza si existe blackjack del jugador al inicio
  if(jugando){
    if(totalJ<17){
      document.write("<br><h3>El Jugador pide cartas</h3>");
    }
    while (totalJ<17){                            //ahora determinamos si pide el Jugador y cuantas veces  
      document.write("<br>El Jugador pide nueva carta.");
      usadas++;                                     //se ha usado una nueva carta: usadas=usadas+1 
      manoJ[usadas-1] = naipes[usadas-1];           //tomamos la carta de la baraja y se la añadimos a la mano del Jugador
      totalJ=puntuar(manoJ);
      finalJ();                                       //mientras existen iteraciones no es final de J pero nos interesa que imprima resultados
    }
    if(totalJ>21){                                  //ahora veamos si el Jugador se ha pasado o es el turno del Croupier
      jugando=false;                                 //anotamos que termina el juego
      document.write("<br>El Jugador se ha pasado. Gana el Croupier.");
    } else {                                           //esto se cumplirá si: 17 <= totalJ >= 21 
      document.write("<br>El Jugador se planta.");
      document.write("<br><h3>Le toca el turno al Croupier</h3>");
    }
                                                    //aqui el Jugador ya ha terminado y le toca el turno al Croupier
                                                    //salvo que previamente el Jugador hubiera tenido Blackjack o se hubiera pasado
                                                    //en cuyo caso el jugo ya se ha terminado.
    if(jugando){                                    //mientras el juego continúe
      document.write("<br><h3>Mano inicial del Croupier</h3>");
      usadas+=1;                                    //ahora le toca al Croupier
      manoC[0]=naipes[usadas-1];                    //la primera carta de la mano del Croupier
      usadas+=1;
      manoC[1]=naipes[usadas-1];                    //esta es la segunda carta para el Croupier
      document.write("<br>Mano inicial del Croupier:  "+manoC[0].palo+manoC[0].valor+" - "+manoC[1].palo+manoC[1].valor);
      totalC=puntuar(manoC);                         //puntuamos las dos primeras cartas de la mano del Croupier
      document.write("<br>Puntos iniciales del Croupier: "+totalC);
      document.write("<br>Regla: El Croupier pide con menos de 17 y se planta con 17 o más.");
      if(totalC<17){
        document.write("<br><h3>El Croupier pide cartas</h3>");
      }else if(totalC>=17 && totalC<=21){
      	document.write("<br>El Croupier se planta.");
      }
      
      pideC();                                      //llamamos a una función que determina si pide el Croupier y cuantas veces
    }
  }
}                                                   //Finaliza la función Blackjack y por tanto finaliza el juego

function pideC(){                                 //REGLA: el Croupier pide con 16 o menos y se planta con 17 o más
  jugando=false;                                  //el juego ya termina cuando pideC termine de ejecutarse
  //imprimeManos;
  while (totalC<17){
    document.write("<br>El Croupier pide nueva carta.");
    usadas++;                                     //se ha usado una nueva carta 
    manoC[usadas-1-manoJ.length] = naipes[usadas-1];           //tomamos la carta de la baraja y se la añadimos a la mano del Croupier
    totalC=puntuar(manoC);                        //ERROR al enviar a la función puntuar la manoC
    finalC();
  }
  if(totalJ===21){                                  //ahora veamos el resultado final del juego segun los puntos de ambos
    if(totalC < 21){
    	//imprimeManos();
    	document.write("<br>El Jugador gana con 21.");
    }
    else if (totalC===21){
      //imprimeManos();
      document.write("<br>Se ha producido un empate a 21 puntos.");
    }
    else if (totalC>21){
      //imprimeManos();
      document.write("<br>El Jugador gana porque el Croupier se ha pasado de 21.");
    }
  }
  else if (totalJ<21){
    if(totalC>21){
    	//imprimeManos();
    	document.write("<br>El Jugador gana. El Croupier se ha pasado.");
    }
    else if(totalC===21){
    	//imprimeManos();
    	document.write("<br>El Croupier gana porque tiene 21 y el Jugador tiene menos puntos.");
    }
    else if(totalC<21){
    	if(totalJ>totalC){
    		//imprimeManos();
    		document.write("<br>El Jugador gana porque tiene más puntos.");
    	}
    	else if(totalJ<totalC){
    		//imprimeManos();
    		document.write("<br>El Croupier gana porque tiene más puntos.");
    	}
    	else if(totalJ===totalC){
    		//imprimeManos();
    		document.write("<br>Empate a "+totalJ+" puntos.");
    	}
    }
  }
}                                                 //aquí termina la función PideC y finaliza el juego

function imprimeManos(){                          //muestra en pantalla las manos del Jugador y del Croupier
  //jugando=false;
  var texto="";                                   //la variable texto se construye concatenando una frase y al mano del Juegador
  for(var i=0;i<manoJ.length;i++){
    texto=texto+manoJ[i].palo+manoJ[i].valor+" - ";
  }
  texto=texto.substring(texto.length-3, 0);     //quitamos los trés último caracteres para que no se vea " - "
  document.write("<br>La mano del Jugador es:  "+texto);
  document.write("<br>La puntuación del Jugador es "+totalJ);
  texto="";                                 //ahora toca imprimir la información del Croupier
  for(i=0;i<manoC.length;i++){
    texto=texto+manoC[i].palo+manoC[i].valor+" - ";
  }
  texto=texto.substring(texto.length-3, 0);     //quitamos los trés último caracteres para que no se vea " - "
  document.write("<br>La mano del Croupier es:  "+texto);
  document.write("<br>La puntuación del Croupier es "+totalC);
}




function finalJ(){                               //a esta función la llaman blacjackJ y pideJ
  var texto="";                                  //la variable texto se construye concatenando una frase y la mano del Juegador
  for(var i=0;i<manoJ.length;i++){
    texto+=manoJ[i].palo+manoJ[i].valor+" - ";            //+= es para hacer un acumulador de la variable texto
  }
  texto=texto.substring(texto.length-3, 0);     //quitamos los trés último caracteres para que no se vea " - "
  document.write("<br>-La mano del Jugador es:   "+texto);
  document.write("<br>La puntuación del Jugador es "+totalJ);
}

function finalC(){                               //a esta función la llama pideC
  var texto="";                                  //la variable texto se construye concatenando una frase y la mano del Juegador
  for(var i=0;i<manoC.length;i++){
    texto+=manoC[i].palo+manoC[i].valor+" - ";            //+= es para hacer un acumulador de la variable texto
  }
  texto=texto.substring(texto.length-3, 0);     //quitamos los trés último caracteres para que no se vea " - "
  document.write("<br>-La mano del Croupier es:   "+texto);
  document.write("<br>La puntuación del Croupier es "+totalC);
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
    jugando=false;                                //anotamos que termina el juego
    finalJ();                                     //llamamos a la función finalJ. A esta función tb se llama desde pideJ
    document.write("<br>El Jugador es el ganador porque ha obtenido Blackjack.");
  }
}



blackjack();
