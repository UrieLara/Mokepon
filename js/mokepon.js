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

let ataqueMokeponJugador = []
let ataquesMokeponEnemigo = []
let vidasJugador
let vidasEnemigo
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador

let mokepones = []
let opcionDeMokepones
let ataquesMokepon

let botones = []
let btnFuego 
let btnAgua
let btnTierra
let ordenAtaquesEnemigo = 0
let ataqueEnemigo
let ataqueJugador

class Mokepon {
    constructor(nombre, foto, vida, alterEgo){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.alterEgo = alterEgo
    }
}

    let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge-jugador.png', 3, './assets/hipodoge-enemigo.png')
    let capipepo = new Mokepon('Capipepo', './assets/capipepo-jugador.png', 3, './assets/capipepo-enemigo.png')
    let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya-jugador.png', 3, './assets/ratigueya-enemigo.png')

    //Objetos literales
    hipodoge.ataques.push(
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    capipepo.ataques.push(
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌱', id: 'btn-tierra'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    ratigueya.ataques.push(
        {nombre: '💧', id: 'btn-agua'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🔥', id: 'btn-fuego'},
        {nombre: '🌱', id: 'btn-tierra'}
    )

    mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){

    sectionReiniciar.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none' //oculta la sección del HTML

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}"/>
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    btnMascotaPlayer.addEventListener('click', seleccionarMascotaPlayer)
    btnReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaPlayer(){ 
    sectionSeleccionarAtaque.style.display = 'flex' //muestra la sección del HTML
    sectionSeleccionarMascota.style.display = 'none' //oculta la sección del HTML

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        imagenMokeponJugador.src = "./assets/hipodoge-jugador.png"
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        imagenMokeponJugador.src = "./assets/capipepo-jugador.png"
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        imagenMokeponJugador.src = "./assets/ratigueya-jugador.png"
    }
    else {alert("Selecciona una mascota")
    sectionSeleccionarAtaque.style.display = 'none' //muestra la sección del HTML
    sectionSeleccionarMascota.style.display = 'block' //oculta la sección del HTML
    }
    
    extraerAtaquesyVida(mascotaJugador)
    seleccionarMascotaEnemigo()
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
            else {
                ataqueMokeponJugador.push('🌱')
                ataqueJugador = '🌱'
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }

            ataqueAleatorioEnemigo(ordenAtaquesEnemigo)
        })
    })
    
}

function seleccionarMascotaEnemigo(){
    let enemigoAleatorio = aleatorio(0,mokepones.length-1)

    vidasEnemigo = mokepones[enemigoAleatorio].vida
    spanMascotaEnemigo.innerHTML = mokepones[enemigoAleatorio].nombre
    imagenMokeponEnemigo.src = mokepones[enemigoAleatorio].alterEgo
    ataquesMokeponEnemigo = mokepones[enemigoAleatorio].ataques
    ataquesMokeponEnemigo.sort(ordenRandom)
    console.log(ataquesMokeponEnemigo)
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

      if (ataqueJugador == ataqueEnemigo){resultado = "Empate 😒"}
      else if (ataqueJugador == '🔥' && ataqueEnemigo == '🌱' || ataqueJugador == "💧" && ataqueEnemigo == "🔥" || ataqueJugador == "🌱" && ataqueEnemigo == "💧"){ 
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

    if(vidasJugador==0 || (ataqueMokeponJugador.length == 5 && vidasJugador < vidasEnemigo)){
        crearMensajeFinal('PERDISTE 😢')
    }
    else if (vidasEnemigo==0 || (ataqueMokeponJugador.length === 5 && vidasJugador > vidasEnemigo)) {
        crearMensajeFinal('GANASTE!! 🥳')
    }
    else if (ataqueMokeponJugador.length === 5 && vidasJugador == vidasEnemigo){
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
    sectionMensajes.innerHTML = 'FIN DE LA PARTIDA. \n'+resultadoFinal

    botones.forEach((boton) => {
                boton.style.background = '#112f58'
                boton.disabled = "true"
            })

    /*btnFuego.disabled = true
    btnFuego.style.background = '#112f58'
    btnAgua.disabled = true
    btnAgua.style.background = '#112f58'
    btnTierra.disabled = true
    btnTierra.style.background = '#112f58'*/

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
//Se escucha el load de la ventana para que cargue el código después de que haya cargado el html. 
window.addEventListener('load',iniciarJuego)