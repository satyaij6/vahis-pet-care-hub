import Layout from "@/components/Layout";
import PuppyMatchChat from "@/components/PuppyMatchChat";

export default function PuppyMatch() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
        <div className="container mx-auto px-4 text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
            Find Your Perfect Match 🐶
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer a few simple questions about your lifestyle, and our PuppyMatch AI will recommend the best breed for you!
          </p>
        </div>
        
        <PuppyMatchChat />
      </div>
    </Layout>
  );
}
