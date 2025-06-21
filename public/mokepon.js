/* Reemplazar "localhost" por la dirección inalámbrica Wifi IPv4 del PC */

const canvasInit = document.getElementById('mapa');
const lienzoInit = canvasInit.getContext("2d")
const anchoMaximoMapa = 350
const VIDASINIT = 3

// 🎮 Estado del juego general
const juego = {
    multijugador: false,
    estado: {
        primerCombate: true,
        mapaVisible: true,
        intervalo: null
    },
    resultado: {
        victorias: 0,
        derrotas: 0
    },
    mapa: {
        fondo: new Image(),
        canvas: canvasInit,
        lienzo: lienzoInit,
        ancho: window.innerWidth - 20,
        alto: 0
    }
};

// 🧑 Jugador principal
const jugador = {
    id: null,
    mascota: null,
    objeto: null,
    foto: null,
    ataques: [],
    vida: VIDASINIT
}

// 👾 Enemigo del jugador
const enemigo = {
    id: null,
    nombre: null,
    objeto: [],
    ataques: [],
    vida: VIDASINIT
}

// 🧩 Mokepones y ataques
const mokepones = {
    personajes: [],
    disponibles: [],
    enemigosEnMapa: [],
    botonesAtaques: [],
    ordenAtaquesEnemigo: 0,
    ataqueJugador: null,
    ataqueEnemigo: null,
    yaJugados: 0,
    ataques: null
}

// 🧠 Referencias a elementos del DOM
const ui = {
    secciones: {
        seleccionMascota: document.getElementById('seleccionar-mascota'),
        seleccionarAtaque: document.getElementById('seleccionar-ataque'),
        verMapa: document.getElementById('ver-mapa'),
        multijugador: document.getElementById('multijugador'),
        reiniciar: document.getElementById('reiniciar'),
        continuarBatalla: document.getElementById('continuar-batalla'),
        tarjetasMascotas: document.getElementById('contenedorTarjetas'),
        ataquesJugador: document.getElementById('ataques-mokepon-jugador')
    },
    botones: {
        seleccionarMascota: document.getElementById('btn-mascotas'),
        modoBots: document.getElementById('btn-bots'),
        modoMultijugador: document.getElementById('btn-multijugador'),
        reiniciar: document.getElementById('btn-reiniciar'),
        continuar: document.getElementById('btn-continuar'),
        volverAJugar: document.getElementById('btn-volver'),
        flechas: document.querySelectorAll('.btn-flechas')
    },
    texto: {
        resultado: document.getElementById('resultado'),
        ataquesJugador: document.getElementById('ataques-jugador'),
        ataquesEnemigo: document.getElementById('ataques-enemigo'),
        ataquesMascotaInicio: document.getElementById('ataques-mascota-inicio'),
        ataquesMascotaEnemigo: document.getElementById('ataques-mascota-enemigo'),
        vidaJugador: document.getElementById('vida-jugador'),
        vidaEnemigo: document.getElementById('vida-enemigo'),
        nombreMascotaJugador: document.getElementById('mascota_jugador'),
        nombreMascotaEnemigo: document.getElementById('mascota_enemigo'),
        resultadoFinal: document.getElementById('resultado-final'),
        victorias: document.getElementById('victorias'),
        derrotas: document.getElementById('derrotas'),
        victoriasFinal: document.getElementById('victorias-final'),
        derrotasFinal: document.getElementById('derrotas-final'),
        cantidadEnemigosMapa: document.getElementById('num-enemigos')
    },
    imagenes: {
        jugador: document.getElementById('img-mascota-jugador'),
        enemigo: document.getElementById('img-mascota-enemigo'),
        final: document.getElementById('img-final')
    },
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
let botones = []
let btnFuego
let btnAgua
let btnTierra
let btnElectrico
let btnRoca
let btnAire
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
juego.mapa.fondo.src = './assets/mapa.jpeg'



if (juego.mapa.ancho > anchoMaximoMapa) {
    juego.mapa.ancho = anchoMaximoMapa - 20
}
alturaDelMapa = juego.mapa.ancho * 600 / 800

juego.mapa.canvas.width = juego.mapa.ancho
juego.mapa.canvas.height = alturaDelMapa


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

let hipodoge = new Mokepon('Hipodoge', VIDASINIT, './assets/hipodoge-jugador.png', './assets/hipodoge-avatar.png', './assets/hipodoge-enemigo.png', './assets/hipodoge-avatar-enemigo.png')
let capipepo = new Mokepon('Capipepo', VIDASINIT, './assets/capipepo-jugador.png', './assets/capipepo-avatar.png', './assets/capipepo-enemigo.png', './assets/capipepo-avatar-enemigo.png')
let ratigueya = new Mokepon('Ratigueya', VIDASINIT, './assets/ratigueya-jugador.png', './assets/ratigueya-avatar.png', './assets/ratigueya-enemigo.png', './assets/ratigueya-avatar-enemigo.png')
let langostelvis = new Mokepon('Langostelvis', VIDASINIT, './assets/langostelvis-jugador.png', './assets/langostelvis-avatar.png', './assets/langostelvis-enemigo.png', './assets/langostelvis-avatar-enemigo.png')
let pydos = new Mokepon('Pydos', VIDASINIT, './assets/pydos-jugador.png', './assets/pydos-avatar.png', './assets/pydos-enemigo.png', './assets/pydos-avatar-enemigo.png')
let tucapalma = new Mokepon('Tucapalma', VIDASINIT, './assets/tucapalma-jugador.png', './assets/tucapalma-avatar.png', './assets/tucapalma-enemigo.png', './assets/tucapalma-avatar-enemigo.png')

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

mokepones.personajes.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

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

    ui.secciones.reiniciar.style.display = 'none'
    ui.secciones.continuarBatalla.style.display = 'none'
    ui.secciones.seleccionarAtaque.style.display = 'none'
    ui.secciones.verMapa.style.display = 'none'
    ui.secciones.multijugador.style.display = 'none'
    ui.secciones.multijugador.style.display = 'none'

    mokepones.personajes.forEach((mascota) => {
        mokepones.disponibles = `
        <input type="radio" name="mascota" id="${mascota.nombre}"/>
        <label class="tarjeta-de-mokepon" for="${mascota.nombre}">
            <p>${mascota.nombre}</p>
            <img src="${mascota.foto}" alt="${mascota.nombre}">
        </label>
        `
        ui.secciones.tarjetasMascotas.innerHTML += mokepones.disponibles
    })

    mokepones.personajes.forEach(mascota => {
        mascota.radio = document.getElementById(mascota.nombre)
        mascota.radio.addEventListener("click", () => mostrarAtaquesInicio(mascota));
    });



    ui.botones.seleccionarMascota.addEventListener('click', seleccionarMascotaJugador)
    ui.botones.continuar.addEventListener('click', continuarBatallas)
    ui.botones.reiniciar.addEventListener('click', reiniciarJuego)
    ui.botones.volverAJugar.addEventListener('click', reiniciarJuego)


}

function mostrarAtaquesInicio(mascota) {
    let stringAtaques = ""
    for (let i = 0; i < mascota.ataques.length; i++) {
        stringAtaques = stringAtaques + " " + mascota.ataques[i].nombre
    }
    ui.texto.ataquesMascotaInicio.innerHTML = "Ataques de " + mascota.nombre + ": " + stringAtaques
}

function seleccionarMascotaJugador() {
    for (let i = 0; i < mokepones.personajes.length; i++) {
        if (mokepones.personajes[i].radio.checked) {
            ui.texto.nombreMascotaJugador.innerHTML = "Tu " + mokepones.personajes[i].nombre
            jugador.mascota = mokepones.personajes[i].nombre
            jugador.foto = mokepones.personajes[i].foto
            ui.imagenes.jugador.src = jugador.foto
        }
    }

    if (jugador.mascota === undefined) {
        alert("Selecciona una mascota")
        ui.secciones.seleccionMascota.style.display = 'flex'
        ui.secciones.seleccionarAtaque.style.display = 'none'
    }
    else {
        extraerAtaquesyVida(jugador.mascota)
        ui.secciones.seleccionMascota.style.display = 'none'
        ui.secciones.multijugador.style.display = 'flex'
        ui.secciones.multijugador.style.display = 'flex'

        ui.botones.modoBots.addEventListener('click', batallaConBots)
        ui.botones.modoMultijugador.addEventListener('click', batallaMultijugador)
    }
}

function batallaConBots() {
    juego.multijugador = false
    if (ui.texto.cantidadEnemigosMapa.value < 1 || ui.texto.cantidadEnemigosMapa.value > 5) {
        alert("El número de enemigos debe ser de 1 a 5")
    }
    else {
        iniciarMapa()
    }
}

function batallaMultijugador() {
    unirseAlJuego()

    juego.multijugador = true
    juego.estado.primerCombate = true
    enemigo.objeto = []

    setTimeout(function () {
        seleccionarMokepon(jugador.mascota)
        iniciarMapa()
    }, 500);

}

function extraerAtaquesyVida(mascota) {
    let ataques

    for (let i = 0; i < mokepones.personajes.length; i++) {
        if (mascota === mokepones.personajes[i].nombre) {
            ataques = mokepones.personajes[i].ataques
            jugador.vida = mokepones.personajes[i].vida
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataques => {
        mokepones.ataques = `<button id="${ataques.id}" class="boton-de-ataque btnAtaque">${ataques.nombre}</button>`
        ui.secciones.ataquesJugador.innerHTML += mokepones.ataques
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
    clearInterval(juego.estado.intervalo)
    let recibirAtaque = false
    ui.secciones.continuarBatalla.style.display = 'none'
    const pEligeAtaques = document.getElementById('elegir-ataques')

    if (juego.multijugador) {
        pEligeAtaques.innerHTML = "Selecciona el orden de todos tus ataques:"
    }
    else {
        pEligeAtaques.innerHTML = "Elige tu ataque:"
    }

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥' && boton.disabled === false) {
                jugador.ataques.push('🔥')
                mokepones.ataqueJugador = '🔥'
                boton.style.cssText = 'background-color: rgb(88 17 17); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '💧' && boton.disabled === false) {
                jugador.ataques.push('💧')
                mokepones.ataqueJugador = '💧'
                boton.style.cssText = 'background-color: #112f58; font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🌱' && boton.disabled === false) {
                jugador.ataques.push('🌱')
                mokepones.ataqueJugador = '🌱'
                boton.style.cssText = 'background-color: rgb(2 71 24); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '⚡' && boton.disabled === false) {
                jugador.ataques.push('⚡')
                mokepones.ataqueJugador = '⚡'
                boton.style.cssText = 'background-color: rgb(126 135 0); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🪨' && boton.disabled === false) {
                jugador.ataques.push('🪨')
                mokepones.ataqueJugador = '🪨'
                boton.style.cssText = 'background-color: rgb(45 45 47); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }
            else if (e.target.textContent === '🍃' && boton.disabled === false) {
                jugador.ataques.push('🍃')
                mokepones.ataqueJugador = '🍃'
                boton.style.cssText = 'background-color: rgb(8 147 135); font-size: 1px';
                boton.disabled = true
                recibirAtaque = true
            }


            if (juego.multijugador === false) {
                if (recibirAtaque === true) {
                    ataqueAleatorioEnemigo(mokepones.ordenAtaquesEnemigo)
                }
            }
            else {
                if (jugador.ataques.length === 5) {
                    enviarAtaques()
                }
            }


        })
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

function seleccionarMascotaEnemigo(enemy) {
    let ataquesString = ''

    enemy.ataques.forEach(ataque => {
        ataquesString += ataque.nombre + ' '
    });

    ui.texto.ataquesMascotaEnemigo.innerHTML = ataquesString;

    enemigo.vida = enemy.vida
    ui.texto.nombreMascotaEnemigo.innerHTML = enemy.nombre + " enemigo"
    ui.imagenes.enemigo.src = enemy.alterEgo

    if (juego.multijugador === false) {
        enemigo.ataques = enemy.ataques
        barajar(enemigo.ataques)

        for (let i = 0; i < ui.texto.cantidadEnemigosMapa.value; i++) {
            if (enemigo.objeto[i] === enemy) {
                enemigo.objeto[i] = null
            }
        }
    }

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(orden) {
    mokepones.ataqueEnemigo = enemigo.ataques[orden].nombre
    mokepones.ordenAtaquesEnemigo = mokepones.ordenAtaquesEnemigo + 1

    combateLocal()
}

function combateLocal() {
    let resultado = ""
    //Empates: planta = roca; agua = aire; fuego = electrico

    if (mokepones.ataqueJugador == mokepones.ataqueEnemigo
        || (mokepones.ataqueJugador == '🌱' && mokepones.ataqueEnemigo == '🪨') || (mokepones.ataqueEnemigo == '🌱' && mokepones.ataqueJugador == '🪨')
        || (mokepones.ataqueJugador == '💧' && mokepones.ataqueEnemigo == '🍃') || (mokepones.ataqueEnemigo == '💧' && mokepones.ataqueJugador == '🍃')
        || (mokepones.ataqueJugador == '🔥' && mokepones.ataqueEnemigo == '⚡') || (mokepones.ataqueEnemigo == '🔥' && mokepones.ataqueJugador == '⚡')) { resultado = "Empate 😒" }

    else if (mokepones.ataqueJugador == '🔥' && (mokepones.ataqueEnemigo == '🌱' || mokepones.ataqueEnemigo == '🍃')
        || mokepones.ataqueJugador == '💧' && (mokepones.ataqueEnemigo == '🔥' || mokepones.ataqueEnemigo == '🪨')
        || mokepones.ataqueJugador == '🌱' && (mokepones.ataqueEnemigo == '💧' || mokepones.ataqueEnemigo == '⚡')
        || mokepones.ataqueJugador == '⚡' && (mokepones.ataqueEnemigo == '💧' || mokepones.ataqueEnemigo == '🍃')
        || mokepones.ataqueJugador == '🪨' && (mokepones.ataqueEnemigo == '🔥' || mokepones.ataqueEnemigo == '⚡')
        || mokepones.ataqueJugador == '🍃' && (mokepones.ataqueEnemigo == '🌱' || mokepones.ataqueEnemigo == '🪨')) {
        resultado = "¡¡Ganaste!! 🥳"
        enemigo.vida--
        ui.texto.vidaEnemigo.innerHTML = enemigo.vida
    }
    else {
        resultado = "Perdiste 😢"
        jugador.vida--
        ui.texto.vidaJugador.innerHTML = jugador.vida
    }
    crearMensajes(resultado)
    revisarGanador()
}

function combateMultijugador() {
    clearInterval(juego.estado.intervalo)

    let resultado = ""

    for (let i = 0; i < jugador.ataques.length; i++) {
        if (jugador.ataques[i] == enemigo.ataques[i]
            || (jugador.ataques[i] == '🌱' && enemigo.ataques[i] == '🪨') || (enemigo.ataques[i] == '🌱' && jugador.ataques[i] == '🪨')
            || (jugador.ataques[i] == '💧' && enemigo.ataques[i] == '🍃') || (enemigo.ataques[i] == '💧' && jugador.ataques[i] == '🍃')
            || (jugador.ataques[i] == '🔥' && enemigo.ataques[i] == '⚡') || (enemigo.ataques[i] == '🔥' && jugador.ataques[i] == '⚡')) { resultado = "Empate 😒" }

        else if (jugador.ataques[i] == '🔥' && (enemigo.ataques[i] == '🌱' || enemigo.ataques[i] == '🍃')
            || jugador.ataques[i] == '💧' && (enemigo.ataques[i] == '🔥' || enemigo.ataques[i] == '🪨')
            || jugador.ataques[i] == '🌱' && (enemigo.ataques[i] == '💧' || enemigo.ataques[i] == '⚡')
            || jugador.ataques[i] == '⚡' && (enemigo.ataques[i] == '💧' || enemigo.ataques[i] == '🍃')
            || jugador.ataques[i] == '🪨' && (enemigo.ataques[i] == '🔥' || enemigo.ataques[i] == '⚡')
            || jugador.ataques[i] == '🍃' && (enemigo.ataques[i] == '🌱' || enemigo.ataques[i] == '🪨')) {
            resultado = "¡¡Ganaste!! 🥳"
            enemigo.vida--
            ui.texto.vidaEnemigo.innerHTML = enemigo.vida
        }

        else {
            resultado = "Perdiste 😢"
            jugador.vida--
            ui.texto.vidaJugador.innerHTML = jugador.vida
        }
    }
    juego.estado.primerCombate = false
    crearMensajes(resultado)
    revisarGanador()
}

function revisarGanador() {
    if (jugador.vida == 0 || (jugador.ataques.length == enemigo.ataques.length && jugador.vida < enemigo.vida)) {
        crearMensajeFinal('PERDISTE 😢')
        juego.resultado.derrotas += 1
        ui.texto.derrotas.innerHTML = juego.resultado.derrotas
    }
    else if (enemigo.vida == 0 || (jugador.ataques.length === enemigo.ataques.length && jugador.vida > enemigo.vida)) {
        crearMensajeFinal('GANASTE!! 🥳')
        juego.resultado.victorias += 1
        ui.texto.victorias.innerHTML = juego.resultado.victorias
    }
    else if (jugador.ataques.length === enemigo.ataques.length) {
        crearMensajeFinal('EMPATE!! 😐')
    }

    if (juego.multijugador) {
        if (jugador.vida < 0) {
            jugador.vida = 0
        }
    }
}

function crearMensajes(resultado) {
    ui.texto.resultado.innerHTML = resultado

    if (juego.multijugador === false) {
        ui.texto.ataquesJugador.appendChild(crearParrafo(mokepones.ataqueJugador))
        ui.texto.ataquesEnemigo.appendChild(crearParrafo(mokepones.ataqueEnemigo))
    }

    else {
        jugador.ataques.forEach(ataque => {
            ui.texto.ataquesJugador.appendChild(crearParrafo(ataque))
        });

        enemigo.ataques.forEach(ataque => {
            ui.texto.ataquesEnemigo.appendChild(crearParrafo(ataque))
        });
    }

}

function crearParrafo(ataque) {
    let nuevoAtaque = document.createElement('p')
    nuevoAtaque.innerHTML = ataque
    return nuevoAtaque
}

function crearMensajeFinal(resultadoFinal) {
    ui.texto.resultado.innerHTML = "FIN DE COMBATE. " + resultadoFinal

    botones.forEach((boton) => {
        boton.disabled = true
        boton.style.background = '#161616d9'
    })

    ui.secciones.continuarBatalla.style.display = 'flex'
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
    ui.secciones.multijugador.style.display = 'none'
    ui.secciones.verMapa.style.display = 'flex'
    juego.estado.intervalo = setInterval(pintarCanvas, 50)
    jugador.objeto = obtenerObjetoMascota(jugador.mascota)


    if (juego.multijugador === false) {
        let numAleatorio = 0
        //Elegir enemigos aleatorios y dibujarlos
        for (let i = 0; i < ui.texto.cantidadEnemigosMapa.value; i++) {
            numAleatorio = aleatorio(0, mokepones.personajes.length - 1)
            enemigo.objeto[i] = Object.assign({}, mokepones.personajes[numAleatorio])
            enemigo.objeto[i].x = aleatorio(50, juego.mapa.ancho - 40)
            enemigo.objeto[i].y = aleatorio(50, alturaDelMapa - 40)
        }
        //Separar enemigos juntos
        for (let i = 0; i < ui.texto.cantidadEnemigosMapa.value; i++) {
            for (let j = 0; j < ui.texto.cantidadEnemigosMapa.value; j++) {
                if (i !== j) {
                    if (Math.abs(enemigo.objeto[i].x - enemigo.objeto[j].x) < 40 &&
                        Math.abs(enemigo.objeto[i].y - enemigo.objeto[j].y) < 40) {
                        enemigo.objeto[i].x = aleatorio(50, juego.mapa.ancho - 40)
                        enemigo.objeto[i].y = aleatorio(50, alturaDelMapa - 40)
                    }
                }
            }
        }
    }

    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas() {

    juego.mapa.lienzo.clearRect(0, 0, juego.mapa.canvas.width, juego.mapa.canvas.height)
    juego.mapa.lienzo.drawImage(juego.mapa.fondo, 0, 0, juego.mapa.canvas.width, juego.mapa.canvas.height)

    if (jugador.objeto.y < 0) {
        jugador.objeto.y = 0
    }
    else if (jugador.objeto.y > alturaDelMapa - 40) {
        jugador.objeto.y = alturaDelMapa - 40
    }
    else {
        jugador.objeto.y = jugador.objeto.y + jugador.objeto.velocidadY
    }

    if (jugador.objeto.x < 0) {
        jugador.objeto.x = 0
    }
    else if (jugador.objeto.x > juego.mapa.ancho - 40) {
        jugador.objeto.x = juego.mapa.ancho - 40
    }
    else {
        jugador.objeto.x = jugador.objeto.x + jugador.objeto.velocidadX
    }

    pintarMokepon(jugador.objeto)

    //...............................................................................
    if (juego.multijugador === false) {
        pintarMokeponesEnemigos()

        if (jugador.objeto.velocidadX !== 0 || jugador.objeto.velocidadY !== 0) {
            for (let i = 0; i < ui.texto.cantidadEnemigosMapa.value; i++) {
                if (enemigo.objeto[i] !== null) {
                    revisarColision(enemigo.objeto[i])
                }
            }
        }
    }

    else {
        enviarPosicion(jugador.objeto.x, jugador.objeto.y)
        if (mokepones.enemigosEnMapa !== null && mokepones.enemigosEnMapa !== undefined) {
            mokepones.enemigosEnMapa.forEach(function (mokepon) {
                pintarMokepon(mokepon)

                setTimeout(() => {
                    revisarColision(mokepon)
                }, 500);

            })
        }

    }

}


function pintarMokepon(mokepon) {
    if (mokepon !== undefined) {
        juego.mapa.lienzo.drawImage(mokepon.nube, mokepon.x - 10, mokepon.y + 20, mokepon.ancho + 20, mokepon.alto - 10)
        juego.mapa.lienzo.drawImage(mokepon.mapaFoto, mokepon.x, mokepon.y, mokepon.ancho, mokepon.alto)
    }

}

function pintarMokeponesEnemigos() {
    for (let i = 0; i < enemigo.objeto.length; i++) {
        if (enemigo.objeto[i] !== null) {
            juego.mapa.lienzo.drawImage(
                enemigo.objeto[i].alterEgoAvatar,
                enemigo.objeto[i].x,
                enemigo.objeto[i].y,
                enemigo.objeto[i].ancho,
                enemigo.objeto[i].alto)
        }
    }
}

function moverMascotaArriba() {
    ui.botones.flechas[0].style.backgroundColor = '#92C7F9';
    jugador.objeto.velocidadY = - 5

}

function moverMascotaIzquierda() {
    ui.botones.flechas[1].style.backgroundColor = '#92C7F9';
    jugador.objeto.velocidadX = - 5
}

function moverMascotaDerecha() {
    ui.botones.flechas[2].style.backgroundColor = '#92C7F9';
    jugador.objeto.velocidadX = 5
}

function moverMascotaAbajo() {
    ui.botones.flechas[3].style.backgroundColor = '#92C7F9';
    jugador.objeto.velocidadY = 5
}

function detenerMovimiento() {
    for (let i = 0; i < ui.botones.flechas.length; i++) {
        ui.botones.flechas[i].style.backgroundColor = "white";
    }
    jugador.objeto.velocidadX = 0
    jugador.objeto.velocidadY = 0
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
    for (let i = 0; i < mokepones.personajes.length; i++) {
        if (mokepon === mokepones.personajes[i].nombre) {
            if (juego.multijugador === true) {
                mokepones.personajes[i].x = aleatorio(10, juego.mapa.ancho - 40)
                mokepones.personajes[i].y = aleatorio(10, juego.mapa.ancho - 40)
            }

            return mokepones.personajes[i]
        }
    }
}

function obtenerLimites(sprite, margen = 0) {
    return {
        arriba: sprite.y - margen,
        abajo: sprite.y + sprite.alto - margen,
        izquierda: sprite.x - margen,
        derecha: sprite.x + sprite.ancho + margen
    };
}

function hayColision(rect1, rect2) {
    return !(
        rect1.abajo < rect2.arriba ||
        rect1.arriba > rect2.abajo ||
        rect1.derecha < rect2.izquierda ||
        rect1.izquierda > rect2.derecha
    );
}

function revisarColision(enemy) {
    if (juego.multijugador && (!enemy || isNaN(enemy.x))) return;

    const limitesEnemigo = obtenerLimites(enemy, 5);
    const limitesMascota = obtenerLimites(jugador.objeto);

    console.log("Limites enemigo:", limitesEnemigo);
    console.log("Limites mascota:", limitesMascota);

    if (!hayColision(limitesMascota, limitesEnemigo)) return;

    detenerMovimiento();

    if (juego.multijugador) {
        enemigo.id = enemy.id;
    }

    ui.texto.vidaJugador.innerHTML = jugador.vida;
    ui.texto.vidaEnemigo.innerHTML = enemy.vida;

    ui.secciones.seleccionarAtaque.style.display = 'flex';
    ui.secciones.verMapa.style.display = 'none';

    seleccionarMascotaEnemigo(enemy);
}

function continuarBatallas() {

    if (juego.multijugador === false) {
        mokepones.yaJugados += 1
        mokepones.ordenAtaquesEnemigo = 0

        if (mokepones.yaJugados.toString() === ui.texto.cantidadEnemigosMapa.value) {
            resultadoFinal()
            return
        }
    }

    else {

        enemigo.id = null
        limpiarAtaques()
        resultadoFinal()
        eliminarId()
        return
    }

    ui.texto.ataquesJugador.innerHTML = ""
    ui.texto.ataquesEnemigo.innerHTML = ""

    jugador.ataques = []
    enemigo.ataques = []

    jugador.vida = VIDASINIT

    botones.forEach(boton => {
        boton.disabled = false
    });

    reiniciarBotonesAtaque()

    ui.secciones.seleccionarAtaque.style.display = 'none'
    ui.texto.resultado.innerHTML = 'Mucha suerte!'
    ui.secciones.verMapa.style.display = 'flex'

    juego.estado.intervalo = setInterval(pintarCanvas, 50)
}

function resultadoFinal() {
    ui.secciones.verMapa.style.display = 'none'
    ui.secciones.seleccionarAtaque.style.display = 'none'
    ui.secciones.reiniciar.style.display = 'flex'

    ui.imagenes.final.src = jugador.foto

    ui.texto.victoriasFinal.innerHTML = juego.resultado.victorias
    ui.texto.derrotasFinal.innerHTML = juego.resultado.derrotas

    if (juego.resultado.victorias > juego.resultado.derrotas) {
        ui.texto.resultadoFinal.innerHTML = "¡¡Ganaste!! 🥳"
    }
    else {
        ui.texto.resultadoFinal.innerHTML = "Suerte para la próxima 😔"
    }

    mokepones.personajes.forEach(mokepon => {
        mokepon.x = 10
        mokepon.y = 10
    });


    clearInterval(juego.estado.intervalo)
    eliminarId()
}

function reiniciarJuego() {
    location.reload()
    eliminarId()
}


function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {

            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugador.id = respuesta
                    })
            }

        })
}

function seleccionarMokepon(mascota) {
    fetch(`http://localhost:8080/mokepon/${jugador.id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascota
        })
    })

}

function limpiarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugador.id}/ataques`, {
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
    fetch(`http://localhost:8080/mokepon/${jugador.id}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: jugador.ataques
        })
    })

    juego.estado.intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigo.id}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            enemigo.ataques = ataques
                            if (juego.estado.primerCombate) {
                                combateMultijugador()
                            }

                        }

                    })
            }
        })

}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugador.id}/posicion`, {
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
                        mokepones.enemigosEnMapa = enemigos.map(function (enemy) {
                            let mokeponEnemigo

                            if (enemy.mokepon !== undefined) {
                                const mokeponNombre = enemy.mokepon.nombre

                                for (let i = 0; i < mokepones.personajes.length; i++) {
                                    if (mokeponNombre === mokepones.personajes[i].nombre) {
                                        mokeponEnemigo = Object.assign({}, mokepones.personajes[i])
                                        mokeponEnemigo.id = enemy.id
                                    }
                                }
                                mokeponEnemigo.x = enemy.x
                                mokeponEnemigo.y = enemy.y

                                return mokeponEnemigo
                            }

                        })

                    })
            }
        })
}

function notificarColision(enemyId) {
    const enemigoId = enemigo.id;
    fetch(`http://localhost:8080/colision/${jugador.id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ enemigoId: enemyId })
    });
}

function eliminarId() {
    fetch(`http://localhost:8080/salir/${jugador.id}`)
        .then(function (res) {

            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        //console.log(respuesta)
                    })
            }
        })
}

window.addEventListener('load', iniciarJuego)