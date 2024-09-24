
const formulario = document.querySelector('#formularioRegistro')
const nombreImput = document.querySelector("#lbl-nombre")

const nombreError = document.querySelector('[data-error="nombre-error"]');

const validarNombre = () => {
  if (nombreImput.value.trim() === '') {
    nombreError.textContent = "El nombre es obligatorio";
  } else {
    nombreError.textContent = '';
  }
};

const resetearFormulario = () => {
    nombreImput.value = ""
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    validarNombre()

    let isNombreValid = nombreError.textContent === ''

    if (isNombreValid) {
        const formData = {
            nombre: nombreImput.value.trim()
        }
        console.log('Formulario valido:', formData);
        
    } else {
        console.log('No se envio el formulario');
        
    }
})
