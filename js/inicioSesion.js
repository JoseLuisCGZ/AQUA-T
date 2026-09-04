const colorError= "#b3261e";
const colorExito= "#006494";

const dominiosPermitidos= /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

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

function validaContrasena() {
    const contrasena = document.getElementById("contrasena").value;
    const feedback = document.getElementById("contrasenaFeedback");
    feedback.style.color = colorError;

    if (contrasena === "") {
        feedback.textContent = "Ingrese una contraseña";
        return false;
    } else if (contrasena.length < 4 || contrasena.length > 10) {
        feedback.textContent = "La contraseña debe tener entre 4 y 10 caracteres";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validarFormLogin(event){

    event.preventDefault();

    const mensajeForm= document.getElementById("mensajeForm");

    const emailValido = validaEmail();
    const contrasenaValida = validaContrasena();

    if (!emailValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!contrasenaValida) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else {
        mensajeForm.textContent = "Inicio de sesión exitoso.";
        mensajeForm.style.color = colorExito;
        mensajeForm.style.fontWeight = "600";
        event.target.reset();
    }
}

    document.addEventListener("DOMContentLoaded", function(){
        const form= document.getElementById("formLogin");
        if (!form) return;

        form.addEventListener("submit", validarFormLogin);

        document.getElementById("emailUsuario").addEventListener("input", validaEmail);
        document.getElementById("contrasena").addEventListener("input", validaContrasena);
    });