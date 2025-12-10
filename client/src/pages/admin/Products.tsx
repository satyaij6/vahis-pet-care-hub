import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { products, Product } from "@/lib/data";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminProducts() {
  const { toast } = useToast();
  const [items, setItems] = useLocalStorage<Product[]>("admin:products", products);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const openAdd = () => {
    setEditing(null);
    setIsOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Product deleted" });
  };

  const handleUpsert = (p: Product) => {
    if (editing) {
      setItems(items.map(x => x.id === p.id ? p : x));
      toast({ title: "Product updated" });
    } else {
      const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
      setItems([...items, { ...p, id: nextId }]);
      toast({ title: "Product added" });
    }
    setIsOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const input = document.getElementById("product-image") as HTMLInputElement;
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
            <h1 className="font-bold text-2xl">Manage Products</h1>
          </div>
          <Button onClick={openAdd} className="rounded-full font-bold">
            <Plus size={18} className="mr-2" /> Add New Product
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img alt={product.name} src={product.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-500" onClick={() => openEdit(product)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(product.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input defaultValue={editing?.name || ""} id="product-name" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input defaultValue={editing?.category || "Food"} id="product-category" />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input defaultValue={editing?.price?.toString() || "0"} id="product-price" />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex flex-col gap-2">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  <div className="text-xs text-muted-foreground">Or paste URL below:</div>
                </div>
                <Input defaultValue={editing?.imageUrl || ""} id="product-image" placeholder="Image URL or Base64" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input defaultValue={editing?.description || ""} id="product-description" />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="button" onClick={() => {
                // Read values
                const name = (document.getElementById("product-name") as HTMLInputElement).value;
                const category = (document.getElementById("product-category") as HTMLInputElement).value as Product["category"];
                const price = parseInt((document.getElementById("product-price") as HTMLInputElement).value || "0", 10);
                const imageUrl = (document.getElementById("product-image") as HTMLInputElement).value;
                const description = (document.getElementById("product-description") as HTMLInputElement).value;
                if (!name) return alert("Please enter a name");
                handleUpsert({ id: editing?.id ?? -1, name, category, price, imageUrl, description });
              }}>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
