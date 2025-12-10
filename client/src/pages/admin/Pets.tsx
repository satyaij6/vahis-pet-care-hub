import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pets as initialPets, Pet } from "@/lib/data";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminPets() {
  const { toast } = useToast();
  const [items, setItems] = useLocalStorage<Pet[]>("admin:pets", initialPets);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Pet | null>(null);

  const openAdd = () => { setEditing(null); setIsOpen(true); };
  const openEdit = (p: Pet) => { setEditing(p); setIsOpen(true); };
  const handleDelete = (id: number) => { if (!confirm("Delete pet?")) return; setItems(items.filter(x => x.id !== id)); toast({ title: "Pet deleted" }); };
  const upsert = (p: Pet) => { if (editing) { setItems(items.map(x => x.id === p.id ? p : x)); toast({ title: "Pet updated" }); } else { const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1; setItems([...items, { ...p, id: nextId }]); toast({ title: "Pet added to the List successfully" }); } setIsOpen(false); };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const input = document.getElementById("pet-image") as HTMLInputElement;
        if (input) {
          input.value = base64String;
        }
      };
      reader.readAsDataURL(file);
    }
  };
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
          <Button onClick={openAdd} className="rounded-full font-bold">
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
              {items.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>
                    <img alt={pet.name} src={pet.imageUrl} className="w-10 h-10 rounded-full object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${pet.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                      {pet.status}
                    </span>
                  </TableCell>
                  <TableCell>₹{pet.priceMin.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-500" onClick={() => openEdit(pet)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(pet.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Pet" : "Add Pet"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editing?.name || ""} id="pet-name" />
              </div>
              <div className="space-y-2">
                <Label>Breed</Label>
                <Input defaultValue={editing?.breed || ""} id="pet-breed" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input defaultValue={editing?.type || "dog"} id="pet-type" />
              </div>
              <div className="space-y-2">
                <Label>Age Weeks</Label>
                <Input defaultValue={(editing?.ageWeeks || 0).toString()} id="pet-age" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Input defaultValue={editing?.gender || "Male"} id="pet-gender" />
              </div>
              <div className="space-y-2">
                <Label>Price Min</Label>
                <Input defaultValue={(editing?.priceMin || 0).toString()} id="pet-price-min" />
              </div>
              <div className="space-y-2">
                <Label>Price Max</Label>
                <Input defaultValue={(editing?.priceMax || 0).toString()} id="pet-price-max" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Input defaultValue={editing?.status || "Available"} id="pet-status" />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label>Image</Label>
                <div className="flex flex-col gap-2">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  <div className="text-xs text-muted-foreground">Or paste URL below:</div>
                </div>
                <Input defaultValue={editing?.imageUrl || ""} id="pet-image" placeholder="Image URL or Base64" />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label>Description</Label>
                <Input defaultValue={editing?.description || ""} id="pet-description" />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="button" onClick={() => {
                const name = (document.getElementById("pet-name") as HTMLInputElement).value;
                const breed = (document.getElementById("pet-breed") as HTMLInputElement).value;
                const type = (document.getElementById("pet-type") as HTMLInputElement).value as Pet["type"];
                const ageWeeks = parseInt((document.getElementById("pet-age") as HTMLInputElement).value || "0", 10);
                const gender = (document.getElementById("pet-gender") as HTMLInputElement).value as Pet["gender"];
                const priceMin = parseInt((document.getElementById("pet-price-min") as HTMLInputElement).value || "0", 10);
                const priceMax = parseInt((document.getElementById("pet-price-max") as HTMLInputElement).value || "0", 10);
                const status = (document.getElementById("pet-status") as HTMLInputElement).value as Pet["status"];
                const imageUrl = (document.getElementById("pet-image") as HTMLInputElement).value;
                const description = (document.getElementById("pet-description") as HTMLInputElement).value;
                if (!name) { alert("Please enter a name"); return; }
                upsert({ id: editing?.id || -1, name, breed, type, ageWeeks, gender, priceMin, priceMax, status, imageUrl, featured: false, description });
              }}>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
