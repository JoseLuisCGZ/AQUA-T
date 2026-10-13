export const blogs = [
  {
    slug: 'filtro-correcto',
    caso: 'Caso curioso #1',
    titulo: 'Cómo elegir el filtro correcto para tu piscina',
    resumen:
      'El tamaño de tu piscina y la frecuencia de uso determinan qué filtro necesitas. Te contamos las claves para no equivocarte al elegir.',
    imagen: '/assetsimg/filtro1.jpg',
    alt: 'Cómo elegir el filtro correcto para tu piscina',
    introduccion:
      'Elegir el filtro correcto es una de las decisiones más importantes para mantener el agua de tu piscina limpia y segura. Un filtro mal dimensionado trabaja de más, se ensucia rápido y termina costándote más caro en mantenimiento.',
    secciones: [
      {
        titulo: '1. Calcula el volumen de tu piscina',
        contenido:
          'Multiplica largo x ancho x profundidad promedio para obtener los metros cúbicos de agua. Ese número es el punto de partida para elegir la capacidad del filtro.'
      },
      {
        titulo: '2. Define el tipo de filtro',
        contenido:
          'Los filtros de arena (como nuestra línea Vulcano) son ideales para piscinas medianas y grandes por su bajo costo de mantenimiento. Los filtros de cartucho son más compactos y convienen en piscinas pequeñas o desmontables.'
      },
      {
        titulo: '3. Considera el uso real de la piscina',
        contenido:
          'Mientras más personas y más horas se use la piscina, más rápido se ensucia el agua. Si tu piscina tiene uso familiar frecuente, conviene ir un tamaño de filtro por sobre lo mínimo recomendado.'
      }
    ],
    enlaceFinal: {
      textoAntes: '¿Tienes dudas sobre qué modelo te conviene? ',
      textoLink: 'Escríbenos',
      ruta: '/contacto',
      textoDespues: ' y te ayudamos a elegir.'
    }
  },

  {
    slug: 'mantenimiento-verano',
    caso: 'Caso curioso #2',
    titulo: '5 tips para mantener tu piscina lista todo el verano',
    resumen:
      'Con estos hábitos simples vas a ahorrar tiempo, químicos y dinero durante toda la temporada de calor.',
    imagen: '/assetsimg/equipofiltro.jpg',
    alt: 'Mantenimiento de piscina en verano',
    introduccion:
      'El verano es cuando más se usa la piscina, y también cuando más rápido se ensucia. Estos cinco hábitos te van a ahorrar tiempo y productos químicos durante toda la temporada.',
    secciones: [
      {
        titulo: '1. Limpia el filtro cada semana',
        contenido:
          'Un filtro saturado deja de hacer su trabajo y el agua empieza a verse turbia.'
      },
      {
        titulo: '2. Revisa el nivel de cloro',
        contenido:
          'Con más calor y más bañistas, el cloro se consume más rápido. Revisa dos veces por semana.'
      },
      {
        titulo: '3. Cubre la piscina cuando no la uses',
        contenido:
          'Un cobertor reduce la entrada de hojas y polvo, y baja el consumo de químicos.'
      },
      {
        titulo: '4. Aspira el fondo regularmente',
        contenido:
          'La suciedad que se acumula en el fondo es la principal causa de agua verde.'
      },
      {
        titulo: '5. Controla el pH del agua',
        contenido:
          'Un pH fuera de rango irrita la piel y hace que el cloro pierda efectividad.'
      }
    ],
    enlaceFinal: {
      textoAntes:
        'Encuentra todo lo que necesitas para tu mantenimiento en nuestra sección de ',
      textoLink: 'Químicos',
      ruta: '/productos?categoria=Químicos',
      textoDespues: '.'
    }
  }
]