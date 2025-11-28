import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShieldCheck, Users } from "lucide-react";
import heroImg from '@assets/generated_images/happy_family_with_puppy_in_park.png';

export default function About() {
  return (
    <Layout>
       <div className="bg-white">
         {/* Hero */}
         <div className="relative py-24 bg-slate-50">
           <div className="container mx-auto px-4 text-center">
             <h1 className="font-heading font-bold text-5xl text-slate-900 mb-6">More Than Just a Pet Shop</h1>
             <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
               At Vahis Pet World, we believe pets are family. Our mission is to match happy humans with healthy, verified pets in a way that ensures a lifetime of love.
             </p>
           </div>
         </div>

         <div className="container mx-auto px-4 py-16">
           <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
             <div className="relative">
               <div className="absolute -inset-4 bg-secondary/20 rounded-[2.5rem] rotate-3"></div>
               <img src={heroImg} className="relative rounded-[2rem] shadow-2xl" alt="Family with dog" />
             </div>
             <div className="space-y-6">
               <h2 className="font-heading font-bold text-3xl text-primary">Our Story</h2>
               <p className="text-slate-600 text-lg leading-relaxed">
                 Founded in the heart of Jubilee Hills, Hyderabad, Vahis Pet World started with a simple promise: no puppy mills, no unhealthy pets, and no mismatches.
               </p>
               <p className="text-slate-600 text-lg leading-relaxed">
                 We realized that many families struggle to find the *right* breed for their lifestyle. That's why we built **PuppyMatch AI** and focused on education-first adoption. We want to ensure that every wagging tail finds a home where they can truly thrive.
               </p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="border-none shadow-lg bg-blue-50">
               <CardContent className="p-8 text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-500">
                   <ShieldCheck size={32} />
                 </div>
                 <h3 className="font-heading font-bold text-xl mb-2">100% Health Check</h3>
                 <p className="text-slate-600">Every pet is vetted by top veterinarians before they meet you.</p>
               </CardContent>
             </Card>
             <Card className="border-none shadow-lg bg-rose-50">
               <CardContent className="p-8 text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-rose-500">
                   <Heart size={32} />
                 </div>
                 <h3 className="font-heading font-bold text-xl mb-2">Family First</h3>
                 <p className="text-slate-600">We prioritize temperament and family-friendliness above all else.</p>
               </CardContent>
             </Card>
             <Card className="border-none shadow-lg bg-yellow-50">
               <CardContent className="p-8 text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-yellow-500">
                   <Users size={32} />
                 </div>
                 <h3 className="font-heading font-bold text-xl mb-2">Community</h3>
                 <p className="text-slate-600">Join our community of pet lovers for events, playdates, and support.</p>
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
    </Layout>
  );
}
