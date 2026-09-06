const colorError= "#b3261e";
const colorExito= "#006494";
 
const dominiosPermitidos= /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const soloRun= /^[0-9]{6,8}[0-9kK]$/;
 
const idUsuarioEditar= new URLSearchParams(window.location.search).get("id");
const modoEdicionUsuario= idUsuarioEditar!== null;

function cargarTiposUsuario() {
    const select= document.getElementById("rolUsuario");
    tipoUsuario.forEach(function (rol) {
        const option= document.createElement("option");
        option.value= rol;
        option.textContent= rol;
        select.appendChild(option);
    });
}

function cargarRegiones() {
    const selectRegion= document.getElementById("region");

    regionesComunas.forEach(function (item, index) {
        const option= document.createElement("option");
        option.value= index;
        option.textContent= item.region;
        selectRegion.appendChild(option);
    });
}

 
function actualizarComunas() {
    const selectRegion= document.getElementById("region");
    const selectComuna= document.getElementById("comuna");

    selectComuna.innerHTML= '<option value="">-- Seleccione la comuna --</option>';

    const indiceRegion= selectRegion.value;

    if (indiceRegion=== "") {
        selectComuna.disabled = true;
        return;
    }

    const comunas= regionesComunas[indiceRegion].comunas;

    comunas.forEach(function (comuna) {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
    });

    selectComuna.disabled = false;
}

function calcularDvRun(numeroRun) {
    let suma= 0;
    let multiplo= 2;

    for (let i= numeroRun.length - 1; i>= 0; i--) {
        suma += parseInt(numeroRun[i], 10) * multiplo;
        multiplo= multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto= 11 - (suma % 11);

    if (resto=== 11) return "0";
    if (resto=== 10) return "K";
    return resto.toString();
}

function runValido(run) {
    if (!soloRun.test(run)) return false;

    const numero= run.slice(0, -1);
    const dvIngresado= run.slice(-1).toUpperCase();
    const dvCalculado= calcularDvRun(numero);

    return dvIngresado=== dvCalculado;
}

function validaRun() {
    const run= document.getElementById("run").value.trim();
    const feedback= document.getElementById("runFeedback");
    feedback.style.color= colorError;

    if (run=== "") {
        feedback.textContent= "Ingrese su RUN";
        return false;
    } else if (run.length< 7 || run.length> 9) {
        feedback.textContent= "El RUN debe tener entre 7 y 9 caracteres";
        return false;
    } else if (!runValido(run)) {
        feedback.textContent= "El RUN ingresado no es válido (verifique el dígito verificador)";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaNombre() {
    const nombre= document.getElementById("nombre").value.trim();
    const feedback= document.getElementById("nombreFeedback");
    feedback.style.color= colorError;

    if (nombre=== "") {
        feedback.textContent= "Ingrese su nombre";
        return false;
    } else if (nombre.length> 50) {
        feedback.textContent= "El nombre no puede superar los 50 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaApellidos() {
    const apellidos= document.getElementById("apellidos").value.trim();
    const feedback= document.getElementById("apellidosFeedback");
    feedback.style.color= colorError;

    if (apellidos=== "") {
        feedback.textContent= "Ingrese sus apellidos";
        return false;
    } else if (apellidos.length> 100) {
        feedback.textContent= "Los apellidos no pueden superar los 100 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaCorreo() {
    const correo= document.getElementById("correo").value.trim();
    const feedback= document.getElementById("correoFeedback");
    feedback.style.color= colorError;

    if (correo=== "") {
        feedback.textContent= "Ingrese su correo";
        return false;
    } else if (correo.length> 100) {
        feedback.textContent= "El correo no puede superar los 100 caracteres";
        return false;
    } else if (!dominiosPermitidos.test(correo)) {
        feedback.textContent= "Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaFechaNacimiento() {
    const fecha= document.getElementById("fechaNacimiento").value;
    const feedback= document.getElementById("fechaNacimientoFeedback");
    feedback.style.color= colorError;

    if (fecha!== "") {
        const hoy= new Date();
        const fechaIngresada= new Date(fecha);
        if (fechaIngresada> hoy) {
            feedback.textContent= "La fecha de nacimiento no puede ser futura";
            return false;
        }
    }
    feedback.textContent= "";
    return true;
}

function validaRolUsuario() {
    const rol= document.getElementById("rolUsuario").value;
    const feedback= document.getElementById("rolFeedback");
    feedback.style.color= colorError;
 
    if (rol=== "") {
        feedback.textContent= "Seleccione un tipo de usuario";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaRegion() {
    const region= document.getElementById("region").value;
    const feedback= document.getElementById("regionFeedback");
    feedback.style.color= colorError;

    if (region=== "") {
        feedback.textContent= "Seleccione una región";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaComuna() {
    const comuna= document.getElementById("comuna").value;
    const feedback= document.getElementById("comunaFeedback");
    feedback.style.color= colorError;

    if (comuna=== "") {
        feedback.textContent= "Seleccione una comuna";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function validaDireccion() {
    const direccion = document.getElementById("direccion").value.trim();
    const feedback = document.getElementById("direccionFeedback");
    feedback.style.color = colorError;

    if (direccion=== "") {
        feedback.textContent= "Ingrese su dirección";
        return false;
    } else if (direccion.length> 300) {
        feedback.textContent= "La dirección no puede superar los 300 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function precargarUsuario() {
    const usuario= obtenerUsuarioPorId(idUsuarioEditar);
 
    if (!usuario) {
        document.getElementById("mensajeForm").textContent= "No se encontró el usuario solicitado.";
        document.getElementById("mensajeForm").style.color= colorError;
        document.getElementById("formUsuario").style.display= "none";
        return;
    }
 
    document.getElementById("run").value= usuario.run;
    document.getElementById("nombre").value= usuario.nombre;
    document.getElementById("apellidos").value= usuario.apellidos;
    document.getElementById("correo").value= usuario.correo;
    document.getElementById("fechaNacimiento").value= usuario.fechaNacimiento || "";
    document.getElementById("rolUsuario").value= usuario.tipoUsuario;
    document.getElementById("direccion").value= usuario.direccion;
 
    const indiceRegion= regionesComunas.findIndex(function (item) {
        return item.region=== usuario.region;
    });
    if (indiceRegion!== -1) {
        document.getElementById("region").value= indiceRegion;
        actualizarComunas();
        document.getElementById("comuna").value= usuario.comuna;
    }
 
    document.getElementById("tituloFormularioUsuario").textContent= "Editar usuario";
    document.getElementById("botonGuardarUsuario").textContent= "Guardar cambios";
}

function validaFormUsuario(event) {
 
    event.preventDefault();
 
    const mensajeForm = document.getElementById("mensajeForm");
 
    const runValidoResultado = validaRun();
    const nombreValido = validaNombre();
    const apellidosValido = validaApellidos();
    const correoValido = validaCorreo();
    const nacimientoValido = validaFechaNacimiento();
    const rolValido = validaRolUsuario();
    const regionValida = validaRegion();
    const comunaValida = validaComuna();
    const direccionValida = validaDireccion();
 
    if (!runValidoResultado) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!nombreValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!apellidosValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!correoValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!nacimientoValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!rolValido) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!regionValida) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!comunaValida) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else if (!direccionValida) {
        mensajeForm.textContent = "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    } else {
        const datosUsuario = {
            run: document.getElementById("run").value.trim(),
            nombre: document.getElementById("nombre").value.trim(),
            apellidos: document.getElementById("apellidos").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            tipoUsuario: document.getElementById("rolUsuario").value,
            region: regionesComunas[document.getElementById("region").value].region,
            comuna: document.getElementById("comuna").value,
            direccion: document.getElementById("direccion").value.trim()
        };
 
        if (modoEdicionUsuario) {
            actualizarUsuario(idUsuarioEditar, datosUsuario);
            mensajeForm.textContent = "¡Usuario actualizado con éxito! Redirigiendo...";
        } else {
            agregarUsuario(datosUsuario);
            mensajeForm.textContent = "¡Usuario creado con éxito! Redirigiendo...";
        }
 
        mensajeForm.style.color = colorExito;
        mensajeForm.style.fontWeight = "600";

        setTimeout(function () {
            window.location.href = "admin_usuarios.html";
        }, 1200);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    cargarTiposUsuario();
    cargarRegiones();
 
    if (modoEdicionUsuario) {
        precargarUsuario();
    }
 
    const form= document.getElementById("formUsuario");
    form.addEventListener("submit", validaFormUsuario);
 
    document.getElementById("run").addEventListener("input", validaRun);
    document.getElementById("nombre").addEventListener("input", validaNombre);
    document.getElementById("apellidos").addEventListener("input", validaApellidos);
    document.getElementById("correo").addEventListener("input", validaCorreo);
    document.getElementById("fechaNacimiento").addEventListener("change", validaFechaNacimiento);
    document.getElementById("rolUsuario").addEventListener("change", validaRolUsuario);
    document.getElementById("region").addEventListener("change", function () {
        actualizarComunas();
        validaRegion();
    });
    document.getElementById("comuna").addEventListener("change", validaComuna);
    document.getElementById("direccion").addEventListener("input", validaDireccion);
});