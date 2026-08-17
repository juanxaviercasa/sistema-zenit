import type { Metadata } from "next";
import { STIX_Two_Text, Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

type LayoutProps = { children: React.ReactNode };

const stixTwoText = STIX_Two_Text({
  variable: "--font-stix-two-text",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sistema Zenit — Prepárate para el examen UNI",
    template: "%s · Sistema Zenit",
  },
  description:
    "Plataforma de preparación para el examen de admisión a la UNI: teoría rigurosa, visualizaciones interactivas y práctica al nivel que exige el examen.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="es"
      className={`${stixTwoText.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
