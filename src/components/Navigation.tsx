import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Plus, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-card rounded-none border-0 border-b border-glass-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">MarketPlace</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 glass-input border-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`${isActive("/") ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isActive("/add-product") ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link to="/add-product">
                <Plus className="w-4 h-4 mr-2" />
                Sell
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isActive("/favorites") ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link to="/favorites">
                <Heart className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isActive("/cart") ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link to="/cart">
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isActive("/profile") ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link to="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 glass-input border-none"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-glass-border">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/add-product" onClick={() => setIsMenuOpen(false)}>
                <Plus className="w-4 h-4 mr-2" />
                Sell Product
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Cart
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="default" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;