import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Product, Booking } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import storeImg from '@assets/generated_images/pet_boutique_interior.png';
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Store() {
  const { toast } = useToast();
  const [cart, setCart] = useState<Product[]>([]);
  const { data: products, isLoading } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const enquiryMutation = useMutation({
    mutationFn: async (booking: Omit<Booking, "id">) => {
      const res = await apiRequest("POST", "/api/bookings", booking);
      return res.json();
    },
    onSuccess: () => {
      setCart([]);
      setIsCartOpen(false);
      setCustomerName("");
      setCustomerPhone("");
      toast({
        title: "Enquiry Sent! 📝",
        description: "We'll get back to you with availability and pricing shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive"
      });
    }
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to Enquiry 🛍️",
      description: `${product.name} added.`,
    });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save enquiry as a booking
    const detail = cart.map(p => p.name).join(", ") || 'Products Enquiry';
    const timeStr = new Date().toLocaleString();
    const newBooking = {
      name: customerName || 'Guest',
      phone: customerPhone || null,
      type: 'Enquiry',
      detail,
      time: timeStr,
      status: 'Pending'
    };

    enquiryMutation.mutate(newBooking);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </Layout>
    );
  }

  const items = products || [];

  return (
    <Layout>
      <div className="bg-amber-50 min-h-screen">
        {/* Hero */}
        <section className="relative h-[300px] overflow-hidden">
          <img src={storeImg} className="w-full h-full object-cover" alt="Store Header" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h1 className="font-heading font-bold text-5xl mb-4">Vahis Pet Boutique</h1>
              <p className="text-xl opacity-90">Premium food, toys, and accessories for your furry family.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading font-bold text-3xl text-amber-900">Featured Products</h2>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button className="relative rounded-full px-6 font-bold bg-amber-600 hover:bg-amber-700">
                  <ShoppingBag className="mr-2" size={18} /> Enquiry List
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="font-heading text-2xl">Your Enquiry List 📝</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Your list is empty.
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-muted/20 p-3 rounded-xl">
                          <img alt={item.name} src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Est. Total:</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleEnquirySubmit} className="mt-6 space-y-4 border-t pt-6">
                      <div className="space-y-2">
                        <Label>Your Name</Label>
                        <Input required placeholder="Jane Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>WhatsApp Number</Label>
                        <Input required placeholder="+91..." value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                      </div>
                      <Button type="submit" className="w-full py-6 font-bold rounded-xl" disabled={enquiryMutation.isPending}>
                        {enquiryMutation.isPending ? "Sending..." : "Send Enquiry via WhatsApp 💬"}
                      </Button>
                    </form>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <Card key={product.id} className="border-none shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <img alt={product.name} src={product.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-1 text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{product.description}</p>
                  <p className="font-bold text-amber-600 text-lg">₹{product.price}</p>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button
                    className="w-full rounded-xl font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border-none shadow-none"
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={16} className="mr-2" /> Add to Enquiry
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
