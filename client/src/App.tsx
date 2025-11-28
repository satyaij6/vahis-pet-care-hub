import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PuppyMatch from "@/pages/PuppyMatch";
import Puppies from "@/pages/Puppies";
import Grooming from "@/pages/Grooming";
import Store from "@/pages/Store";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import BookVisit from "@/pages/BookVisit";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminPets from "@/pages/admin/Pets";
import AdminProducts from "@/pages/admin/Products";
import AdminBookings from "@/pages/admin/Bookings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/puppy-match" component={PuppyMatch} />
      <Route path="/puppies" component={Puppies} />
      <Route path="/grooming" component={Grooming} />
      <Route path="/store" component={Store} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-visit" component={BookVisit} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/pets" component={AdminPets} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/bookings" component={AdminBookings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
