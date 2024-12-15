import Header from "@/components/Header";
import DownloadForm from "@/components/DownloadForm";

export default function Home() {
  return (
    <main className="flex min-h-[92vh] flex-col items-center justify-center">
      <Header title={"Tubesaurus"} />
      <DownloadForm />
    </main>
  );
}
