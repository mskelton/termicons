import Footer from "../components/Footer"
import Header from "../components/Header"
import "./globals.css"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head></head>

      <body>
        <Header />
        <main className="mx-auto max-w-7xl py-12 px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export interface RootLayoutProps {
  children: React.ReactNode
}
