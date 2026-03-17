import "./globals.css";

export const metadata = {
  title: "Jooby",
  description: "Jobs for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}