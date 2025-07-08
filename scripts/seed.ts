import { db } from "../lib/db"
import { decks, cards, users } from "../lib/db/schema"

async function seed() {
    console.log("🌱 Seeding database...")

    try {
        // Create a sample admin user
        const adminUser = await db.insert(users).values({
            id: "00000000-0000-0000-0000-000000000001",
            email: "admin@speakeasy.com",
            displayName: "Admin User",
            role: "admin",
        }).returning()

        console.log("✅ Created admin user")

        // Create sample decks
        const sampleDecks = [
            {
                title: "Spanish Basics",
                description: "Essential Spanish vocabulary and phrases for beginners",
                createdBy: adminUser[0].id,
                isPublic: true,
            },
            {
                title: "French Greetings",
                description: "Common French greetings and introductions",
                createdBy: adminUser[0].id,
                isPublic: true,
            },
            {
                title: "German Numbers",
                description: "Learn to count in German from 1 to 100",
                createdBy: adminUser[0].id,
                isPublic: true,
            },
            {
                title: "Italian Food Vocabulary",
                description: "Essential Italian words for food and dining",
                createdBy: adminUser[0].id,
                isPublic: true,
            },
            {
                title: "Japanese Hiragana",
                description: "Learn the basic Japanese hiragana characters",
                createdBy: adminUser[0].id,
                isPublic: true,
            },
        ]

        const createdDecks = await db.insert(decks).values(sampleDecks).returning()
        console.log("✅ Created sample decks")

        // Create sample cards for each deck
        const spanishCards = [
            { frontContent: "Hello", backContent: "Hola" },
            { frontContent: "Goodbye", backContent: "Adiós" },
            { frontContent: "Please", backContent: "Por favor" },
            { frontContent: "Thank you", backContent: "Gracias" },
            { frontContent: "You're welcome", backContent: "De nada" },
            { frontContent: "How are you?", backContent: "¿Cómo estás?" },
            { frontContent: "I'm fine", backContent: "Estoy bien" },
            { frontContent: "What's your name?", backContent: "¿Cómo te llamas?" },
            { frontContent: "My name is...", backContent: "Me llamo..." },
            { frontContent: "Nice to meet you", backContent: "Mucho gusto" },
        ]

        const frenchCards = [
            { frontContent: "Hello", backContent: "Bonjour" },
            { frontContent: "Goodbye", backContent: "Au revoir" },
            { frontContent: "Please", backContent: "S'il vous plaît" },
            { frontContent: "Thank you", backContent: "Merci" },
            { frontContent: "You're welcome", backContent: "De rien" },
            { frontContent: "How are you?", backContent: "Comment allez-vous?" },
            { frontContent: "I'm fine", backContent: "Je vais bien" },
            { frontContent: "What's your name?", backContent: "Comment vous appelez-vous?" },
            { frontContent: "My name is...", backContent: "Je m'appelle..." },
            { frontContent: "Nice to meet you", backContent: "Enchanté" },
        ]

        const germanCards = [
            { frontContent: "1", backContent: "Eins" },
            { frontContent: "2", backContent: "Zwei" },
            { frontContent: "3", backContent: "Drei" },
            { frontContent: "4", backContent: "Vier" },
            { frontContent: "5", backContent: "Fünf" },
            { frontContent: "6", backContent: "Sechs" },
            { frontContent: "7", backContent: "Sieben" },
            { frontContent: "8", backContent: "Acht" },
            { frontContent: "9", backContent: "Neun" },
            { frontContent: "10", backContent: "Zehn" },
        ]

        const italianCards = [
            { frontContent: "Pizza", backContent: "Pizza" },
            { frontContent: "Pasta", backContent: "Pasta" },
            { frontContent: "Bread", backContent: "Pane" },
            { frontContent: "Cheese", backContent: "Formaggio" },
            { frontContent: "Wine", backContent: "Vino" },
            { frontContent: "Water", backContent: "Acqua" },
            { frontContent: "Coffee", backContent: "Caffè" },
            { frontContent: "Restaurant", backContent: "Ristorante" },
            { frontContent: "Menu", backContent: "Menu" },
            { frontContent: "Delicious", backContent: "Delizioso" },
        ]

        const japaneseCards = [
            { frontContent: "あ", backContent: "a" },
            { frontContent: "い", backContent: "i" },
            { frontContent: "う", backContent: "u" },
            { frontContent: "え", backContent: "e" },
            { frontContent: "お", backContent: "o" },
            { frontContent: "か", backContent: "ka" },
            { frontContent: "き", backContent: "ki" },
            { frontContent: "く", backContent: "ku" },
            { frontContent: "け", backContent: "ke" },
            { frontContent: "こ", backContent: "ko" },
        ]

        const allCards = [
            ...spanishCards.map(card => ({ ...card, deckId: createdDecks[0].id })),
            ...frenchCards.map(card => ({ ...card, deckId: createdDecks[1].id })),
            ...germanCards.map(card => ({ ...card, deckId: createdDecks[2].id })),
            ...italianCards.map(card => ({ ...card, deckId: createdDecks[3].id })),
            ...japaneseCards.map(card => ({ ...card, deckId: createdDecks[4].id })),
        ]

        await db.insert(cards).values(allCards)
        console.log("✅ Created sample cards")

        console.log("🎉 Database seeded successfully!")
        console.log(`📊 Created ${createdDecks.length} decks with ${allCards.length} cards`)

    } catch (error) {
        console.error("❌ Error seeding database:", error)
        process.exit(1)
    }
}

// Run the seed function
seed()
    .then(() => {
        console.log("✅ Seed script completed")
        process.exit(0)
    })
    .catch((error) => {
        console.error("❌ Seed script failed:", error)
        process.exit(1)
    }) 