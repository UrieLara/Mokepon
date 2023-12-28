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

let ataqueJugador = []
let ataquesMokeponEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
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

class Mokepon {
    constructor(nombre, foto, vida, alterEgo){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.alterEgo = alterEgo
    }
}

    let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge-jugador.png', 5, './assets/hipodoge-enemigo.png')
    let capipepo = new Mokepon('Capipepo', './assets/capipepo-jugador.png', 5, './assets/capipepo-enemigo.png')
    let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya-jugador.png', 5, './assets/ratigueya-enemigo.png')

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
    
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
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
                ataqueJugador.push('🔥')
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else if (e.target.textContent === '💧'){
                ataqueJugador.push('💧')
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }
            else {
                ataqueJugador.push('🌱')
                boton.style.background = '#112f58'
                boton.disabled = "true"
            }

            ataqueAleatorioEnemigo(ordenAtaquesEnemigo)
            ordenAtaquesEnemigo = ordenAtaquesEnemigo + 1
        })
    })
    

    
}

function OrdenRandom(a, b) {
    return Math.random() - 0.5;
  }

function seleccionarMascotaEnemigo(){
    let enemigoAleatorio = aleatorio(0,mokepones.length-1)
    spanMascotaEnemigo.innerHTML = mokepones[enemigoAleatorio].nombre
    imagenMokeponEnemigo.src = mokepones[enemigoAleatorio].alterEgo
    ataquesMokeponEnemigo = (mokepones[enemigoAleatorio].ataques).sort(OrdenRandom)
    console.log(ataquesMokeponEnemigo)
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(orden){
    ataqueEnemigo = ataquesMokeponEnemigo[orden].nombre
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
    sectionMensajes.innerHTML = 'FIN DE LA PARTIDA. '+resultadoFinal

    btnFuego.disabled = true
    btnAgua.disabled = true
    btnTierra.disabled = true

    sectionReiniciar.style.display = 'block'
}


function combate(){
    let resultado = ""
    let vidasJugador_html = document.getElementById("vida-jugador")
    let vidasEnemigo_html = document.getElementById("vida-enemigo")

      if (ataqueJugador == ataqueEnemigo){resultado = "Empate 😒"}
      else if (ataqueJugador == 1 && ataqueEnemigo == 3 || ataqueJugador == 2 && ataqueEnemigo == 1 || ataqueJugador == 3 && ataqueEnemigo == 2){ 
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
        revisarvidas()
}

function revisarvidas(){
    if(vidasJugador==0){
        crearMensajeFinal('PERDISTE 😢')
    }
    else if (vidasEnemigo==0) {
        crearMensajeFinal('GANASTE!! 🥳')
    }
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
//Se escucha el load de la ventana para que cargue el código después de que haya cargado el html. 
window.addEventListener('load',iniciarJuego)