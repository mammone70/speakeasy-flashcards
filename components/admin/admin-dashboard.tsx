"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeckList } from "@/components/admin/deck-list"
import { DeckForm } from "@/components/admin/deck-form"
import { CardList } from "@/components/admin/card-list"
import { CardForm } from "@/components/admin/card-form"
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDecks, getCards } from "@/lib/actions"
import type { Deck, Card } from "@/lib/db/schemas"

export function AdminDashboard() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("decks")

  const fetchDecks = async () => {
    try {
      setIsLoading(true)
      const data = await getDecks()
      setDecks(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCards = async (deckId?: string) => {
    try {
      setIsLoading(true)
      const data = await getCards(deckId)
      setCards(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  useEffect(() => {
    if (selectedDeck) {
      fetchCards(selectedDeck.id)
    } else if (activeTab === "cards") {
      fetchCards()
    }
  }, [selectedDeck, activeTab])

  const handleDeckSelect = (deck: Deck) => {
    setSelectedDeck(deck)
    setActiveTab("cards")
  }

  const handleDeckSaved = () => {
    fetchDecks()
    setSelectedDeck(null)
  }

  const handleCardSaved = () => {
    if (selectedDeck) {
      fetchCards(selectedDeck.id)
    } else {
      fetchCards()
    }
    setSelectedCard(null)
  }

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-amber-500 mb-8">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-amber-950 border border-amber-800/30">
          <TabsTrigger
            value="decks"
            className="flex-1 data-[state=active]:bg-amber-800 data-[state=active]:text-amber-100"
          >
            Decks
          </TabsTrigger>
          <TabsTrigger
            value="cards"
            className="flex-1 data-[state=active]:bg-amber-800 data-[state=active]:text-amber-100"
          >
            Cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="decks" className="mt-6">
          <UICard className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-amber-400">
                {selectedDeck ? "Edit Deck" : "Create New Deck"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeckForm deck={selectedDeck} onSave={handleDeckSaved} onCancel={() => setSelectedDeck(null)} />
            </CardContent>
          </UICard>

          <UICard className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-amber-400">Manage Decks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[500px]">
                <DeckList
                  decks={decks}
                  isLoading={isLoading}
                  onSelect={setSelectedDeck}
                  onDelete={fetchDecks}
                  onManageCards={handleDeckSelect}
                />
              </ScrollArea>
            </CardContent>
          </UICard>
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          {selectedDeck && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-amber-400">Cards for: {selectedDeck.title}</h2>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
                onClick={() => setSelectedDeck(null)}
              >
                View All Cards
              </Button>
            </div>
          )}

          <UICard className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-amber-400">
                {selectedCard ? "Edit Card" : "Create New Card"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardForm
                card={selectedCard}
                decks={decks}
                selectedDeckId={selectedDeck?.id}
                onSave={handleCardSaved}
                onCancel={() => setSelectedCard(null)}
              />
            </CardContent>
          </UICard>

          <UICard className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-amber-400">Manage Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[500px]">
                <CardList
                  cards={cards}
                  isLoading={isLoading}
                  onSelect={setSelectedCard}
                  onDelete={() => fetchCards(selectedDeck?.id)}
                />
              </ScrollArea>
            </CardContent>
          </UICard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
