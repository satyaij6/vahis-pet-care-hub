import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { groomingServices } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import groomingImg from '@assets/generated_images/happy_dog_grooming.png';

export default function Grooming() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Booking Request Sent! 🛁",
        description: "We'll confirm your appointment on WhatsApp shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="container mx-auto px-4 relative z-10 text-center">
             <h1 className="font-heading font-bold text-5xl mb-4">Vahis Pet Spa 🛁</h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">Professional grooming services to keep your furry friend looking and feeling their best.</p>
           </div>
        </section>

        <div className="container mx-auto px-4 py-12 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Services List */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="font-heading font-bold text-2xl mb-6 text-slate-900">Our Services</h2>
                <div className="space-y-4">
                  {groomingServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors">
                      <span className="font-bold text-slate-700">{service.name}</span>
                      <span className="bg-white px-3 py-1 rounded-lg shadow-sm text-primary font-bold text-sm">{service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src={groomingImg} alt="Happy dog grooming" className="w-full h-64 object-cover" />
              </div>
            </div>

            {/* Booking Form */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden sticky top-24">
              <CardHeader className="bg-primary p-8 text-center">
                <CardTitle className="font-heading text-3xl text-white">Book an Appointment</CardTitle>
                <p className="text-blue-100">Fill out the form below to request a slot.</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="petType">Pet Type</Label>
                      <Select required>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Dog 🐶</SelectItem>
                          <SelectItem value="cat">Cat 🐱</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="breed">Breed</Label>
                      <Input id="breed" placeholder="e.g. Shih Tzu" className="h-12 rounded-xl" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed</Label>
                    <Select required>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select Service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {groomingServices.map(s => (
                            <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date & Time</Label>
                    <Input id="date" type="datetime-local" className="h-12 rounded-xl" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" className="h-12 rounded-xl" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" placeholder="+91 98765 43210" className="h-12 rounded-xl" required />
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl" disabled={isLoading}>
                    {isLoading ? "Booking..." : "Request Appointment 📅"}
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
}
