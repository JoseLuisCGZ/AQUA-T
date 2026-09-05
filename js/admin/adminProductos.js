const claveProductos= "aquaT_admin_productos";

const categoriasProducto= ["Filtros", "Bombas", "Accesorios", "Piscinas", "Químicos"];

const productosPorDefecto= [
    {
        id: 1,
        codigo: "FIL-VUL-20",
        nombre: "Filtro VC Vulcano 20",
        descripcion: "Filtro de arena ideal para piscinas medianas.",
        precio: 120000,
        stock: 15,
        stockCritico: 3,
        categoria: "Filtros",
        imagen: "assetsimg/filtro1.jpg"
    },
    {
        id: 2,
        codigo: "BOM-APM37",
        nombre: "Bomba periférica APm37 0,5Hp 220V Leo",
        descripcion: "Bomba periférica de uso residencial para piscinas.",
        precio: 80000,
        stock: 8,
        stockCritico: 2,
        categoria: "Bombas",
        imagen: "assetsimg/bomba.webp"
    },
    {
        id: 3,
        codigo: "QUI-CLORO-1KG",
        nombre: "Pack 2 Unidades Cloro Granulado 1 Kg",
        descripcion: "Cloro granulado para desinfección y mantención del agua.",
        precio: 9990,
        stock: 40,
        stockCritico: 10,
        categoria: "Químicos",
        imagen: "assetsimg/cloro.webp"
    }
];

function inicicalizarPorductos(){
    const guardar= localStorage.getItem(claveProductos);
    if(guardar=== null){
        localStorage.setItem(claveProductos, JSON.stringify(productosPorDefecto));
    }
}

function guardarProductos(lista){
    localStorage.setItem(claveProductos, JSON.stringify(lista));
}

function obtenerProductos(){
    inicicalizarPorductos();
    return JSON.parse(localStorage.getItem(claveProductos));
}

function obtenerProductoPorId(id){
   const productos= obtenerProductos();
   return productos.find(function (p){
        return p.id=== Number(id);    
   });
}

function generarNuevoId(productos){
    if(productos.length=== 0) return 1;
    const maximo= Math.max.apply(null, productos.map(function (p){return p.id;}));
    return maximo + 1;
}

function agregarProducto(datosProducto){
    const productos= obtenerProductos();
    const nuevoProducto= Object.assign({
        id: generarNuevoId(productos)},
        datosProducto
    );
    productos.push(nuevoProducto);
    guardarProductos(productos);
    return nuevoProducto;
}

function actualizarProducto(id, datosActualizados){
    const productos= obtenerProductos();
    const indice= productos.findIndex(function(p){
        return p.id=== Number(id);
    });

    if(indice=== -1) return false;
    productos[indice]= Object.assign({}, productos[indice], datosActualizados, {id: Number(id)});
    guardarProductos(productos);
    return true;
}

function eliminarProducto(id){
    const productos= obtenerProductos().filter(function(p){
        return p.id!== Number(id); 
    });
    guardarProductos(productos);
}