#!/usr/bin/env python3
"""Build the Run 2 The Rescue Brand Playbook PDF.

Output: docs/RUN_2_THE_RESCUE_BRAND_PLAYBOOK.pdf

Run from the site/ directory:
    pip install reportlab
    python3 docs/build_brand_pdf.py

Rebuild any time the brand evolves; the source of truth is this script plus
the live tokens in styles.css.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, NextPageTemplate,
    Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Flowable,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ---- Brand colors (from styles.css :root) ----
PLUM_900    = HexColor("#171025")
PLUM_800    = HexColor("#1f1530")
PLUM_700    = HexColor("#2a1c3d")
PLUM_600    = HexColor("#352449")
PLUM_500    = HexColor("#43325a")
PURPLE_400  = HexColor("#b48bdf")
PURPLE_500  = HexColor("#9871d2")
PURPLE_600  = HexColor("#7d56b9")
PURPLE_700  = HexColor("#5e3f95")
PURPLE_SOFT = HexColor("#e6d8f0")
LAV_50      = HexColor("#f5f3f7")
LAV_100     = HexColor("#ebe7ef")
LAV_200     = HexColor("#ddd6e5")
LAV_300     = HexColor("#c7bcd5")
INK         = HexColor("#1a1226")
INK_2       = HexColor("#43394e")
INK_3       = HexColor("#7b7585")
PAPER       = HexColor("#ffffff")
URGENCY     = HexColor("#d96847")

# ---- Page geometry ----
MARGIN = 0.85 * inch
PAGE_W, PAGE_H = letter

# ---- Paragraph styles ----
H1 = ParagraphStyle("H1", fontName="Helvetica-Bold", fontSize=24, leading=29,
                    textColor=INK, spaceBefore=10, spaceAfter=8)
H2 = ParagraphStyle("H2", fontName="Helvetica-Bold", fontSize=14, leading=18,
                    textColor=INK, spaceBefore=14, spaceAfter=6)
H3 = ParagraphStyle("H3", fontName="Helvetica-Bold", fontSize=10.5, leading=14,
                    textColor=PURPLE_700, spaceBefore=10, spaceAfter=4)
Body = ParagraphStyle("Body", fontName="Helvetica", fontSize=9.5, leading=14,
                      textColor=INK_2, spaceAfter=6, alignment=TA_LEFT)
Lead = ParagraphStyle("Lead", fontName="Helvetica", fontSize=11, leading=16,
                      textColor=INK_2, spaceAfter=8, alignment=TA_LEFT)
Eyebrow = ParagraphStyle("Eyebrow", fontName="Helvetica-Bold", fontSize=7.5,
                         textColor=PURPLE_600, leading=10, spaceAfter=6)
Quote = ParagraphStyle("Quote", fontName="Helvetica-Oblique", fontSize=11,
                       leading=16, textColor=INK_2, leftIndent=14, spaceAfter=8)
Mono = ParagraphStyle("Mono", fontName="Courier", fontSize=8.5, leading=12,
                      textColor=INK_2, spaceAfter=4)

# ---- Page decoration callbacks ----

def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PLUM_900)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Left accent bar
    canvas.setFillColor(PURPLE_500)
    canvas.rect(0, 0, 5, PAGE_H, fill=1, stroke=0)
    # Eyebrow
    canvas.setFillColor(PURPLE_400)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(MARGIN, PAGE_H - 1.9 * inch, "✦  RUN 2 THE RESCUE")
    # Title
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 70)
    canvas.drawString(MARGIN, PAGE_H - 3.8 * inch, "Brand")
    canvas.drawString(MARGIN, PAGE_H - 4.65 * inch, "Playbook")
    # Subtitle
    canvas.setFillColor(HexColor("#ccc6d5"))
    canvas.setFont("Helvetica", 13)
    canvas.drawString(MARGIN, PAGE_H - 5.45 * inch,
                      "Voice, typography, color, and motion for")
    canvas.drawString(MARGIN, PAGE_H - 5.72 * inch,
                      "a nonprofit rescuing dogs from the East Asia meat trade.")
    # Tagline
    canvas.setFillColor(PURPLE_400)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(MARGIN, 1.55 * inch, "RUN.  RESCUE.  REPEAT.")
    # Divider
    canvas.setStrokeColor(PURPLE_700)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN, 1.3 * inch, MARGIN + 4.5 * inch, 1.3 * inch)
    # Meta
    canvas.setFillColor(HexColor("#a89db4"))
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(MARGIN, 1.0 * inch,
                      "501(c)(3) Nonprofit   ·   EIN 99-4240461   ·   Edition 2026")
    canvas.restoreState()


def page_chrome(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PURPLE_500)
    canvas.rect(0, PAGE_H - 4, PAGE_W, 4, fill=1, stroke=0)
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.drawString(MARGIN, PAGE_H - 0.55 * inch,
                      "RUN 2 THE RESCUE   ·   BRAND PLAYBOOK")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.55 * inch, f"PAGE {doc.page - 1}")
    canvas.setStrokeColor(LAV_200)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 0.6 * inch, PAGE_W - MARGIN, 0.6 * inch)
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(MARGIN, 0.42 * inch,
                      "501(c)(3) Nonprofit   ·   EIN 99-4240461")
    canvas.drawRightString(PAGE_W - MARGIN, 0.42 * inch, "run2therescue.org")
    canvas.restoreState()


# ---- Custom Flowables ----

class Swatch(Flowable):
    """A color swatch with token name, oklch, and hex labels."""
    def __init__(self, name, oklch, hex_str, color, light_text=True,
                 width=2.15*inch, height=1.05*inch):
        super().__init__()
        self.name = name
        self.oklch = oklch
        self.hex_str = hex_str
        self.color = color
        self.width = width
        self.height = height
        self.light_text = light_text

    def wrap(self, aw, ah):
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        c.setFillColor(self.color)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=0)
        tc = white if self.light_text else INK
        c.setFillColor(tc)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(12, self.height - 20, self.name)
        c.setFont("Courier", 7.5)
        c.drawString(12, self.height - 36, self.oklch)
        c.drawString(12, self.height - 48, self.hex_str)


class TypeSpec(Flowable):
    """A type sample: large sample text + mono label of the role."""
    def __init__(self, sample, label, font_name="Helvetica-Bold", font_size=24,
                 color=INK, width=6.6*inch):
        super().__init__()
        self.sample = sample
        self.label = label
        self.font_name = font_name
        self.font_size = font_size
        self.color = color
        self.width = width
        self.height = font_size + 22

    def wrap(self, aw, ah):
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        c.setFillColor(self.color)
        c.setFont(self.font_name, self.font_size)
        c.drawString(0, 16, self.sample)
        c.setFillColor(INK_3)
        c.setFont("Courier", 7)
        c.drawString(0, 0, self.label)


class Rule(Flowable):
    """A thin horizontal rule."""
    def __init__(self, color=LAV_200, width=6.6*inch, thickness=0.7):
        super().__init__()
        self.color = color
        self.width = width
        self.thickness = thickness
        self.height = 8

    def wrap(self, aw, ah):
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        c.setStrokeColor(self.color)
        c.setLineWidth(self.thickness)
        c.line(0, 4, self.width, 4)


# ---- Helpers ----

def section_title(num, title):
    return Paragraph(
        f'<font color="#9871d2" face="Helvetica-Bold">{num:02d}</font>'
        f'  <font face="Helvetica-Bold">{title}</font>', H1
    )


def kv_table(rows, col_widths=None, header=False):
    """A clean 2-col fact table."""
    if col_widths is None:
        col_widths = [1.9*inch, 4.7*inch]
    t = Table(rows, colWidths=col_widths, hAlign="LEFT")
    style = [
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (0, -1), INK),
        ("TEXTCOLOR", (1, 0), (1, -1), INK_2),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LAV_200),
    ]
    if header:
        style += [
            ("BACKGROUND", (0, 0), (-1, 0), LAV_50),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("TEXTCOLOR", (0, 0), (-1, 0), INK),
        ]
    t.setStyle(TableStyle(style))
    return t


def do_dont_table(items):
    """Two-column 'Use / Avoid' table."""
    rows = [["USE", "AVOID"]] + items
    t = Table(rows, colWidths=[3.3*inch, 3.3*inch], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 7.5),
        ("TEXTCOLOR", (0, 0), (0, 0), PURPLE_700),
        ("TEXTCOLOR", (1, 0), (1, 0), URGENCY),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9.5),
        ("TEXTCOLOR", (0, 1), (0, -1), INK),
        ("TEXTCOLOR", (1, 1), (1, -1), INK_3),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LAV_200),
        ("LINEBELOW", (0, 0), (-1, 0), 1.5, PURPLE_500),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def bullet(text):
    return Paragraph(
        f'<font color="#9871d2">✦</font>   {text}', Body
    )


def grid_swatches(swatches, cols=3):
    """Arrange a list of Swatch flowables in a clean grid Table."""
    rows = []
    row = []
    for s in swatches:
        row.append(s)
        if len(row) == cols:
            rows.append(row)
            row = []
    while len(row) > 0 and len(row) < cols:
        row.append(Spacer(2.15*inch, 1.05*inch))
        if len(row) == cols:
            rows.append(row)
            row = []
    t = Table(rows, colWidths=[2.25*inch]*cols, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t


# ---- Build story ----

def build_story():
    s = []

    # Cover sits on its own template; story starts at the foreword.
    s.append(NextPageTemplate("content"))
    s.append(PageBreak())

    # ---- Foreword ----
    s.append(Paragraph("✦  FOREWORD", Eyebrow))
    s.append(Paragraph("How to use this playbook.", H1))
    s.append(Paragraph(
        "This playbook is the working reference for anyone writing, "
        "designing, photographing, or building for Run 2 The Rescue. "
        "Every color, type choice, and voice rule here is already in use "
        "at <font color='#5e3f95'>run2-rescuedemo.vercel.app</font> — "
        "open the live site in another tab while you read.", Lead))
    s.append(Spacer(1, 6))
    s.append(Paragraph(
        "The rules that should never be broken are the <b>protected lexicon</b> "
        "(§ 02) and <b>no graphic cruelty outside the Reality page</b> "
        "(§ 06). The rest is guidance. If a sentence is better because "
        "it breaks a guideline, ship the better sentence.", Body))
    s.append(Spacer(1, 22))
    s.append(Rule())
    s.append(Spacer(1, 6))
    s.append(Paragraph(
        "Contents", H2))
    toc = [
        ("01", "Who we are"),
        ("02", "Voice and tone"),
        ("03", "The protected lexicon"),
        ("04", "Logo"),
        ("05", "Color"),
        ("06", "Typography"),
        ("07", "Photography and video"),
        ("08", "Iconography"),
        ("09", "Layout and whitespace"),
        ("10", "Calls to action"),
        ("11", "Sample applications"),
        ("12", "Trust signals"),
        ("13", "Design tokens"),
        ("14", "Asset locations"),
        ("15", "What to retire"),
    ]
    toc_rows = [[f"{n}", t] for n, t in toc]
    toc_table = Table(toc_rows, colWidths=[0.5*inch, 5.5*inch], hAlign="LEFT")
    toc_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (0, -1), "Courier"),
        ("FONTSIZE", (0, 0), (0, -1), 9),
        ("TEXTCOLOR", (0, 0), (0, -1), PURPLE_500),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
        ("FONTSIZE", (1, 0), (1, -1), 11),
        ("TEXTCOLOR", (1, 0), (1, -1), INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    s.append(toc_table)

    # ---- 01 Who we are ----
    s.append(PageBreak())
    s.append(section_title(1, "Who we are"))
    s.append(Paragraph(
        "<b>Run 2 The Rescue</b> is a 501(c)(3) nonprofit (EIN 99-4240461) "
        "that rescues dogs from the East Asia meat trade, funds their "
        "medical care, and places them with families in the United States.",
        Lead))
    s.append(Paragraph("Facts", H3))
    s.append(kv_table([
        ["Founded", "2012 by Brandy Cherven (CEO) and Bonnie Klapper (COO)"],
        ["Rescue regions", "China and South Korea, via on-the-ground partners"],
        ["U.S. flight hubs", "JFK and LAX"],
        ["Featured in", "The Dodo, People, Long Island Press, NY Post"],
        ["Status", "501(c)(3) nonprofit  ·  Tax deductible giving"],
    ]))
    s.append(Spacer(1, 14))
    s.append(Paragraph("What we are not", H3))
    s.append(Paragraph(
        "A corporate-voiced animal welfare org. We do not lead with "
        "statistics, guilt, or cruelty imagery. The brand stays warm, "
        "dignified, and hopeful, even when the underlying work is hard.",
        Body))

    # ---- 02 Voice and tone ----
    s.append(PageBreak())
    s.append(section_title(2, "Voice and tone"))
    s.append(Paragraph("The R2TR voice is four things at once.", Lead))
    s.append(kv_table([
        ["Hopeful", "We lead with what's possible, not what's painful."],
        ["Dignified", "We treat both the dogs and the reader as worthy."],
        ["Urgent", "Real timelines, real stakes. Never alarmist."],
        ["Never exploitative", "We never use trauma porn or guilt to drive action."],
    ]))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Founder voice", H3))
    s.append(Paragraph(
        "Activist warm, not corporate. If a sentence could appear on a "
        "Fortune 500 annual report, rewrite it.", Body))

    s.append(Spacer(1, 14))
    s.append(Paragraph("The reader posture", H3))
    s.append(Paragraph(
        "The visitor is a <b>co-rescuer</b>, not a savior. Every CTA is a "
        "door, not an ask.", Body))
    s.append(do_dont_table([
        ["Meet the survivors", "Please help us"],
        ["Bring one home", "Donate to save lives"],
        ["Fund a flight", "We need your support"],
        ["Open your home", "Will you give?"],
    ]))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Transformation language", H3))
    s.append(Paragraph(
        "Every survivor's arc bends through one of three brand triplets. "
        "Use sparingly. Never all three in one paragraph.", Body))
    s.append(Paragraph(
        '<font color="#5e3f95"><b>trauma to trust   ·   '
        'fear to faith   ·   forgotten to forever</b></font>', Lead))

    # ---- 03 Protected lexicon ----
    s.append(PageBreak())
    s.append(section_title(3, "The protected lexicon"))
    s.append(Paragraph(
        "These phrases are brand assets. Keep them verbatim when they "
        "appear, use them where they fit naturally, never rewrite them.",
        Lead))
    s.append(kv_table([
        ["RUN. RESCUE. REPEAT.", "The tagline. Punctuation matters."],
        ["Run to the rescue with love, and peace will follow.", "Anchor quote. Attributed to River Phoenix."],
        ["hopeful survivors", "How we refer to dogs in our care."],
        ["bravehearted survivors", "Emphatic variant."],
        ["voiceless victims", "Use when invoking the dogs still inside the trade."],
        ["second chance", "What adoption represents."],
        ["beacon of hope", "What R2TR is to activists and dogs."],
        ["Sponsor Angel", "The monthly sponsorship program name."],
    ]))
    s.append(Spacer(1, 12))
    s.append(Paragraph("Retired", H3))
    s.append(Paragraph(
        "Don't reintroduce: <i>compassionate team dedicated to, "
        "we believe every animal deserves, together we can make a "
        "difference, please help us</i>. And the word "
        "<i>slaughterhouse</i> never appears in headlines, filenames, "
        "or visible copy.", Body))

    # ---- 04 Logo ----
    s.append(PageBreak())
    s.append(section_title(4, "Logo"))
    s.append(Paragraph(
        "The mark is a paw print inside a stamped circle, with the words "
        "<b>RUN 2 THE RESCUE</b> wrapped around the inside edge. The PNG "
        "lives at <font face=\"Courier\">site/assets/r2r-logo.png</font>.",
        Lead))
    s.append(Paragraph("Clear space", H3))
    s.append(Paragraph(
        "Reserve a margin equal to the width of one paw toe on all sides. "
        "Don't tuck text, buttons, or other marks inside that ring.",
        Body))
    s.append(Paragraph("Minimum sizes", H3))
    s.append(kv_table([
        ["Web nav (phone)", "56 × 56 px"],
        ["Web nav (desktop)", "96 to 104 × 96 to 104 px"],
        ["Footer", "48 × 48 px"],
        ["Email signature", "40 × 40 px"],
        ["Print", "20 mm wide minimum"],
    ]))
    s.append(Spacer(1, 12))
    s.append(Paragraph("Allowed backgrounds", H3))
    s.append(bullet("White or lavender (LAV-50 to LAV-200)."))
    s.append(bullet("Plum (PLUM-800 to PLUM-900)."))
    s.append(bullet("Photography, when there's a calm area in the lower-left or upper-right."))
    s.append(Spacer(1, 8))
    s.append(Paragraph("Don'ts", H3))
    s.append(bullet("Don't recolor the paw or the type."))
    s.append(bullet("Don't place over busy photography without a darkening overlay (~30%)."))
    s.append(bullet("Don't stretch, skew, or rotate the mark."))
    s.append(bullet("Don't place inside another circular frame."))
    s.append(bullet("Don't pair with a custom tagline lockup. The tagline lives separately as RUN. RESCUE. REPEAT."))

    # ---- 05 Color ----
    s.append(PageBreak())
    s.append(section_title(5, "Color"))
    s.append(Paragraph(
        "A single tonal family — plum, purple, lavender — with a small role "
        "for a warm red-orange urgency accent. No cool blues. No greens.",
        Lead))

    s.append(Paragraph("Plum (dark surfaces)", H3))
    s.append(grid_swatches([
        Swatch("PLUM 900", "oklch(0.18 0.035 310)", "#171025", PLUM_900),
        Swatch("PLUM 800", "oklch(0.22 0.04 310)",  "#1f1530", PLUM_800),
        Swatch("PLUM 700", "oklch(0.28 0.045 310)", "#2a1c3d", PLUM_700),
        Swatch("PLUM 600", "oklch(0.34 0.05 310)",  "#352449", PLUM_600),
        Swatch("PLUM 500", "oklch(0.42 0.055 310)", "#43325a", PLUM_500),
    ]))

    s.append(Paragraph("Purple (accent and interaction)", H3))
    s.append(grid_swatches([
        Swatch("PURPLE SOFT", "oklch(0.92 0.05 305)", "#e6d8f0", PURPLE_SOFT, light_text=False),
        Swatch("PURPLE 400", "oklch(0.72 0.14 305)", "#b48bdf", PURPLE_400),
        Swatch("PURPLE 500", "oklch(0.63 0.16 305)", "#9871d2", PURPLE_500),
        Swatch("PURPLE 600", "oklch(0.54 0.17 305)", "#7d56b9", PURPLE_600),
        Swatch("PURPLE 700", "oklch(0.44 0.15 305)", "#5e3f95", PURPLE_700),
    ]))

    s.append(Paragraph("Lavender (light surfaces)", H3))
    s.append(grid_swatches([
        Swatch("LAV 50",  "oklch(0.97 0.012 300)", "#f5f3f7", LAV_50,  light_text=False),
        Swatch("LAV 100", "oklch(0.94 0.02 300)",  "#ebe7ef", LAV_100, light_text=False),
        Swatch("LAV 200", "oklch(0.90 0.028 300)", "#ddd6e5", LAV_200, light_text=False),
        Swatch("LAV 300", "oklch(0.84 0.035 300)", "#c7bcd5", LAV_300, light_text=False),
    ]))

    s.append(PageBreak())
    s.append(Paragraph("Ink (text on light)", H3))
    s.append(grid_swatches([
        Swatch("INK",   "oklch(0.16 0.03 310)", "#1a1226", INK),
        Swatch("INK 2", "oklch(0.36 0.03 310)", "#43394e", INK_2),
        Swatch("INK 3", "oklch(0.55 0.02 310)", "#7b7585", INK_3),
    ]))
    s.append(Paragraph("Urgency accent", H3))
    s.append(Paragraph(
        "A warm red-orange used <b>only</b> for time-sensitive elements: "
        '"Just arrived" pills, urgency badges. Never decoration, links, '
        "or button fills.",
        Body))
    s.append(grid_swatches([
        Swatch("URGENCY", "oklch(0.65 0.15 35)", "#d96847", URGENCY),
    ]))
    s.append(Spacer(1, 8))
    s.append(Paragraph("Usage rules", H3))
    s.append(bullet("PLUM is the brand's quiet base. Use it for context."))
    s.append(bullet("PURPLE 500 is the only color that carries primary actions. One per screen where possible."))
    s.append(bullet("LAVENDER is a neutral. Treat it like white-with-character."))
    s.append(bullet("INK is the only text color on light. No dark blue, dark green."))
    s.append(bullet("60 / 30 / 10. Neutral / supporting / accent."))

    # ---- 06 Typography ----
    s.append(PageBreak())
    s.append(section_title(6, "Typography"))
    s.append(Paragraph(
        "Three families. Nothing else. Bricolage Grotesque for display, "
        "Inter Tight for UI, JetBrains Mono for labels. All three are "
        "Google Fonts and load via <font face=\"Courier\">&lt;link&gt;</font> "
        "in every page's <font face=\"Courier\">&lt;head&gt;</font>.",
        Lead))
    s.append(Paragraph("The scale, as it appears live", H3))
    s.append(Spacer(1, 8))
    s.append(TypeSpec("Give Hope. Change a Life.", "PAGE HERO H1   ·   Bricolage Grotesque 600   ·   clamp(33px, 9vw, 104px)",
                     "Helvetica-Bold", 32))
    s.append(Spacer(1, 4))
    s.append(TypeSpec("Hopeful Survivors", "SECTION H2   ·   Bricolage Grotesque 600   ·   clamp(32px, 4.4vw, 56px)",
                     "Helvetica-Bold", 22))
    s.append(Spacer(1, 4))
    s.append(TypeSpec("A few of our survivors", "SUB-SECTION H3   ·   Bricolage Grotesque 600   ·   clamp(21px, 2.5vw, 30px)",
                     "Helvetica-Bold", 16))
    s.append(Spacer(1, 4))
    s.append(TypeSpec("Run 2 The Rescue pulls dogs from the meat trade and brings them home.",
                     "BODY LEAD   ·   Inter Tight 400   ·   17 px",
                     "Helvetica", 13))
    s.append(Spacer(1, 4))
    s.append(TypeSpec("DOGS RESCUED   ·   FORMS OF GIVING",
                     "MONO LABEL   ·   JetBrains Mono 600 uppercase   ·   10-11 px, letterSpacing 0.18em",
                     "Courier-Bold", 10))
    s.append(Spacer(1, 16))
    s.append(Paragraph("Em (italic) treatment", H3))
    s.append(Paragraph(
        "Inside headings, <i>em</i> is the punchline word of the line. "
        "It signals the emotional pivot. One em per heading, max.",
        Body))

    # ---- 07 Photography ----
    s.append(PageBreak())
    s.append(section_title(7, "Photography and video"))
    s.append(Paragraph(
        "Photography is the single most important brand surface. The right "
        "photo of a real survivor is worth a paragraph of copy.", Lead))
    s.append(Paragraph("Subject", H3))
    s.append(bullet("Real R2TR dogs, named, with stories. No generic stock."))
    s.append(bullet("Eye level with the dog whenever possible."))
    s.append(bullet("A clear face, a real expression. Not posed."))
    s.append(Paragraph("Light", H3))
    s.append(bullet("Soft natural light. Window light, morning, late afternoon."))
    s.append(bullet("Avoid harsh flash, studio glossy, commercial pet photography polish."))
    s.append(Paragraph("Mood", H3))
    s.append(bullet("Quiet warmth. Not exuberant. Not pitiful."))
    s.append(bullet("A small story in every frame. A paw on the doorstep, a glance toward the food bowl."))
    s.append(Paragraph("What we do not show", H3))
    s.append(bullet("No graphic cruelty. Crates and crowding live on the Reality page, behind a notice."))
    s.append(bullet("No before/after pairs that lead with trauma. The after is the hero."))
    s.append(bullet("No staged glossy. R2TR is not a luxury pet brand."))
    s.append(Paragraph("Video", H3))
    s.append(bullet("Footage from the trade lives on the Reality page only, blurred until opt-in."))
    s.append(bullet("YouTube embeds use the youtube-nocookie.com domain (enforced in api/animals.js)."))

    # ---- 08 Iconography ----
    s.append(PageBreak())
    s.append(section_title(8, "Iconography"))
    s.append(Paragraph("Paw print", H3))
    s.append(Paragraph(
        "A vector paw motif used as background decoration. <b>Mood, not "
        "message.</b> If you can't see it, it's working.", Body))
    s.append(bullet("0.08 to 0.20 opacity on dark sections."))
    s.append(bullet("0.15 to 0.30 opacity on light sections."))
    s.append(bullet("PURPLE-400 on light, white on dark."))
    s.append(bullet("40 to 72 px typical. Never larger than 96 px."))
    s.append(bullet("Positioned in corners or empty space. Never overlapping faces or copy."))
    s.append(Paragraph("Sparkle  ✦", H3))
    s.append(Paragraph(
        "A four-pointed star used as a leader before eyebrows "
        "('✦ Meet a few'). Always in PURPLE 400 or PURPLE 500. "
        "Never used as bullets in body copy.", Body))
    s.append(Paragraph("Arrows  →", H3))
    s.append(Paragraph(
        "Right-pointing arrow (Unicode →), not a hyphen-greater "
        "combo. On hover, buttons nudge the arrow 3 px to the right.",
        Body))
    s.append(Paragraph("Hearts  ♡  /  ♥", H3))
    s.append(Paragraph(
        "Outline heart for favorites. Filled heart for confirmation. "
        "Always purple. Never red. Red is reserved for urgency.", Body))

    # ---- 09 Layout ----
    s.append(PageBreak())
    s.append(section_title(9, "Layout and whitespace"))
    s.append(Paragraph(
        "Every R2TR page has more breathing room than the average "
        "nonprofit. This is on purpose. It gives each dog room to be an "
        "individual.", Lead))
    s.append(kv_table([
        ["Section padding", "≥ 72 px top/bottom desktop; 48 px mobile"],
        ["Page margins", "clamp(20px, 4vw, 48px)  (the --pad token)"],
        ["Card padding", "18 to 28 px"],
        ["Headline to first paragraph", "12 to 22 px"],
        ["Max content width", "1200 px  (the --maxw token)"],
    ]))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Section hierarchy", H3))
    s.append(Paragraph(
        "Every section has, in order: eyebrow (mono, uppercase, with "
        "✦ on dark) → heading (display, one em) → one "
        "paragraph of context → one CTA where the section is action-"
        "oriented. When a section breaks this hierarchy, it's because a "
        "card grid is doing the work. The pattern is consistent enough "
        "that breaking it feels intentional.",
        Body))

    # ---- 10 CTAs ----
    s.append(PageBreak())
    s.append(section_title(10, "Calls to action"))
    s.append(Paragraph(
        "Every R2TR CTA opens a door for the visitor. They are never asks.",
        Lead))
    s.append(Paragraph("The CTA priority stack", H3))
    s.append(kv_table([
        ["01  Adopt",   "Highest-impact outcome."],
        ["02  Sponsor", "Recurring, deepest commitment."],
        ["03  Donate",  "One-time gift."],
        ["04  Foster",  "Supports the pipeline."],
    ]))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Approved CTA phrasing", H3))
    s.append(do_dont_table([
        ["Adopt today",  "Adopt now!"],
        ["Meet the survivors",  "Save a life"],
        ["Bring one home",  "Get a dog"],
        ["Start your monthly sponsorship",  "Sponsor us"],
        ["Be a Sponsor Angel",  "Give monthly"],
        ["Choose how to give",  "Please donate"],
        ["Apply to foster",  "Sign up to foster"],
        ["Open your home",  "Be a foster parent"],
    ]))
    s.append(Spacer(1, 12))
    s.append(Paragraph("Button styling", H3))
    s.append(bullet("<b>Primary:</b> btn-accent — filled PURPLE 500, white text."))
    s.append(bullet("<b>Secondary on dark:</b> btn-outline-light — transparent, white border."))
    s.append(bullet("<b>Secondary on light:</b> btn-outline-soft — transparent, purple border, purple text."))
    s.append(bullet("Never put three filled primary buttons on one screen."))

    # ---- 11 Sample applications ----
    s.append(PageBreak())
    s.append(section_title(11, "Sample applications"))
    s.append(Paragraph("Email signature", H3))
    s.append(Paragraph(
        "[Name]<br/>"
        "Run 2 The Rescue   ·   501(c)(3) nonprofit<br/>"
        "RUN. RESCUE. REPEAT.<br/>"
        "run2therescue.org", Mono))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Social caption (Instagram / Facebook)", H3))
    s.append(Paragraph(
        "Meet [Dog Name]. Pulled from a holding pen in [Yulin / Seoul]. "
        "Cleared. Crated. And now waiting at JFK for a family.<br/><br/>"
        "Could it be yours? Adoption applications open. Link in bio.<br/><br/>"
        "#Run2TheRescue", Mono))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Newsletter subject line", H3))
    s.append(Paragraph("Three new arrivals at LAX. Meet them.", Mono))
    s.append(Spacer(1, 14))
    s.append(Paragraph("Press release header", H3))
    s.append(Paragraph(
        "RUN 2 THE RESCUE<br/>"
        "501(c)(3) Nonprofit   ·   EIN 99-4240461<br/>"
        "FOR IMMEDIATE RELEASE   —   [Date]<br/>"
        "Contact: [Name]   ·   info@run2therescue.com", Mono))

    # ---- 12 Trust signals ----
    s.append(PageBreak())
    s.append(section_title(12, "Trust signals"))
    s.append(Paragraph(
        "Surface these without burying them. So should every external "
        "communication.", Lead))
    s.append(kv_table([
        ["EIN 99-4240461", "In the footer, donate page, press header."],
        ["501(c)(3) status", "Written as '501(c)(3) nonprofit' on Donate and Footer."],
        ["Founders", "Brandy Cherven (CEO) and Bonnie Klapper (COO) with bios on the Leadership section."],
        ["Press", "The Dodo, People, Long Island Press, NY Post. Linked to originals."],
        ["IRS Determination Letter", "assets/r2r-501c3-determination.pdf, linked from the footer."],
        ["DAF legal name", "Run to the Rescue (no '2'). Used on the DAF info card only."],
        ["Years on the ground", "14, visible in Adopt hero stats."],
        ["Source citations", "Mission stats cite Humane Society International."],
    ]))

    # ---- 13 Design tokens ----
    s.append(PageBreak())
    s.append(section_title(13, "Design tokens"))
    s.append(Paragraph(
        "The mechanical tokens (radius, shadow, layout) that join the "
        "color and type system. Live in styles.css at <font face=\"Courier\">"
        ":root</font>.", Lead))
    s.append(Paragraph("Fonts", H3))
    s.append(Paragraph(
        "--font-display: Bricolage Grotesque, Inter Tight, system-ui<br/>"
        "--font-ui:      Inter Tight, Inter, system-ui, -apple-system<br/>"
        "--font-mono:    JetBrains Mono, ui-monospace, SFMono-Regular, Menlo", Mono))
    s.append(Paragraph("Radius", H3))
    s.append(Paragraph(
        "--radius:      12 px   (default border radius)<br/>"
        "--radius-lg:   20 px   (card radius)<br/>"
        "--radius-pill: 999 px  (pills and buttons)", Mono))
    s.append(Paragraph("Shadow", H3))
    s.append(Paragraph(
        "--shadow-sm:   0 1px 0 oklch(0.18 0.035 310 / 0.05)<br/>"
        "--shadow:      0 20px 50px -20px oklch(0.18 0.035 310 / 0.35)<br/>"
        "--shadow-dark: 0 20px 50px -20px oklch(0 0 0 / 0.4)", Mono))
    s.append(Paragraph("Layout", H3))
    s.append(Paragraph(
        "--maxw: 1200 px<br/>"
        "--pad:  clamp(20px, 4vw, 48px)", Mono))
    s.append(Paragraph("Swappable accent", H3))
    s.append(Paragraph(
        "--accent: var(--purple-500)<br/><br/>"
        "Body supports data-palette = plum, lilac, rose, teal. Default "
        "is plum and should remain so for brand consistency.", Body))

    # ---- 14 Asset locations ----
    s.append(PageBreak())
    s.append(section_title(14, "Asset locations"))
    s.append(Paragraph("All paths are relative to the repo root (site/).", Lead))
    s.append(kv_table([
        ["Logo (web/print)",        "assets/r2r-logo.png"],
        ["Color tokens",            "styles.css  (:root block)"],
        ["IRS determination letter","assets/r2r-501c3-determination.pdf"],
        ["Founder photography",     "assets/brandy-*.{png,jpg},  assets/bonnie-*.{png,jpg}"],
        ["Before / after assets",   "assets/{name}-before-rescue.*,  assets/{name}-after-portrait.*"],
        ["Press logos",             "assets/press/{slug}.png"],
        ["Reality page (sensitive)","assets/reality-*.{jpg,mp4}"],
        ["How You Can Help PNGs",   "assets/help-{adopt,foster,sponsor,donate}.png"],
        ["Fonts",                   "Loaded from Google Fonts CDN; declared in every page <head>"],
    ]))

    # ---- 15 What to retire ----
    s.append(PageBreak())
    s.append(section_title(15, "What to retire"))
    s.append(Paragraph(
        "Print this in your head. Edit it out the moment you see it.",
        Lead))
    s.append(do_dont_table([
        ["period or comma", "em-dash (—) in body copy"],
        ["tax deductible", "tax-deductible"],
        ["show what we believe by what we do", "We believe …"],
        ["[cut]", "compassionate (as a self-description)"],
        ["[cut hard]", "dedicated team committed to …"],
        ["name the difference", "make a difference"],
        ["doors", "asks"],
        ["real survivor photography", "stock dog photography"],
        ["hope", "pity"],
        ["cage / holding pen / meat trade", "slaughterhouse (in visible copy)"],
        ["everything on the Reality page", "clinical cruelty descriptions anywhere else"],
    ]))

    # ---- Closing ----
    s.append(PageBreak())
    s.append(Paragraph("✦  ONE MORE THING", Eyebrow))
    s.append(Paragraph("A playbook is a starting line.", H1))
    s.append(Paragraph(
        "If a sentence is better because it breaks a rule here, write the "
        "sentence and move on. The rules that never get broken are the "
        "<b>protected lexicon</b> and <b>no graphic cruelty outside the "
        "Reality page</b>. The rest is guidance. Ship the better thing.",
        Lead))
    s.append(Spacer(1, 28))
    s.append(Rule(color=PURPLE_500, thickness=1.2, width=2*inch))
    s.append(Spacer(1, 14))
    s.append(Paragraph(
        '<font color="#5e3f95"><b>RUN.   RESCUE.   REPEAT.</b></font>',
        H2))
    s.append(Spacer(1, 6))
    s.append(Paragraph(
        '<i>"Run to the rescue with love, and peace will follow."</i><br/>'
        "— River Phoenix", Body))

    return s


def build(output_path):
    doc = BaseDocTemplate(
        output_path, pagesize=letter,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title="Run 2 The Rescue — Brand Playbook",
        author="Run 2 The Rescue",
        subject="Brand guidelines",
    )
    frame = Frame(MARGIN, MARGIN + 0.2 * inch,
                  PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN - 0.4 * inch,
                  id="body", showBoundary=0)
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=cover_page),
        PageTemplate(id="content", frames=[frame], onPage=page_chrome),
    ])
    doc.build(build_story())
    print(f"wrote {output_path}")


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(here, "RUN_2_THE_RESCUE_BRAND_PLAYBOOK.pdf")
    build(out)
