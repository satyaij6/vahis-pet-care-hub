import Layout from "@/components/Layout";
import PetCard from "@/components/PetCard";
import { pets } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Puppies() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const initialBreed = queryParams.get("breed") || "";

  const [searchTerm, setSearchTerm] = useState(initialBreed);
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceRange === "all" ? true :
                         priceRange === "low" ? pet.priceMin < 20000 :
                         priceRange === "mid" ? pet.priceMin >= 20000 && pet.priceMin < 30000 :
                         pet.priceMin >= 30000;
                         
    return matchesSearch && matchesPrice;
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
              Meet Our Furry Friends 🐾
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All our pets are vet-checked, vaccinated, and raised with love. Find your perfect match today!
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 mb-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Search by breed or name..." 
                className="pl-10 rounded-xl border-muted bg-muted/20 h-12 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select 
                className="h-12 px-4 rounded-xl border border-muted bg-muted/20 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-48"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">Any Price</option>
                <option value="low">Under ₹20k</option>
                <option value="mid">₹20k - ₹30k</option>
                <option value="high">₹30k+</option>
              </select>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0">
                <Filter size={20} />
              </Button>
            </div>
          </div>

          {/* Results */}
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐶❓</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No puppies found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or check back later!</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchTerm(""); setPriceRange("all"); }}
                className="mt-4 text-primary font-bold"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
