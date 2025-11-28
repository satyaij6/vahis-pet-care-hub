import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Plus, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import storeImg from '@assets/generated_images/pet_boutique_interior.png';

export default function Store() {
  const { toast } = useToast();
  const [cart, setCart] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to Enquiry 🛍️",
      description: `${product.name} added.`,
    });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCart([]);
      setIsCartOpen(false);
      toast({
        title: "Enquiry Sent! 📝",
        description: "We'll get back to you with availability and pricing shortly.",
      });
    }, 1500);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                          <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
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
                        <Input required placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>WhatsApp Number</Label>
                        <Input required placeholder="+91..." />
                      </div>
                      <Button type="submit" className="w-full py-6 font-bold rounded-xl" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Enquiry via WhatsApp 💬"}
                      </Button>
                    </form>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="border-none shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <img src={product.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
