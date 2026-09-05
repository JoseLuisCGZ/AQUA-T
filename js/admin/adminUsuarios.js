const claveUsuarios= "aquaT_admin_usuarios";

const tipoUsuario= ["Administrador", "Cliente", "Vendedor"];

const usuariosPorDefecto= [
    {
        id: 1,
        run: "211567899",
        nombre: "Ivan",
        apellidos: "Rivera",
        correo: "ivan.rivera@duoc.cl",
        fechaNacimiento: "2002-10-25",
        tipoUsuario: "Administrador",
        region: "Región Metropolitana de Santiago",
        comuna: "Santiago",
        direccion: "Lomas Ticas 123"
    },
    {
        id: 2,
        run: "128493456",
        nombre: "Jose",
        apellidos: "Cornejo",
        correo: "jose.cornejo@gmail.com",
        fechaNacimiento: "1998-11-02",
        tipoUsuario: "Vendedor",
        region: "Región de Metropolitana de Santiago",
        comuna: "Punete Alto",
        direccion: "Puente Asalto 456"
    },
    {
        id: 3,
        run: "205671234",
        nombre: "Jose",
        apellidos: "Cisternas",
        correo: "jose.cisternas@gmail.com",
        fechaNacimiento: "2000-02-20",
        tipoUsuario: "Cliente",
        region: "Región del Biobío",
        comuna: "Concepción",
        direccion: "Lomas turbas 789"
    }
];

function inicicalizarUsuarios(){
    const guardar= localStorage.getItem(claveUsuarios);
    if(guardar=== null){
        localStorage.setItem(claveUsuarios, JSON.stringify(usuariosPorDefecto));
    }
}

function guardarUsuarios(lista){
    localStorage.setItem(claveUsuarios, JSON.stringify(lista));
}

function obtenerUsuarios(){
    inicicalizarUsuarios();
    return JSON.parse(localStorage.getItem(claveUsuarios));
}

function obtenerUsuarioPorId(id){
   const usuarios= obtenerUsuarios();
   return usuarios.find(function (u){
        return u.id=== Number(id);    
   });
}

function obtenerUsuarioPorRun(run){
   const usuarios= obtenerUsuarios();
   return usuarios.find(function (u){
        return u.run=== run;    
   });
}

function generarNuevoIdUsuario(usuarios){
    if(usuarios.length=== 0) return 1;
    const maximo= Math.max.apply(null, usuarios.map(function (u){return u.id;}));
    return maximo + 1;
}

function agregarUsuario(datosUsuario){
    const usuarios= obtenerUsuarios();
    const nuevoUsuario= Object.assign({
        id: generarNuevoIdUsuario(usuarios)},
        datosUsuario
    );
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    return nuevoUsuario;
}

function actualizarUsuario(id, datosActualizados){
    const usuarios= obtenerUsuarios();
    const indice= usuarios.findIndex(function(u){
        return u.id=== Number(id);
    });

    if(indice=== -1) return false;
    usuarios[indice]= Object.assign({}, usuarios[indice], datosActualizados, {id: Number(id)});
    guardarUsuarios(usuarios);
    return true;
}

function eliminarUsuario(id){
    const usuarios= obtenerUsuarios().filter(function(u){
        return u.id!== Number(id); 
    });
    guardarUsuarios(usuarios);
}