import { Link, useLocation } from "wouter";
import { PawPrint, Menu, X, ShoppingBag, Heart, Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "PuppyMatch AI", path: "/puppy-match" },
    { label: "Available Pets", path: "/puppies" },
    { label: "Grooming", path: "/grooming" },
    { label: "Store", path: "/store" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <PawPrint size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-primary leading-tight">Vahis</span>
                <span className="text-xs font-bold text-secondary tracking-wider uppercase">Pet World</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={`text-sm font-bold transition-colors hover:text-primary ${
                    location === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
             <Link href="/puppy-match">
              <Button variant="default" size="sm" className="rounded-full px-6 font-bold bg-gradient-to-r from-primary to-primary/80 hover:to-primary shadow-lg hover:shadow-xl transition-all">
                Try AI Match 🤖
              </Button>
             </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l-2 border-primary/10">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex items-center gap-2 px-2">
                  <div className="bg-primary text-primary-foreground p-2 rounded-xl">
                    <PawPrint size={24} />
                  </div>
                  <span className="font-heading font-bold text-xl text-primary">Vahis Pet World</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a 
                        onClick={() => setMobileOpen(false)}
                        className={`text-lg font-bold px-4 py-2 rounded-lg transition-colors ${
                          location === item.path 
                            ? "bg-primary/10 text-primary" 
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </nav>
                <div className="px-2">
                   <Link href="/puppy-match">
                    <Button className="w-full rounded-full font-bold text-lg py-6" onClick={() => setMobileOpen(false)}>
                      Try PuppyMatch AI 🤖
                    </Button>
                   </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-secondary text-secondary-foreground p-2 rounded-lg">
                  <PawPrint size={20} />
                </div>
                <span className="font-heading font-bold text-xl text-foreground">Vahis Pet World</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Matching happy humans with healthy, verified pets in Jubilee Hills, Hyderabad. Your new best friend is waiting!
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <Instagram size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <Facebook size={20} />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-primary">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/puppies"><a className="text-muted-foreground hover:text-primary transition-colors">Available Puppies</a></Link></li>
                <li><Link href="/puppy-match"><a className="text-muted-foreground hover:text-primary transition-colors">PuppyMatch AI</a></Link></li>
                <li><Link href="/grooming"><a className="text-muted-foreground hover:text-primary transition-colors">Grooming Services</a></Link></li>
                <li><Link href="/store"><a className="text-muted-foreground hover:text-primary transition-colors">Pet Store</a></Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-primary">Services</h4>
              <ul className="space-y-2">
                <li><Link href="/grooming"><a className="text-muted-foreground hover:text-primary transition-colors">Pet Grooming</a></Link></li>
                <li><Link href="/book-visit"><a className="text-muted-foreground hover:text-primary transition-colors">Book a Visit</a></Link></li>
                <li><Link href="/contact"><a className="text-muted-foreground hover:text-primary transition-colors">Vet Consultation</a></Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-primary">Visit Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="shrink-0 mt-1 text-secondary" size={18} />
                  <span>Road No. 36, Jubilee Hills,<br/>Hyderabad, Telangana 500033</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="shrink-0 text-secondary" size={18} />
                  <span>+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Vahis Pet World. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/admin/login"><a className="hover:text-primary">Admin Login</a></Link>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
