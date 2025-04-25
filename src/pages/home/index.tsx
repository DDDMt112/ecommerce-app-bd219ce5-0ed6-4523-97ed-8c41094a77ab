import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/shop';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { addToCart, items } = useCart();
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: '智能手表',
      price: 15.00,
      image: 'https://png.pngtree.com/background/20211215/original/pngtree-blue-sky-and-white-clouds-pure-sky-material-picture-image_1475606.jpg',
      description: '新一代智能手表，支持心率监测、运动追踪等功能'
    },
    {
      id: 2,
      name: '无线耳机',
      price: 15.00,
      image: 'https://png.pngtree.com/background/20211215/original/pngtree-blue-sky-and-white-clouds-pure-sky-material-picture-image_1475606.jpg',
      description: '高品质无线耳机，支持主动降噪'
    },
    {
      id: 3,
      name: '智能音箱',
      price: 15.00,
      image: 'https://png.pngtree.com/background/20211215/original/pngtree-blue-sky-and-white-clouds-pure-sky-material-picture-image_1475606.jpg',
      description: '智能语音助手，支持多种智能家居控制'
    },
  ]);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // 获取每个商品在购物车中的数量
  const getProductQuantity = (productId: number) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">商品列表</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/cart" className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              购物车 ({cartItemsCount})
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const quantity = getProductQuantity(product.id);
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <a href={product.image} target="_self">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </a>
                <p className="text-muted-foreground mb-2">{product.description}</p>
                <p className="text-lg font-semibold">¥{product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <div className="w-full relative">
                  <Button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-amber-300 text-primary-foreground shadow hover:bg-amber-300/90 h-9 px-4 py-2 w-full"
                    onClick={() => addToCart(product)}
                  >
                    加入购物车
                  </Button>
                  {quantity > 0 && (
                    <Badge 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-red-500/80 absolute -top-2 -right-2 bg-red-500 text-white"
                      variant="default"
                    >
                      {quantity}
                    </Badge>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
