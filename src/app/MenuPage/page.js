import Header from "@/components/Header/Header";
import Testimonials from "@/components/Testimonials/Testimonials";
import MenuPage from "@/components_menu/MenuPage";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Our Menu | Rolls Mania",
  description:
    "Explore Rolls Mania favourites, signature rolls, crunchy wraps, meal boxes, fries, sides, drinks and combos.",
};

export default function MenuRoute() {
  return (
    <>
      <Header />
      <MenuPage />
      <Testimonials />
      <Footer />
    </>
  );
}
