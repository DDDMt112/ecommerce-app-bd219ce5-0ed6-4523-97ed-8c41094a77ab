import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">购物车是空的</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              继续购物
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">购物车</h1>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            继续购物
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <Card key={item.product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{item.product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <p className="text-muted-foreground mb-2">{item.product.description}</p>
                  <p className="text-lg font-semibold">¥{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 0)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <p className="text-lg font-semibold">
                小计: ¥{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end items-center gap-4">
        <div className="text-xl font-bold">
          总计: ¥{total.toFixed(2)}
        </div>
        <Button size="lg">结算</Button>
      </div>
    </div>
  );
}
