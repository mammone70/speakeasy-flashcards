import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function DeckLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="h-10 w-64 bg-amber-900/30 rounded-md animate-pulse mb-4"></div>
          <div className="h-6 w-full max-w-3xl bg-amber-900/20 rounded-md animate-pulse mb-8"></div>

          <div className="art-deco-divider w-full max-w-md"></div>

          <div className="mt-8 max-w-2xl mx-auto">
            <Card className="border-amber-800/30 bg-amber-950/20">
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
