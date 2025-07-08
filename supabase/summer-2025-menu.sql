-- Insert new deck: Summer 2025 Menu
INSERT INTO decks (id, title, description, created_by, is_public, created_at, updated_at)
VALUES
  ('b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f', 'Summer 2025 Menu', 'All cocktails from the 1122 menu, April 2025', NULL, TRUE, NOW(), NOW());

-- Insert cards for Summer 2025 Menu deck
INSERT INTO cards (id, deck_id, front_content, back_content, created_at, updated_at) VALUES
-- GARDEN VARIETY
('a1b2c3d4-1111-2222-3333-444455556666', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'GARDEN VARIETY',
'Inspired by traditional martini w/ garden variety flavors
2oz Basil Infused Gin
1oz Tomato Water
.5oz Lillet Blanc
6 drops Saline Solution (1:1)
Build: Dry Shake/Strained into shaker/bruised/Cocktail Glass (half salt rim)
Garnish: cherry tomato wrapped with basil leaf and speared, mozzarella ball', NOW(), NOW()),
-- CLUELESS
('b2c3d4e5-2222-3333-4444-555566667777', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'CLUELESS',
'Named after the movie and also being clueless in the game of golf. Arnold Palmer inspired.
Muddle 4 raspberries
1oz Monkey Shoulder
.5oz Vodka
.75oz raspberry syrup
1.5oz Lemon Juice
2oz housemade pure leaf unsweetened tea
1.25in cubes
Build: Dry Shake/basket strain/maison jar
Garnish: raspberries on pick/thin lemon wheel/Mint Bouquet', NOW(), NOW()),
-- LIGHT THE FIRE
('c3d4e5f6-3333-4444-5555-666677778888', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'LIGHT THE FIRE',
'Spicy Cocktail, Summer camp fires
1.5oz Apricot/Habanero Infused Vodka
.5oz Apricot Liqueur
.5oz Amaro Nonino
.5oz Lemon Juice
.5oz Honey Syrup
Build: Stir/Strain/Bruised/Cocktail Glass
Garnish: Lemon twist w/channel knife', NOW(), NOW()),
-- ALLIGATOR TAIL
('d4e5f6a7-4444-5555-6666-777788889999', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'ALLIGATOR TAIL',
'2oz Mezcal
.5oz Montenegro
3 dashes Eucalyptus Bitters
2 drops Reaper Tincture
Build: Stir/Strain/DBL Of Glass
Garnish: Rinse glass with green Chartreuse and rosemary sprig (torch both). Put out flame w/1-2 sprays of key lime extract (cherry wood)', NOW(), NOW()),
-- BUTTER PECAN OF
('e5f6a7b8-5555-6666-7777-888899990000', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'BUTTER PECAN OF',
'2oz Old Forester Bourbon
.75oz Pecan Syrup
Dashes Angostura Bitters
Dashes Orange Bitters
Build: in Cinnamon smoked glass
Garnish: torched cinnamon stick and orange peel cut on bias', NOW(), NOW()),
-- DISTANT WHISPER
('f6a7b8c9-6666-7777-8888-999900001111', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'DISTANT WHISPER',
'1.5oz Lemon Lavender Vodka
.5oz Borghetti
.25oz Biscotti
1.5oz Cold Brew Concentrate
Build: Shake/Strain/Ramos Glass
1.25in Cubes up to last inch
Fill with CB Pearls
Top with Coconut Milk
Garnish: with lavender flower and lemon peel', NOW(), NOW()),
-- CLARIFIED GRASSHOPPER
('a7b8c9d0-7777-8888-9999-000011112222', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'CLARIFIED GRASSHOPPER',
'Serve in cold choc dipped Rocks glass
Large ice cube', NOW(), NOW()),
-- NTS
('b8c9d0e1-8888-9999-0000-111122223333', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'NTS',
'1.5oz Vodka
.5oz NTS Cheater
.5oz GF Juice
.5oz Lemon
.5oz Lime
.25oz Grenadine
Build: Shake/Strain/Collins Glass/Pebble Ice
Garnish: Edible Orchid/Lemon peel on bias', NOW(), NOW()),
-- MATTY''S GIN & TONIC
('c9d0e1f2-9999-0000-1111-222233334444', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'MATTY''S GIN & TONIC',
'1.5oz Junipero Gin
.25oz Italicus
.75oz Jack Rudy Tonic Syrup
7 drops Citric acid (1:1)
Fill w/Soda Water
Build: in CHILLED Collins glass/1.25in cubes/stir
Garnish: Rosemary sprig/Lime wheel/atomized key lime extract spritz', NOW(), NOW()),
-- STRAWBERRY COCONUT DAIQUIRI
('d0e1f2a3-0000-1111-2222-333344445555', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'STRAWBERRY COCONUT DAIQUIRI',
'1.5oz Light Rum
.75oz Strawberry Coconut Syrup
.75oz Coconut Cream
1oz Lime Juice
Build: shake/Double strain/coupe glass
Garnish: Lime Wheel/2 Strawberry Slices Fanned out', NOW(), NOW()),
-- 1122 PALOMA
('e1f2a3b4-1111-2222-3333-444455556666', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'1122 PALOMA',
'2oz Blanco Tequila
.5oz Agave
.5oz Lime
.75oz Grapefruit
Build: Shake/Strain/Globe/1.25oz Cubes
Fill with Jalapeño Grapefruit Soda
Garnish: Lime wheel and Grapefruit peel twist', NOW(), NOW()),
-- NEGRONI
('f2a3b4c5-2222-3333-4444-555566667777', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'NEGRONI',
'1oz Junipero
1oz Campari
1oz Bordiga Rosso
Build: Stir/Strain/DBL Of Glass/Big Rock
Garnish: Y Peeler orange twist', NOW(), NOW()),
-- PAPER PLANE (CHEATER?)
('a3b4c5d6-3333-4444-5555-666677778888', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'PAPER PLANE (CHEATER?)',
'.75oz Bourbon
.75oz Aperol
.75oz Amaro Nonino
.75oz Lemon Juice
Build: Shake/Double Strain/Coupe
Garnish: lemon peel expressed/tossed/paper plane', NOW(), NOW()),
-- COSMOPOLITAN (CHEATER)
('b4c5d6e7-4444-5555-6666-777788889999', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'COSMOPOLITAN (CHEATER)',
'1.5oz Vodka
.75oz curacao
.75oz Lime Juice
.5oz Cranberry Juice
Build: shake/Double strain/cocktail glass
Garnish: lime wheel', NOW(), NOW()),
-- CREOLE COCKTAIL NO.2
('c5d6e7f8-5555-6666-7777-888899990000', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'CREOLE COCKTAIL NO.2',
'1.5oz Rye Whiskey
1oz Rosso Vermouth
.5oz China China Amer
.5oz Averna Amaro
Build: stir/strain/coupe glass
Garnish: long Y peeler Orange twist expressed and dropped into cocktail', NOW(), NOW()),
-- GIN RICKEY
('d6e7f8a9-6666-7777-8888-999900001111', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'GIN RICKEY',
'2oz Junipero
.5oz Lime Juice
Top w/soda water
Build: in Collins glass/1.25oz Cubes
Garnish: Thin Lime Wheel Halves in glass and full thicker wheel on rim', NOW(), NOW()),
-- WHITE LADY
('e7f8a9b0-7777-8888-9999-000011112222', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'WHITE LADY',
'2oz Gin
.5oz Curacao (Pierre ferrand)
.5oz Lemon Juice
1 Eggwhite
.5oz Cane
Build: Reverse Dry Shake/Double Strain/Cocktail Glass
Garnish: lemon peel Expressed/wiped rim Tossed out', NOW(), NOW()),
-- TWELVE MILE LIMIT
('f8a9b0c1-8888-9999-0000-111122223333', 'b2e3c1a4-7e2b-4c1a-9e1a-1e2b3c4d5e6f',
'TWELVE MILE LIMIT',
'1oz White Rum
.5oz Rye Whiskey
.5oz Raynal
.5oz Lemon Juice
.25oz Grenadine
Build: Shake/Double Strain/Coupe Glass
Garnish: Skewered Luxardo cherry', NOW(), NOW()); 