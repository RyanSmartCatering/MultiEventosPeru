import { BookCatalog } from "@/components/BookCatalog";

type Props = {
  params: Promise<{ id: string }>;
};

// Mock Data Masivo - Basado en la "Ayuda de Memoria Bodas de Plata"
const mockEvent = {
  id: "bodas-plata-sandra-del-pozo",
  title: "Bodas de Plata - Sandra del Pozo",
  date: "Sábado, 21 de Marzo, 2026",
  location: "Villa del Carmen, Cieneguilla",
  pax: "200 / 300 / 150 pax",
  company: "Producción ESV",
  description: "Ayuda de memoria detallada del evento. Ceremonia, cóctel, almuerzo buffet y fiesta. Hora de ingreso personal atención: 9:00 am.",
  coverImage: "/hero.png",
  sections: [
    {
      id: "notas",
      title: "Notas Generales",
      items: [
        {
          name: "Cronograma e Ingreso",
          description: "Instrucciones de llegada y cronograma de trabajo.",
          longText: [
            "Enviar lista de cronograma de trabajo: fechas de ingreso, armado y salida a enviar al grupo ESV - CARMEN.",
            "Si la ceremonia demora se evalúa en el sitio si se pasa algo de comida - ESV / JAN.",
            "Toda la comida debe salir y permanecer en mesa debidamente decorada, mamá de la novia se fija mucho en los detalles - EFRAIN.",
            "Instalación de toldo de cocina desde el día martes - CARMEN / PABLO."
          ],
          image: "/hero.png",
          tag: "Logística"
        },
        {
          name: "Desarrollo del Evento",
          description: "Zonas y etapas del evento por momentos.",
          longText: [
            "El evento se realiza por momentos y en zonas diferentes del local:",
            "• Recepción de invitados - Realizado en Primer anden.",
            "• Ceremonia - Jardín pasando el puente.",
            "• Cóctel - Jardín.",
            "• Almuerzo - Jardín pasando zona de cóctel.",
            "• Zona de fiesta - Jardín pasando zona de almuerzo."
          ],
          features: [
            "11:00 am Debe estar armado zona de espera, ceremonia y cóctel - JEFE DE SERVICIO",
            "12:00 pm Zona de almuerzo y fiesta listas - EJECUTIVAS ASIGNADAS",
            "La mesa Nro. 1, es la mesa de los esposos, tiene 8 pax - MAITRE / SUPERVISORA",
            "Comida caliente: Llevar tapers, papel aluminio - EFRAIN / RICARDO M."
          ],
          image: "/hero.png",
          tag: "Operaciones"
        }
      ]
    },
    {
      id: "personal",
      title: "Personal y Organización",
      description: "Distribución del personal designado al evento y código de vestimenta.",
      items: [
        {
          name: "Organización Área de Cocina",
          description: "Cocina y personal interno.",
          longText: [
            "La cocina debe dividirse por áreas: zona de cocina caliente, zona de cocina de fríos, bar interno y zona de desconche dentro de cocina para menaje que regresa en el momento de boquitas - PERSONAL DE DESCONCHE / PABLO.",
            "Considerar personal de desconche en cocina desde el inicio de evento (1) - EFRAIN / ÁREA DE SERVICIO.",
            "Mantener el orden dentro de cocina, todo lo sucio enviándolo fuera de toldo para desconchar y guardar - CABEZA DE DESCONCHE.",
            "Llevar congeladora para colocar hielo en zona de bar interno - PABLO."
          ],
          features: [
            "COCINA: Efraín Cano",
            "El personal deberá llevar tablas de picar, menaje, equipos, etc. en perfectas condiciones.",
            "La operación debe ser pulcra.",
            "El personal de cocina no sale hasta que se vaya la bajona y deberán quedarse dos cocineros hasta el final."
          ],
          image: "/hero.png"
        },
        {
          name: "Maitre y Salón",
          description: "Maitre: Pablo Quispe",
          longText: [
            "Responsable de la organización de personal de atención de salón: mozos de novios, whiskeros, champagneros, vineros, agua y gaseosa y otros.",
            "Considerar UN mozo exclusivo para la Mesa Nuclear de los esposos, deben estar listos desde que llega NOVIA (11:00am)."
          ],
          features: [
            "Responsable de mesas de comida y baja policía de todo el salón: Lis Veliz",
            "Responsable de desconche en cocina y zona fuera de toldo estar permanentemente ordenando la cocina.",
            "Responsable del cumplimiento de TIMING: Supervisora"
          ],
          image: "/hero.png"
        },
        {
          name: "Uniformes de Personal",
          description: "Código de vestimenta estricto por área.",
          features: [
            "Maitre: Traje etiqueta inglés",
            "Mozos Especializados: Camisa blanca manga larga, pantalón negro, corbata michi negra, zapatos negros, saco blanco largo NUEVO, guantes de algodón nuevos",
            "Baja Policía: Camisa blanca manga larga, pantalón negro, chaleco negro, corbata larga negra, mandilón blanco, zapatos negros",
            "Bufeteros: Chaqueta Londres NUEVAS, pantalón negro, zapatos negros, guantes de algodón, gorro de chef",
            "Personal de Barras (Drop Social): Camisa negra, pantalón negro, mandil negro con pechera, corbata larga negra, zapatos negros"
          ],
          image: "/hero.png",
          tag: "Imagen"
        }
      ]
    },
    {
      id: "timing",
      title: "Timing (Cronograma)",
      description: "Cronograma detallado minuto a minuto del evento.",
      items: [
        {
          name: "Desarrollo del Evento",
          description: "Horarios clave de atención y aperturas.",
          features: [
            "11:30 am - Recepción de Invitados",
            "12:00 pm - Apertura de Estación de Aguas Frutadas",
            "12:45 pm - Ceremonia",
            "1:00 pm - Inicio Cóctel (Mesa de Champagne lista, Barra lista y Mozos)",
            "2:15 pm - Invitados Ingresan al Toldo",
            "2:45 pm - Apertura de Buffet, Estación de Café, Dulces",
            "5:00 pm - Ingresan a Toldo de Fiesta",
            "6:00 pm - Mesa de Quesos Lista",
            "6:50 pm - Repartir cotillón - Mozos",
            "7:00 pm - Bareto",
            "8:00 pm - Bajona (todo pasado)"
          ],
          image: "/hero.png",
          tag: "Itinerario"
        }
      ]
    },
    {
      id: "licores",
      title: "Licores y Coctelería",
      description: "Carta de tragos sociales y licores del evento.",
      items: [
        {
          name: "Licores",
          description: "Proporcionado por el cliente en la locación, mismo día.",
          longText: [
            "OJO: para el brindis (cóctel) será Champagne. Para la recepción será Cava.",
            "Llevar cristalería para barra en demasía: vasos largos, copas globo, vasos para whisky, copas de vino tinto, copas flauta - PABLO."
          ],
          features: [
            "Whisky: Etiqueta Negra",
            "Vino Blanco, Vino Tinto",
            "Champagne para Brindis",
            "Cava para Recepción"
          ],
          image: "/hero.png"
        },
        {
          name: "Carta de Cócteles",
          description: "Carta de cócteles operada por Drop Social.",
          features: [
            "Aperol Spritz (Aperol, Espumante, Agua con gas, Rodaja de Naranja)",
            "Chilcano Clásico (Pisco, Ginger Ale, Amargo de Angostura, Limón)",
            "Chilcano Maracuyá & Ají Limo",
            "Chilcano Frutos Rojos",
            "Chilcano Piña & Mandarina",
            "Vodka Tonic",
            "Gin Tonic Clásico",
            "Gin con Frutos Rojos"
          ],
          image: "/hero.png"
        }
      ]
    },
    {
      id: "alquileres",
      title: "Fabricación y Alquileres",
      description: "Detalle de mobiliario, sillas, mantelería y estructuras.",
      items: [
        {
          name: "Inventario de Mobiliario",
          description: "Cantidades exactas de alquiler.",
          features: [
            "04 módulos medio luna para mesa de dulces - FC",
            "09 manteles blancos con hojas verdes ESV / FC",
            "06 manteles rosados bb ESV - FC",
            "06 manteles verdes BASIL ESV - FC",
            "240 fundas de cojín verde a rayas delgadas - FC",
            "30 fundas de cojín con tela pajaritos verdes - FC",
            "01 disco circular de vidrio de 0.60m",
            "250 Sillas verdes Tiffany - Ciano Rental BY ESV",
            "04 salas lounge - TRH By ESV",
            "50 Platos base verde filo dorado - Argento By ESV",
            "100 Platos de borde verde - Ciano Rental By ESV"
          ],
          image: "/hero.png",
          tag: "Alquileres"
        },
        {
          name: "Zonas y Estilo",
          description: "Estilo del evento e inspiración.",
          longText: [
            "Estilo Inspirado en Jardines europeos (Francia / Inglaterra).",
            "Mantenimiento: 50 Sillas Tiffany verdes en perfectas condiciones (revisar color de pintura verde)."
          ],
          features: [
            "Pantone: Verde, Rosado, Blanco",
            "Ceremonia y Cóctel: Tonalidades blancas y verdes",
            "Almuerzo y Fiesta: Verdes limón y rosa, rosa bb",
            "Zona de Recepción: Carreta de Aguas Frutadas, 01 carreta blanca, 03 Salas lounge tipo Jardín",
            "Mesa de Ceremonia: Mesa de vidrio 1.10 x 0.60, Cruz de vidrio, 80 sillas plegables de madera blanco con cojín blanco, Sombrillas de mano en cestas"
          ],
          image: "/hero.png",
          tag: "Diseño"
        }
      ]
    }
  ]
};

export default async function EventoPage({ params }: Props) {
  await params; // consume params
  const event = mockEvent;
  return <BookCatalog event={event} />;
}
