import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-[1800px] px-4 sm:px-8 lg:px-16 xl:px-20 py-2 sm:py-6 lg:py-8">
        <Body />
      </main>
      <Footer />
    </div>
  );
}
