import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { SignInButton } from "@/components/auth/sign-in-button"

export default async function Home() {
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MotionWrapper>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
                  Welcome to the Speakeasy
                </h1>
                <p className="text-xl text-amber-200/80 mb-8">
                  Step back into the Roaring Twenties with our flashcard system. The perfect way to test your knowledge
                  in style.
                </p>
                <div className="art-deco-divider w-full max-w-md mx-auto"></div>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MotionWrapper whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600 px-8"
                    >
                      <Link href="/decks">Browse Decks</Link>
                    </Button>
                  </MotionWrapper>
                  <SignInButton />
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
