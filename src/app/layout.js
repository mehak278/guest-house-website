import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "The Heritage Manor — Luxury Guest Houses Pakistan",
  description: "Premium boutique luxury guest houses in Lahore, Karachi, Islamabad, and Murree. Offering standard rooms, deluxe suites, family villas, high-speed Wi-Fi, and live BBQ dining.",
  keywords: "guest house, Lahore, Karachi, Islamabad, Murree, hotel, booking, accommodation, Heritage Manor, Pakistan, luxury lodging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* FontAwesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body>
        <LanguageProvider>
          <PageLoader />
          <CustomCursor />
          
          <Navbar />
          <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

