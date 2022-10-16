// Url con el id de usuario 25801 de ejemplo
const testUserUrl = CART_INFO_URL + "25801" + EXT_TYPE;
let divCartList = document.getElementById('cart-list');


//función para mostrar producto en la lista del carrito
document.addEventListener('DOMContentLoaded', function() {
    let cartList = JSON.parse(localStorage.getItem('cartItems'));
    let preLoadedArticle = {};
    fetch(testUserUrl)
    .then(response => response.json())
    .then(data => {
        let userCart = data.articles[0];
        preLoadedArticle.image = data.articles[0].image;
        preLoadedArticle.name = data.articles[0].name;
        preLoadedArticle.currency = data.articles[0].currency;
        preLoadedArticle.cost = data.articles[0].unitCost;

        if(localStorage.getItem('cartItems')) {
                cartList.unshift(preLoadedArticle);
                let contentToAppend = "";
                for (let i=0; i<cartList.length; i++) {
                    let image = cartList[i].image;
                    let name = cartList[i].name;
                    let currency = cartList[i].currency;
                    let cost = cartList[i].cost;
                    contentToAppend += `
                    <tr>
                        <td width="100px"><img src="${image}" alt="" width="100%"></td>
                        <td class="px-3">${name}</td>
                        <td>${currency} ${cost}</td>
                        <td><input class="form-control cantidad" type="number" value="1" style="width: 60px;"></td>
                        <td class="fw-bold subTotal">${currency} ${cost}</td>
                    </tr>
                    `;
                }
                document.getElementById('tb').innerHTML = contentToAppend;
        } else {
            document.getElementById('tb').innerHTML = `
            <tr>
                <td width="100px"><img src="${preLoadedArticle.image}" alt="" width="100%"></td>
                <td class="px-3">${preLoadedArticle.name}</td>
                <td>${preLoadedArticle.currency} ${preLoadedArticle.cost}</td>
                <td><input class="form-control" id="cantidad" type="number" value="1" style="width: 60px;"></td>
                <td class="fw-bold" id="subTotal">${preLoadedArticle.currency} ${preLoadedArticle.cost}</td>
            </tr>
            `;
        }
        
        

            document.getElementById('cantidad').addEventListener('input', function() {
                document.getElementById('subTotal').innerHTML = sumSubTotal(userCart);
            })
             
        
    });


});



// función para calcular el subtotal
function sumSubTotal(arr) {
    let inputCantidad = document.getElementById('cantidad').value;
    let cost = arr.unitCost;
    let currency = arr.currency;
    if (inputCantidad == "") {
        return "";
    } else {
        return `${currency} ${inputCantidad * cost}`;
    }
}
