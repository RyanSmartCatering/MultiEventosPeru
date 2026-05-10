import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MultiEvents — El Portafolio Inteligente",
  description: "Transforma tus documentos en experiencias interactivas de lujo. La nueva era del catering y los eventos en Perú.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      {/* overflow-hidden en body evita el scroll fantasma fuera de las páginas */}
      <body className="h-full bg-background text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
