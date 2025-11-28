import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Home, IndianRupee, Activity, Baby, Brain, Send, Share2, RefreshCw, Heart } from "lucide-react";
import { Link } from "wouter";

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
}

interface UserPreferences {
  budget?: string;
  housing?: string;
  exercise?: string;
  temperament?: string;
  kids?: string;
  experience?: string;
}

interface Recommendation {
  breed: string;
  desc: string;
  reasons: string[];
  cost: string;
  img: string;
}

export default function PuppyMatchChat() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);

  const questions = [
    {
      key: 'budget',
      text: "Let's start with your budget for a furry friend! 💰",
      options: ["< ₹15k", "₹15k – ₹30k", "₹30k+"]
    },
    {
      key: 'housing',
      text: "Where will your new best friend live? 🏠",
      options: ["Apartment", "Villa", "Independent House"]
    },
    {
      key: 'exercise',
      text: "How much time can you dedicate to daily exercise? 🏃‍♂️",
      options: ["Low (Short walks)", "Medium (30-60 mins)", "High (Active play)"]
    },
    {
      key: 'temperament',
      text: "What kind of personality are you looking for? 🎭",
      options: ["Calm & Chill", "Playful & Energetic", "Protective", "Doesn't matter"]
    },
    {
      key: 'kids',
      text: "Do you have young kids at home? 👶",
      options: ["Yes", "No", "Planning soon"]
    },
    {
      key: 'experience',
      text: "Have you owned a dog before? 🎓",
      options: ["First-time owner", "Experienced"]
    }
  ];

  const handleOptionClick = (option: string) => {
    const currentQuestion = questions[step];
    setPreferences(prev => ({ ...prev, [currentQuestion.key]: option }));
    
    if (step < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setStep(prev => prev + 1);
        setIsTyping(false);
      }, 600);
    } else {
      handleCompletion();
    }
  };

  const handleCompletion = () => {
    setStep(questions.length); // Loading state
    setTimeout(() => {
      // Mock AI Logic
      let recommendation = {
        breed: "Beagle",
        desc: "The merry Beagle is fun-loving and great with families!",
        reasons: ["Perfect size for apartments", "Great with kids", "Playful but manageable energy"],
        cost: "₹4,000 – ₹6,000",
        img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80"
      };

      if (preferences.housing === "Villa" && preferences.exercise === "High (Active play)") {
         recommendation = {
          breed: "Golden Retriever",
          desc: "The ultimate family dog! Gentle, smart, and loves everyone.",
          reasons: ["Thrives in larger spaces", "Loves active play", "Ideally suited for families"],
          cost: "₹6,000 – ₹9,000",
          img: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=600&q=80"
        };
      } else if (preferences.housing === "Apartment" && preferences.exercise === "Low (Short walks)") {
        recommendation = {
          breed: "Shih Tzu",
          desc: "A royal companion that loves laps and indoor play.",
          reasons: ["Perfect apartment dweller", "Low exercise needs", "Hypoallergenic coat"],
          cost: "₹3,000 – ₹5,000",
          img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80"
        };
      }

      setResult(recommendation);
      setStep(questions.length + 1);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key="question-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-primary/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sparkles className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-primary">PuppyMatch AI</h3>
                <p className="text-sm text-muted-foreground">Question {step + 1} of {questions.length}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-8 leading-relaxed">
              {questions[step].text}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  variant="outline"
                  className="h-auto py-4 text-lg justify-start px-6 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : step === questions.length ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-primary/10 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
               <div className="bg-primary text-primary-foreground p-6 rounded-full relative z-10">
                 <Brain size={48} className="animate-pulse" />
               </div>
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-2">Analyzing your profile...</h3>
            <p className="text-muted-foreground text-lg">Finding the perfect tail-wagger for you! 🐾</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-primary/10"
          >
            <div className="bg-primary p-8 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paws.png')]"></div>
               <h2 className="relative z-10 font-heading font-bold text-3xl text-white mb-2">It's a Match! 🎉</h2>
               <p className="relative z-10 text-primary-foreground/90 text-lg">Based on your lifestyle, we recommend:</p>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square rounded-full overflow-hidden border-4 border-secondary shadow-lg mx-auto max-w-[200px]">
                    <img src={result.img} alt={result.breed} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h3 className="font-heading font-bold text-4xl text-secondary mb-3">{result.breed}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-4">{result.desc}</p>
                  
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100 font-bold">
                    <IndianRupee size={18} />
                    Est. Cost: {result.cost}/mo
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {result.reasons.map((reason: string, idx: number) => (
                  <div key={idx} className="bg-muted/30 p-4 rounded-xl border border-muted flex flex-col items-center text-center">
                    <div className="bg-white p-2 rounded-full shadow-sm mb-2 text-primary">
                      {idx === 0 ? <Home size={20} /> : idx === 1 ? <Activity size={20} /> : <Heart size={20} />}
                    </div>
                    <span className="font-medium text-foreground">{reason}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link href={`/puppies?breed=${result.breed}`}>
                  <Button className="w-full py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    View Available {result.breed} Puppies
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="py-6 rounded-xl font-bold" onClick={() => window.location.reload()}>
                    <RefreshCw size={18} className="mr-2" /> Start Over
                  </Button>
                  <Button variant="outline" className="py-6 rounded-xl font-bold text-primary border-primary/20 hover:bg-primary/5">
                    <Share2 size={18} className="mr-2" /> Share Result
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
