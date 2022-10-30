// Url con el id de usuario 25801 de ejemplo
const testUserUrl = CART_INFO_URL + "25801" + EXT_TYPE;
const cartContainer = document.getElementById('cart-list');
const cartTable = document.getElementById('tb');
const spanSubTotal = document.getElementById('subTotal');
const spanEnvio = document.getElementById('cEnvio');
const spanTotal = document.getElementById('total');
const divTipoDeEnvio = document.getElementById('tipoDeEnvio');
const pSeleccion = document.getElementById('seleccion');
const divModalBody = document.getElementById('opciones');
const botonFinalizar = document.getElementById('finalizarCompra');

let cartList = [];
let userCart = {};

const showCart = () => {
    if(localStorage.getItem('cartItems')) {
            // cartTable.innerHTML = '';
            cartList = JSON.parse(localStorage.getItem('cartItems'));
            let contentToAppend = "";
            for (let i=0; i<cartList.length; i++) {
                let id = cartList[i].id;
                let image = cartList[i].image;
                let name = cartList[i].name;
                let currency = cartList[i].currency;
                let cost = cartList[i].cost;
                contentToAppend += `
                <tr class="align-middle">
                    <td width="100px"><img src="${image}" alt="" width="100%"></td>
                    <td class="px-3">${name}</td>
                    <td>${currency} ${cost}</td>
                    <td><input class="form-control inpts" id="${id}" type="number" value="1" style="width: 60px;"></td>
                    <td class="fw-bold sub" id="subTotal${id}">${currency} ${cost}</td>
                    <td><button onclick="eliminar()" data-id="${id}" type="button" class="btn btn-outline-danger"><i class="fa fa-trash" aria-hidden="true"></i>
                    </button></td>
                </tr>
                `;
            }
            document.getElementById('tb').innerHTML = contentToAppend;
            // const totalSub = Object.values(cartList).reduce((acc, {cost} ) => acc + cost, 0)
            
    }
}

// Función para las opciones del modal
const modalOptions = () => {
    divModalBody.addEventListener('click', (e) => {
        let contenido = 'No ha seleccionado';
        if (e.target.id == document.getElementById('creditCard').id) {
            document.getElementById('creditCard').setAttribute('checked', '');
            document.getElementById('bankT').removeAttribute('checked');
            contenido = 'Tarjeta de crédito';
            
            document.getElementById('cardNumber').removeAttribute('disabled');
            document.getElementById('secCode').removeAttribute('disabled');
            document.getElementById('dateOfExp').removeAttribute('disabled');
            document.getElementById('account-name').setAttribute('disabled', '');
        } else if (e.target.id == document.getElementById('bankT').id) {
            document.getElementById('bankT').setAttribute('checked', '');
            document.getElementById('creditCard').removeAttribute('checked');
            contenido = 'Transferencia bancaria';
            
            document.getElementById('account-name').removeAttribute('disabled');
            document.getElementById('cardNumber').setAttribute('disabled', '');
            document.getElementById('secCode').setAttribute('disabled', '');
            document.getElementById('dateOfExp').setAttribute('disabled', '');
        }
        pSeleccion.innerHTML = contenido;
    })
    
}

// Función para validar campos al cliquear finalizar compra
const validar = () => {
    // la cant para cada articulo debe ser mayor a 0
    let isGreaterThanZero = true;
    let inputs = document.getElementsByClassName('inpts');
    for (let i=0; i<inputs.length; i++) {
        if (inputs[i].value <= 0) {
            isGreaterThanZero = false;
            break
        }
    }
    //console.log(isGreaterThanZero)

    // deberá estar seleccionada la forma de envio
    let isShippingSelected = false;
    let checkboxes = document.getElementsByClassName('form-check-input');
    for (let i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].hasAttribute('checked')) {
            isShippingSelected = true;
            break;
        }
    }
    //console.log(isShippingSelected);


    // campos calle, número y esquina, no podrán estar vacíos
    let isOneEmpty = false;
    let address = document.getElementsByClassName('address');
    for (let i=0; i<address.length; i++) {
        if (address[i].value == '') {
            isOneEmpty = true;
            break;
        }
    }
    //console.log(isOneEmpty)

    
    // deberá haberse seleccionado una forma de pago
    let isPaymentSelected = false;
    if (document.getElementById('creditCard').hasAttribute('checked') || document.getElementById('bankT').hasAttribute('checked')) {
        isPaymentSelected = true;
    }
    //console.log("Has seleccionado forma de pago: ", isPaymentSelected)

    // los campos, para la forma de pago seleccionada, no podrán estar vacios
    let isPaymentComplete = false;
    let cardNum = document.getElementById('cardNumber');
    let secCode = document.getElementById('secCode');
    let expireDate = document.getElementById('dateOfExp');

    let accName = document.getElementById('account-name');
    if (isPaymentSelected && cardNum.value != '' && secCode.value != '' && expireDate.value != '' || isPaymentSelected && accName.value != '') {
        isPaymentComplete = true;
    }
    //console.log("Has completado el modal de pago", isPaymentComplete)

    // si todos son true, mostrar alert de compra exitosa
    if(isGreaterThanZero && isShippingSelected && !isOneEmpty && isPaymentSelected && isPaymentComplete) {
        document.getElementById('alert').style.display = 'block';
    }

    
}
botonFinalizar.addEventListener('click', validar);


// Función para recuperar el alert eliminado
let backUpAlert = () => {
    document.getElementById('success').innerHTML = `
    <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert" style="display: none;">
        ¡Has comprado con éxito!
        <button id="close" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`;
} 
const recoverAlert = () => {
    document.getElementById('success').innerHTML = `
    <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert" style="display: none;">
        ¡Has comprado con éxito!
        <button id="close" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
}
document.getElementById('close').addEventListener('click', recoverAlert);
// // Función para borrar elemento del carrito
// const botones = Object.values(document.querySelectorAll('.btn-outline-danger'));
// console.log(botones)
// const eliminar = () => {
//     Object.values(botones).forEach((boton) => {
//     boton.addEventListener('click', (e) => {
//             cartList.forEach((item) => {
//                 if (e.target.dataset.id == item.id) {
//                     let indice = cartList.indexOf(item);
//                     cartList.splice(indice, 1);
//                 }
//             });
//             localStorage.setItem('cartItems', JSON.stringify(cartList));
//             showCart();
//         })
// })
// }




document.addEventListener('DOMContentLoaded', function() {

    fetch(testUserUrl)
    .then(response => response.json())
    .then(data => {
        let userCart = {
            id: data.articles[0].id,
            image: data.articles[0].image,
            name: data.articles[0].name,
            currency: data.articles[0].currency,
            cost: data.articles[0].unitCost
        }
        
        if (localStorage.getItem('cartItems') === null || localStorage.getItem('cartItems') == '[]') {
            cartList.push(userCart);
            localStorage.setItem('cartItems', JSON.stringify(cartList));
            
            showCart();
        } else {
            showCart();
        }

        sumCosts();
        modalOptions();
        validar();
        backUpAlert();
    });

    
    // Función para calcular el subtotal a través del input
    cartTable.addEventListener('change', function(e) {
        
        cartList.forEach((product) => {
            if (e.target.id == product.id) {
                let amount = e.target.value;
                let subId = "subTotal" + e.target.id;
                
                let filasT = document.getElementsByClassName('sub');
                for (let i=0; i<filasT.length; i++) {
                    if (filasT[i].id == subId) {
                        filasT[i].innerHTML = `${product.currency} ${product.cost * amount}`;
                    }
                }
                sumCosts();
            }

        })
        e.stopPropagation();
    })

    // Función para mostrar las sumas de todo
    const sumCosts = () => {
        let subtotales = document.getElementsByClassName('sub');
        let sum = 0;
        const UYU = "UYU";

        let arrOfSubT = [];
        Object.values(subtotales).forEach((item) => {
            arrOfSubT.push(
                {
                    moneda: item.innerText.slice(0, 3),
                    costo: item.innerText.slice(4)
                }
            )
        })
        
        for (let i=0; i<arrOfSubT.length; i++) {
            if (arrOfSubT[i].moneda == UYU) {
                sum += parseInt(arrOfSubT[i].costo * 40);
            } else {
                sum += parseInt(arrOfSubT[i].costo);    
            }
        }

        divTipoDeEnvio.addEventListener('click', (e) => {
            let checkboxes = document.getElementsByClassName('form-check-input');
                if (e.target.id == checkboxes[0].id) {
                    checkboxes[0].setAttribute('checked','');
                    checkboxes[1].removeAttribute('checked');
                    checkboxes[2].removeAttribute('checked');
                    // premium 15%
                    let costoPremium = Math.round(sum * 0.15);
                    spanSubTotal.innerHTML = `USD ${sum}`;
                    spanEnvio.innerHTML = `USD ${costoPremium}`;
                    spanTotal.innerHTML = `USD ${sum + costoPremium}`;
                    
                } else if (e.target.id == checkboxes[1].id) {
                    checkboxes[1].setAttribute('checked','');
                    checkboxes[0].removeAttribute('checked');
                    checkboxes[2].removeAttribute('checked');
                    // express 7%
                    let costoExpress = Math.round(sum * 0.07);
                    spanSubTotal.innerHTML = `USD ${sum}`;
                    spanEnvio.innerHTML = `USD ${costoExpress}`;
                    spanTotal.innerHTML = `USD ${sum + costoExpress}`;
                    
                } else if (e.target.id == checkboxes[2].id) {
                    checkboxes[2].setAttribute('checked','');
                    checkboxes[0].removeAttribute('checked');
                    checkboxes[1].removeAttribute('checked');
                    // standard 5%
                    let costoStandard = Math.round(sum * 0.05);
                    spanSubTotal.innerHTML = `USD ${sum}`;
                    spanEnvio.innerHTML = `USD ${costoStandard}`;
                    spanTotal.innerHTML = `USD ${sum + costoStandard}`;
                }
        })
    }

});



// let strin = "USD 15200";
// let moneda = strin.slice(0, 4);
// let valor = strin.slice(4)
// function eliminar(e) {
        
    //     cartList.forEach((product) => {
    //         if (e.target.dataset.id == product.id) {
    //             let btns = document.getElementsByClassName('btn-outline-danger');
    //             for (let i=0; i<btns.length; i++) {
    //                 if (btns[i].dataset.id == product.id) {
    //                     product.remove();
    //                     localStorage.removeItem('product.id');
    //                 }
    //             }
    //         }
    //     })
    // }