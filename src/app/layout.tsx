import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Manrope } from 'next/font/google'
import { cn } from '@/lib/utils'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "SACCMCT '25",
  description: "Sir Arthur C. Clarke Memorial Challenge Trophy 2025 - Anandian Astronomical Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}



// import { Manrope } from 'next/font/google'
// import { cn } from '@/lib/utils'
// import './globals.css'

// const fontHeading = Manrope({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading',
// })

// const fontBody = Manrope({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-body',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body 
//         className={cn(
//           'antialiased',
//           fontHeading.variable,
//           fontBody.variable
//         )}
//       >
//         {children}
//       </body>
//     </html>
//   )
// }