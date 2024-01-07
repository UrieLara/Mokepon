const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const btnMascotaPlayer = document.getElementById('btn-mascotas')
const btnReiniciar = document.getElementById('btn-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota_jugador')
const imagenMokeponJugador = document.getElementById('img-mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota_enemigo')
const imagenMokeponEnemigo= document.getElementById('img-mascota-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const btnFlechas = document.querySelectorAll('.btn-flechas');

let ataqueMokeponJugador = []
let ataquesMokeponEnemigo = []
let vidasJugador
let vidasEnemigo

let mokepones = []
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let ataqueJugador
let ataqueEnemigo
let ordenAtaquesEnemigo = 0
let mascotaJugadorObjeto
let mascotaEnemigoObjeto = []
let enemigosEnMapa = 3

let botones = []
let btnFuego 
let btnAgua
let btnTierra
let btnElectrico
let btnRoca
let btnAire

let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let intervalo



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
        {nombre: '🌱', id: 'btn-planta'}
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
        {nombre: '🌩️', id: 'btn-electico'},
        {nombre: '🌩️', id: 'btn-electico'},
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
    
    btnMascotaPlayer.addEventListener('click',seleccionarMascotaPlayer)
    btnReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaPlayer(){ 

    for (let i = 0; i<mokepones.length; i++) {
        if(mokepones[i].radio.checked){
            spanMascotaJugador.innerHTML= "Tu "+mokepones[i].nombre
            mascotaJugador = mokepones[i].nombre
            imagenMokeponJugador.src = mokepones[i].foto
        }
    }

    if (mascotaJugador === undefined)
    {   
        alert("Selecciona una mascota")
        sectionSeleccionarMascota.style.display = 'flex' //oculta la sección del HTML
        sectionSeleccionarAtaque.style.display = 'none'
    }
    else{
        sectionSeleccionarMascota.style.display = 'none' //oculta la sección del HTML
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
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥'){
                ataqueMokeponJugador.push('🔥')
                ataqueJugador = '🔥'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '💧'){
                ataqueMokeponJugador.push('💧')
                ataqueJugador = '💧'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '🌱'){
                ataqueMokeponJugador.push('🌱')
                ataqueJugador = '🌱'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '🌩️'){
                ataqueMokeponJugador.push('🌩️')
                ataqueJugador = '🌩️'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '🪨'){
                ataqueMokeponJugador.push('🪨')
                ataqueJugador = '🪨'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '🍃'){
                ataqueMokeponJugador.push('🍃')
                ataqueJugador = '🍃'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }

            ataqueAleatorioEnemigo(ordenAtaquesEnemigo)
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo){
    vidasEnemigo = enemigo.vida
    spanMascotaEnemigo.innerHTML = enemigo.nombre + " enemigo"
    imagenMokeponEnemigo.src = enemigo.alterEgo
    ataquesMokeponEnemigo = enemigo.ataques
    ataquesMokeponEnemigo.sort(ordenRandom)
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(orden){
    ataqueEnemigo = ataquesMokeponEnemigo[orden].nombre
    ordenAtaquesEnemigo = ordenAtaquesEnemigo + 1

    combate()
}

function combate(){

    let resultado = ""
    let vidasJugador_html = document.getElementById("vida-jugador")
    let vidasEnemigo_html = document.getElementById("vida-enemigo")

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
                  vidasEnemigo_html.innerHTML = vidasEnemigo
        }
      else {
          resultado = "Perdiste 😢"
          vidasJugador--
          vidasJugador_html.innerHTML = vidasJugador
      }
        crearMensajes(resultado)
        revisarGanador()
}

function revisarGanador(){

    if(vidasJugador==0 || (ataqueMokeponJugador.length == ataquesMokeponEnemigo.length && vidasJugador < vidasEnemigo)){
        crearMensajeFinal('PERDISTE 😢')
    }
    else if (vidasEnemigo==0 || (ataqueMokeponJugador.length === ataquesMokeponEnemigo.length  && vidasJugador > vidasEnemigo)) {
        crearMensajeFinal('GANASTE!! 🥳')
    }
    else if (ataqueMokeponJugador.length === ataquesMokeponEnemigo.length){
        crearMensajeFinal('EMPATE!! 😐')
    }
}

function crearMensajes(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = "FIN DE LA PARTIDA. "+resultadoFinal

    botones.forEach((boton) => {
                boton.style.background = '#112f58'
                boton.disabled = "true"
            })
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function ordenRandom(a, b) {
    return Math.random() - 0.5;
}

function iniciarMapa(){
    mapa.width = 340
    mapa.height = 290
    intervalo = setInterval(pintarCanvas, 50)

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    let numAleatorio
     //Elegir enemigos aleatorios y dibujarlos
    for (let i = 0; i < enemigosEnMapa; i++) {
         numAleatorio = aleatorio(0,mokepones.length-1)
         mascotaEnemigoObjeto[i] = Object.assign({} , mokepones[numAleatorio])
         mascotaEnemigoObjeto[i].x = aleatorio(0,300)
         mascotaEnemigoObjeto[i].y = aleatorio(0,250)
     }

    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    pintarMokeponesEnemigos()

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY!== 0){
        for (let i = 0; i < enemigosEnMapa; i++) {
            revisarColision(mascotaEnemigoObjeto[i])
        }
        
    }
}

function pintarMokeponesEnemigos(){
    for (let i = 0; i < mascotaEnemigoObjeto.length; i++) { 
        lienzo.drawImage(mascotaEnemigoObjeto[i].alterEgoAvatar, mascotaEnemigoObjeto[i].x, mascotaEnemigoObjeto[i].y, mascotaEnemigoObjeto[i].ancho, mascotaEnemigoObjeto[i].alto)
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
    let colisionesSimultaneas = 0 

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

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
    colisionesSimultaneas += 1
    console.log(colisionesSimultaneas)

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

//Se escucha el load de la ventana para que cargue el código después de que haya cargado el html. 
window.addEventListener('load',iniciarJuego)