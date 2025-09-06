import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productCamera from "@/assets/product-camera.jpg";
import productTable from "@/assets/product-table.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productBook from "@/assets/product-book.jpg";

// Mock data - in a real app, this would come from an API
const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];

const mockProducts = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: productBook,
    category: "Electronics",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "2",
    title: "Vintage Leather Jacket",
    price: 159.99,
    image: productHeadphones,
    category: "Fashion",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Smart Home Security Camera",
    price: 129.99,
    image: productJacket,
    category: "Electronics",
    rating: 4.3,
    isNew: true,
  },
  {
    id: "4",
    title: "Minimalist Coffee Table",
    price: 299.99,
    image: productCamera,
    category: "Home",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Running Shoes - Ultra Comfort",
    price: 119.99,
    image: productTable,
    category: "Sports",
    rating: 4.7,
  },
  {
    id: "6",
    title: "Programming Fundamentals Book",
    price: 39.99,
    image: productShoes,
    category: "Books",
    rating: 4.4,
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-4xl">
          <div className="float-animation mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover Amazing
              <span className="gradient-text block">Products</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your one-stop marketplace for everything you need. Buy, sell, and discover 
            unique products from trusted sellers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="shadow-button" asChild>
              <Link to="#products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-glass" asChild>
              <Link to="/add-product">
                <Plus className="w-5 h-5 mr-2" />
                Start Selling
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 border-b border-glass-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-input border-none h-12"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-button"
                      : "btn-glass hover:bg-primary/10"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Filter Button */}
            <Button variant="outline" className="btn-glass">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard
                    {...product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    onAddToCart={() => {
                      // Add to cart logic
                      console.log(`Added ${product.title} to cart`);
                    }}
                    onClick={() => {
                      // Navigate to product details
                      console.log(`Navigate to product ${product.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <Link
        to="/add-product"
        className="fixed bottom-6 right-6 z-40 md:hidden"
      >
        <Button size="lg" className="rounded-full w-14 h-14 p-0 shadow-button">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;