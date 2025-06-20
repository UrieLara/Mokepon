/* Reemplazar "localhost" por la dirección IP
inalámbrica Wifi IPv4 del PC */

const sectionReiniciar = document.getElementById('reiniciar')
const sectionContinuar = document.getElementById('continuar-batalla')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionMultijugador = document.getElementById('multijugador')
const btnMascotaJugador = document.getElementById('btn-mascotas')
const btnBots = document.getElementById('btn-bots')
const btnMultijugador = document.getElementById('btn-multijugador')
const btnReiniciar = document.getElementById('btn-reiniciar')
const btnContinuar = document.getElementById('btn-continuar')
const btnVolverJugar = document.getElementById('btn-volver')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota_jugador')
const imagenMokeponJugador = document.getElementById('img-mascota-jugador')
const imagenMascotaFinal = document.getElementById('img-final')

const spanMascotaEnemigo = document.getElementById('mascota_enemigo')
const imagenMokeponEnemigo = document.getElementById('img-mascota-enemigo')

const sectionMensajes = document.getElementById('resultado')
let ataquesJugadorHtml = document.getElementById('ataques-jugador')
let ataquesEnemigoHtml = document.getElementById('ataques-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
let mostrarAtaquesInicioHtml = document.getElementById('ataques-mascota-inicio')
const contenedorAtaques = document.getElementById('ataques-mokepon-jugador')

let numEnemigosMapa = document.getElementById('num-enemigos')
const indicadorAtaquesEnemigo = document.getElementById('ataques-mascota-enemigo')

let vidasJugadorHtml = document.getElementById("vida-jugador")
let vidasEnemigoHtml = document.getElementById("vida-enemigo")

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const btnFlechas = document.querySelectorAll('.btn-flechas');

let victoriasHTML = document.getElementById('victorias')
let derrotasHTML = document.getElementById('derrotas')
let victoriasFinalHTML = document.getElementById('victorias-final')
let derrotasFinalHTML = document.getElementById('derrotas-final')
let ganadorFinalHtml = document.getElementById('resultado-final')

let jugadorId = null
let enemigoId = null
let enemigoIdYaJugados = []
let multijugador = false

let ataquesMokeponJugador = []
let ataquesMokeponEnemigo = []
let vidasJugador
let vidasEnemigo

let mokepones = []
let mokeponesEnemigos = []
let opcionDeMokepones
let mascotaJugador
let fotoJugador
let ataquesMokepon
let ataqueJugador
let ataqueEnemigo
let ordenAtaquesEnemigo = 0

let mascotaJugadorObjeto
let mascotaEnemigoObjeto = []
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

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaDelMapa = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaDelMapa


class Mokepon {
    constructor(nombre, vida, foto, avatar, alterEgo, enemigoAvatar, radio, x = 10, y = 10, id = null) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.radio = radio
        this.id = id

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

        this.nube = new Image()
        this.nube.src = './assets/nube.png'
    }

}

let hipodoge = new Mokepon('Hipodoge', 3, './assets/hipodoge-jugador.png', './assets/hipodoge-avatar.png', './assets/hipodoge-enemigo.png', './assets/hipodoge-avatar-enemigo.png')
let capipepo = new Mokepon('Capipepo', 3, './assets/capipepo-jugador.png', './assets/capipepo-avatar.png', './assets/capipepo-enemigo.png', './assets/capipepo-avatar-enemigo.png')
let ratigueya = new Mokepon('Ratigueya', 3, './assets/ratigueya-jugador.png', './assets/ratigueya-avatar.png', './assets/ratigueya-enemigo.png', './assets/ratigueya-avatar-enemigo.png')
let langostelvis = new Mokepon('Langostelvis', 3, './assets/langostelvis-jugador.png', './assets/langostelvis-avatar.png', './assets/langostelvis-enemigo.png', './assets/langostelvis-avatar-enemigo.png')
let pydos = new Mokepon('Pydos', 3, './assets/pydos-jugador.png', './assets/pydos-avatar.png', './assets/pydos-enemigo.png', './assets/pydos-avatar-enemigo.png')
let tucapalma = new Mokepon('Tucapalma', 3, './assets/tucapalma-jugador.png', './assets/tucapalma-avatar.png', './assets/tucapalma-enemigo.png', './assets/tucapalma-avatar-enemigo.png')

//Objetos literales
hipodoge.ataques.push(
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🍃', id: 'btn-aire' },
    { nombre: '🌱', id: 'btn-tierra' }
)

capipepo.ataques.push(
    { nombre: '🍃', id: 'btn-aire' },
    { nombre: '🪨', id: 'btn-roca' },
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '🌱', id: 'btn-tierra' }
)

ratigueya.ataques.push(
    { nombre: '🪨', id: 'btn-roca' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '💧', id: 'btn-agua' }
)

langostelvis.ataques.push(
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🪨', id: 'btn-roca' }
)

pydos.ataques.push(
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '⚡', id: 'btn-electrico' },
    { nombre: '⚡', id: 'btn-electrico' },
    { nombre: '🪨', id: 'btn-roca' },
    { nombre: '🪨', id: 'btn-roca' }
)

tucapalma.ataques.push(
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🍃', id: 'btn-aire' },
    { nombre: '🍃', id: 'btn-aire' },
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '🌱', id: 'btn-tierra' }
)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

function mostrarReglas() {
    const ventana = window.open("", "Reglas", "width=500,height=300,top=100");

    ventana.document.writeln(`
    <html>
      <head>
        <title>Reglas del Juego</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Reglas del Juego</h1>
        <p>Elige un mokepón para luchar contra tus enemigos.</p>
        <p>Cada mokepón tiene sus propios elementos para atacar, algunos elementos son más fuertes que otros. </p>
        <p> Cuando te enfrentes a un mokepón enemigo, elige sabiamente el ataque que lanzarás</p>
        <img src="./assets/reglas.png" alt="Reglas visuales" width="400">
      </body>
    </html>
    `);
}

function iniciarJuego() {

    sectionReiniciar.style.display = 'none'
    sectionContinuar.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionMultijugador.style.display = 'none'
    sectionMultijugador.style.display = 'none'

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

    mokepones.forEach(mokepon => {
        mokepon.radio = document.getElementById(mokepon.nombre)
        mokepon.radio.addEventListener("click", () => mostrarAtaquesInicio(mokepon));
    });



    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    btnContinuar.addEventListener('click', continuarBatallas)
    btnReiniciar.addEventListener('click', reiniciarJuego)
    btnVolverJugar.addEventListener('click', reiniciarJuego)


}

function mostrarAtaquesInicio(mascota) {
    let stringAtaques = ""
    for (let i = 0; i < mascota.ataques.length; i++) {
        stringAtaques = stringAtaques + " " + mascota.ataques[i].nombre
    }
    mostrarAtaquesInicioHtml.innerHTML = "Ataques de " + mascota.nombre + ": " + stringAtaques
}

function seleccionarMascotaJugador() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].radio.checked) {
            spanMascotaJugador.innerHTML = "Tu " + mokepones[i].nombre
            mascotaJugador = mokepones[i].nombre
            fotoJugador = mokepones[i].foto
            imagenMokeponJugador.src = fotoJugador
        }
    }

    if (mascotaJugador === undefined) {
        alert("Selecciona una mascota")
        sectionSeleccionarMascota.style.display = 'flex'
        sectionSeleccionarAtaque.style.display = 'none'
    }
    else {
        extraerAtaquesyVida(mascotaJugador)
        sectionSeleccionarMascota.style.display = 'none'
        sectionMultijugador.style.display = 'flex'
        sectionMultijugador.style.display = 'flex'

        btnBots.addEventListener('click', batallaConBots)
        btnMultijugador.addEventListener('click', batallaMultijugador)
    }
}

function batallaConBots() {
    multijugador = false
    if (numEnemigosMapa.value < 1 || numEnemigosMapa.value > 5) {
        alert("El número de enemigos debe ser de 1 a 5")
    }
    else {
        iniciarMapa()
    }
}

function batallaMultijugador() {
    unirseAlJuego()


    multijugador = true
    mascotaEnemigoObjeto = []

    setTimeout(function () {
        seleccionarMokepon(mascotaJugador)
        iniciarMapa()
    }, 500);

}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {

            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugadorId = respuesta
                    })
            }

        })
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })

}

function extraerAtaquesyVida(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
            vidasJugador = mokepones[i].vida
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
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

    reiniciarBotonesAtaque()
}

function secuenciaAtaque() {
    clearInterval(intervalo)
    let recibirAtaque = false
    sectionContinuar.style.display = 'none'
    const pEligeAtaques = document.getElementById('elegir-ataques')

    if (multijugador) {
        pEligeAtaques.innerHTML = "Selecciona el orden de todos tus ataques:"
    }
    else {
        pEligeAtaques.innerHTML = "Elige tu ataque:"
    }

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥' && boton.disabled === false) {
                ataquesMokeponJugador.push('🔥')
                ataqueJugador = '🔥'
                boton.style.cssText = 'background-color: rgb(88 17 17); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '💧' && boton.disabled === false) {
                ataquesMokeponJugador.push('💧')
                ataqueJugador = '💧'
                boton.style.cssText = 'background-color: #112f58; font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🌱' && boton.disabled === false) {
                ataquesMokeponJugador.push('🌱')
                ataqueJugador = '🌱'
                boton.style.cssText = 'background-color: rgb(2 71 24); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '⚡' && boton.disabled === false) {
                ataquesMokeponJugador.push('⚡')
                ataqueJugador = '⚡'
                boton.style.cssText = 'background-color: rgb(126 135 0); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🪨' && boton.disabled === false) {
                ataquesMokeponJugador.push('🪨')
                ataqueJugador = '🪨'
                boton.style.cssText = 'background-color: rgb(45 45 47); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🍃' && boton.disabled === false) {
                ataquesMokeponJugador.push('🍃')
                ataqueJugador = '🍃'
                boton.style.cssText = 'background-color: rgb(8 147 135); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }


            if (multijugador === false) {
                if (recibirAtaque === true) {
                    ataqueAleatorioEnemigo(ordenAtaquesEnemigo)
                }
            }
            else {
                if (ataquesMokeponJugador.length === 5) {
                    enviarAtaques()
                }
            }


        })
    })


}

function limpiarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: []
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquesMokeponJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataquesMokeponEnemigo = ataques
                            combateMultijugador()
                        }

                    })
            }
        })

}

function reiniciarBotonesAtaque() {
    botones.forEach((boton) => {
        if (boton.textContent === '🔥') {
            boton.style.cssText = 'background-color: firebrick; font-size: 30px';
        }
        else if (boton.textContent === '💧') {
            boton.style.cssText = 'background-color: #0174BE; font-size: 30px';
        }
        else if (boton.textContent === '🌱') {
            boton.style.cssText = 'background-color: #612c19; font-size: 30px';
        }
        else if (boton.textContent === '⚡') {
            boton.style.cssText = 'background-color: #fbfb2b; font-size: 30px';
        }
        else if (boton.textContent === '🪨') {
            boton.style.cssText = 'background-color: grey; font-size: 30px';
        }
        else if (boton.textContent === '🍃') {
            boton.style.cssText = 'background-color: #6ea794ba; font-size: 30px';
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    let ataquesString = ''

    enemigo.ataques.forEach(ataque => {
        ataquesString += ataque.nombre + ' '
    });

    indicadorAtaquesEnemigo.innerHTML = ataquesString;

    vidasEnemigo = enemigo.vida
    spanMascotaEnemigo.innerHTML = enemigo.nombre + " enemigo"
    imagenMokeponEnemigo.src = enemigo.alterEgo

    if (multijugador === false) {
        ataquesMokeponEnemigo = enemigo.ataques
        barajar(ataquesMokeponEnemigo)

        for (let i = 0; i < numEnemigosMapa.value; i++) {
            if (mascotaEnemigoObjeto[i] === enemigo) {
                mascotaEnemigoObjeto[i] = null
            }
        }
    }

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(orden) {
    ataqueEnemigo = ataquesMokeponEnemigo[orden].nombre
    ordenAtaquesEnemigo = ordenAtaquesEnemigo + 1

    combateLocal()
}

function combateLocal() {
    let resultado = ""
    //Empates: planta = roca; agua = aire; fuego = electrico

    if (ataqueJugador == ataqueEnemigo
        || (ataqueJugador == '🌱' && ataqueEnemigo == '🪨') || (ataqueEnemigo == '🌱' && ataqueJugador == '🪨')
        || (ataqueJugador == '💧' && ataqueEnemigo == '🍃') || (ataqueEnemigo == '💧' && ataqueJugador == '🍃')
        || (ataqueJugador == '🔥' && ataqueEnemigo == '⚡') || (ataqueEnemigo == '🔥' && ataqueJugador == '⚡')) { resultado = "Empate 😒" }

    else if (ataqueJugador == '🔥' && (ataqueEnemigo == '🌱' || ataqueEnemigo == '🍃')
        || ataqueJugador == '💧' && (ataqueEnemigo == '🔥' || ataqueEnemigo == '🪨')
        || ataqueJugador == '🌱' && (ataqueEnemigo == '💧' || ataqueEnemigo == '⚡')
        || ataqueJugador == '⚡' && (ataqueEnemigo == '💧' || ataqueEnemigo == '🍃')
        || ataqueJugador == '🪨' && (ataqueEnemigo == '🔥' || ataqueEnemigo == '⚡')
        || ataqueJugador == '🍃' && (ataqueEnemigo == '🌱' || ataqueEnemigo == '🪨')) {
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

function combateMultijugador() {
    clearInterval(intervalo)

    let resultado = ""

    for (let i = 0; i < ataquesMokeponJugador.length; i++) {
        if (ataquesMokeponJugador[i] == ataquesMokeponEnemigo[i]
            || (ataquesMokeponJugador[i] == '🌱' && ataquesMokeponEnemigo[i] == '🪨') || (ataquesMokeponEnemigo[i] == '🌱' && ataquesMokeponJugador[i] == '🪨')
            || (ataquesMokeponJugador[i] == '💧' && ataquesMokeponEnemigo[i] == '🍃') || (ataquesMokeponEnemigo[i] == '💧' && ataquesMokeponJugador[i] == '🍃')
            || (ataquesMokeponJugador[i] == '🔥' && ataquesMokeponEnemigo[i] == '⚡') || (ataquesMokeponEnemigo[i] == '🔥' && ataquesMokeponJugador[i] == '⚡')) { resultado = "Empate 😒" }

        else if (ataquesMokeponJugador[i] == '🔥' && (ataquesMokeponEnemigo[i] == '🌱' || ataquesMokeponEnemigo[i] == '🍃')
            || ataquesMokeponJugador[i] == '💧' && (ataquesMokeponEnemigo[i] == '🔥' || ataquesMokeponEnemigo[i] == '🪨')
            || ataquesMokeponJugador[i] == '🌱' && (ataquesMokeponEnemigo[i] == '💧' || ataquesMokeponEnemigo[i] == '⚡')
            || ataquesMokeponJugador[i] == '⚡' && (ataquesMokeponEnemigo[i] == '💧' || ataquesMokeponEnemigo[i] == '🍃')
            || ataquesMokeponJugador[i] == '🪨' && (ataquesMokeponEnemigo[i] == '🔥' || ataquesMokeponEnemigo[i] == '⚡')
            || ataquesMokeponJugador[i] == '🍃' && (ataquesMokeponEnemigo[i] == '🌱' || ataquesMokeponEnemigo[i] == '🪨')) {
            resultado = "¡¡Ganaste!! 🥳"
            vidasEnemigo--
            vidasEnemigoHtml.innerHTML = vidasEnemigo
        }

        else {
            resultado = "Perdiste 😢"
            vidasJugador--
            vidasJugadorHtml.innerHTML = vidasJugador
        }

    }
    crearMensajes(resultado)
    revisarGanador()
}

function revisarGanador() {
    if (vidasJugador == 0 || (ataquesMokeponJugador.length == ataquesMokeponEnemigo.length && vidasJugador < vidasEnemigo)) {
        crearMensajeFinal('PERDISTE 😢')
        derrotas += 1
        derrotasHTML.innerHTML = derrotas
    }
    else if (vidasEnemigo == 0 || (ataquesMokeponJugador.length === ataquesMokeponEnemigo.length && vidasJugador > vidasEnemigo)) {
        crearMensajeFinal('GANASTE!! 🥳')
        victorias += 1
        victoriasHTML.innerHTML = victorias
    }
    else if (ataquesMokeponJugador.length === ataquesMokeponEnemigo.length) {
        crearMensajeFinal('EMPATE!! 😐')
    }

    if (multijugador) {
        if (vidasJugador < 0) {
            vidasJugador = 0
        }
    }
}

function crearMensajes(resultado) {
    sectionMensajes.innerHTML = resultado

    if (multijugador === false) {
        ataquesJugadorHtml.appendChild(crearParrafo(ataqueJugador))
        ataquesEnemigoHtml.appendChild(crearParrafo(ataqueEnemigo))
    }

    else {
        ataquesMokeponJugador.forEach(ataque => {
            ataquesJugadorHtml.appendChild(crearParrafo(ataque))
        });

        ataquesMokeponEnemigo.forEach(ataque => {
            ataquesEnemigoHtml.appendChild(crearParrafo(ataque))
        });
    }

}

function crearParrafo(ataque) {
    let nuevoAtaque = document.createElement('p')
    nuevoAtaque.innerHTML = ataque
    return nuevoAtaque
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = "FIN DE COMBATE. " + resultadoFinal

    botones.forEach((boton) => {
        boton.disabled = true
        boton.style.background = '#161616d9'
    })

    sectionContinuar.style.display = 'flex'
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function barajar(objetos) {
    for (let i = objetos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = objetos[i];
        objetos[i] = objetos[j];
        objetos[j] = temp;
    }
}

function iniciarMapa() {
    sectionMultijugador.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    intervalo = setInterval(pintarCanvas, 50)
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)


    if (multijugador === false) {
        let numAleatorio = 0
        //Elegir enemigos aleatorios y dibujarlos
        for (let i = 0; i < numEnemigosMapa.value; i++) {
            numAleatorio = aleatorio(0, mokepones.length - 1)
            mascotaEnemigoObjeto[i] = Object.assign({}, mokepones[numAleatorio])
            mascotaEnemigoObjeto[i].x = aleatorio(50, anchoDelMapa - 40)
            mascotaEnemigoObjeto[i].y = aleatorio(50, alturaDelMapa - 40)
        }
        //Separar enemigos juntos
        for (let i = 0; i < numEnemigosMapa.value; i++) {
            for (let j = 0; j < numEnemigosMapa.value; j++) {
                if (i !== j) {
                    if (Math.abs(mascotaEnemigoObjeto[i].x - mascotaEnemigoObjeto[j].x) < 40 &&
                        Math.abs(mascotaEnemigoObjeto[i].y - mascotaEnemigoObjeto[j].y) < 40) {
                        mascotaEnemigoObjeto[i].x = aleatorio(50, anchoDelMapa - 40)
                        mascotaEnemigoObjeto[i].y = aleatorio(50, alturaDelMapa - 40)
                    }
                }
            }
        }
    }

    /* else {
         mascotaJugadorObjeto.x = aleatorio(10,anchoDelMapa-40)
         mascotaJugadorObjeto.y = aleatorio(10,alturaDelMapa-40)
     }*/


    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas() {

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)

    //Delimitar area mascota Jugador
    if (mascotaJugadorObjeto.y < 0) {
        mascotaJugadorObjeto.y = 0
    }
    else if (mascotaJugadorObjeto.y > alturaDelMapa - 40) {
        mascotaJugadorObjeto.y = alturaDelMapa - 40
    }
    else {
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    }

    if (mascotaJugadorObjeto.x < 0) {
        mascotaJugadorObjeto.x = 0
    }
    else if (mascotaJugadorObjeto.x > anchoDelMapa - 40) {
        mascotaJugadorObjeto.x = anchoDelMapa - 40
    }
    else {
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    }
    //...............................................................................
    if (multijugador === false) {
        pintarMokeponesEnemigos()

        if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
            for (let i = 0; i < numEnemigosMapa.value; i++) {
                if (mascotaEnemigoObjeto[i] !== null) {
                    revisarColision(mascotaEnemigoObjeto[i])
                }
            }
        }
    }

    else {
        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
        //if(mokeponesEnemigos!== null){
        mokeponesEnemigos.forEach(function (mokepon) {
            pintarMokepon(mokepon)
            revisarColision(mokepon)
        })
        // }
    }

    pintarMokepon(mascotaJugadorObjeto)

}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })

    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null

                            if (enemigo.mokepon !== undefined) {
                                const mokeponNombre = enemigo.mokepon.nombre

                                for (let i = 0; i < mokepones.length; i++) {
                                    if (mokeponNombre === mokepones[i].nombre) {
                                        mokeponEnemigo = Object.assign({}, mokepones[i])
                                        mokeponEnemigo.id = enemigo.id
                                    }
                                }
                            }
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })

                    })
            }
        })
}

function pintarMokepon(mokepon) {
    lienzo.drawImage(mokepon.nube, mokepon.x - 10, mokepon.y + 20, mokepon.ancho + 20, mokepon.alto - 10)
    lienzo.drawImage(mokepon.mapaFoto, mokepon.x, mokepon.y, mokepon.ancho, mokepon.alto)
}

function pintarMokeponesEnemigos() {
    for (let i = 0; i < mascotaEnemigoObjeto.length; i++) {
        if (mascotaEnemigoObjeto[i] !== null) {
            lienzo.drawImage(
                mascotaEnemigoObjeto[i].alterEgoAvatar,
                mascotaEnemigoObjeto[i].x,
                mascotaEnemigoObjeto[i].y,
                mascotaEnemigoObjeto[i].ancho,
                mascotaEnemigoObjeto[i].alto)
        }
    }
}

function moverMascotaArriba() {
    btnFlechas[0].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadY = - 5

}

function moverMascotaIzquierda() {
    btnFlechas[1].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadX = - 5
}

function moverMascotaDerecha() {
    btnFlechas[2].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadX = 5
}

function moverMascotaAbajo() {
    btnFlechas[3].style.backgroundColor = '#92C7F9';
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    for (let i = 0; i < btnFlechas.length; i++) {
        btnFlechas[i].style.backgroundColor = "white";
    }
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(event) {

    if (event.key == 'ArrowUp' || event.key == 'w') {
        moverMascotaArriba()
    }
    if (event.key == 'ArrowDown' || event.key == 's') {
        moverMascotaAbajo()
    }
    if (event.key == 'ArrowLeft' || event.key == 'a') {
        moverMascotaIzquierda()
    }
    if (event.key == 'ArrowRight' || event.key == 'd') {
        moverMascotaDerecha()
    }
}

function obtenerObjetoMascota(mokepon) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepon === mokepones[i].nombre) {
            if (multijugador === true) {
                mokepones[i].x = aleatorio(10, anchoDelMapa - 40)
                mokepones[i].y = aleatorio(10, anchoDelMapa - 40)
            }

            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y - 5
    const abajoEnemigo = (enemigo.y + enemigo.alto) - 5
    const izquierdaEnemigo = enemigo.x - 5
    const derechaEnemigo = (enemigo.x + enemigo.ancho) + 5

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) { return }

    detenerMovimiento()

    if (multijugador) {
        enemigoId = enemigo.id

    }

    vidasJugadorHtml.innerHTML = vidasJugador
    vidasEnemigoHtml.innerHTML = enemigo.vida


    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'

    seleccionarMascotaEnemigo(enemigo)

}

function continuarBatallas() {

    if (multijugador === false) {
        enemigosJugados += 1
        ordenAtaquesEnemigo = 0

        if (enemigosJugados.toString() === numEnemigosMapa.value) {
            resultadoFinal()
            return
        }
    }

    else {

        enemigoId = null
        limpiarAtaques()
        resultadoFinal()
        eliminarId()
        return
    }

    ataquesJugadorHtml.innerHTML = ""
    ataquesEnemigoHtml.innerHTML = ""

    ataquesMokeponJugador = []
    ataquesMokeponEnemigo = []

    vidasJugador = 3 //reinicio de vida

    botones.forEach(boton => {
        boton.disabled = false
    });

    reiniciarBotonesAtaque()

    sectionSeleccionarAtaque.style.display = 'none'
    sectionMensajes.innerHTML = 'Mucha suerte!'
    sectionVerMapa.style.display = 'flex'

    intervalo = setInterval(pintarCanvas, 50)
}

function resultadoFinal() {
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'flex'

    imagenMascotaFinal.src = fotoJugador

    victoriasFinalHTML.innerHTML = victorias
    derrotasFinalHTML.innerHTML = derrotas

    if (victorias > derrotas) {
        ganadorFinalHtml.innerHTML = "¡¡Ganaste!! 🥳"
    }
    else {
        ganadorFinalHtml.innerHTML = "Suerte para la próxima 😔"
    }

    mokepones.forEach(mokepon => {
        mokepon.x = 10
        mokepon.y = 10
    });

    clearInterval(intervalo)
}

function eliminarId() {
    fetch(`http://localhost:8080/salir/${jugadorId}`)
        .then(function (res) {

            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        //console.log(respuesta)
                    })
            }
        })
}

function reiniciarJuego() {
    location.reload()
}


//Se escucha el load de la ventana para que cargue el código después de que haya cargado el html. 
window.addEventListener('load', iniciarJuego)