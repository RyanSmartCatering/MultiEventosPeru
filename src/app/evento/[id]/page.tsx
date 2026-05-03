import { BookCatalog } from "@/components/BookCatalog";

type Props = {
  params: Promise<{ id: string }>;
};

// Mock Data Temporal - En el futuro vendrá de Supabase
const mockEvent = {
  id: "gala-verano-2026",
  title: "Gala Anual de Verano 2026",
  date: "25 de Noviembre, 2026",
  location: "Hacienda Los Ficus",
  description: "Una experiencia culinaria exclusiva diseñada para deleitar sus sentidos con los mejores ingredientes de la temporada. Por Ryan Smart Catering.",
  coverImage: "/hero.png",
  sections: [
    {
      id: "recepcion",
      title: "Recepción",
      items: [
        {
          name: "Tartar de Atún Rojo",
          description: "Con palta brasa, alcaparras y emulsión de ají amarillo sobre crocante de tapioca negra.",
          image: "/hero.png",
          tag: "Fresco"
        },
        {
          name: "Cucharitas de Ceviche Clásico",
          description: "Pesca del día macerada en leche de tigre al ají limo, con maíz chulpi y canchita serrana.",
          image: "/hero.png",
          tag: "Marino"
        },
        {
          name: "Mini Causas Limeñas",
          description: "Coronadas con pulpa de cangrejo real, mayonesa de ají amarillo y caviar de pez volador.",
          image: "/hero.png"
        }
      ]
    },
    {
      id: "plato-fondo",
      title: "Plato de Fondo",
      items: [
        {
          name: "Lomo Fino en Salsa de Hongos",
          description: "Corte premium de res acompañado de puré rústico trufado y espárragos bebé salteados en mantequilla de hierbas del jardín.",
          image: "/hero.png",
          tag: "Chef's Choice"
        },
        {
          name: "Salmón Glaseado al Miso",
          description: "Sobre cama de quinua negra perlada y vegetales de estación al wok con toque de jengibre y limón.",
          image: "/hero.png"
        }
      ]
    },
    {
      id: "mesa-dulces",
      title: "Mesa de Dulces",
      items: [
        {
          name: "Macarons Franceses Artesanales",
          description: "Variedad exclusiva de frambuesa, pistacho, chocolate bitter y lavanda. Preparados diariamente.",
          image: "/hero.png"
        },
        {
          name: "Shots de Suspiro a la Limeña",
          description: "Con merengue italiano al oporto, polvo de canela de Ceylán y caramelo de maracuyá.",
          image: "/hero.png",
          tag: "Tradición"
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
