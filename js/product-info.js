let linkUsuario = localStorage.getItem('User');
document.getElementById('user').innerHTML = linkUsuario;
let divProductInfo = document.getElementById('product-info');
let divRelatedProducts = document.getElementById('related-products');
let divProductComment = document.getElementById('product-comment');
let divNewComment = document.getElementById('newComment');
let btnComment = document.getElementById('btnComment');

// re utilizo función para guardar un id de producto
function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}


let idProducto = localStorage.getItem('productID');
const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`;
const COMMENT_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;



//función para iterar por las imagenes y mostrarlas
// function showImages(arrImg) {
//     let imagesToAppend = "";
//     for (let i=0; i<arrImg.length; i++) {
//         imagesToAppend += `
//         <div class="carousel-item mt-2">
//             <img class="d-block w-50 border p-1" src="${arrImg[i]}">
//         </div>
//         `;
//     }
//     document.getElementById('images').innerHTML = imagesToAppend;
// }


// función para agregar clase active al primer div del carrusel
function setActiveClass() {
    let arrOfItems = document.getElementsByClassName('carousel-item');
    let array = [];
    for (let i=0; i<arrOfItems.length; i++) {
        array.push(arrOfItems[i])
    }
    console.log(array)
}

// función para iterar por el array de productos relacionados y mostrarlos
function showRelated(arr) {
    let content = "";
    for (let i=0; i<arr.length; i++) {
        let name = arr[i].name;
        let image = arr[i].image;
        let id = arr[i].id;
        content += `
            <div onclick="setProductID(${id})" class="border p-1 cursor-active">
                <img src="${image}">
                <p class="fs-5 text-center text-muted mt-3">${name}</p>
            </div>
        `;
    }
    document.getElementById('related-images').innerHTML = content;
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

let relatedProductsArr = [];
// trae y muestra info del producto una vez que la página haya cargado
document.addEventListener('DOMContentLoaded', function() {
    let images = [];
    fetch(PRODUCT_URL)
    .then(response => response.json())
    .then(data => {
        images = data.images;
        console.log(images.length)
        relatedProductsArr = data.relatedProducts;

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

        <div id="carouselControls" class="carousel slide w-50" data-bs-ride="carousel">
            <div class="carousel-inner" id="images">
                <div class="carousel-item mt-2 active">
                    <img class="d-block w-100 border" src="${images[0]}">
                </div>
                <div class="carousel-item mt-2">
                    <img class="d-block w-100 border" src="${images[1]}">
                </div>
                <div class="carousel-item mt-2">
                    <img class="d-block w-100 border" src="${images[2]}">
                </div>
                <div class="carousel-item mt-2">
                    <img class="d-block w-100 border" src="${images[3]}">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        `;

        divRelatedProducts.innerHTML = `
        <br>
        <hr class="mt-5">
        <br>
        <h4 class="mt-4 mb-5">Productos Relacionados</h4>
        <div class="d-flex" id="related-images">
        </div>
        `;
        // setActiveClass();
        // showImages(images);
        showRelated(relatedProductsArr);
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
