
-- #INSERT INTO sestavina (naziv, kolicina, tk_recept) VALUES ('eggs', 3, 1);
 INSERT INTO recept (naslov, cas_priprave, skupni_cas, stevilo_porcij) VALUES ('Caaake', 190, 190, 12 ), 
    (' Pumpkin pasties', 77, 180, 6), 
    (' Butterbeer', 35, 35, 7 ), 
    (' Chocolate frogs', 235, 235, 8), 
    (' Choco', 20, 180, 9 ), 
    (' Butterbeer', 35, 35, 7 ), 
    (' Chocolate frogs', 235, 235, 13), 
    (' Choco', 20, 180, 7);;

 TRUNCATE TABLE sestavina;
 INSERT INTO sestavina (naziv, kolicina, enota, tk_recept) VALUES ('eggs', 3, '', 1),
    ('unsalted butter', 10, 'g', 1),
    ('dark cooking choco', 125, 'g', 1),
    ('unsalted butter', 10, 'g', 1),
    ('cream', 1.5, 'cup', 1),
    ('caster sugar', 3, 'tablespoons', 1);

TRUNCATE TABLE korak;
INSERT INTO korak (zaporedno_st, opis, tk_recept) VALUES 
    (1, 'For reliable results, work at a steady pace so your whipped egg whites and cream do not get too warm!', 1),
    (2, 'Separate eggs and yolks while eggs are cold. Place whites in a large bowl and yolks in a small bowl. Leave whites while you prepare other ingredients. Whisk yolks until uniform.', 1),
    (3, 'Whisk yolks until uniform.', 1),
    (4, 'Break chocolate into pieces and place in a microwave-proof bowl with the butter. Melt in the microwave in 30 second bursts, stirring in between, until smooth. (Stir in optional flavourings at this point, but read Note 6 first). Set aside to cool slightly while you proceed with other steps.', 1),
    (5, 'Beat cream until stiff peaks form, being careful not to over-whip', 1),
    (6, 'Whip whites: Add sugar. Beat whites until firm peaks form', 1),
    (7, 'Fold egg yolks into cream using a rubber spatula – 8 folds max. Some streaks is fine.', 1),
    (8, 'Check chocolate temperature: The chocolate should still be runny but warm (min 35C / 95F; ideal 40C / 104F). If too cool or thick, microwave in burst of 5 seconds at a time until runny.', 1),
    (9, 'Pour chocolate into cream yolk mixture. Fold through – 8 folds max. Some streaks here are ok.', 1),
    (10, 'Add 1/4 of beaten egg whites into chocolate mixture. Fold through until incorporated – "smear" the spatular across surface to blend white lumps in – aim for 10 folds.', 1),
    (11, 'Pour chocolate mixture into egg whites. Fold through until incorporated and no more white lumps remain – aim for 12 folds max, but ensure there are no obvious egg white patches.', 1),
    (12, 'Divide mixture between 4 small glasses or pots. Refrigerate for at least 6 hours, preferably overnight.', 1),
    (13, 'To serve, garnish with cream and chocolate shavings. Raspberries and a tiny sprig of mint for colour would also be lovely!', 1),
    (1, 'For reliable results, work at a steady pace so your whipped egg whites and cream do not get too warm!', 2),
    (2, 'Separate eggs and yolks while eggs are cold. Place whites in a large bowl and yolks in a small bowl. Leave whites while you prepare other ingredients. Whisk yolks until uniform.', 2),
    (3, 'Whisk yolks until uniform.', 2),
    (4, 'Break chocolate into pieces and place in a microwave-proof bowl with the butter. Melt in the microwave in 30 second bursts, stirring in between, until smooth. (Stir in optional flavourings at this point, but read Note 6 first). Set aside to cool slightly while you proceed with other steps.', 3),
    (5, 'Beat cream until stiff peaks form, being careful not to over-whip', 3),
    (6, 'Whip whites: Add sugar. Beat whites until firm peaks form', 3);
    TRUNCATE TABLE uporabnik;

INSERT INTO uporabnik (ime, priimek, email, username, geslo, admin) VALUES
    ('Kaja', 'Vidmar', 'kaja.vidmar@gmail.com', 'KajaV', 'geslo123', TRUE),
    ('Sanja', 'Muršič', 'sanja.mursic@gmail.com', 'SanjaM', 'geslo123', TRUE),
    ('Tara', 'Sedovšek', 'tara.sedovsek@gmail.com', 'TaraS', 'geslo123', TRUE),
    ('Jace', 'Novak', 'jace.novak@gmail.com', 'JaceN', 'geslo123', FALSE),
    ('Victor', 'Frankenstein', 'victor.frankenstein@picture.com', 'vic.fran', 'ustvarilsemPOŠAST', FALSE);
DROP TABLE sestavina;
DROP TABLE korak;
DROP TABLE komentar;
DROP TABLE uporabnik;
DROP TABLE recept;

INSERT INTO komentar (vsebina, tk_uporabnik, tk_recept, datum)
VALUES ('Zelo dobro! Moji otroci obožujejo ta recept.', 1, 1, '2023-11-26');

INSERT INTO hranilna_vrednost (naziv, kolicina, merska_enota, recept_id)
VALUES ('Calories', 750, 'kcal', 1),
       ('Protein', 25, 'g', 1),
       ('Carbohydrates', 90, 'g', 1),
       ('Fats', 35, 'g', 1),
       ('Fiber', 3, 'g', 1);
       

SELECT * FROM Recept WHERE id_recept = 3;

SELECT * FROM hranilna_vrednost WHERE recept_id = 1;

SELECT * FROM Uporabnik WHERE id_uporabnik = 1;

DROP TABLE hranilna_vrednost;

SHOW CREATE TABLE Sestavina;  -- Check the foreign key relationship for `Sestavina`
SHOW CREATE TABLE Korak;