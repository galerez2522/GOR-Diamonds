// This file is required by Next.js. The actual <html> and <body>
// are rendered inside src/app/[locale]/layout.tsx so we can set
// the correct lang and dir per locale (Hebrew RTL / English LTR).

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
