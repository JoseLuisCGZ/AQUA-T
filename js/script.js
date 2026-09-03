const colorError= "#b3261e";
const colorExito= "#006494";

const dominiosPermitidos= /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const soloTelefono = /^[0-9+\s-]{8,15}$/;

function validaNombre(){
    const nombre= document.getElementById("nombreUsuario").value.trim();
    const feedback= document.getElementById("nombreFeedback");
    feedback.style.color= colorError;

    if(nombre=== ""){
        feedback.textContent= "Ingrese su Nombre";
        return false;
    }else if(nombre.length> 100){
        feedback.textContent= "El nombre no puede superar los 100 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaEmail(){
    const email= document.getElementById("emailUsuario").value.trim();
    const feedback= document.getElementById("emailFeedback");
    feedback.style.color= colorError;

    if(email=== ""){
        feedback.textContent= "Ingrese su Email";
        return false;
    }else if(email.length> 100){
        feedback.textContent= "El email no puede superar los 100 caracteres";
        return false;
    }else if(!dominiosPermitidos.test(email)){
        feedback.textContent= "Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaTelefono(){
    const telefono= document.getElementById("telefono").value.trim();
    const feedback= document.getElementById("fonoFeedback");
    feedback.style.color= colorError;

    if(telefono=== ""){
        feedback.textContent= "Ingrese su Teléfono";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaCiudad(){
    const ciudad= document.getElementById("ciudad").value.trim();
    const feedback= document.getElementById("ciudadFeedback");
    feedback.style.color= colorError;

    if(ciudad=== ""){
        feedback.textContent= "Ingrese su Ciudad";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaMensaje(){
    const mensaje= document.getElementById("mensaje").value.trim();
    const feedback= document.getElementById("mensajeFeedback");
    feedback.style.color= colorError;

    if(mensaje=== ""){
        feedback.textContent= "Ingrese su Mensaje";
        return false;
    }else if(mensaje.length> 500){
        feedback.textContent= "El mensaje no debe superar los 500 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validarForm(event){

    event.preventDefault();

    const nombre= document.getElementById("nombreUsuario").value.trim();
    const correo= document.getElementById("emailUsuario").value.trim();
    const telefono= document.getElementById("telefono").value.trim();
    const ciudad= document.getElementById("ciudad").value.trim();
    const asunto= document.getElementById("asunto").value.trim();
    const mensajeTexto= document.getElementById("mensaje").value.trim();
    const noRobot= document.getElementById("noRobot").checked;

    const mensaje= document.getElementById("mensajeForm");

    const nombreValido= validaNombre();
    const emailValido= validaEmail();
    const fonoValido= validaTelefono();
    const ciudadValida= validaCiudad();
    const mensajeValido= validaMensaje();

    if(!nombreValido){
        mensaje.textContent= "Ingrese la Informacion Faltante";
        mensaje.style.color= colorError;
        return;
    }else if(!emailValido){
        mensaje.textContent= "Ingrese la Informacion Faltante";
        mensaje.style.color= colorError;
        return;
    }else if(!fonoValido){
        mensaje.textContent= "Ingrese la Informacion Faltante";
        mensaje.style.color= colorError;
        return;
    }else if(!ciudadValida){
        mensaje.textContent= "Ingrese la Informacion Faltante";
        mensaje.style.color= colorError;
        return;
    }else if(asunto== ""){
        mensaje.textContent= "Seleccione un Asunto";
        mensaje.style.color= colorError;
        return;
    }else if(!mensajeValido){
        mensaje.textContent= "Ingrese la Informacion Faltante";
        mensaje.style.color= colorError;
        return;
    }else if(!noRobot){
        mensaje.textContent= "Confirme que no es un robot";
        mensaje.style.color= colorError;
        return;
    }else{
        mensaje.textContent= "Muchas Gracias "+nombre+" Tu consulta fue enviada con exito.";
        mensaje.style.color= colorExito;
        mensaje.style.fontWeight= "600";
        event.target.closest("form").reset();
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("nombreUsuario").addEventListener("input", validaNombre);
    document.getElementById("emailUsuario").addEventListener("input", validaEmail);
    document.getElementById("telefono").addEventListener("input", validaTelefono);
    document.getElementById("ciudad").addEventListener("input", validaCiudad);
    document.getElementById("mensaje").addEventListener("input", validaMensaje);
})