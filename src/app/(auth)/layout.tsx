import Footer from "@/components/manual-ui/Footer";
import Navbar from "@/components/manual-ui/NavBar";
import AuthContext from "@/context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create or Login | BlogHub",
  description: "Login or create an account to access BlogHub.",
  openGraph: {
    title: "Auth | BlogHub",
    description: "Login or create an account to access BlogHub.",
    url: "https://example.com",
    siteName: "BlogHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlogHub Auth",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false, // prevent login/signup from appearing in Google
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
  <AuthContext>
    <Navbar/>
    {children}
    <Footer/>
    </AuthContext>
);
}
