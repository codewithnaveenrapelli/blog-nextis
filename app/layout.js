import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        {/* Header */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

      </body>
    </html>
  );
}
