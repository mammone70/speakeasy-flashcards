import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { DecksDAO } from "@/lib/dao"

export default async function DecksPage() {
  // Fetch public decks using DAO
  const decks = await DecksDAO.findPublic()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <h1 className="text-4xl font-serif font-bold text-amber-500 mb-8">Available Decks</h1>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks && decks.length > 0 ? (
              decks.map((deck, index) => (
                <MotionWrapper
                  key={deck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-amber-400">{deck.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-amber-200/70 line-clamp-3">{deck.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="w-full bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600"
                      >
                        <Link href={`/decks/${deck.id}`}>Study Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </MotionWrapper>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-amber-200/70 mb-4">No decks available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
