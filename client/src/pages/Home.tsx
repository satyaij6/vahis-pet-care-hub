import Layout from "@/components/Layout";
import PetCard from "@/components/PetCard";
import CreativeBanner from "@/components/CreativeBanner";
import Reviews from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { pets as initialPets } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Link } from "wouter";
import { ShieldCheck, Heart, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImg from '@assets/generated_images/happy_family_with_puppy_in_park.png';

export default function Home() {
  const [pets] = useLocalStorage("admin:pets", initialPets);
  // User request: Latest added first 3 pets
  const featuredPets = [...pets].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-blue-900 uppercase tracking-wide">Voted #1 Pet Shop in Hyderabad</span>
            </div>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl text-slate-900 leading-[1.1]">
              Find Your New <br />
              <span className="text-primary relative inline-block">
                Best Friend
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path className="underline-draw" d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> 🐶
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Matching happy humans with healthy, verified pets in Jubilee Hills. Let our AI help you find the perfect companion for your family!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/puppy-match">
                <Button size="lg" className="rounded-full text-lg font-bold px-8 py-7 shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all">
                  Try PuppyMatch AI ✨
                </Button>
              </Link>
              <Link href="/puppies">
                <Button variant="outline" size="lg" className="rounded-full text-lg font-bold px-8 py-7 border-2 bg-white hover:bg-slate-50 text-slate-700">
                  Browse Pets 🐾
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={18} /> Vet Checked
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={18} /> Vaccinated
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={18} /> Healthy
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-200/30 to-yellow-200/30 rounded-full blur-3xl -z-10"></div>
            <img
              src={heroImg}
              alt="Happy family with dog"
              className="rounded-[2.5rem] shadow-2xl border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-700 w-full object-cover aspect-[4/3]"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">100% Verified</p>
                  <p className="text-xs text-slate-500">Breed Standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Banner */}
      <CreativeBanner />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-slate-900 mb-4">Why Vahis Pet World?</h2>
            <p className="text-lg text-slate-500">We're more than just a pet shop. We're family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck size={40} />,
                title: "Healthy & Vaccinated",
                desc: "Every pet comes with a complete health check, vaccination records, and a health guarantee.",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: <Heart size={40} />,
                title: "Perfect Match Promise",
                desc: "We don't just sell pets; we match personalities to ensure a lifetime of happiness.",
                color: "bg-rose-100 text-rose-600"
              },
              {
                icon: <Clock size={40} />,
                title: "Lifetime Support",
                desc: "From puppy training tips to dietary advice, we're here for you throughout their life.",
                color: "bg-yellow-100 text-yellow-600"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl hover:shadow-lg transition-all border border-slate-100 group">
                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PuppyMatch Promo */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center md:text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 hidden md:block"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl space-y-6">
                <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
                  Not sure which breed is right for you? 🤔
                </h2>
                <p className="text-blue-100 text-lg md:text-xl leading-relaxed">
                  Take our fun 2-minute quiz! Our PuppyMatch AI analyzes your lifestyle, home, and family to recommend the perfect furry companion.
                </p>
                <Link href="/puppy-match">
                  <Button size="lg" variant="secondary" className="rounded-full text-lg font-bold px-8 py-6 shadow-lg">
                    Start the Quiz <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 w-[300px]">
                  <div className="flex items-center gap-3 mb-4 border-b border-white/20 pb-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">AI</div>
                    <div className="text-white">
                      <p className="font-bold text-sm">PuppyMatch Bot</p>
                      <p className="text-xs opacity-80">Online</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/90 p-3 rounded-t-xl rounded-br-xl text-sm text-slate-800">
                      What is your housing type? 🏠
                    </div>
                    <div className="bg-secondary p-3 rounded-t-xl rounded-bl-xl text-sm text-white ml-auto w-fit">
                      Apartment with balcony
                    </div>
                    <div className="bg-white/90 p-3 rounded-t-xl rounded-br-xl text-sm text-slate-800">
                      I recommend a Shih Tzu! 🐶
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading font-bold text-4xl text-slate-900 mb-2">New Arrivals 🐾</h2>
              <p className="text-slate-500 text-lg">These cuties are looking for a forever home.</p>
            </div>
            <Link href="/puppies">
              <Button variant="outline" className="hidden md:flex rounded-xl">View All Pets</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/puppies">
              <Button variant="outline" className="w-full rounded-xl py-6">View All Pets</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Grooming Promo */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80"
                alt="Dog Spa"
                className="rounded-3xl shadow-2xl border-4 border-white/20 rotate-[-2deg] hover:rotate-0 transition-transform"
              />
            </div>
            <div className="flex-1 order-1 md:order-2 text-center md:text-left">
              <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-white">Spa Day for your Best Friend? 🛁</h2>
              <p className="text-slate-300 text-xl mb-8 leading-relaxed">
                Treat your pet to a luxurious grooming session. From relaxing baths to stylish haircuts, our pros handle it all with love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/grooming">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold px-8 py-6 text-lg">
                    Book Grooming
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
