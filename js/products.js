let idCategoria = localStorage.getItem('catID');
const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${idCategoria}.json`;

let linkUsuario = localStorage.getItem('User');
document.getElementById('user').innerHTML = linkUsuario;

let searchBar = document.getElementById('searchBar');
let minimo = document.getElementById('rangeFilterCountMin');
let maximo = document.getElementById('rangeFilterCountMax');
let btnFiltrar = document.getElementById('rangeFilterCount');
let btnLimpiar = document.getElementById('clearRangeFilter');
let btnAsc = document.getElementById('sortAsc');
let btnDesc = document.getElementById('sortDesc');
let btnRel = document.getElementById('sortByCount');

// Filtro barra de búsqueda
function searchFilter() {
    let result = categoriesArray.products;
    if (searchBar.value != "") {
        let filteredResult = result.filter(product => product.name.toLowerCase().includes(searchBar.value.toLowerCase()) || product.description.toLowerCase().includes(searchBar.value.toLowerCase()))
        showCategoriesList(filteredResult);
    }
}
searchBar.addEventListener('input', searchFilter);

// Filtro precios
function priceFilter() {
    let result = categoriesArray.products;
    if (minimo.value != "") {
        showCategoriesList(result.filter(product => product.cost > minimo.value));
    } else if (maximo.value != "") {
        showCategoriesList(result.filter(product => product.cost < maximo.value));
    }
}
btnFiltrar.addEventListener('click',priceFilter);

// Deshacer filtro de precios
function cleanPriceFilter() {
    document.getElementById('rangeFilterCountMin').value = "";
    document.getElementById('rangeFilterCountMax').value = "";
    showCategoriesList(categoriesArray.products);
}
btnLimpiar.addEventListener('click',cleanPriceFilter);

// Filtro precios por orden ascendente, descendente y relevancia
function sortByPriceD(a,b) {
    return a.cost - b.cost;
}

function sortByPriceA(a,b) {
    return b.cost - a.cost;
}

function sortByRel(a,b) {
    return b.soldCount - a.soldCount;
}

function priceAsc() {
    showCategoriesList(categoriesArray.products.sort(sortByPriceD));
}

function priceDesc() {
    showCategoriesList(categoriesArray.products.sort(sortByPriceA));
}

function productRel() {
    showCategoriesList(categoriesArray.products.sort(sortByRel));
}

btnAsc.addEventListener('click', priceDesc);
btnDesc.addEventListener('click', priceAsc);
btnRel.addEventListener('click', productRel);

//función para guardar id de un producto en local storage al cliquearlo y redirigir a la página de info del mismo
function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}


let categoriesArray = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
        <div onclick="setProductID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + " " + "-" + " " + category.currency + " " + category.cost +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products);
            document.getElementById('categoria').innerHTML = categoriesArray.catName;
        }
    });
});