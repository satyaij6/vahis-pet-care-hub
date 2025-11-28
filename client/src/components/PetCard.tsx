import { Heart, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Pet } from "@/lib/data";

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group rounded-3xl bg-white h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={pet.imageUrl} 
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
           <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-500 hover:text-rose-600 shadow-sm">
             <Heart size={20} className={pet.featured ? "fill-current" : ""} />
           </Button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground font-bold shadow-sm">
            {pet.ageWeeks} weeks
          </Badge>
          <Badge variant="default" className="bg-secondary text-secondary-foreground font-bold shadow-sm">
            {pet.gender}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-6 pb-2 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors">{pet.name}</h3>
            <p className="text-muted-foreground font-medium">{pet.breed}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-primary">₹{(pet.priceMin/1000).toFixed(0)}k+</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
           <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
           Healthy & Vaccinated
        </div>
      </CardContent>

      <CardFooter className="pb-6 pt-4">
        <Link href={`/book-visit?petId=${pet.id}`} className="w-full">
          <Button className="w-full rounded-xl font-bold shadow-md group-hover:shadow-lg transition-all" size="lg">
            Meet {pet.name} <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
