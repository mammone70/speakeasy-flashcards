import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { DecksDAO } from "@/lib/dao"

export default async function Home() {
  // Fetch the featured decks to get their actual IDs using DAO
  const featuredDecks = await DecksDAO.findByTitles(["Prohibition Era", "Jazz Age Slang", "Classic Cocktails"])

  // Create a map of deck titles to their IDs
  const deckMap =
    featuredDecks?.reduce(
      (acc, deck) => {
        acc[deck.title] = deck.id
        return acc
      },
      {} as Record<string, string>,
    ) || {}

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
                  <MotionWrapper whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100 px-8"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </MotionWrapper>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        <section className="py-16 bg-amber-950/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-amber-500 mb-10 text-center">Featured Decks</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-amber-400">Prohibition Era</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-amber-200/70">
                        Learn about the American Prohibition era of the 1920s
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
                      >
                        <Link href={`/decks/${deckMap["Prohibition Era"] || ""}`}>Study Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </MotionWrapper>

                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-amber-400">Jazz Age Slang</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-amber-200/70">
                        Common slang terms from the Roaring Twenties
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
                      >
                        <Link href={`/decks/${deckMap["Jazz Age Slang"] || ""}`}>Study Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </MotionWrapper>

                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-amber-400">Classic Cocktails</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-amber-200/70">
                        Famous cocktail recipes from the speakeasy era
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
                      >
                        <Link href={`/decks/${deckMap["Classic Cocktails"] || ""}`}>Study Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
