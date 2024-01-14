const sectionReiniciar = document.getElementById('reiniciar')
const sectionContinuar = document.getElementById('continuar-batalla')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const btnMascotaJugador = document.getElementById('btn-mascotas')
const btnReiniciar = document.getElementById('btn-reiniciar')
const btnContinuar = document.getElementById('btn-continuar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota_jugador')
const imagenMokeponJugador = document.getElementById('img-mascota-jugador')
const imagenMascotaFinal = document.getElementById('img-final')

const spanMascotaEnemigo = document.getElementById('mascota_enemigo')
const imagenMokeponEnemigo= document.getElementById('img-mascota-enemigo')

const sectionMensajes = document.getElementById('resultado')
let ataquesJugadorHtml = document.getElementById('ataques-jugador')
let ataquesEnemigoHtml = document.getElementById('ataques-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('ataques-mokepon-jugador')

let vidasJugadorHtml = document.getElementById("vida-jugador")
let vidasEnemigoHtml = document.getElementById("vida-enemigo")

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const btnFlechas = document.querySelectorAll('.btn-flechas');

let victoriasHTML = document.getElementById('victorias')
let derrotasHTML = document.getElementById('derrotas')
let ganadorFinalHtml = document.getElementById('resultado-final')

let ataquesMokeponJugador = []
let ataquesMokeponEnemigo = []
let vidasJugador
let vidasEnemigo

let mokepones = []
let opcionDeMokepones
let mascotaJugador
let fotoJugador
let ataquesMokepon
let ataqueJugador
let ataqueEnemigo
let ordenAtaquesEnemigo = 0

let mascotaJugadorObjeto
let mascotaEnemigoObjeto = []
let numEnemigosMapa = 3
let enemigosJugados = 0

let botones = []
let btnFuego 
let btnAgua
let btnTierra
let btnElectrico
let btnRoca
let btnAire

let victorias = 0
let derrotas = 0

let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
mapaBackground.src = './assets/mapa.jpeg'
let intervalo

let alturaDelMapa
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 350

if(anchoDelMapa > anchoMaximoMapa){
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaDelMapa = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaDelMapa



class Mokepon {
    constructor(nombre, vida, foto, avatar, alterEgo, enemigoAvatar, radio, x = 10, y = 10){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.radio = radio
        
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = avatar
        this.velocidadX = 0
        this.velocidadY = 0

        this.alterEgo = alterEgo
        this.alterEgoAvatar = new Image()
        this.alterEgoAvatar.src = enemigoAvatar
    }

    pintarMokepon(){
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto)
    }
}
 

    let hipodoge = new Mokepon('Hipodoge',3, './assets/hipodoge-jugador.png', './assets/hipodoge-avatar.png', './assets/hipodoge-enemigo.png', './assets/hipodoge-avatar-enemigo.png')
    let capipepo = new Mokepon('Capipepo',3, './assets/capipepo-jugador.png', './assets/capipepo-avatar.png', './assets/capipepo-enemigo.png','./assets/capipepo-avatar-enemigo.png' )
    let ratigueya = new Mokepon('Ratigueya',3, './assets/ratigueya-jugador.png', './assets/ratigueya-avatar.png', './assets/ratigueya-enemigo.png', './assets/ratigueya-avatar-enemigo.png')
    let langostelvis = new Mokepon ('Langostelvis',3, './assets/langostelvis-jugador.png', './assets/langostelvis-avatar.png', './assets/langostelvis-enemigo.png', './assets/langostelvis-avatar-enemigo.png' )
    let pydos = new Mokepon ('Pydos',3, './assets/pydos-jugador.png', './assets/pydos-avatar.png', './assets/pydos-enemigo.png','./assets/pydos-avatar-enemigo.png' )
    let tucapalma = new Mokepon ('Tucapalma',3, './assets/tucapalma-jugador.png',  './assets/tucapalma-avatar.png', './assets/tucapalma-enemigo.png',  './assets/tucapalma-avatar-enemigo.png')

    //Objetos literales
    hipodoge.ataques.push(
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🍃', id: 'btn-aire'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    capipepo.ataques.push(
        {nombre: '🍃', id: 'btn-aire'},
        {nombre: '🪨', id: 'btn-roca'},
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    ratigueya.ataques.push(
        {nombre: '🪨', id: 'btn-roca'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '💧', id: 'btn-agua'}
    )

    langostelvis.ataques.push(
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🪨', id: 'btn-roca'}
    )

    pydos.ataques.push(
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌩️', id: 'btn-electrico'},
        {nombre: '🌩️', id: 'btn-electrico'},
        {nombre: '🪨', id: 'btn-roca'},
        {nombre: '🪨', id: 'btn-roca'}
    )

    tucapalma.ataques.push(
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🍃', id: 'btn-aire'},
        {nombre: '🍃', id: 'btn-aire'},
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)


function iniciarJuego(){

    sectionReiniciar.style.display = 'none'
    sectionContinuar.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}"/>
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    hipodoge.radio = document.getElementById(hipodoge.nombre)
    capipepo.radio = document.getElementById(capipepo.nombre)
    ratigueya.radio = document.getElementById(ratigueya.nombre)
    langostelvis.radio = document.getElementById(langostelvis.nombre)
    pydos.radio = document.getElementById(pydos.nombre)
    tucapalma.radio = document.getElementById(tucapalma.nombre)
    
    btnMascotaJugador.addEventListener('click',seleccionarMascotaJugador)
    btnReiniciar.addEventListener('click',reiniciarJuego)
    btnContinuar.addEventListener('click',continuarBatallas) 
}

function seleccionarMascotaJugador(){ 

    for (let i = 0; i<mokepones.length; i++) {
        if(mokepones[i].radio.checked){
            spanMascotaJugador.innerHTML= "Tu "+mokepones[i].nombre
            mascotaJugador = mokepones[i].nombre
            fotoJugador = mokepones[i].foto
            imagenMokeponJugador.src = fotoJugador
        }
    }

    if (mascotaJugador === undefined)
    {   
        alert("Selecciona una mascota")
        sectionSeleccionarMascota.style.display = 'flex' 
        sectionSeleccionarAtaque.style.display = 'none'
    }
    else{
        sectionSeleccionarMascota.style.display = 'none' 
        sectionVerMapa.style.display = 'flex'

        extraerAtaquesyVida(mascotaJugador)
        iniciarMapa()
    }
    
}

function extraerAtaquesyVida(mascotaJugador){
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
            vidasJugador = mokepones[i].vida
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){  

    ataques.forEach(ataques => {
        ataquesMokepon = `<button id="${ataques.id}" class="boton-de-ataque btnAtaque">${ataques.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')
    btnElectrico = document.getElementById('btn-electrico')
    btnRoca = document.getElementById('btn-roca')
    btnAire = document.getElementById('btn-aire')
    botones = document.querySelectorAll('.btnAtaque')

    colorearBotonesAtaque()
}

function secuenciaAtaque(){
    sectionContinuar.style.display = 'none'
    let recibirAtaque = false

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥' && boton.disabled === false){
                ataquesMokeponJugador.push('🔥')
                ataqueJugador = '🔥'
                boton.style.background = 'rgb(88 17 17)'
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '💧' && boton.disabled === false){
                ataquesMokeponJugador.push('💧')
                ataqueJugador = '💧'
                boton.style.background = '#112f58'
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🌱' && boton.disabled === false){
                ataquesMokeponJugador.push('🌱')
                ataqueJugador = '🌱'
                boton.style.background = 'rgb(2 71 24)'
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🌩️' && boton.disabled === false){
                ataquesMokeponJugador.push('🌩️')
                ataqueJugador = '🌩️'
                boton.style.background = 'rgb(126 135 0)'
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🪨' && boton.disabled === false){
                ataquesMokeponJugador.push('🪨')
                ataqueJugador = '🪨'
                boton.style.background = 'rgb(45 45 47)'
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🍃' && boton.disabled === false){
                ataquesMokeponJugador.push('🍃')
                ataqueJugador = '🍃'
                boton.style.background = 'rgb(8 147 135)'
                boton.disabled = true
                recibirAtaque = true
            }
            
            if(recibirAtaque === true){
                ataqueAleatorioEnemigo(ordenAtaquesEnemigo)
            }
        })
    })     
}

function colorearBotonesAtaque(){
    botones.forEach((boton) => {
            if (boton.textContent === '🔥'){
                boton.style.background = 'firebrick';
            }
            else if (boton.textContent === '💧'){
                boton.style.background = '#0174BE'
            }
            else if (boton.textContent === '🌱'){
                boton.style.background = '#612c19'
            }
            else if (boton.textContent === '🌩️'){
                boton.style.background = '#fbfb2b'
            }
            else if (boton.textContent === '🪨'){
                boton.style.background = 'grey'
            }
            else if (boton.textContent === '🍃'){
                boton.style.background = '#6ea794ba'
            }
    })     
}

function seleccionarMascotaEnemigo(enemigo){

    vidasEnemigo = enemigo.vida
    spanMascotaEnemigo.innerHTML = enemigo.nombre + " enemigo"
    imagenMokeponEnemigo.src = enemigo.alterEgo
    ataquesMokeponEnemigo = enemigo.ataques
    barajar(ataquesMokeponEnemigo)
    secuenciaAtaque()

    for (let i = 0; i < numEnemigosMapa; i++) {
        if(mascotaEnemigoObjeto[i] === enemigo){
           mascotaEnemigoObjeto[i] = null
        } 
    }
}

function ataqueAleatorioEnemigo(orden){
    ataqueEnemigo = ataquesMokeponEnemigo[orden].nombre
    ordenAtaquesEnemigo = ordenAtaquesEnemigo + 1

    combate()
}

function combate(){

    let resultado = ""
    //Empates: planta = roca; agua = aire; fuego = electrico

      if (ataqueJugador == ataqueEnemigo
        || (ataqueJugador == '🌱' && ataqueEnemigo == '🪨') || (ataqueEnemigo == '🌱' && ataqueJugador == '🪨')
        || (ataqueJugador == '💧' && ataqueEnemigo == '🍃') || (ataqueEnemigo == '💧' && ataqueJugador == '🍃') 
        || (ataqueJugador == '🔥' && ataqueEnemigo == '🌩️') || (ataqueEnemigo == '🔥' && ataqueJugador == '🌩️'))
      {resultado = "Empate 😒"}
      
      else if (ataqueJugador == '🔥' && (ataqueEnemigo == '🌱' || ataqueEnemigo == '🍃') 
            || ataqueJugador == '💧' && (ataqueEnemigo == '🔥' || ataqueEnemigo == '🪨')
            || ataqueJugador == '🌱' && (ataqueEnemigo == '💧' || ataqueEnemigo == '🌩️')
            || ataqueJugador == '🌩️' && (ataqueEnemigo == '💧' || ataqueEnemigo == '🍃')
            || ataqueJugador == '🪨' && (ataqueEnemigo == '🔥' || ataqueEnemigo == '🌩️')
            || ataqueJugador == '🍃' && (ataqueEnemigo == '🌱' || ataqueEnemigo == '🪨')){ 
                  resultado = "¡¡Ganaste!! 🥳"
                  vidasEnemigo--
                  vidasEnemigoHtml.innerHTML = vidasEnemigo
        }
      else {
          resultado = "Perdiste 😢"
          vidasJugador--
          vidasJugadorHtml.innerHTML = vidasJugador
      }
        crearMensajes(resultado)
        revisarGanador()
}

function revisarGanador(){

    if(vidasJugador==0 || (ataquesMokeponJugador.length == ataquesMokeponEnemigo.length && vidasJugador < vidasEnemigo)){
        crearMensajeFinal('PERDISTE 😢')
        derrotas += 1
        derrotasHTML.innerHTML = derrotas
    }
    else if (vidasEnemigo==0 || (ataquesMokeponJugador.length === ataquesMokeponEnemigo.length  && vidasJugador > vidasEnemigo)) {
        crearMensajeFinal('GANASTE!! 🥳')
        victorias += 1
        victoriasHTML.innerHTML = victorias
    }
    else if (ataquesMokeponJugador.length === ataquesMokeponEnemigo.length){
        crearMensajeFinal('EMPATE!! 😐')
    }
}

function crearMensajes(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado

    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesJugadorHtml.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigoHtml.appendChild(nuevoAtaqueDelEnemigo) 
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = "FIN DE COMBATE. "+resultadoFinal

    botones.forEach((boton) => {
                boton.disabled = true
                boton.style.background = '#161616'
            })
    
        sectionContinuar.style.display = 'flex'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function barajar(objetos) {
    for (let i = objetos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = objetos[i];
      objetos[i] = objetos[j];
      objetos[j] = temp;
    }
  }

function iniciarMapa(){
    intervalo = setInterval(pintarCanvas, 50)

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    let numAleatorio
     //Elegir enemigos aleatorios y dibujarlos
    for (let i = 0; i < numEnemigosMapa; i++) {
         numAleatorio = aleatorio(0,mokepones.length-1)
         mascotaEnemigoObjeto[i] = Object.assign({} , mokepones[numAleatorio])
         mascotaEnemigoObjeto[i].x = aleatorio(50,anchoDelMapa-40)
         mascotaEnemigoObjeto[i].y = aleatorio(50,alturaDelMapa-40)
     }

     //Evitar que los enemigos queden muy juntos
     for (let i = 0; i < numEnemigosMapa; i++) {
        for (let j = 0; j < numEnemigosMapa; j++) {
           if(i!==j && (
            (mascotaEnemigoObjeto[i].x - mascotaEnemigoObjeto[j].x <= 30 || mascotaEnemigoObjeto[i].x - mascotaEnemigoObjeto[j].x <= -30)
            || 
            (mascotaEnemigoObjeto[i].y - mascotaEnemigoObjeto[j].y <= 30 || mascotaEnemigoObjeto[i].y - mascotaEnemigoObjeto[j].y <= -30)
            )){
                mascotaEnemigoObjeto[j].x = aleatorio(50,anchoDelMapa-40)
                mascotaEnemigoObjeto[j].y = aleatorio(50,alturaDelMapa-40)
           }
        }
     }

    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas(){
    

    //Delimitar area mascota Jugador
    if(mascotaJugadorObjeto.y<0){ 
        mascotaJugadorObjeto.y=0
    }
    else if(mascotaJugadorObjeto.y > alturaDelMapa-40){
        mascotaJugadorObjeto.y = alturaDelMapa-40
    }
    else {
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    }

    if(mascotaJugadorObjeto.x<0){ 
        mascotaJugadorObjeto.x=0
    }
    else if(mascotaJugadorObjeto.x > anchoDelMapa-40){
        mascotaJugadorObjeto.x = anchoDelMapa-40
    }
    else {
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    }
   
    
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    pintarMokeponesEnemigos()

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY!== 0){
        for (let i = 0; i < numEnemigosMapa; i++) {
            if(mascotaEnemigoObjeto[i]!== null){
                revisarColision(mascotaEnemigoObjeto[i])
            }
            
        }
        
    }
}

function pintarMokeponesEnemigos(){

    for (let i = 0; i < mascotaEnemigoObjeto.length; i++) { 
        if(mascotaEnemigoObjeto[i]!== null){
            lienzo.drawImage(
                mascotaEnemigoObjeto[i].alterEgoAvatar, 
                mascotaEnemigoObjeto[i].x, 
                mascotaEnemigoObjeto[i].y, 
                mascotaEnemigoObjeto[i].ancho, 
                mascotaEnemigoObjeto[i].alto)
        }
    
    } 
}

function moverMascotaArriba(){
    btnFlechas[0].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadY = - 5
   
}

function moverMascotaIzquierda(){
    btnFlechas[1].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadX = - 5
}

function moverMascotaDerecha(){
    btnFlechas[2].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadX = 5
}

function moverMascotaAbajo(){
    btnFlechas[3].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){

    for (let i = 0; i < btnFlechas.length; i++) {
        btnFlechas[i].style.backgroundColor = "white";
    }
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverMascotaArriba()
            break;

        case 'ArrowDown':
            moverMascotaAbajo()
            break;

        case 'ArrowLeft':
            moverMascotaIzquierda()
            break;
    
        case 'ArrowRight':
            moverMascotaDerecha()
            break;
    }
}

function obtenerObjetoMascota(mokepon)
{
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepon === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y + 5
    const abajoEnemigo = (enemigo.y + enemigo.alto) - 5
    const izquierdaEnemigo = enemigo.x + 5
    const derechaEnemigo = (enemigo.x + enemigo.ancho) - 5

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) { return }
    
    detenerMovimiento()

    vidasJugador = 3 //reinicio de vida
    vidasJugadorHtml.innerHTML = vidasJugador
    vidasEnemigoHtml.innerHTML = enemigo.vida

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

function continuarBatallas(){
    
    enemigosJugados += 1

    ataquesJugadorHtml.innerHTML = ""
    ataquesEnemigoHtml.innerHTML = ""

    ataquesMokeponJugador = []
    ordenAtaquesEnemigo = 0

    botones.forEach(boton => {
        boton.disabled = false
    });

    colorearBotonesAtaque()

    sectionVerMapa.style.display = 'flex'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionMensajes.innerHTML = 'Mucha suerte!'

    if(enemigosJugados === numEnemigosMapa){
        resultadoFinal()
    }
}

function resultadoFinal(){
    sectionReiniciar.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'

    imagenMascotaFinal.src = fotoJugador

    victoriasHTML.innerHTML = victorias
    derrotasHTML.innerHTML = derrotas

    if(victorias>derrotas){
        ganadorFinalHtml.innerHTML = "¡¡Ganaste!! 🥳"
    }
    else{
        ganadorFinalHtml.innerHTML = "Suerte para la próxima 😔"
    }

}

//Se escucha el load de la ventana para que cargue el código después de que haya cargado el html. 
window.addEventListener('load',iniciarJuego)