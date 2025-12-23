import Navbar from "@/components/layout/Landing/Navbar";
import Footer from "@/components/layout/Landing/Footer";
import Section1 from "@/components/layout/Landing/Section1";
import Section2 from "@/components/layout/Landing/Section2";
import Section3 from "@/components/layout/Landing/Section3";
import Section4 from "@/components/layout/Landing/Section4";
import Section5 from "@/components/layout/Landing/Section5";
import Section6 from "@/components/layout/Landing/Section6";

export default async function Home() {
  return (
    <main className="bg-[radial-gradient(at_top_left,var(--bg-1),var(--bg-0))]">
      <Navbar />

      {/* Hero + Features Section */}
      <section className="flex flex-col justify-evenly px-6 md:px-16 py-8 md:h-[90vh] gap-8">
        <Section1 />
        <Section2 />
      </section>

      {/* Other Sections */}
      <section className="px-6 md:px-16 py-8 flex flex-col gap-12">
        <Section3 />
        <Section4 />
        {/* <Section5 /> */}
        <Section6 />
      </section>

      <Footer />
    </main>
  );
}
