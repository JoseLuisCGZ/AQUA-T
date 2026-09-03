const colorError = "#b3261e";
const colorExito = "#006494";

const dominiosPermitidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const soloTelefono = /^[0-9+\s-]{8,15}$/;
const soloRun = /^[0-9]{6,8}[0-9kK]$/;

function calcularDvRun(numeroRun) {
    let suma = 0;
    let multiplo = 2;

    for (let i = numeroRun.length - 1; i >= 0; i--) {
        suma += parseInt(numeroRun[i], 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = 11 - (suma % 11);

    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return resto.toString();
}

function runValido(run) {
    if (!soloRun.test(run)) return false;

    const numero = run.slice(0, -1);
    const dvIngresado = run.slice(-1).toUpperCase();
    const dvCalculado = calcularDvRun(numero);

    return dvIngresado === dvCalculado;
}

function validaRun() {
    const run = document.getElementById("run").value.trim();
    const feedback = document.getElementById("runFeedback");
    feedback.style.color = colorError;

    if (run === "") {
        feedback.textContent = "Ingrese su RUN";
        return false;
    } else if (run.length < 7 || run.length > 9) {
        feedback.textContent = "El RUN debe tener entre 7 y 9 caracteres";
        return false;
    } else if (!esRunValido(run)) {
        feedback.textContent = "El RUN ingresado no es válido (verifique el dígito verificador)";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaNombre() {
    const nombre = document.getElementById("nombre").value.trim();
    const feedback = document.getElementById("nombreFeedback");
    feedback.style.color = colorError;

    if (nombre === "") {
        feedback.textContent = "Ingrese su nombre";
        return false;
    } else if (nombre.length > 50) {
        feedback.textContent = "El nombre no puede superar los 50 caracteres";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaApellidos() {
    const apellidos = document.getElementById("apellidos").value.trim();
    const feedback = document.getElementById("apellidosFeedback");
    feedback.style.color = colorError;

    if (apellidos === "") {
        feedback.textContent = "Ingrese sus apellidos";
        return false;
    } else if (apellidos.length > 100) {
        feedback.textContent = "Los apellidos no pueden superar los 100 caracteres";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaCorreo() {
    const correo = document.getElementById("correo").value.trim();
    const feedback = document.getElementById("correoFeedback");
    feedback.style.color = colorError;

    if (correo === "") {
        feedback.textContent = "Ingrese su correo";
        return false;
    } else if (correo.length > 100) {
        feedback.textContent = "El correo no puede superar los 100 caracteres";
        return false;
    } else if (!dominiosPermitidos.test(correo)) {
        feedback.textContent = "Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaContrasena() {
    const contrasena = document.getElementById("contrasena").value;
    const feedback = document.getElementById("contrasenaFeedback");
    feedback.style.color = colorError;

    if (contrasena === "") {
        feedback.textContent = "Ingrese una contraseña";
        return false;
    } else if (contrasena.length < 6 || contrasena.length > 20) {
        feedback.textContent = "La contraseña debe tener entre 6 y 20 caracteres";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaConfirmarContrasena() {
    const contrasena = document.getElementById("contrasena").value;
    const confirmar = document.getElementById("confirmarContrasena").value;
    const feedback = document.getElementById("confirmarContrasenaFeedback");
    feedback.style.color = colorError;

    if (confirmar === "") {
        feedback.textContent = "Confirme su contraseña";
        return false;
    } else if (confirmar !== contrasena) {
        feedback.textContent = "Las contraseñas no coinciden";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaTelefono() {
    const telefono = document.getElementById("telefono").value.trim();
    const feedback = document.getElementById("telefonoFeedback");
    feedback.style.color = colorError;

    if (telefono !== "" && !soloTelefono.test(telefono)) {
        feedback.textContent = "Ingrese un teléfono válido (solo números, 8 a 15 dígitos)";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaFechaNacimiento() {
    const fecha = document.getElementById("fechaNacimiento").value;
    const feedback = document.getElementById("fechaNacimientoFeedback");
    feedback.style.color = colorError;

    // Campo opcional: solo se valida que no sea una fecha futura
    if (fecha !== "") {
        const hoy = new Date();
        const fechaIngresada = new Date(fecha);
        if (fechaIngresada > hoy) {
            feedback.textContent = "La fecha de nacimiento no puede ser futura";
            return false;
        }
    }
    feedback.textContent = "";
    return true;
}

function validaRegion() {
    const region = document.getElementById("region").value;
    const feedback = document.getElementById("regionFeedback");
    feedback.style.color = colorError;

    if (region === "") {
        feedback.textContent = "Seleccione una región";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaComuna() {
    const comuna = document.getElementById("comuna").value;
    const feedback = document.getElementById("comunaFeedback");
    feedback.style.color = colorError;

    if (comuna === "") {
        feedback.textContent = "Seleccione una comuna";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function validaDireccion() {
    const direccion = document.getElementById("direccion").value.trim();
    const feedback = document.getElementById("direccionFeedback");
    feedback.style.color = colorError;

    if (direccion === "") {
        feedback.textContent = "Ingrese su dirección";
        return false;
    } else if (direccion.length > 300) {
        feedback.textContent = "La dirección no puede superar los 300 caracteres";
        return false;
    }
    feedback.textContent = "";
    return true;
}

function cargarRegiones() {
    const selectRegion = document.getElementById("region");

    regionesComunas.forEach(function (item, index) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.region;
        selectRegion.appendChild(option);
    });
}

function actualizarComunas() {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

    const indiceRegion = selectRegion.value;

    if (indiceRegion === "") {
        selectComuna.disabled = true;
        return;
    }

    const comunas = regionesComunas[indiceRegion].comunas;

    comunas.forEach(function (comuna) {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
    });

    selectComuna.disabled = false;
}

function validaFormRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const mensajeForm = document.getElementById("mensajeForm");

    const validaciones = [
        validaRun(),
        validaNombre(),
        validaApellidos(),
        validaCorreo(),
        validaContrasena(),
        validaConfirmarContrasena(),
        validaTelefono(),
        validaFechaNacimiento(),
        validaRegion(),
        validaComuna(),
        validaDireccion()
    ];

    const formValido = validaciones.every(function (valido) { return valido; });

    if (!formValido) {
        mensajeForm.textContent = "Revisa los campos marcados en rojo antes de registrarte.";
        mensajeForm.style.color = colorError;
        return;
    }

    mensajeForm.textContent = "¡Registro exitoso! Bienvenido/a " + nombre + ".";
    mensajeForm.style.color = colorExito;
    mensajeForm.style.fontWeight = "600";
    event.target.reset();
    document.getElementById("comuna").disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRegistro");
    if (!form) return;

    cargarRegiones();

    form.addEventListener("submit", validarFormRegistro);

    document.getElementById("run").addEventListener("input", validaRun);
    document.getElementById("nombre").addEventListener("input", validaNombre);
    document.getElementById("apellidos").addEventListener("input", validaApellidos);
    document.getElementById("correo").addEventListener("input", validaCorreo);
    document.getElementById("contrasena").addEventListener("input", validaContrasena);
    document.getElementById("confirmarContrasena").addEventListener("input", validaConfirmarContrasena);
    document.getElementById("telefono").addEventListener("input", validaTelefono);
    document.getElementById("fechaNacimiento").addEventListener("change", validaFechaNacimiento);
    document.getElementById("region").addEventListener("change", function () {
        actualizarComunas();
        validaRegion();
    });
    document.getElementById("comuna").addEventListener("change", validaComuna);
    document.getElementById("direccion").addEventListener("input", validaDireccion);
});