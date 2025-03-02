
import React from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover-scale glass-card">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-white flex items-center justify-center p-6 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="object-contain h-48 w-full"
            loading="lazy"
            style={{
              opacity: 0,
              animation: 'fade-in 0.5s ease-out forwards',
              animationDelay: '0.1s'
            }}
            onLoad={(e) => (e.target as HTMLImageElement).style.opacity = '1'}
          />
        </div>
        <div className="p-4">
          <div className="flex items-start gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {product.category}
            </span>
          </div>
          <h3 className="font-medium text-sm truncate mb-2" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
