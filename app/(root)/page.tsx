import { Home, About, Features } from '@/containers/index'
import { Box } from '@chakra-ui/React';
import Footer from "@/components/Footer";
import Navbar from '@//components/Navbar';
import ScrollProgress from "@/components/ScrollProgress";


export default function Page() {
  return (
    <Box className="">
      <ScrollProgress />
      <Navbar />
      <Home />
      <About />
      <Features />
      <Footer />
    </Box>
  );
}
