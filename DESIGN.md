Overclock Gaming Café — Design System & UI Direction
1. Design Objective
Create a premium gaming-café website for Overclock Gaming Café based on its existing logo and poster identity.
The website should feel like a digital extension of the brand rather than a generic gaming template.
Brand Personality
- Competitive
- Fast
- Futuristic
- Gamer-focused
- High-energy
- Premium but approachable
- Tech-driven
Core Visual Idea
Retro-Futuristic Gaming / Cyberpunk Esports
The existing logo establishes the visual language:
- Deep black background
- Electric blue glow
- Orange/amber glow
- Dark futuristic helmet/character
- Speedometer/overclocking visual
- Angular electronic/circuit motifs
- Strong contrast
- Gaming/esports atmosphere
The website should therefore use electric blue + orange as the primary brand colors, while using cyan/purple/pink only as restrained supporting accents.
Do NOT turn the website into a generic purple/pink cyberpunk website. The logo's blue/orange identity must remain dominant.

2. Visual Style
Style Name
Overclock Neon Tech
Type
- Retro-futuristic
- Cyberpunk-inspired
- Esports
- Gaming lounge
- Neon technology
- Premium dark UI
Keywords
gaming café, esports, neon, cyberpunk, speed, performance, technology, console, PC gaming, competitive gaming, futuristic
Era Influence
1980s/1990s arcade technology combined with a modern esports interface.
The result should feel modern rather than deliberately vintage.
3. Color System
The logo should be the primary source of truth for the brand palette.
Primary Colors
--overclock-blue: #008CFF;
--overclock-orange: #FF7A00;
--overclock-black: #050505;
--overclock-deep: #0A0F18;
Secondary Colors
--electric-blue: #00B7FF;
--cyan: #00E5FF;
--warm-orange: #FF9D00;
--deep-purple: #4B2A8F;
--silver: #C0C0C0;
--white: #F5F7FA;
UI Colors
--background: #050505;
--surface: #0A0F18;
--surface-elevated: #101722;
--border: rgba(0, 140, 255, 0.35);
--text-primary: #F5F7FA;
--text-secondary: #9AA4B2;
--success: #00FF88;
--danger: #FF3B30;
Color Usage Ratio
Use approximately:
- 65–75% black/deep background
- 15–20% dark blue surfaces
- 5–10% electric blue
- 3–7% orange
- Small amounts of cyan/purple for supporting effects
Orange should be used primarily for CTAs, highlights, active states, prices, and important emphasis.
Blue should dominate borders, glows, navigation accents, and technology-related elements.
4. Typography
Primary Font
Use a modern geometric/sci-fi font where available.
Recommended:
- Orbitron
- Rajdhani
- Space Grotesk
- Inter
Usage
Headings → Orbitron / Rajdhani
Body → Inter / Space Grotesk
Technical labels → monospace
Typography Characteristics
Headings should be:
- Bold
- Uppercase or title-case
- Tight letter spacing
- Strong visual hierarchy
Example:
PLAY BETTER.
PLAY FASTER.
PLAY AT OVERCLOCK.
Avoid excessive use of decorative fonts that reduce readability.
5. Global Visual Effects
Neon Glow
Use restrained glow rather than glowing everything.
text-shadow:
  0 0 8px rgba(0, 140, 255, 0.65);
Orange accent:
box-shadow:
  0 0 20px rgba(255, 122, 0, 0.25);
Circuit Pattern
Use subtle circuit-board lines in backgrounds.
The pattern should remain low-opacity so it does not compete with content.
Grid
Use a perspective or technical grid behind major sections.
background-image:
  linear-gradient(rgba(0,140,255,.08) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,140,255,.08) 1px, transparent 1px);
Scanlines
A subtle CRT scanline effect may be used on the Hero or full-page background.
Do not make scanlines strong enough to reduce text readability.
Glitch
Use glitch animations sparingly:
- Hero headline
- Section labels
- Hover state
- Small decorative elements
Do not continuously glitch every component.
6. Shape Language
The logo uses angular and technological geometry.
UI should therefore avoid overly rounded SaaS-style cards.
Preferred
- Slightly rounded corners
- Chamfered/angled corners
- Thin glowing borders
- Angular separators
- Hexagonal or technical decorative shapes
- HUD-style labels
Avoid
- Excessive pill-shaped components
- Soft pastel cards
- Large rounded SaaS dashboards
- Generic Bootstrap cards
Suggested radius:
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
7. Navbar
Structure
[Overclock Logo]

Home
About
Games
Pricing
Facilities
Events
Contact

[ BOOK NOW ]
Behavior
- Sticky/fixed navbar
- Transparent or dark glass background initially
- Stronger background after scrolling
- Thin blue/orange bottom border
- Mobile hamburger menu
- Book Now remains visually prominent
Logo
Use the provided Overclock logo.
Do not redraw or alter the logo.
The logo should appear on a dark background and retain sufficient clear space.
CTA
BOOK NOW
Primary CTA should use the Overclock orange accent with blue hover glow.
8. Hero Section
The Hero is the most important section.
Goal
Immediately communicate:
This is a serious gaming café built for better performance and competitive gaming.

Recommended Layout
Two-column desktop layout:
--------------------------------------------------
|                                                |
|  LEVEL UP YOUR                                 |
|  GAMING EXPERIENCE.          [Gaming Visual]  |
|                                                |
|  High-performance gaming,                     |
|  console sessions and                         |
|  competitive events.                          |
|                                                |
|  [ BOOK NOW ]  [ EXPLORE GAMES ]              |
|                                                |
--------------------------------------------------
Hero Headline Direction
Use the existing brand message as inspiration:
PLAY BETTER. PLAY FASTER. PLAY AT OVERCLOCK.
Alternative supporting headline:
Your Game. Your Squad. Your Arena.
Do not invent factual claims such as exact PC specifications, internet speed, number of systems, or opening hours.
Hero Visual
Create an abstract CSS/HTML visual inspired by:
- Speedometer from the logo
- Circular HUD
- Gaming controller silhouette
- Circuit lines
- Glowing rings
- Orange/blue energy trails
The visual should feel like an overclocking performance dashboard.
9. About Section
Purpose
Introduce Overclock Gaming Café and explain the experience.
Layout
Use a split layout:
[Gaming Café Image / Visual] | [About Content]
Content
Possible structure:
ABOUT OVERCLOCK

A place built for gamers who want to
play, compete and spend time with
their squad.

[Supporting information supplied by cafe owner]
Do not invent the café's history, founding year, exact setup count, or other factual claims.
Visual
Use:
- Blue/orange gradient glow
- Technical HUD labels
- Small circuit graphics
- Image frame with neon border
10. Games Section
Purpose
Show customers what they can play.
Layout
Game cards in a responsive grid.
Desktop:
[ Game ] [ Game ] [ Game ]
[ Game ] [ Game ] [ Game ]
Mobile:
[ Game ]
[ Game ]
[ Game ]
Game Card
Each card may contain:
- Game cover/image
- Game name
- Platform
- Short description
- Optional genre
- Optional availability badge
Example:
VALORANT
PC
Competitive FPS
Only display games confirmed by the café.
Interaction
On hover:
- Image zoom
- Blue/orange border glow
- Slight upward movement
- Technical HUD overlay
11. Facilities Section
The existing poster explicitly communicates these facilities:
1. Ultra Fast Internet
2. PS5 Consoles
3. Comfy Zone
4. Food & Drinks
5. Tournaments & Events
These can become the initial feature cards.
Design
Use technical icon cards:
[ ICON ]

ULTRA FAST INTERNET

Reliable gaming connectivity
for your sessions.
Icons must be SVG/Lucide/Heroicon style.
Never use emoji as icons.
Important
The exact wording should be finalized with the café owner before deployment.
12. Pricing Section
Purpose
Make booking decisions easy.
Layout
Three pricing cards can be used if the café actually has three pricing tiers.
Example structure:
CASUAL
₹ TBD
1 Hour
[ BOOK NOW ]

GAMER
₹ TBD
3 Hours
[ BOOK NOW ]

SQUAD
₹ TBD
5 Hours
[ BOOK NOW ]
Important
Do not invent prices.
Use:
₹TBD
during development until the café provides official pricing.
Featured Tier
The middle card can be visually highlighted.
Use:
- Orange border
- Blue glow
- MOST POPULAR label
Only use the "Most Popular" label if the business confirms that it is appropriate.
13. Tournaments & Events
Purpose
Promote competitive gaming.
Section Design
Use an esports-event layout.
Each event card can contain:
- Event name
- Game
- Date
- Time
- Prize
- Registration CTA
Example
UPCOMING EVENT

[TBD EVENT NAME]

GAME: TBD
DATE: TBD
PRIZE: TBD

[ REGISTER ]
Do not fabricate tournament dates, prizes, or games.
14. Gallery
Purpose
Show the actual physical experience.
Recommended Content
Use real photographs supplied by the café:
- Gaming stations
- PS5 setup
- Interior
- Seating area
- Food & drinks
- Tournament/event photographs
- Exterior/location
Style
Use an asymmetric editorial grid rather than a basic image carousel.
Images should have:
- Dark overlay
- Thin neon border
- Hover zoom
- Subtle blue/orange glow
Do not use random stock images as if they were photographs of Overclock Gaming Café.
15. Testimonials
If real customer reviews are provided, display three testimonials.
Card
★★★★★

"Customer review goes here."

— Customer Name
Do not create fake reviews.
If no real testimonials are available, remove this section rather than filling it with invented quotes.
16. Final CTA
The final CTA should be visually aggressive and simple.
Suggested Direction
READY TO LEVEL UP?

Stop fighting lag at home.

PLAY BETTER.
PLAY FASTER.
PLAY AT OVERCLOCK.

[ BOOK YOUR SESSION ]
Use a large dark section with:
- Animated speed lines
- Circular HUD
- Blue/orange glow
- Strong CTA button
The exact marketing copy can be adjusted after approval by the café.
17. Booking Page
The Navbar BOOK NOW button must navigate to a dedicated booking page.
Booking UI
Recommended structure:
BOOK YOUR SESSION

1. Select Platform
   [ PC ] [ PS5 ]

2. Select Date
   [ Date Picker ]

3. Select Time
   [ Time ]

4. Select Duration
   [ 1 Hour ]
   [ 3 Hours ]
   [ 5 Hours ]

5. Customer Details
   Name
   Phone

6. Confirm
   [ CONFIRM BOOKING ]
Booking Status
The initial frontend can support:
Available
Selected
Unavailable
Pending
Confirmed
Actual availability must come from the backend once the booking system is implemented.
18. Contact Section
Display verified business information.
Currently Confirmed From Provided Poster
Overclock Gaming Café

Shop No. 204, 2nd Floor,
Gold Crest 369,
Y K Nagar,
Opp. New Viva College,
Virar West – 401303

Phone:
9960827157
Possible Actions
[ CALL NOW ]
[ GET DIRECTIONS ]
[ WHATSAPP ]
Only implement WhatsApp, Google Maps, Instagram, email, or opening-hours links after their official details are confirmed.
19. Footer
Structure
---------------------------------------------------------
OVERLOCK GAMING CAFÉ

Play Better. Play Faster.

Quick Links
Home
About
Games
Pricing
Events
Contact

Services
PC Gaming
PS5
Tournaments
Food & Drinks

Contact
Address
Phone

Social
Instagram
WhatsApp
Google Maps

Privacy Policy
Terms of Use

© 2026 Overclock Gaming Café
---------------------------------------------------------
The footer should remain compact and functional.
20. Buttons
Primary CTA
BOOK NOW
Style:
- Orange background
- Black text
- Strong orange glow
- Blue hover outline
Secondary CTA
EXPLORE GAMES
Style:
- Transparent background
- Blue border
- White text
- Blue glow on hover
Interaction
Every interactive element must have:
cursor: pointer;
transition: all 200ms ease;
Hover should provide a clear visual response.
21. Cards
Cards should use a dark surface:
background: rgba(10, 15, 24, 0.85);
border: 1px solid rgba(0, 140, 255, 0.30);
Hover:
transform: translateY(-4px);
border-color: #008CFF;
box-shadow: 0 0 25px rgba(0, 140, 255, 0.18);
Orange should be introduced for important highlights.
22. Background System
The site should never be a completely flat black page.
Use layers:
Base Black
↓
Dark Blue Gradient
↓
Technical Grid
↓
Circuit Pattern
↓
Subtle Glow
↓
Content
Background effects must remain subtle.
23. Motion Design
Animations should communicate:
speed + technology
Recommended animations:
- Hero HUD rotation
- Moving circuit lines
- Subtle grid movement
- Button glow
- Card hover
- Image zoom
- Glitch on selected headings
- Scroll reveal
- Speed-line animation
Avoid
- Excessive bouncing
- Constant shaking
- Heavy animations on every component
- Motion that hurts accessibility
Respect:
@media (prefers-reduced-motion: reduce)
24. Responsive Design
Desktop
- Full navigation
- Two-column Hero
- Multi-column grids
- Large visual effects
Tablet
- Condensed navigation
- Two-column or stacked Hero depending on width
- 2-column cards
Mobile
- Hamburger navigation
- Single-column Hero
- Full-width CTAs
- Single-column cards
- Reduced decorative effects
- Smaller typography
- Simplified background effects
The website must remain usable on small screens.
25. Accessibility
Implement:
- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Reduced-motion support
- Buttons instead of clickable divs
- Labels for form fields
Neon effects must never replace readable text.
26. SEO Direction
Primary business keywords should be based on verified location and services.
Potential keyword direction:
gaming cafe in Virar
gaming cafe Virar West
PS5 gaming cafe Virar
gaming cafe near Viva College
gaming zone Virar
esports cafe Virar
Overclock Gaming Cafe
Do not stuff keywords unnaturally.
Use:
- One clear H1
- Descriptive title
- Meta description
- Open Graph metadata
- LocalBusiness structured data after business details are verified
- Location information
- Descriptive image alt text
27. Technical UI Rules
Use:
- Tailwind CSS for layout/utilities
- Custom CSS for advanced effects
- Lucide/Heroicons for icons
- SVG for technical decorative graphics
- CSS gradients
- CSS animations
- backdrop-filter where appropriate
Do not use:
- Emoji as UI icons
- Generic Bootstrap styling
- Excessive glassmorphism
- Random gradient combinations unrelated to the logo
- Excessive rounded cards
- Fake business information
28. Required Page Structure
Home /
Navbar
↓
Hero
↓
About
↓
Games
↓
Facilities
↓
Pricing
↓
Tournaments & Events
↓
Gallery
↓
Testimonials (only if real reviews exist)
↓
Final CTA
↓
Contact
↓
Footer
Booking /booking
Navbar
↓
Booking Header
↓
Platform Selection
↓
Date & Time
↓
Duration
↓
Customer Details
↓
Booking Summary
↓
Confirmation
↓
Footer
29. Design Principles
Principle 1 — Brand First
The Overclock logo determines the visual identity.
Principle 2 — Performance
The website should visually communicate speed and responsiveness.
Principle 3 — Controlled Neon
Neon is an accent, not the entire interface.
Principle 4 — Real Information
Never invent business information to make the page look complete.
Principle 5 — Conversion
The visitor should always know how to:
- Explore games
- See pricing
- Find the café
- Contact the café
- Book a gaming session
Principle 6 — Premium Gaming Experience
The website should feel like a real esports/gaming brand, not a college-project template.
30. Confirmed Business Information
From the supplied poster:
Brand:
Overclock Gaming Café

Address:
Shop No. 204, 2nd Floor,
Gold Crest 369,
Y K Nagar,
Opp. New Viva College,
Virar West – 401303

Phone:
9960827157

Confirmed Facilities:
- Ultra Fast Internet
- PS5 Consoles
- Comfy Zone
- Food & Drinks
- Tournaments & Events
The following remain TBD until the café provides them:
Exact games
PC specifications
Number of PCs
Number of PS5 consoles
Pricing
Opening hours
Memberships
Tournament schedule
Tournament prizes
Booking rules
Instagram
WhatsApp
Google Maps URL
Email
Customer testimonials
Cafe photographs
31. Implementation Checklist
- [ ] Overclock logo integrated
- [ ] Blue/orange brand palette implemented
- [ ] Deep black background
- [ ] Neon blue glow
- [ ] Orange accent glow
- [ ] Technical grid
- [ ] Circuit decorations
- [ ] Subtle CRT/scanline effect
- [ ] Controlled glitch animation
- [ ] Gaming HUD visual in Hero
- [ ] Responsive navbar
- [ ] Book Now CTA
- [ ] Games section
- [ ] Facilities section
- [ ] Pricing section
- [ ] Events section
- [ ] Gallery
- [ ] Final CTA
- [ ] Contact section
- [ ] Full footer
- [ ] Dedicated Booking page
- [ ] Mobile responsive
- [ ] Accessibility
- [ ] SEO metadata
- [ ] No fabricated business information