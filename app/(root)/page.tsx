import { Home, About, Features } from '@/containers/index'
import Footer from "@/components/Footer";
import Navbar from '@//components/Navbar';
import ScrollProgress from "@/components/ScrollProgress";


export default function Page() {
  return (
    <div className="">
      <ScrollProgress />
      <Navbar />
      <Home />
      <About />
      <Features />
      <Footer />
    </div>
  );
}
