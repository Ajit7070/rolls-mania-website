import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import StoreLocator from "@/components_storelocator/StoreLocator/StoreLocator";

export const metadata = {
  title: "Store Locator | Rolls Mania",
  description:
    "Find your nearest Rolls Mania store. Explore locations by country, state, and city and get directions.",
};

export default function StoreLocatorPage() {
  return (
    <>
      <Header />
      <StoreLocator />
      <Footer />
    </>
  );
}
