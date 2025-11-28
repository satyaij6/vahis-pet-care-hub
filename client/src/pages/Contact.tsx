import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-primary py-20 text-white text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Get in Touch 📞</h1>
          <p className="text-lg text-blue-100">We'd love to hear from you! Visit us or drop a message.</p>
        </div>

        <div className="container mx-auto px-4 -mt-12 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <Card className="border-none shadow-xl lg:col-span-1">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Road No. 36, Jubilee Hills,<br/>
                      Hyderabad, Telangana 500033
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm">
                      +91 98765 43210
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Mon - Sun: 10AM - 9PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      hello@vahispetworld.com
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-6">
                  <MessageCircle className="mr-2" /> Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Map & Form */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-xl overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222391316!2d78.4043!3d17.4256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9133f5555555%3A0x5555555555555555!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1625555555555!5m2!1sen!2sin" 
                  width="100%" 
                  height="300" 
                  loading="lazy"
                  className="border-0"
                ></iframe>
              </Card>

              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <h3 className="font-heading font-bold text-2xl mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Your Name" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="your@email.com" className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-xl resize-none" />
                    </div>
                    <Button size="lg" className="rounded-xl font-bold">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
