import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppOrb from "@/components/WhatsAppOrb";
import { Toaster } from "sonner";

export const metadata = {
  title: "RolPlay | AI-Powered Sales Training",
  description:
    "Empower your commercial team with AI simulators and a virtual coach that delivers immediate, objective and unbiased feedback — at scale.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <Navigation />
        {children}
        <Footer />
        <WhatsAppOrb />
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "#0A0A0E",
              border: "1px solid rgba(192,57,43,0.3)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
