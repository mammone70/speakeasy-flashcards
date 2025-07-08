-- Migration: Ensure cards.deck_id cascades on delete of decks.id

ALTER TABLE cards DROP CONSTRAINT IF EXISTS cards_deck_id_fkey;
ALTER TABLE cards
  ADD CONSTRAINT cards_deck_id_fkey
  FOREIGN KEY (deck_id)
  REFERENCES decks(id)
  ON DELETE CASCADE; 