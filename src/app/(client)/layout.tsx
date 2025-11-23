import Footer from "@/components/manual-ui/Footer";
import Navbar from "@/components/manual-ui/NavBar";

export default function AllBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
        <Navbar />
        {children}
        <Footer/>
    </div>
  );
}