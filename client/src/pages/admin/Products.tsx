import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";

export default function AdminProducts() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({ queryKey: ["/api/products"] });

  const createMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id">) => {
      const res = await apiRequest("POST", "/api/products", product);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product added successfully" });
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (product: Product) => {
      const res = await apiRequest("PATCH", `/api/products/${product.id}`, product);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product updated successfully" });
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted" });
    },
  });

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
    deleteMutation.mutate(id);
  };

  const handleSave = (productData: any) => {
    if (editing) {
      updateMutation.mutate({ ...productData, id: editing.id });
    } else {
      createMutation.mutate(productData);
    }
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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  const items = products || [];

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
              <Button type="button"
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => {
                  const name = (document.getElementById("product-name") as HTMLInputElement).value;
                  const category = (document.getElementById("product-category") as HTMLInputElement).value;
                  const price = parseInt((document.getElementById("product-price") as HTMLInputElement).value || "0", 10);
                  const imageUrl = (document.getElementById("product-image") as HTMLInputElement).value;
                  const description = (document.getElementById("product-description") as HTMLInputElement).value;
                  if (!name) return alert("Please enter a name");

                  handleSave({ name, category, price, imageUrl, description });
                }}>
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
