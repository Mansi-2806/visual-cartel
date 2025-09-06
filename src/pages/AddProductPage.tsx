import { useState } from "react";
import { Upload, X, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books & Media",
  "Health & Beauty",
  "Automotive",
  "Toys & Games",
  "Arts & Crafts",
  "Other"
];

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Product data:", { ...formData, images });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" className="btn-glass" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">Fill in the details to list your product</p>
          </div>
        </div>

        {/* Form */}
        <Card className="glass-card rounded-2xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Upload */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Product Images</Label>
              
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragOver 
                    ? "border-primary bg-primary/5" 
                    : "border-glass-border bg-glass-bg"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop images here, or click to browse
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="btn-glass"
                  onClick={() => document.getElementById("image-input")?.click()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
                <input
                  id="image-input"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">Product Title</Label>
              <Input
                id="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="glass-input border-none h-12"
                required
              />
            </div>

            {/* Category and Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-semibold">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="glass-input border-none h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-glass-border">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-semibold">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                  <SelectTrigger className="glass-input border-none h-12">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-glass-border">
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-lg font-semibold">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="pl-8 glass-input border-none h-12"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your product in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="glass-input border-none min-h-32 resize-none"
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 btn-glass h-12" asChild>
                <Link to="/">Cancel</Link>
              </Button>
              <Button type="submit" className="flex-1 h-12 shadow-button">
                List Product
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddProductPage;