-- Seed data for Speakeasy Flashcards
-- This file is automatically run when using `supabase db reset`

-- Insert admin user
INSERT INTO users (id, email, display_name, role) VALUES 
('00000000-0000-0000-0000-000000000001', 'admin@speakeasy.com', 'Admin User', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Insert sample decks
INSERT INTO decks (title, description, created_by, is_public) VALUES 
('Spanish Basics', 'Essential Spanish vocabulary and phrases for beginners', '00000000-0000-0000-0000-000000000001', true),
('French Greetings', 'Common French greetings and introductions', '00000000-0000-0000-0000-000000000001', true),
('German Numbers', 'Learn to count in German from 1 to 100', '00000000-0000-0000-0000-000000000001', true),
('Italian Food Vocabulary', 'Essential Italian words for food and dining', '00000000-0000-0000-0000-000000000001', true),
('Japanese Hiragana', 'Learn the basic Japanese hiragana characters', '00000000-0000-0000-0000-000000000001', true)
ON CONFLICT DO NOTHING;

-- Insert Spanish cards
INSERT INTO cards (deck_id, front_content, back_content) 
SELECT d.id, c.front_content, c.back_content
FROM decks d
CROSS JOIN (VALUES 
  ('Hello', 'Hola'),
  ('Goodbye', 'Adiós'),
  ('Please', 'Por favor'),
  ('Thank you', 'Gracias'),
  ('You''re welcome', 'De nada'),
  ('How are you?', '¿Cómo estás?'),
  ('I''m fine', 'Estoy bien'),
  ('What''s your name?', '¿Cómo te llamas?'),
  ('My name is...', 'Me llamo...'),
  ('Nice to meet you', 'Mucho gusto')
) AS c(front_content, back_content)
WHERE d.title = 'Spanish Basics'
ON CONFLICT DO NOTHING;

-- Insert French cards
INSERT INTO cards (deck_id, front_content, back_content) 
SELECT d.id, c.front_content, c.back_content
FROM decks d
CROSS JOIN (VALUES 
  ('Hello', 'Bonjour'),
  ('Goodbye', 'Au revoir'),
  ('Please', 'S''il vous plaît'),
  ('Thank you', 'Merci'),
  ('You''re welcome', 'De rien'),
  ('How are you?', 'Comment allez-vous?'),
  ('I''m fine', 'Je vais bien'),
  ('What''s your name?', 'Comment vous appelez-vous?'),
  ('My name is...', 'Je m''appelle...'),
  ('Nice to meet you', 'Enchanté')
) AS c(front_content, back_content)
WHERE d.title = 'French Greetings'
ON CONFLICT DO NOTHING;

-- Insert German cards
INSERT INTO cards (deck_id, front_content, back_content) 
SELECT d.id, c.front_content, c.back_content
FROM decks d
CROSS JOIN (VALUES 
  ('1', 'Eins'),
  ('2', 'Zwei'),
  ('3', 'Drei'),
  ('4', 'Vier'),
  ('5', 'Fünf'),
  ('6', 'Sechs'),
  ('7', 'Sieben'),
  ('8', 'Acht'),
  ('9', 'Neun'),
  ('10', 'Zehn')
) AS c(front_content, back_content)
WHERE d.title = 'German Numbers'
ON CONFLICT DO NOTHING;

-- Insert Italian cards
INSERT INTO cards (deck_id, front_content, back_content) 
SELECT d.id, c.front_content, c.back_content
FROM decks d
CROSS JOIN (VALUES 
  ('Pizza', 'Pizza'),
  ('Pasta', 'Pasta'),
  ('Bread', 'Pane'),
  ('Cheese', 'Formaggio'),
  ('Wine', 'Vino'),
  ('Water', 'Acqua'),
  ('Coffee', 'Caffè'),
  ('Restaurant', 'Ristorante'),
  ('Menu', 'Menu'),
  ('Delicious', 'Delizioso')
) AS c(front_content, back_content)
WHERE d.title = 'Italian Food Vocabulary'
ON CONFLICT DO NOTHING;

-- Insert Japanese cards
INSERT INTO cards (deck_id, front_content, back_content) 
SELECT d.id, c.front_content, c.back_content
FROM decks d
CROSS JOIN (VALUES 
  ('あ', 'a'),
  ('い', 'i'),
  ('う', 'u'),
  ('え', 'e'),
  ('お', 'o'),
  ('か', 'ka'),
  ('き', 'ki'),
  ('く', 'ku'),
  ('け', 'ke'),
  ('こ', 'ko')
) AS c(front_content, back_content)
WHERE d.title = 'Japanese Hiragana'
ON CONFLICT DO NOTHING; 