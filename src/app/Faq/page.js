import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Faq from "@/components_faq/Faq/Faq";

export const metadata = {
  title: "FAQs | Rolls Mania",
  description:
    "Find answers to frequently asked questions about Rolls Mania, our menu, orders, and stores.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
