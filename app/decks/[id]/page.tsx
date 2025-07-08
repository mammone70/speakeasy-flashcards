import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FlashcardDeck } from "@/components/flashcards/flashcard-deck"
import { NotFound } from "@/components/ui/not-found"
import { DecksDAO, CardsDAO } from "@/lib/dao"

interface DeckPageProps {
  params: {
    id: string
  }
}

export default async function DeckPage({ params }: DeckPageProps) {
  // Validate that the ID is a UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const isValidUuid = uuidRegex.test(params.id)

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

  // Fetch deck using DAO
  const deck = await DecksDAO.findById(params.id)

  if (!deck) {
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

  // Fetch cards for this deck using DAO
  const cards = await CardsDAO.findByDeckId(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-amber-500 mb-4">{deck.title}</h1>

          <p className="text-amber-200/80 mb-8 max-w-3xl">{deck.description}</p>

          <div className="art-deco-divider w-full max-w-md"></div>

          <div className="mt-8">
            <FlashcardDeck deck={deck} cards={cards} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
