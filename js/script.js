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

    if(nombre=== ""){
        mensaje.textContent= "Ingrese su Nombre";
        mensaje.style.color= "red";
        return;
    }else if(correo== ""){
        mensaje.textContent= "Ingrese su Correo Electrónico";
        mensaje.style.color= "red";
        return;
    }else if(telefono== ""){
        mensaje.textContent= "Ingrese su Teléfono";
        mensaje.style.color= "red";
        return;
    }else if(ciudad== ""){
        mensaje.textContent= "Ingrese su Ciudad";
        mensaje.style.color= "red";
        return;
    }else if(asunto== ""){
        mensaje.textContent= "Seleccione un Asunto";
        mensaje.style.color= "red";
        return;
    }else if(mensajeTexto== ""){
        mensaje.textContent= "Ingrese su Mensaje";
        mensaje.style.color= "red";
        return;
    }else if(!noRobot){
        mensaje.textContent= "Confirme que no es un robot";
        mensaje.style.color= "red";
        return;
    }else{
        mensaje.textContent= "Muchas Gracias "+nombre+" Tu consulta fue enviada con exito.";
        mensaje.style.color= "lightgreen";
    }
}