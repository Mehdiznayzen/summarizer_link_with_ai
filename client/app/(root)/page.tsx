import { Home, About, Features } from '@/containers/index'
import Footer from "@/components/Footer";
import Navbar from '@//components/Navbar';
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from '@/components/theme-provider';
import CardsLayout from '../../containers/CardsLayout';


export default function Page() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="">
        <ScrollProgress />
        <Navbar />
        <Home />
        <About />
        <CardsLayout />
        <Features />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
