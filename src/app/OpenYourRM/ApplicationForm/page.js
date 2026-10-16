import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ApplicationForm from "@/components_OpenYourRM/ApplicationForm/ApplicationForm";

export const metadata = {
  title: "Franchise Application | Rolls Mania",
  description: "Complete the Rolls Mania franchise application form.",
};

export default function ApplicationFormPage() {
  return (
    <>
      <Header />
      <ApplicationForm />
      <Footer />
    </>
  );
}
