import Header from "@/components/Header/Header";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components_about_us/About_Us/AboutUs";

export const metadata = {
  title: "About Us | Rolls Mania",
  description:
    "Discover the Rolls Mania story, our philosophy, vision, team and journey of serving delicious rolls.",
};

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <AboutUs />
      <Testimonials />
      <Footer />
    </>
  );
}
