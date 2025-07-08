import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FlashcardDeck } from "@/components/flashcards/flashcard-deck"
import { NotFound } from "@/components/ui/not-found"
import { DecksDAO } from "@/lib/dao"

interface DeckPageProps {
  params: {
    id: string
  }
}

export default async function DeckPage({ params }: DeckPageProps) {
  // Await params to get the actual values
  const resolvedParams = await params
  
  // Validate that the ID is a UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const isValidUuid = uuidRegex.test(resolvedParams.id)

  if (!isValidUuid) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <NotFound />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Fetch deck with cards using DAO
  const deckWithCards = await DecksDAO.findByIdWithCards(resolvedParams.id)

  if (!deckWithCards) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <NotFound />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-amber-500 mb-4">{deckWithCards.title}</h1>

            <p className="text-amber-200/80 mb-8 max-w-3xl mx-auto">{deckWithCards.description}</p>

            <div className="art-deco-divider w-full max-w-md mx-auto"></div>
          </div>

          <div className="mt-8">
            <FlashcardDeck deck={deckWithCards} cards={deckWithCards.cards} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
