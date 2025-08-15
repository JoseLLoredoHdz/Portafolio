let imagenes = [
    {
        "url": "Imagenes/foto1.jpg",
        "nombre": "Gelatina 1",
        "descripcion": "Hecha con todo el amor para el comensal"

    },
    {
        "url": "Imagenes/foto2.jpg",
        "nombre": "Gelatina 2",
        "descripcion": "Hecha con todo el amor para el comensal"

    },
    {
        "url": "Imagenes/foto3.jpg",
        "nombre": "Gelatina 3",
        "descripcion": "Hecha con todo el amor para el comensal"

    },
]


let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');

let actual = 0;
posicionCarrusel()



atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1){
        actual = imagenes.length - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  
adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenes.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (let i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += `<p class="bold" id="punto${i}">.<p>`
        }
        else{
            puntos.innerHTML += `<p id="punto${i}">.<p>`
        }
    } 

        
    let punto1 = document.getElementById('punto0');
    let punto2 = document.getElementById('punto1');
    let punto3 = document.getElementById('punto2');

        
    punto1.addEventListener('click',()=>{
       
        actual = 0;
        imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
        texto.innerHTML = `
        <h3>${imagenes[actual].nombre}</h3>
        <p>${imagenes[actual].descripcion}</p>
        `
        posicionCarrusel()
    })

    punto2.addEventListener('click',()=>{
        
        actual = 1;
        imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
        texto.innerHTML = `
        <h3>${imagenes[actual].nombre}</h3>
        <p>${imagenes[actual].descripcion}</p>
        `
        posicionCarrusel()
    })

    punto3.addEventListener('click',()=>{
        
        actual = 2;
        imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
        texto.innerHTML = `
        <h3>${imagenes[actual].nombre}</h3>
        <p>${imagenes[actual].descripcion}</p>
        `
        posicionCarrusel()
    })


}


