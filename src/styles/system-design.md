This file describes the design standard for this app

---

Activity log of this file:
Sep 27 2024
I created this file by duplicating the content from the OMNIFOOD project.

---

Todo:
Sep 27 2024
Need to update this file so that it is specific for this Liquid-Budget project.

---

File content:

............................................................
--- 0x LAYOUT SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

............................................................
--- 01 TYPOGRAPHY SYSTEM

- Font size (px)
  10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

- Font weight
  Default: 400
  Medium: 500
  Semi-Bold: 600
  Bold: 700
  ............................................................

- Line heights
- Default 1
- Small 1.05 (for big text = 52px)
- Medium 1.2
- Paragraph 1.6 (for 20px text size use)

............................................................
letter-spacng:

- For big font 52px (negative) -0.5px;
- For 0.75px; used in UPPERCASE 1.6rem

............................................................
RULES: Font spacing rules:
(1) In case of BIG font size (44 & larger)
use less spacing
example:
in case of font-size: 52px;
use letter-spacng: -0.5px;

............................................................
--- 02 COLORS

- Tint generator website: https://maketintsandshades.com/#e67e22
- Primary:
  #e67e22
- Tints:  
   #fdf2e9 , #fae5d3
- Shades:
  #cf711f #c35f07 #45260a
- Accents:
- Grays: #555 #333
- Lightest gray allowed #6f6f6f on #fdf2e9

--- SHADOWS
For cards: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.1);
For buttons: 0 1px 2px rgba(0, 0, 0, 0.2);

............................................................
--- 03 BORDER-RAIUS

- Default: 9px
- Medium: 11px
- For nav buton: 6px;

RULES: Border radius rules:
(1) Use 'px' units because when scaling we dont want the radius to change.
If we had used rem' then the radius would change
