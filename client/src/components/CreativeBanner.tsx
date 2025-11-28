import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import bannerBg from '@assets/generated_images/abstract_playful_pet_pattern_banner.png';
import { Link } from "wouter";

export default function CreativeBanner() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={bannerBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
          </div>

          <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
                <Sparkles size={16} className="text-yellow-300" />
                <span className="text-sm font-bold tracking-wide">Limited Time Offer</span>
              </div>
              
              <h2 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight drop-shadow-sm">
                First Grooming Session? <br/>
                <span className="text-yellow-300">Get 20% Off!</span> 🛁
              </h2>
              
              <p className="text-lg md:text-xl text-blue-50 font-medium max-w-lg">
                Join the Vahis family today! Book your first spa day with us and let your furry friend shine like a star.
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/grooming">
                <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-bold bg-white text-primary hover:bg-yellow-300 hover:text-primary-foreground transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Claim Offer <ArrowRight className="ml-2 stroke-[3px]" />
                </Button>
              </Link>
              <p className="text-white/80 text-xs text-center mt-3 font-medium">
                *Valid for new customers only
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-10 right-1/3 w-20 h-20 bg-white rounded-full blur-2xl opacity-30 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
