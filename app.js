// Incializacion de variables
let numeroSecreto;
let intentos;
let listaNumerosSorteados = [];
let maximo = 10;
let cantidadSorteados = 0;
asignarTextoElemento('h1', 'Juego del número secreto');
nuevoJuego();

function nuevoJuego() {
    //Se setea el estado inicial
    intentos = 1;
    asignarTextoElemento('p', `Indica un numero del 1 al ${maximo}.`);
    document.getElementById('reiniciar').setAttribute('disabled', "");
    document.getElementById('intentar').removeAttribute('disabled');
    limpiarCaja();
    //Se genera el numero secreto
    numeroSecreto = generarNumeroSecreto();
    console.log(`Sorteado: ${numeroSecreto}`);
    return;
}

function asignarTextoElemento(elemento, texto) {
    //Se asigna un texto a un elemento HTML
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.textContent = texto;
    return;
}

function verificarIntento() {
    //Se verifica si el numero ingresado es correcto
    let numeroIngresado = parseInt(document.getElementById("numeroUsuario").value);
    if (numeroIngresado >= 1 && numeroIngresado <= maximo) {
        if (numeroIngresado === numeroSecreto) {
            asignarTextoElemento('p', `¡Adivinaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('intentar').setAttribute('disabled', "");
        } else {
            asignarTextoElemento('p', calcularTemperatura(numeroIngresado));
            intentos++;
            limpiarCaja();
        }
    }
    return;
}

function generarNumeroSecreto() {
    //Se genera un numero aleatorio entre 1 y el maximo
    let numeroGenerado = Math.floor(Math.random() * maximo) + 1;
    if (cantidadSorteados == maximo) {
        asignarTextoElemento('p', "Ya se sortearon todos los números posibles.");
    } else {
        if (listaNumerosSorteados[numeroGenerado - 1]) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados[numeroGenerado - 1] = true;
            cantidadSorteados++;
            return numeroGenerado;
        }
    }
}

function limpiarCaja() {
    //Se limpia la caja de texto
    document.getElementById("numeroUsuario").value = "";
    return;
}

function calcularTemperatura(numero) {
    //Se define la temperatura del numero ingresado con respecto al numero secreto
    let nivelesTemperatura = ["Caliente", "Tibio", "Frio"];
    let diferencia = Math.abs(numero - numeroSecreto) + 1;
    return (diferencia <= 2) ? temperatura = nivelesTemperatura[0] : "Congelado";
}