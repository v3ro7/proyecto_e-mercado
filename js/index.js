// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } 
          form.classList.add('was-validated')
        }, false)
      })
  })();

  function redireccionar () {
    window.location.href = "https://v3ro7.github.io/proyecto_e-mercado/portada.html";
  };

let boton = document.getElementById('ingresar');
boton.addEventListener('click', function(){
  let inputUsuario = document.getElementById('email').value;
  localStorage.setItem("User", inputUsuario);
});