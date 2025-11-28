import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pets } from "@/lib/data";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";

export default function AdminPets() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-bold text-2xl">Manage Pets</h1>
          </div>
          <Button className="rounded-full font-bold">
            <Plus size={18} className="mr-2" /> Add New Pet
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>
                    <img src={pet.imageUrl} className="w-10 h-10 rounded-full object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      pet.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {pet.status}
                    </span>
                  </TableCell>
                  <TableCell>₹{pet.priceMin.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-500">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
