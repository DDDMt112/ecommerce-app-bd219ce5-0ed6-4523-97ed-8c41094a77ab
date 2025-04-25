import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { CartProvider } from '@/contexts/CartContext';

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CartProvider>
        <main className="min-h-screen bg-background">
          <Outlet />
        </main>
      </CartProvider>
    </ThemeProvider>
  );
}
