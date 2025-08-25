let imagenes = [
    {
        "url": "Imagenes/gelatina6.jpeg",
        "nombre": "Gelatina de Gansito",
        "descripcion": "Hecha con variedad de gansito y un toque de chocolate ideal para fiestas"

    },
    {
        "url": "Imagenes/gelatina2.jpeg",
        "nombre": "Gelatina de Fresas",
        "descripcion": "Hecha con quesocrema y saboritizantes sabor fresa ideal para regalar"

    },
    {
        "url": "Imagenes/gelatina3.jpeg",
        "nombre": "Gelatina de mazapan",
        "descripcion": "Hecha con todo el amor y cuidado que tiene que tener un mazapan ideal para consentirte"

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


