
/*
 Langostelvis -> Agua y Fuego
 Tucapalma -> Agua y Tierra
 Pydos -> Tierra y Fuego

*/ 
let ataqueJugador = 0
let ataqueEnemigo = 0

let vidasJugador = 3
let vidasEnemigo = 3

let mascotaJugador_msj = ''
let ataqueJugador_msj = ''
let mascotaEnemigo_msj = ''
let ataqueEnemigo_msj = ''

function iniciarJuego(){

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none' //oculta la sección del HTML

    let btnMascotaPlayer = document.getElementById('btn_mascotas')
    btnMascotaPlayer.addEventListener('click', seleccionarMascotaPlayer)

    let btnFuego = document.getElementById('btn_fuego')
    let btnAgua = document.getElementById('btn_agua')
    let btnTierra = document.getElementById('btn_tierra')

    btnFuego.addEventListener('click', ataqueFuego)
    btnAgua.addEventListener('click', ataqueAgua)
    btnTierra.addEventListener('click', ataqueTierra)

    let btnReiniciar = document.getElementById('btn_reiniciar')
    btnReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaPlayer(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex' //muestra la sección del HTML

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none' //oculta la sección del HTML

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    let spanMascotaJugador = document.getElementById('mascota_jugador')
    let imagenMokeponJugador= document.getElementById('img-mascota-jugador')

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= "Hipodoge" 
        mascotaJugador_msj = "Hipodoge"
        imagenMokeponJugador.src = "./assets/mokepons_mokepon_hipodoge_attack.png"
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML= "Capipepo"
        mascotaJugador_msj = "Capipepo"
        imagenMokeponJugador.src = "./assets/mokepons_mokepon_capipepo_attack.png"
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML= "Ratigüeya"
        mascotaJugador_msj = "Ratigüeya"
        imagenMokeponJugador.src = "./assets/mokepons_mokepon_ratigueya_attack.png"
    }
    else {alert("Selecciona una mascota")
    sectionSeleccionarAtaque.style.display = 'none' //muestra la sección del HTML
    sectionSeleccionarMascota.style.display = 'block' //oculta la sección del HTML
    }
    
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let enemigoAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota_enemigo')
    let imagenMokeponEnemigo= document.getElementById('img-mascota-enemigo')

    if (enemigoAleatorio==1){
        spanMascotaEnemigo.innerHTML = "Hipodoge"
        mascotaEnemigo_msj = "Hipodoge"
        imagenMokeponEnemigo.src = "./assets/mokepons_mokepon_hipodoge_attack.png"
    }
    else if (enemigoAleatorio==2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
        mascotaEnemigo_msj = "Capipepo"
        imagenMokeponEnemigo.src = "./assets/mokepons_mokepon_capipepo_attack.png"
    }
    else {
        spanMascotaEnemigo.innerHTML = "Ratigüeya"
        mascotaEnemigo_msj = "Ratigüeya"
        imagenMokeponEnemigo.src = "./assets/mokepons_mokepon_ratigueya_attack.png"
    }

}

function ataqueFuego(){
    ataqueJugador = 1
    ataqueJugador_msj = '🔥'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 2
    ataqueJugador_msj = '💧'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 3
    ataqueJugador_msj = '🌱'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
     ataqueEnemigo = aleatorio(1,3)

    if (ataqueEnemigo == 1){
        ataqueEnemigo_msj = '🔥'
    }
    else if (ataqueEnemigo == 2){
        ataqueEnemigo_msj = '💧'
    }
    else {
        ataqueEnemigo_msj = '🌱'
    }

    combate()
}

function crearMensajes(resultado){
    let sectionMensajes = document.getElementById("resultado")
    let ataquesJugador = document.getElementById("ataques_jugador")
    let ataquesEnemigo = document.getElementById("ataques_enemigo")

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador_msj
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo_msj

    ataquesJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal){

    let sectionMensajes = document.getElementById("resultado")

    sectionMensajes.innerHTML = 'FIN DE LA PARTIDA. '+resultadoFinal

    let btnFuego = document.getElementById('btn_fuego')
    btnFuego.disabled = true
    let btnAgua = document.getElementById('btn_agua')
    btnAgua.disabled = true
    let btnTierra = document.getElementById('btn_tierra')
    btnTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'

}


function combate(){

    let resultado = ""
    let vidasJugador_html = document.getElementById("vida_jugador")
    let vidasEnemigo_html = document.getElementById("vida_enemigo")

    //COMBATE
    /*Fuego le gana a Tierra    ||      Fuego = 1
      Agua le gana a Fuego      ||      Agua = 2
      Tierra le gana a Agua     ||      Tierra = 3*/
      

      
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
    // Si continuar = 1, sigue el juego. Si continuar = 0, se acaba el juego. 

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