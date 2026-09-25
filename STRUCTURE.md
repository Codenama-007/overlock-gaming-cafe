Overclock Gaming Café — Website Structure
1. Website Goal
Build a modern, responsive landing page for Overclock Gaming Café.
The website should:
- Present the café professionally.
- Explain what the café offers.
- Showcase available games.
- Present pricing when pricing information becomes available.
- Make it easy for visitors to book a gaming slot.
- Make the café's location and phone number immediately accessible.
- Work correctly on desktop, tablet, and mobile.
- Avoid broken or placeholder links in the final website.
2. Page Structure
The main website should be a single-page landing page:
/
│
├── Navbar
│
├── Hero
│
├── About
│
├── Games
│
├── Pricing
│
└── Footer
A separate booking page can be added for the booking flow:
/booking
The Book Slot buttons should navigate to /booking.
3. Navbar
Purpose
Provide quick navigation to the major sections and keep the booking CTA visible.
Structure
[Overclock Gaming Café Logo]

Home
About
Games
Pricing

[ BOOK A SLOT ]
Logo
Use the supplied Overclock Gaming Café logo.
The logo should link to:
/
Clicking the logo should return the visitor to the top of the homepage.
Navigation Links
Navigation links should scroll to the corresponding section on the same page.
Home     → #
About    → #about
Games    → #games
Pricing  → #pricing
Use smooth scrolling.
Example:
<a href="#about">About</a>
<a href="#games">Games</a>
<a href="#pricing">Pricing</a>
Home Link
The Home link should scroll to the top of the page:
<a href="#home">Home</a>
The Hero section should therefore have:
<section id="home">
Book Button
The navbar CTA:
BOOK A SLOT
should navigate to:
/booking
Do not use a fake #booking link unless the booking form is actually located on the homepage.
Mobile Navbar
On mobile:
[Logo]                         [Menu]
Opening the menu displays:
Home
About
Games
Pricing
Book A Slot
Clicking a section link should:
1. Scroll to the section.
2. Close the mobile menu.
4. Hero Section
Purpose
Immediately communicate what Overclock Gaming Café is and give visitors a reason to book.
Structure
--------------------------------------------------
|                                                |
|               BACKGROUND IMAGE                 |
|                                                |
|           OVERCLOCK GAMING CAFÉ                |
|                                                |
|       PLAY BETTER. PLAY FASTER.                |
|       PLAY AT OVERCLOCK.                       |
|                                                |
|   Short description of the gaming café.        |
|                                                |
|    [ BOOK A SLOT ] [ EXPLORE GAMES ]           |
|                                                |
--------------------------------------------------
Background
The Hero must use a background image.
The image should be:
- Gaming-focused
- Dark enough for text
- High quality
- Compatible with the Overclock blue/orange brand identity
Apply a dark overlay so the text remains readable.
Example concept:
background:
    linear-gradient(
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.75)
    ),
    url("/images/hero.jpg");
Do not use an image without a readability overlay.
Hero Content
Heading
Use the existing brand direction:
PLAY BETTER.
PLAY FASTER.
PLAY AT OVERCLOCK.
Description
Keep the description short.
Example direction:
Level up your gaming experience at Overclock Gaming Café.
Play, compete, and enjoy your gaming session in a dedicated
gaming environment.
This copy can be modified once the café owner provides official wording.
Do not invent technical specifications or unsupported claims.
Hero Buttons
Primary
BOOK A SLOT
Destination:
/booking
Secondary
EXPLORE GAMES
Destination:
#games
The secondary button should smoothly scroll to the Games section.
5. About Section
ID
<section id="about">
Purpose
Explain what Overclock Gaming Café is and what customers can expect.
Structure
Two-column layout on desktop:
--------------------------------------------------
|                                                |
|  [ Gaming Café Image ] | ABOUT OVERCLOCK       |
|                        |                      |
|                        | Description          |
|                        | Description          |
|                        |                      |
--------------------------------------------------
On mobile:
[Image]

ABOUT OVERCLOCK

Description...
Content
The section should contain:
- Café introduction
- Gaming experience
- Environment
- Main services/facilities
- Short customer-focused description
Known facilities from the supplied poster may be referenced:
Ultra Fast Internet
PS5 Consoles
Comfy Zone
Food & Drinks
Tournaments & Events
Exact descriptions should be confirmed by the café owner before final deployment.
Do not invent:
- Number of PCs
- Number of consoles
- Hardware specifications
- Opening hours
- Memberships
- Pricing
- Tournament schedules
6. Games Section
ID
<section id="games">
Purpose
Show visitors which games they can play at the café.
Layout
Use a responsive card grid:
Desktop:
[ GAME ] [ GAME ] [ GAME ]
[ GAME ] [ GAME ] [ GAME ]
Tablet:
[ GAME ] [ GAME ]
[ GAME ] [ GAME ]
Mobile:
[ GAME ]
[ GAME ]
[ GAME ]
Game Card
Each card may contain:
Game Image

GAME NAME

Platform
Optional short description
Example:
VALORANT

PC
Competitive FPS

Only include games that the café confirms are available.
Game Interaction
On hover:
- Image scales slightly
- Border becomes brighter
- Blue/orange glow appears
- Card moves slightly upward
Do not make game cards link to external websites unless a real destination is intentionally provided.
This prevents unnecessary broken links.
7. Pricing Section
ID
<section id="pricing">
Current Status
Pricing information is currently TBD.
Do not invent prices.
The section should still be designed so that pricing can be inserted later without changing the layout.
Recommended Structure
Use pricing cards:
[ PLAN ]      [ PLAN ]      [ PLAN ]
   ₹ TBD         ₹ TBD         ₹ TBD
   Details       Details       Details
   [BOOK]        [BOOK]        [BOOK]
The actual number of pricing tiers should be determined once the café provides its pricing.
Future Pricing Data
Possible fields:
Plan Name
Price
Duration
Platform
Features
Availability
Booking CTA
Each pricing card can eventually contain:
BOOK THIS SLOT
which navigates to:
/booking
Do not create a fake booking link for pricing until the booking page exists.
8. Footer
Purpose
Provide all important contact information and navigation without creating dead links.
Structure
---------------------------------------------------------
OVERLOCK GAMING CAFÉ

Short brand description

QUICK LINKS
Home
About
Games
Pricing

CONTACT
Phone
Location

BOOKING
Book a Slot

SOCIAL / CONTACT
Only verified social links

© 2026 Overclock Gaming Café
---------------------------------------------------------
9. Contact Information
Only use contact information confirmed from the supplied poster.
Business Name
Overclock Gaming Café
Phone
9960827157
The phone number must be a real clickable telephone link:
<a href="tel:+919960827157">
    9960827157
</a>
Do not use a fake # link.
Address
Shop No. 204, 2nd Floor,
Gold Crest 369,
Y K Nagar,
Opp. New Viva College,
Virar West – 401303
Location Link
Use a Google Maps search link based on the confirmed business address.
The link should open the location in Google Maps:
https://www.google.com/maps/search/?api=1&query=Overclock+Gaming+Cafe,+Shop+No.+204,+2nd+Floor,+Gold+Crest+369,+Y+K+Nagar,+Opp.+New+Viva+College,+Virar+West+401303
Recommended link text:
GET DIRECTIONS
Do not claim that the café's exact Google Maps listing has been verified until the official listing URL is supplied.
10. Booking Navigation
Every booking CTA must point to the same booking destination:
/booking
These include:
Navbar → BOOK A SLOT
Hero → BOOK A SLOT
Pricing → BOOK THIS SLOT
Footer → BOOK A SLOT
This keeps the navigation predictable.
11. Booking Page
Route
/booking
Initial Purpose
The booking page will eventually allow a customer to request a gaming slot.
The exact booking functionality is not yet defined.
For the first UI implementation, create the page structure without inventing backend behavior.
Potential fields can later include:
Name
Phone Number
Platform
Date
Time
Duration
The final booking workflow should only be implemented after the café confirms how bookings are handled.
12. Broken-Link Prevention
This is a strict requirement.
Rule
Every clickable element must have a valid destination.
Do not use:
href="#"
for finished navigation.
Do not use:
href="/coming-soon"
unless that route actually exists.
Do not create fake social links.
Do not create fake email links.
Do not create fake WhatsApp links.
Do not create fake Google Maps URLs pretending to be the official business listing.
Valid Internal Links
/
 /booking
#home
#about
#games
#pricing
Valid Contact Link
tel:+919960827157
Location
Use the Google Maps search URL based on the supplied address unless the café owner provides an official Google Maps listing URL.
Unknown Social Accounts
If Instagram/Facebook/WhatsApp URLs have not been verified:
Do not display clickable icons for them yet.
Once the official links are supplied, add them.
13. Smooth Scrolling
Use:
html {
    scroll-behavior: smooth;
}
Account for the fixed navbar so section headings are not hidden behind it.
Example:
section {
    scroll-margin-top: 90px;
}
14. Responsive Structure
Desktop
Navbar
Hero
About → 2 columns
Games → 3+ columns
Pricing → 3 columns when available
Footer → multi-column
Tablet
Navbar
Hero
About → 2 columns or stacked
Games → 2 columns
Pricing → 2/1 columns
Footer → 2 columns
Mobile
Mobile Navbar
Hero
About → 1 column
Games → 1 column
Pricing → 1 column
Footer → 1 column
Buttons should become easy-to-tap full-width or near-full-width controls where appropriate.
15. Component Structure
Recommended frontend component structure:
components/
│
├── Navbar
├── Hero
├── About
├── Games
├── GameCard
├── Pricing
├── PricingCard
├── Footer
└── ContactLinks
If using Next.js:
app/
│
├── page.tsx
├── booking/
│   └── page.tsx
│
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Games.tsx
    ├── GameCard.tsx
    ├── Pricing.tsx
    ├── PricingCard.tsx
    └── Footer.tsx
The exact architecture can be adapted to the framework being used.
16. Content That Is Confirmed
From the supplied café poster:
Business:
Overclock Gaming Café

Address:
Shop No. 204, 2nd Floor,
Gold Crest 369,
Y K Nagar,
Opp. New Viva College,
Virar West – 401303

Phone:
9960827157

Facilities:
Ultra Fast Internet
PS5 Consoles
Comfy Zone
Food & Drinks
Tournaments & Events
17. Content That Is Still TBD
Do not fabricate the following:
Games available
PC specifications
Number of gaming PCs
Number of PS5 consoles
Pricing
Opening hours
Membership plans
Booking rules
Tournament schedule
Tournament prizes
Official Instagram URL
Official Facebook URL
Official WhatsApp URL
Official Google Maps listing URL
Email address
Customer testimonials
Official café photographs
These should be added after the café owner provides the information.
18. Final Homepage Flow
The final page should follow this exact order:
NAVBAR
│
├── Logo → /
├── Home → #home
├── About → #about
├── Games → #games
├── Pricing → #pricing
└── Book A Slot → /booking
│
HERO
│
├── Background Image
├── Main Headline
├── Short Description
├── Book A Slot → /booking
└── Explore Games → #games
│
ABOUT
│
├── Gaming Café Image
└── About Information
│
GAMES
│
└── Game Cards
│
PRICING
│
└── Pricing Cards / TBD
│
FOOTER
│
├── Quick Links
├── Phone → tel:+919960827157
├── Location → Google Maps Search
├── Book A Slot → /booking
└── Verified social/contact links only
19. Final Navigation Principle
The website should have a simple conversion path:
LANDING PAGE
      ↓
UNDERSTAND THE CAFÉ
      ↓
SEE THE GAMES
      ↓
CHECK PRICING
      ↓
BOOK A SLOT
Every navigation element must lead somewhere real.
No dead buttons.
No fake social links.
No placeholder # links in production.
No invented business information.