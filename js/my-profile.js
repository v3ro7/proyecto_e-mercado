const inputPrimerNombre = document.getElementById('primer-nombre');
const inputSegundoNombre = document.getElementById('segundo-nombre');
const inputPrimerApellido = document.getElementById('primer-apellido');
const inputSegundoApellido = document.getElementById('segundo-apellido');
const inputEmail = document.getElementById('email');
const inputImagen = document.getElementById('inputGroupFile01');
const inputContacto = document.getElementById('tlf-contacto');
const botonGuardarCambios = document.getElementById('guardar');
const errorAlert = document.getElementById('alert-error');
const successAlert = document.getElementById('alert-success');

function showAlertError() {
    errorAlert.classList.add('show');
    setTimeout(()=>{
        errorAlert.classList.remove('show')
    },2000);
}

function showAlertSuccess() {
    successAlert.classList.add('show');
    setTimeout(()=> {
        successAlert.classList.remove('show')
    },2000);
}

const validar = (e) => {
    e.preventDefault();
    const profile = {
        PrimerNombre: inputPrimerNombre.value,
        SegundoNombre: inputSegundoNombre.value,
        PrimerApellido: inputPrimerApellido.value,
        SegundoApellido: inputSegundoApellido.value,
        Email: inputEmail.value,
        Telefono: inputContacto.value,
        Imagen: inputImagen.files[0].name
    };

    if (profile.PrimerNombre != "" && profile.PrimerApellido != "" && profile.Email != "") {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('User', inputEmail.value);
        encodeImageFileAsURL();
        showAlertSuccess();
    } else {
        showAlertError();
    }
}

function encodeImageFileAsURL() {
    var filesSelected = inputImagen.files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            var newImage = document.getElementById('imagen-perfil');
            newImage.src = srcData;
            localStorage.setItem('ImagenPerfil', newImage.src);
            inputImagen.innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    botonGuardarCambios.addEventListener('click', validar);

    if (localStorage.getItem('User')) {
        inputEmail.value = localStorage.getItem('User');
    }
    
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        inputPrimerNombre.value = profile.PrimerNombre;
        inputSegundoNombre.value = profile.SegundoNombre;
        inputPrimerApellido.value = profile.PrimerApellido;
        inputSegundoApellido.value = profile.SegundoApellido;
        inputContacto.value = profile.Telefono;
       
    }
    if (localStorage.getItem('ImagenPerfil')) {
        document.getElementById('imagen-perfil').src = localStorage.getItem('ImagenPerfil');
    }
})
