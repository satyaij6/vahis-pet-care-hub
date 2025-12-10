import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { pets as initialPets, Booking, bookings as initialBookings } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BookVisit() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const petId = queryParams.get("petId");
  const [pets] = useLocalStorage("admin:pets", initialPets);
  const selectedPet = pets.find(p => p.id === Number(petId));
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useLocalStorage<Booking[]>("admin:bookings", initialBookings as Booking[]);
  const [nameField, setNameField] = useState("");
  const [phoneField, setPhoneField] = useState("");
  const [dateField, setDateField] = useState("");
  const [timeField, setTimeField] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        const nextId = bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        const detail = selectedPet ? selectedPet.name : 'Visit request';
        const timeStr = `${dateField || new Date().toLocaleDateString()} ${timeField || ''}`.trim();
        const newBooking: Booking = { id: nextId, name: nameField || 'Guest', phone: phoneField || undefined, type: 'Visit', detail, time: timeStr || new Date().toLocaleString(), status: 'Pending' };
        setBookings([...bookings, newBooking]);
      } catch (err) {
        console.error(err);
      }
      toast({
        title: "Visit Request Sent! 📅",
        description: "We can't wait to see you! We'll confirm the time shortly.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-none shadow-2xl rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-5 h-full">
               <div className="bg-primary p-8 text-white md:col-span-2 flex flex-col justify-between">
                 <div>
                   <h2 className="font-heading font-bold text-3xl mb-4">Meet & Greet 🐾</h2>
                   <p className="opacity-90 text-sm leading-relaxed mb-6">
                     Come visit our playful pets in a safe, sanitized environment. Spend time with them before you decide!
                   </p>
                 </div>
                 {selectedPet && (
                   <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                     <p className="text-xs uppercase opacity-70 font-bold mb-1">You are visiting:</p>
                     <div className="flex items-center gap-3">
                       <img alt={selectedPet.name} src={selectedPet.imageUrl} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                       <div>
                         <p className="font-bold text-lg">{selectedPet.name}</p>
                         <p className="text-xs">{selectedPet.breed}</p>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
               
               <div className="p-8 md:col-span-3 bg-white">
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Your Full Name" className="h-12 rounded-xl" required value={nameField} onChange={(e) => setNameField(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" className="h-12 rounded-xl" required value={phoneField} onChange={(e) => setPhoneField(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" className="h-12 rounded-xl" required value={dateField} onChange={(e) => setDateField(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Input id="time" type="time" className="h-12 rounded-xl" required value={timeField} onChange={(e) => setTimeField(e.target.value)} />
                    </div>
                    
                    <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl mt-2" disabled={isSubmitting}>
                      {isSubmitting ? "Scheduling..." : "Confirm Visit Request"}
                    </Button>
                 </form>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
