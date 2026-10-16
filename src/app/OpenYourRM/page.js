import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import OpenYourRM from "@/components_OpenYourRM/OpenYourRM/OpenYourRM";

export const metadata = {
  title: "OpenYourRM | Rolls Mania",
  description: "",
};

export default function OpenYourRMPage() {
  return (
    <>
      <Header />
      <OpenYourRM />
      <Footer />
    </>
  );
}
