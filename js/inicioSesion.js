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
    const contrasena= document.getElementById("contrasena").value;
    const feedback= document.getElementById("contrasenaFeedback");
    feedback.style.color= colorError;

    if (contrasena=== "") {
        feedback.textContent= "Ingrese una contraseña";
        return false;
    } else if (contrasena.length< 4 || contrasena.length> 10) {
        feedback.textContent= "La contraseña debe tener entre 4 y 10 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validarFormLogin(event){

    event.preventDefault();

    const mensajeForm= document.getElementById("mensajeForm");
    const correoIngresado= document.getElementById("emailUsuario").value.trim();

    const emailValido= validaEmail();
    const contrasenaValida= validaContrasena();

    if (!emailValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!contrasenaValida){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }
 
    const usuarios= obtenerUsuarios();
    const usuarioEncontrado= usuarios.find(function (u) {
        return u.correo.toLowerCase()=== correoIngresado.toLowerCase();
    });
 
    if (usuarioEncontrado) {
        guardarSesion(usuarioEncontrado);

        if(usuarioEncontrado.tipoUsuario=== "Administrador"){
            mensajeForm.textContent= "Bienvenido/a " + usuarioEncontrado.nombre + ". Redirigiendo al panel de administrador...";
            mensajeForm.style.color= colorExito;
            mensajeForm.style.fontWeight= "600";
            setTimeout(function () {
                window.location.href= "admin/admin_home.html";
            }, 1200);
            return;
        }else if(usuarioEncontrado.tipoUsuario=== "Vendedor"){
            mensajeForm.textContent= "Bienvenido/a " + usuarioEncontrado.nombre + ". Redirigiendo al panel de vendedor...";
            mensajeForm.style.color= colorExito;
            mensajeForm.style.fontWeight= "600";
            setTimeout(function () {
                window.location.href= "admin/admin_home.html";
            }, 1200);
            return;
        }

        mensajeForm.textContent= "Bienvenido/a de vuelta, " + usuarioEncontrado.nombre + ". Redirigiendo...";
        mensajeForm.style.color= colorExito;
        mensajeForm.style.fontWeight= "600";
        setTimeout(function(){
            window.location.href= "home.html";
        },1200);
        return
    }
    
        mensajeForm.textContent= "Inicio de sesión exitoso.";
        mensajeForm.style.color= colorExito;
        mensajeForm.style.fontWeight= "600";
        event.target.reset();
    
}

    document.addEventListener("DOMContentLoaded", function(){
        const form= document.getElementById("formLogin");
        if (!form) return;

        form.addEventListener("submit", validarFormLogin);

        document.getElementById("emailUsuario").addEventListener("input", validaEmail);
        document.getElementById("contrasena").addEventListener("input", validaContrasena);
    });