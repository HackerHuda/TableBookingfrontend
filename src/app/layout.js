import "./globals.css";
export const metadata = {
  title: 'Restaurant Table Booking',
  description: 'A responsive table booking system.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-gray-50">{children}</body>
    </html>
  );
}
