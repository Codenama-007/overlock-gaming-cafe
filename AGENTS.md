<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Overclock Gaming Café

## 1. Project Overview

Build a full-stack web application for **Overclock Gaming Café**.

The project will be developed in **4 phases**. Each phase must be completed and working before moving to the next phase.

The project has two main parts:

1. **Customer-facing website**
2. **Admin gaming-session management system**

The existing project files should be treated as the source of truth:

- `design.md` → visual design, theme, colors, effects, typography
- `structure.md` → website structure, sections, navigation, and confirmed café information

Do not invent business information that has not been provided.

---

# 2. Main Routes

The application should eventually contain:

```text
/
├── Landing Page
│
├── /booking
│   └── Customer Booking Page
│
├── /admin/login
│   └── Admin Login Page
│
└── /admin/dashboard
    └── Admin Dashboard
```

---

# 3. Development Rules

- Build the application phase by phase.
- Do not implement functionality belonging to a later phase early.
- Keep each phase functional before moving to the next.
- Use reusable components.
- Keep UI code separate from business/database logic.
- Use TypeScript types for important data.
- Handle loading, error, empty, and success states.
- Make the application responsive.
- Follow `design.md` for all visual decisions.
- Follow `structure.md` for the website structure.
- Do not use fake production data where real information is required.
- Do not create fake links or dead buttons.
- Do not store passwords in plain text.
- Do not use the frontend as the source of truth for important business data.

---

# 4. Phase 1 — Build All Pages and UI

## Goal

Build the complete UI for:

```text
/
 /booking
 /admin/login
 /admin/dashboard
```

At this stage:

- No real authentication
- No protected routes
- No real database
- No persistent session management

Mock data can be used to demonstrate the dashboard UI.

---

## 4.1 Landing Page

Route:

```text
/
```

Follow `structure.md`.

### Navbar

The navbar should contain:

```text
Overclock Gaming Café Logo

Home
About
Games
Pricing

BOOK A SLOT
```

Navigation:

```text
Home    → #home
About   → #about
Games   → #games
Pricing → #pricing
```

The logo should link to:

```text
/
```

The `BOOK A SLOT` button should navigate to:

```text
/booking
```

The navigation should support smooth scrolling.

---

## 4.2 Hero Section

The Hero should contain:

- Gaming background image
- Dark overlay
- Main headline
- Short description
- Booking CTA
- Explore Games CTA

Buttons:

```text
BOOK A SLOT
    ↓
/booking
```

```text
EXPLORE GAMES
    ↓
#games
```

Use the visual identity defined in `design.md`.

---

## 4.3 About Section

Section ID:

```text
#about
```

Explain what Overclock Gaming Café offers.

Known information includes:

```text
Ultra Fast Internet
PS5 Consoles
Comfy Zone
Food & Drinks
Tournaments & Events
```

Do not invent:

- Number of gaming PCs
- PC specifications
- Number of PS5 consoles
- Opening hours
- Membership prices
- Tournament schedules

unless those details are provided later.

---

## 4.4 Games Section

Section ID:

```text
#games
```

Display games using reusable game cards.

Each card can contain:

```text
Game Image
Game Name
Platform
Short Description
```

Only show games confirmed to be available at the café.

If the game list has not yet been provided, keep the data configurable rather than inventing permanent business information.

---

## 4.5 Pricing Section

Section ID:

```text
#pricing
```

Pricing has not been provided yet.

Do **not** invent prices.

Build the section so real pricing can be added later.

Example temporary state:

```text
Pricing Coming Soon
```

The component should be designed so that pricing can later be supplied through data rather than requiring a complete redesign.

---

## 4.6 Footer

The footer should contain:

```text
Overclock Gaming Café

Quick Links
Home
About
Games
Pricing

Contact
Phone
Location

Book A Slot
```

Phone:

```text
tel:+919960827157
```

Location should use the location link defined in `structure.md`.

Do not add unverified social-media links.

---

# 5. Phase 1 — Booking Page

Route:

```text
/booking
```

Build the customer booking interface.

The exact database functionality will be added in Phase 3.

---

## Booking Form

The UI can contain:

```text
Customer Name
Phone Number
Platform
Date
Start Time
Duration
```

Duration should be selectable.

For example:

```text
1 Hour
2 Hours
3 Hours
```

Keep the duration options configurable.

---

## Booking Summary

After the customer selects their information, display:

```text
Customer Name
Phone Number
Platform
Date
Start Time
Duration
End Time
```

The end time should be calculated from:

```text
Start Time + Duration
```

In Phase 1 this calculation can happen entirely on the frontend.

Do not save the booking to a real database yet.

---

# 6. Phase 1 — Admin Login

Route:

```text
/admin/login
```

Create the complete login UI.

Fields:

```text
Phone / Email
Password
```

Button:

```text
LOGIN
```

Phase 1 may use mock behavior to demonstrate the interface.

Do not treat mock authentication as real authentication.

Real authentication begins in Phase 2.

---

# 7. Phase 1 — Admin Dashboard

Route:

```text
/admin/dashboard
```

Create the dashboard UI using mock data.

The dashboard should be designed around the eventual workflow.

Example:

```text
ADMIN DASHBOARD

Search Customer

Phone Number
[________________] [SEARCH]


Customer

Name: Rahul
Phone: 9960827157


Gaming Session

Start Time: --
End Time: --
Duration: 2 Hours
Remaining: --


[ START SESSION ]
```

The dashboard should support UI states such as:

```text
No customer found
Customer found
Booking found
No active session
Active session
Session ending soon
Session completed
```

The actual functionality will be implemented in later phases.

---

# 8. Phase 2 — Protected Admin Routes

## Goal

Implement real authentication and protected admin pages.

The public pages remain accessible:

```text
/
 /booking
 /admin/login
```

The dashboard becomes protected:

```text
/admin/dashboard
```

---

## Authentication Flow

The expected flow is:

```text
Admin
   ↓
/admin/login
   ↓
Enter credentials
   ↓
Submit
   ↓
Server validates credentials
   ↓
Successful login
   ↓
/admin/dashboard
```

If an unauthenticated user tries to access:

```text
/admin/dashboard
```

they must be redirected to:

```text
/admin/login
```

If an authenticated admin accesses:

```text
/admin/login
```

they can be redirected to:

```text
/admin/dashboard
```

---

## Authentication Security

Do not use:

```text
Plain-text passwords
Passwords in localStorage
Client-only authentication
Fake protected routes
```

Authentication must be enforced on the server using the chosen Next.js architecture.

Logout must invalidate the admin session.

---

# 9. Phase 3 — Database Querying

## Goal

Connect the application to the real database.

Replace mock data with real database data.

The database becomes the source of truth.

---

# 10. Core Data Models

The exact schema can be adjusted according to the selected database and ORM.

## Admin

```text
Admin
- id
- username
- email / phone
- passwordHash
- createdAt
```

Passwords must never be stored in plain text.

---

## Customer

```text
Customer
- id
- name
- phone
- createdAt
- updatedAt
```

The phone number should be searchable.

---

## Gaming Session / Booking

```text
GamingSession
- id
- customerId
- platform
- date
- durationMinutes
- startTime
- endTime
- status
- startedAt
- createdAt
- updatedAt
```

Possible statuses:

```text
BOOKED
ACTIVE
COMPLETED
CANCELLED
```

The schema can be changed if the actual booking requirements require it.

---

# 11. Phase 3 — Required Database Queries

The admin dashboard must eventually support:

### Find Customer By Phone Number

Admin enters:

```text
9960827157
```

The server queries the database.

If found:

```text
Customer Found

Name:
Rahul

Phone:
9960827157
```

If not found:

```text
Customer Not Found
```

The customer's name must come from the database.

Do not derive the customer's name from the phone number.

---

## Find Customer's Booking

After finding the customer, retrieve the relevant booking/session.

Display:

```text
Customer Name
Phone
Platform
Date
Duration
Start Time
End Time
Status
```

---

# 12. Phase 4 — Real Gaming Session Management

## Goal

Implement the actual workflow used by the café administrator.

The final flow should be:

```text
Admin logs in
      ↓
Admin opens dashboard
      ↓
Admin enters customer's phone number
      ↓
Customer is found
      ↓
Admin sees customer name
      ↓
Admin sees customer's booking
      ↓
Customer arrives
      ↓
Admin starts the session
      ↓
Timer starts
      ↓
Start time is displayed
      ↓
End time is displayed
      ↓
Countdown is displayed
      ↓
20 minutes remaining
      ↓
Timer turns RED
      ↓
00:00:00
      ↓
Session ends
```

---

# 13. Phase 4 — Customer Search

The admin dashboard should contain:

```text
SEARCH CUSTOMER

[ Enter Phone Number ] [ SEARCH ]
```

Example:

```text
9960827157
```

The server searches for the customer.

Result:

```text
CUSTOMER FOUND

Name:
Rahul

Phone:
9960827157

Booking:
2 Hours

[ START SESSION ]
```

---

# 14. Phase 4 — Starting the Session

When the gamer arrives, the admin starts the gaming session.

Example:

```text
Arrival Time:
4:00 PM

Selected Duration:
2 Hours
```

The admin clicks:

```text
START SESSION
```

The server records the actual start time.

The system calculates:

```text
Start Time = 4:00 PM
Duration   = 2 Hours
End Time   = 6:00 PM
```

The dashboard should display:

```text
START TIME

4:00 PM


END TIME

6:00 PM


TIME REMAINING

01:59:59
```

---

# 15. Important Timer Rule

The timer must be based on actual timestamps.

Do not make the countdown itself the source of truth.

Bad approach:

```text
remaining = 7200

Every second:
remaining = remaining - 1
```

This can become inaccurate if the browser sleeps, refreshes, loses focus, or the timer drifts.

Instead:

```text
startTime
    +
duration
    ↓
endTime
    ↓
currentTime
    ↓
endTime - currentTime
    ↓
remaining time
```

The database/server should store the important timestamps.

The frontend should calculate the displayed countdown from those timestamps.

A client-side interval can be used only to refresh the display.

---

# 16. Timer Example

Suppose:

```text
Gamer arrives:
4:00 PM

Selected duration:
2 Hours
```

The system calculates:

```text
Start:
4:00 PM

End:
6:00 PM
```

At:

```text
4:00 PM
```

display:

```text
01:59:59
```

At:

```text
5:00 PM
```

display:

```text
01:00:00
```

At:

```text
5:30 PM
```

display:

```text
00:30:00
```

At:

```text
5:40 PM
```

display:

```text
00:20:00
```

At this point the warning state begins.

---

# 17. Red Timer Warning

When the remaining time reaches:

```text
20 minutes or less
```

the timer must turn red.

For example:

```text
START TIME
4:00 PM

END TIME
6:00 PM

TIME REMAINING
00:19:59
```

The countdown should have:

- Red text
- Red border
- Red glow
- Optional subtle pulse animation

Only the timer/session warning area should change.

Do not turn the entire dashboard red.

---

# 18. Session Completion

When:

```text
remainingTime <= 0
```

the timer must stop at:

```text
00:00:00
```

Never display:

```text
-00:00:01
```

The UI should show:

```text
SESSION ENDED
```

The database should update the session to:

```text
COMPLETED
```

The browser should not be solely responsible for changing the session status.

---

# 19. Refresh Safety

This is mandatory.

Suppose:

```text
Start:
4:00 PM

End:
6:00 PM
```

The admin refreshes the dashboard at:

```text
5:10 PM
```

The timer must show approximately:

```text
00:50:00
```

It must NOT restart from:

```text
02:00:00
```

This is why the start/end timestamps must be persisted.

---

# 20. Multiple Sessions

The dashboard should be designed so multiple gamers can eventually have active sessions.

Example:

```text
ACTIVE SESSIONS

Customer   Start     End       Remaining    Status
-------------------------------------------------------
Rahul      4:00 PM   6:00 PM   00:18:42     WARNING
Ayaan      4:30 PM   5:30 PM   00:00:00     COMPLETED
Sameer     5:00 PM   7:00 PM   01:18:42     ACTIVE
```

The exact visual layout can be refined during implementation.

---

# 21. Session States

Use clear session states:

```text
BOOKED
ACTIVE
WARNING
COMPLETED
CANCELLED
```

### BOOKED

The customer has a booking but the session has not started.

### ACTIVE

The session is running and more than 20 minutes remain.

### WARNING

The session is running and 20 minutes or less remain.

### COMPLETED

The session has reached its end time.

### CANCELLED

The session has been cancelled.

---

# 22. Timer Component

Create a reusable component:

```text
SessionTimer
```

Conceptually it should receive:

```ts
type SessionTimerProps = {
  startTime: string | Date;
  endTime: string | Date;
  status: "BOOKED" | "ACTIVE" | "WARNING" | "COMPLETED" | "CANCELLED";
};
```

The timer should:

1. Calculate remaining time from `endTime`.
2. Update the displayed countdown.
3. Enter the warning state at 20 minutes.
4. Stop at zero.
5. Never display negative time.
6. Continue correctly after a page refresh.
7. Clean up its timer when unmounted.

The timer should not be responsible for deciding database state by itself.

---

# 23. Server-Side Session Logic

Important session operations must happen on the server.

Conceptually:

```text
Search Customer
        ↓
Server
        ↓
Database
```

```text
Start Session
        ↓
Server
        ↓
Database
        ↓
startedAt
endTime
status
```

The frontend receives the resulting session information and displays it.

---

# 24. Admin-Only Operations

The following operations must require an authenticated admin:

```text
Search customer
View customer booking
Start session
Complete session
Cancel session
```

Do not trust client-provided values for:

```text
customerId
sessionId
adminId
status
startTime
endTime
```

Validate and authorize them on the server.

---

# 25. Loading States

Handle loading states for:

```text
Admin Login
Customer Search
Dashboard Loading
Starting Session
Completing Session
Cancelling Session
```

Prevent duplicate actions.

For example:

```text
START SESSION
```

should temporarily become:

```text
STARTING...
```

while the server request is running.

---

# 26. Error States

Customer search:

```text
Customer not found.
```

Already started:

```text
This session has already started.
```

Already completed:

```text
This session has already ended.
```

Invalid duration:

```text
Invalid session duration.
```

Database error:

```text
Something went wrong. Please try again.
```

Authentication error:

```text
Invalid credentials.
```

---

# 27. Suggested Components

```text
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
│
├── BookingForm
├── BookingSummary
│
├── AdminLoginForm
├── AdminDashboard
├── CustomerSearch
├── CustomerResult
├── SessionCard
├── SessionTable
├── SessionTimer
└── SessionStatusBadge
```

The exact component architecture can be adjusted based on the chosen Next.js structure.

---

# 28. Phase Boundaries

## Phase 1 — UI

Implement:

```text
Landing Page
Booking Page
Admin Login Page
Admin Dashboard Page
Responsive Design
Navigation
Reusable Components
```

Do not implement:

```text
Real Authentication
Protected Routes
Real Database
Persistent Sessions
Real Countdown Business Logic
```

---

## Phase 2 — Authentication

Implement:

```text
Admin Login
Admin Logout
Authentication
Protected Dashboard
Protected Admin Operations
Session Persistence
```

The admin dashboard must no longer be publicly accessible.

---

## Phase 3 — Database

Implement:

```text
Database Connection
Admin Model
Customer Model
Booking/Session Model
Customer Queries
Booking Queries
Session Queries
Create/Read/Update Operations
Server-side Validation
```

Replace mock data with real database data.

---

## Phase 4 — Gaming Session Logic

Implement:

```text
Search customer by phone
Retrieve customer name
Retrieve booking
Start session
Store actual start time
Calculate end time
Display start time
Display end time
Live countdown
20-minute red warning
Session completion
Refresh-safe timer
Multiple active sessions
Admin session controls
```

---

# 29. Final Expected Workflow

The final application should support:

```text
CUSTOMER
   ↓
Books a gaming session
   ↓
Booking is stored
   ↓
Customer arrives at café
   ↓
ADMIN
   ↓
Logs in
   ↓
Opens dashboard
   ↓
Enters customer's phone number
   ↓
Customer is found
   ↓
Admin sees customer's name
   ↓
Admin sees booking duration
   ↓
Admin clicks START SESSION
   ↓
Server records actual start time
   ↓
Server calculates end time
   ↓
Dashboard displays:
    Start Time
    End Time
    Countdown
   ↓
20 minutes remaining
   ↓
Timer turns RED
   ↓
00:00:00
   ↓
SESSION COMPLETED
```

---

# 30. Example Scenario

Customer:

```text
Name:
Rahul

Phone:
9960827157
```

Booking:

```text
Duration:
2 Hours
```

Customer arrives:

```text
4:00 PM
```

Admin searches:

```text
9960827157
```

System returns:

```text
Rahul
```

Admin clicks:

```text
START SESSION
```

The server stores:

```text
startedAt = 4:00 PM
durationMinutes = 120
endTime = 6:00 PM
status = ACTIVE
```

Dashboard:

```text
CUSTOMER

Rahul


START TIME

4:00 PM


END TIME

6:00 PM


TIME REMAINING

01:59:59
```

At 5:40 PM:

```text
TIME REMAINING

00:20:00
```

Warning state activates.

At 5:45 PM:

```text
TIME REMAINING

00:15:00
```

The timer is red.

At 6:00 PM:

```text
TIME REMAINING

00:00:00

SESSION ENDED
```

Database:

```text
status = COMPLETED
```

---

# 31. Final Architecture

The project must evolve in this order:

```text
PHASE 1
Pages + UI
       ↓
PHASE 2
Authentication + Protected Routes
       ↓
PHASE 3
Database + Queries
       ↓
PHASE 4
Gaming Session Business Logic
```

Do not skip directly to Phase 4.

Each phase should leave the application in a working state before the next phase begins.