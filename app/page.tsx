import Header from "../components/Header";
import Footer from "@/components/Footer";
import DownloadForm from "@/components/DownloadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4">
      <Header title={"Tubesaurus"} />
      <DownloadForm />
      <Footer />
    </main>
  );
}
