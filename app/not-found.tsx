import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NotFound } from "@/components/ui/not-found"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <NotFound
            title="Page Not Found"
            message="Sorry, we couldn't find the page you're looking for."
            backLink="/"
            backText="Return Home"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
