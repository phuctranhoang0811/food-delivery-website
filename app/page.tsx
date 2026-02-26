import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-16 xl:px-20">
        <Body />
      </main>
      <Footer />
    </div>
  );
}
