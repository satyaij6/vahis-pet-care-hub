import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import avatar1 from '@assets/generated_images/happy_woman_with_dog_avatar.png';
import avatar2 from '@assets/generated_images/happy_man_with_cat_avatar.png';
import avatar3 from '@assets/generated_images/happy_child_with_puppy_avatar.png';

const reviews = [
  {
    id: 1,
    name: "Priya Reddy",
    role: "Dog Mom to Bruno",
    text: "I was so nervous about getting my first puppy. The PuppyMatch AI suggested a Golden Retriever, and Bruno is literally the perfect match for my apartment lifestyle!",
    rating: 5,
    image: avatar1,
    bg: "bg-blue-50"
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Cat Dad to Whiskers",
    text: "Vahis Pet World is unlike any other shop in Hyderabad. It's clean, ethical, and the staff actually cares. Whiskers is healthy, happy, and rules the house now.",
    rating: 5,
    image: avatar2,
    bg: "bg-orange-50"
  },
  {
    id: 3,
    name: "The Sharma Family",
    role: "Adopted Snoopy",
    text: "We visited for a meet-and-greet and fell in love. The process was transparent, and the post-adoption support has been incredible. Highly recommend!",
    rating: 5,
    image: avatar3,
    bg: "bg-green-50"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
         <div className="absolute top-20 left-10 text-9xl font-heading font-bold">❝</div>
         <div className="absolute bottom-20 right-10 text-9xl font-heading font-bold rotate-180">❝</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm tracking-wide">
            TESTIMONIALS
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-4">
            Happy Tails, Happy Tales 📖
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our extended family has to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className={`border-none shadow-lg hover:shadow-2xl transition-all duration-300 ${review.bg} group`}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="mb-8 relative">
                  <Quote className="absolute -top-2 -left-2 text-black/5 w-12 h-12" />
                  <p className="text-slate-700 text-lg leading-relaxed relative z-10 italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full p-1 bg-white shadow-md">
                       <img src={review.image} alt={review.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                      VERIFIED
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <div className="flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {/* Fake logos for social proof */}
              <span className="font-heading font-bold text-xl">Google Reviews</span>
              <span className="font-heading font-bold text-xl">JustDial</span>
              <span className="font-heading font-bold text-xl">Facebook</span>
           </div>
        </div>
      </div>
    </section>
  );
}
