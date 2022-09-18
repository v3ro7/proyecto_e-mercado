let linkUsuario = localStorage.getItem('User');
document.getElementById('user').innerHTML = linkUsuario;
let divProductInfo = document.getElementById('product-info');
let divProductComment = document.getElementById('product-comment');
let divNewComment = document.getElementById('newComment');
let btnComment = document.getElementById('btnComment');

let idProducto = localStorage.getItem('productID');
const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`;
const COMMENT_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;

//función para iterar por las imagenes y mostrarlas
function showImages(arrImg) {
    let imagesToAppend = "";
    for (let i=0; i<arrImg.length; i++) {
        imagesToAppend += `
            <img class="border p-1" src="${arrImg[i]}">
        `;
    }
    document.getElementById('images').innerHTML = imagesToAppend;
}



//función para iterar por los comentarios y mostrarlos
function showComments(arrComments) {
    let commentsToAppend = "";
    for (let i=0; i<arrComments.length; i++) {
        let score = arrComments[i].score;
        let starsToAdd = "";
        for (let i=0; i<5; i++) {
            if (score > 0) {
                starsToAdd += `<span class="fa fa-star checked"></span>`;
                score --;
            } else {
                starsToAdd += `<span class="far fa-star"></span>`;
            }
        }

        commentsToAppend += `
        <div class="border rounded p-2 ps-3">
            <p><strong>${arrComments[i].user}</strong> - ${arrComments[i].dateTime} - ${starsToAdd}</p>
            <small>${arrComments[i].description}</small>
        </div>
        `;
    }
    divProductComment.innerHTML = commentsToAppend;
}

// trae y muestra info del producto una vez que la página haya cargado
document.addEventListener('DOMContentLoaded', function() {
    let images = [];
    fetch(PRODUCT_URL)
    .then(response => response.json())
    .then(data => {
        images = data.images;
        divProductInfo.innerHTML = `
        <h2 class="mt-4 mb-5">${data.name}</h2>
        <hr>
        <p><strong>Precio</strong></p>
        <p>${data.currency} ${data.cost}</p>
        <br>
        <p><strong>Descripción</strong></p>
        <p>${data.description}</p>
        <br>
        <p><strong>Categoría</strong></p>
        <p>${data.category}</p>
        <br>
        <p><strong>Cantidad de vendidos</strong></p>
        <p>${data.soldCount}</p>
        <br>
        <p><strong>Imágenes ilustrativas</strong></p>
        
        <div class="mt-2" id="images">
        </div>
        `;
        showImages(images);
    });

    // trae y muestra los comentarios de dicho producto
    let comments = [];
    fetch(COMMENT_URL)
    .then(response => response.json())
    .then(data => {
        comments = data;
        showComments(comments);
    })
})


// función para añadir un comentario
btnComment.addEventListener('click', function() {
    let myComment = document.getElementById('textComment');
    let myScore = document.getElementById('myScore');

    let date = new Date();
    let actual_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    let actual_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let actualDate = actual_date + " " + actual_time;
    
    let myStars = myScore.value;
    let myStarsToAdd = "";
    for (let i=0; i<myScore.length; i++) {
        if (myStars > 0) {
            myStarsToAdd += `<span class="fa fa-star checked"></span>`;
            myStars --;
        } else {
            myStarsToAdd += `<span class="far fa-star"></span>`;
        }
    }

    let commentToAdd = `
    <div class="border rounded p-2 ps-3">
        <p><strong>${linkUsuario}</strong> - ${actualDate} - ${myStarsToAdd}</p>
        <small>${myComment.value}</small>
    </div>
    `;

    divNewComment.innerHTML = commentToAdd;
    myComment.value = "";
    myScore.value = 1;
});