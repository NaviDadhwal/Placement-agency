import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Make My Aim | Job Placement Company & Recruitment SaaS',
  description:
    'Where Top Talent Meets Top Employers. Fast, zero-friction placement agency portal connecting candidates and hiring partners across Ludhiana, Baddi, Mohali, Chandigarh, and Pan India.',
  keywords: [
    'Make My Aim',
    'Job Placement Company',
    'Ludhiana Placement Agency',
    'Baddi Pharma Jobs',
    'Mohali IT Recruitment',
    'Pan India Hiring',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.className} antialiased bg-[#F8FAFC] text-[#0F172A]`}>
        {children}
      </body>
    </html>
  );
}
