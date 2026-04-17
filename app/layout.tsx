import './globals.css';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'Akkume',
  description: 'Bitcoin reserve layer for housing finance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
