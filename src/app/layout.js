import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "The Comfort Inn — Luxury Guest House Lahore",
  description: "Boutique luxury guest house in Lahore, Pakistan. Offering standard rooms, deluxe suites, family suites, high-speed Wi-Fi, and premium dining.",
  keywords: "guest house, Lahore, hotel, booking, accommodation, Comfort Inn, Pakistan, luxury lodging",
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
        </LanguageProvider>
      </body>
    </html>
  );
}

