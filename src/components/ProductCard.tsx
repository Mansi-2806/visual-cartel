import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

const ProductCard = ({
  title,
  price,
  image,
  category,
  rating = 0,
  isNew = false,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  onClick,
}: ProductCardProps) => {
  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <Badge variant="secondary" className="bg-success text-white">New</Badge>}
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">{category}</Badge>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-2">{title}</h3>
        
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;