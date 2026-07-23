# Product Requirement Document (PRD)

## 1. Executive Summary & Brand Identity
* **Project Name:** Next Step Placements
* **Product Type:** High-Conversion Single-Page Placement Agency Portal & Lead SaaS
* **Target Region:** North India Industrial Belts (Punjab, Haryana, Himachal Pradesh, Chandigarh)
* **Core Philosophy:** Zero-friction single-page lead funnel. No forced candidate registration or account creation. Instant phone dialer access and cloud-backed resume submission.

---

## 2. Tech Stack & Infrastructure
* **Frontend Framework:** Next.js (App Router) + React + Tailwind CSS
* **Backend Framework:** Node.js + Express.js (REST API Architecture)
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** Email & Password Admin Auth (JWT Access Tokens + HttpOnly Refresh Cookies)
* **File Storage:** Direct Cloud Storage (Vercel Blob / AWS S3) via browser pre-signed tokens
* **Security Pipeline:** Helmet, CORS Allowlist, Rate Limiting, NoSQL Sanitization, Zod Schema Validation

---

## 3. Design System & Color Tokens (TalentBridge Theme)

| Token Role | Color Name | Hex Code | Application Context |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | Soft Slate Tint | `#F8FAFC` | Page background, generous clean whitespace |
| **Primary Accent** | Electric Indigo | `#4F46E5` | Primary CTAs (`[Submit Application]`, `[Find Job]`) |
| **Primary Hover** | Deepened Indigo | `#4338CA` | Hover state for indigo buttons |
| **Secondary Accent** | Mint Emerald | `#10B981` | Hotline bar, status badges, placement metrics |
| **Surface Light** | Pure White | `#FFFFFF` | Form cards, teaser cards, metrics containers |
| **Surface Outline** | Soft Slate Border | `#E2E8F0` | 1px card borders & input outlines |
| **Text Primary** | Deep Slate | `#0F172A` | Headlines, form labels, card body text |
| **Text Muted** | Cool Slate Gray | `#64748B` | Subtitles, secondary metadata, placeholders |
| **Border Radius** | Extra Large Rounded | `rounded-2xl` (16px–24px) | Smooth rounded corners for forms & cards |

---

## 4. Single-Page Architecture & Layout Breakdown

The platform operates as a unified, single scrolling landing page (`/`):

┌────────────────────────────────────────────────────────┐
│ 1. ANTI-FRAUD WARNING BANNER (Sticky Top Bar)          │
├────────────────────────────────────────────────────────┤
│ 2. HEADER NAVBAR: Logo | Hot Jobs | Talent Pool | About│
├────────────────────────────────────────────────────────┤
│ 3. HERO GATEWAY (Dual High-Contrast CTAs)              │
├────────────────────────────────────────────────────────┤
│ 4. DIRECT EMPLOYER HOTLINE STRIP (Clickable tel:)      │
├────────────────────────────────────────────────────────┤
│ 5. PROVEN IMPACT METRICS COUNTERS                      │
├────────────────────────────────────────────────────────┤
│ 6. DUAL TEASER SECTION                                 │
│    ├── Hot Active Industry Openings (For Job Seekers)  │
│    └── Featured Candidate Pool (For Employers)         │
├────────────────────────────────────────────────────────┤
│ 7. UNIFIED TABBED CONVERSION ENGINE (Form Card)        │
│    ├── Tab 1: I am a Job Seeker (4 Fields Max)         │
│    └── Tab 2: I want to Hire (4 Fields Max)            │
├────────────────────────────────────────────────────────┤
│ 8. INLINE ABOUT US & INDUSTRIAL SECTOR MATRIX          │
├────────────────────────────────────────────────────────┤
│ 9. FOOTER & COMPLIANCE (Address, Privacy Policy Terms) │
└────────────────────────────────────────────────────────┘


---

## 4. Comprehensive Page & Section Breakdown

### 4.1 Sticky Anti-Fraud Warning Banner
* **Position:** Fixed top bar above the navigation menu.
* **Visual Style:** Deep navy background with high-contrast warning icon and crisp white text.
* **Copy:** `Anti-Fraud Notice: Next Step Placements NEVER requests payment, processing fees, or registration charges from job candidates.`
* **Purpose:** Immediately addresses regional recruitment scams in North India and establishes agency credibility.

### 4.2 Header Navigation Bar
* **Elements:**
  * **Brand Identity:** Next Step Placements logo and styled text title.
  * **Smooth-Scroll Links:** `Hot Jobs`, `Talent Pool`, `About Us`, `Contact`.
  * **Admin Access:** `Sign In` text button linking to `/admin/login`.

### 4.3 Hero Gateway Section
* **Background:** Deep midnight blue (`#161130`) with subtle geometric background styling.
* **Headline:** `Connecting Premier Talent with Leading Regional Industrial Employers`
* **Subtitle:** `Fast, verified recruitment solutions across Punjab, Haryana, Himachal Pradesh, and Chandigarh.`
* **Dual Action Buttons:**
  1. `[Find Your Dream Job]` (Fill: `#6C5CE7`) — Triggers smooth scroll directly to **Tab 1 (Job Seeker)** of the Conversion Engine.
  2. `[Hire Top Talent]` (Outline Style) — Triggers smooth scroll directly to **Tab 2 (Employer)** of the Conversion Engine.

### 4.4 Direct Employer Hotline Action Strip
* **Visual Style:** High-contrast accent strip featuring a prominent phone call icon.
* **Headline:** `Need Immediate Hiring Assistance? Speak directly with our Regional Recruitment Desk.`
* **Interactive Button:** Clickable phone link (`href="tel:+919876543210"`).
* **Behavior:** Tapping instantly launches the mobile device's native phone dialer with pre-filled contact number.

### 4.5 Metrics Impact Counters Grid
* **Surface Styling:** Clean white (`#FFFFFF`) cards with soft drop shadows on off-white background (`#F8F9FE`).
* **Metric Cards:**
  * **500+** Candidates Successfully Placed
  * **50+** Active Corporate Hiring Partners
  * **24–48 Hrs** Average Candidate Shortlisting Time

### 4.6 Dual Teaser Section
Provides proof of active recruitment operations for both audiences:
* **Left Column — Hot Active Industry Openings (For Job Seekers):**
  * Displays 3–4 static/dynamic industry category teasers:
    * *Production & QA Roles* — Baddi Industrial Belt (Pharma Hub)
    * *Full-Stack & IT Support Roles* — Mohali Tech Park
    * *Logistics & Plant Supervisors* — Ludhiana & Ambala Hubs
  * **CTA:** `[Apply For These Roles]` — Scrolls to candidate submission form.
* **Right Column — Featured Candidate Pool (For Employers):**
  * Displays 3–4 anonymized candidate talent cards:
    * *Candidate #102:* Senior Mechanical QA | 6 YOE | Baddi Hub | Available: Immediate
    * *Candidate #108:* Full-Stack Node.js Developer | 3 YOE | Mohali | Available: 15 Days
    * *Candidate #114:* Pharma Production Supervisor | 8 YOE | Solan | Available: Immediate
  * **CTA:** `[Request Profile]` — Auto-selects candidate ID inside the employer inquiry form.

### 4.7 Unified Tabbed Conversion Engine (The Core Lead Form)
A single surface card containing an interactive tab toggle component:

#### Tab 1: For Job Seekers (4 Fields + Mandatory Consent)
1. **Full Name:** Text Input (Required)
2. **Mobile / WhatsApp Number:** Phone Input with format validation (Required)
3. **Preferred City / Industry:** Dropdown (`Pharmaceuticals`, `IT/Software`, `Industrial Manufacturing`, `Logistics/Supply Chain`, `Sales & Marketing`, `Other`)
4. **Resume Upload Dropzone:** Drag-and-drop file upload (`.pdf` / `.docx`, max 4.5 MB)
5. **DPDP Consent Checkbox (Mandatory):** `[x] I agree to Next Step Placements storing my contact info and resume for placement purposes.` (Required)
* **Submit Action Button:** `[Submit Application & Resume]` (Vibrant Indigo `#6C5CE7`)

#### Tab 2: For Employers / Job Providers (4 Fields + Mandatory Consent)
1. **Company Name & Contact Person:** Text Input (Required)
2. **Business Email / Direct Phone:** Email/Phone Input (Required)
3. **Hiring Role / Industry Required:** Text Input or Sector Dropdown
4. **Requirement Details / Urgency:** Short Text Area
5. **DPDP Consent Checkbox (Mandatory):** `[x] I agree to Next Step Placements storing my company contact info and hiring requirements for recruitment purposes.` (Required)
* **Submit Action Button:** `[Request Candidate Profiles]` (Midnight Navy `#161130`)

### 4.8 Post-Submission Action Modal
Appears immediately following successful submission of either form:
* **Title:** `Application Received Successfully!`
* **Body:** `Our regional recruitment team has logged your submission. For urgent or time-sensitive inquiries, feel free to call our direct hotline.`
* **Primary Action:** Clickable Phone Call Button (`href="tel:+919876543210"`) — Triggers mobile phone dialer.
* **Secondary Action:** `[Close Window]` — Dismisses modal and clears form state.

### 4.9 Inline About Us & Regional Sector Matrix
* **Brand Footprint Story:** Details Next Step Placements' specialization in North India's industrial corridors (Baddi, Mohali, Ludhiana, Karnal, Panchkula).
* **Sector Cards Grid:** Visual icons representing Pharmaceuticals, Manufacturing, IT/Software, Logistics, and FMCG.

### 4.10 Footer & Compliance Section
* **Contact Details:** Physical office address, official email addresses, direct helpline numbers.
* **Legal Terms:** Embedded modal for **Privacy Policy & Data Handling Terms** in alignment with Indian DPDP guidelines.

### 4.11 Instant Application Status Checker (`/track` / Header Modal)
* **Access Point:** Header navigation link (`Track Status`) or dedicated search bar trigger.
* **UX Flow:** Candidates enter their 10-digit mobile number to view their application status in real-time without account registration.
* **Privacy & Security Shield:** Full names are masked (e.g., `"Navi D."`), and private asset URLs (resume links) and internal admin placement notes are strictly excluded.
* **Status States Rendered:** `NEW` (Received), `UNDER_REVIEW` (Under Screening), `SHORTLISTED` (Recommended to Employers), `JOB_PROVIDED` (Placed), `REJECTED` (Closed).

---

## 5. File Upload Architecture & Technical Stack

[Candidate Browser] ──(1) Request Upload Token──> [Express API]
[Candidate Browser] ──(2) Direct File Upload ──> [Vercel Blob / S3]
[Candidate Browser] ──(3) Resume URL + Form ───> [Express API] ──> [MongoDB Atlas]


### 5.1 Cloud Storage Protocol (Direct-to-Cloud Uploads)
To prevent Vercel serverless request body limits (4.5 MB ceiling) and eliminate memory bloat in MongoDB:
1. Candidate selects a `.pdf` or `.docx` file in the Next.js form.
2. Frontend requests a pre-signed upload URL / client token from the Express API endpoint (`POST /api/v1/uploads/token`).
3. Frontend uploads the binary file directly to Vercel Blob / AWS S3.
4. Cloud storage returns a secure file URL string (e.g., `https://blob.vercel-storage.com/resumes/cand_108.pdf`).
5. Frontend sends JSON payload `{ fullName, phone, preferredLocation, industry, resumeUrl }` to Express.
6. Express validates the JSON payload with Zod and stores the metadata record in MongoDB Atlas.

### 5.2 Express Security Middleware Pipeline (`src/app.ts`)
Incoming requests pass through a strict security chain:
1. **Helmet Header Guard:** `helmet()` sets standard HTTP security headers.
2. **CORS Configuration:** Explicit origin binding to the Next.js frontend domain.
3. **NoSQL Injection Sanitization:** `express-mongo-sanitize()` strips SQL/NoSQL operator keys (`$`, `.`).
4. **Rate Limiting Guard:** `express-rate-limit` enforces a maximum of 10 lead submissions per 15 minutes per IP address.
5. **Payload Size Guard:** `express.json({ limit: '10kb' })` prevents memory exhaustion attacks.
6. **Schema Validation:** Strict Zod schema validation on incoming body payloads.

### 5.3 Automated Lead Notification System
Upon successful DB insertion of any lead:
1. **Asynchronous Dispatch:** Express triggers non-blocking background notification handlers.
2. **Email Alert (Nodemailer / SMTP):** Dispatches instant detailed email notification to `recruitment@nextstepplacements.com` containing applicant/employer metadata and direct cloud resume URL.
3. **WhatsApp Alert Webhook (Twilio / Meta Business API):** Sends real-time lead summary notification (`Name`, `Role/Industry`, `Phone`) directly to the recruitment desk hotline.

### 5.4 Comprehensive REST API Specification

#### 5.4.1 Authentication & User Management (`/api/v1/auth`)
* **`POST /api/v1/auth/login`**
  * **Access:** Public (Rate Limited: 5 attempts per 15 min per IP)
  * **Payload:** `{ "email": "admin@nextstepplacements.com", "password": "SecurePassword123" }`
  * **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "accessToken": "eyJhbGciOi...",
        "user": { "id": "64f1...", "email": "admin@nextstepplacements.com", "role": "ADMIN" }
      }
    }
    ```
  * **Cookies:** Sets `refreshToken` cookie (`HttpOnly`, `Secure`, `SameSite=Strict`, `Max-Age=7 days`).

* **`POST /api/v1/auth/refresh`**
  * **Access:** Public (Requires valid `refreshToken` HttpOnly Cookie)
  * **Success Response (200 OK):** Returns new `accessToken`.

* **`POST /api/v1/auth/logout`**
  * **Access:** Authenticated
  * **Action:** Clears `refreshToken` cookie and revokes session.

* **`GET /api/v1/auth/me`**
  * **Access:** Authenticated (`Bearer <accessToken>`)
  * **Success Response (200 OK):** Returns current user details (`id`, `email`, `role`).

#### 5.4.2 Direct Resume Upload Protocol (`/api/v1/uploads`)
* **`POST /api/v1/uploads/token`**
  * **Access:** Public (Rate Limited)
  * **Payload:** `{ "fileName": "resume.pdf", "fileType": "application/pdf" }`
  * **Validation:** Whitelists `.pdf` and `.docx` MIME types (max 4.5 MB).
  * **Success Response (200 OK):** Returns pre-signed cloud upload token / direct upload URL.

#### 5.4.3 Public Lead Capture Engine (`/api/v1/leads`)
* **`POST /api/v1/leads/candidate`**
  * **Access:** Public (Rate Limited: 10 per 15 min per IP)
  * **Payload:** `{ "fullName": "String", "phone": "String", "preferredLocation": "Enum", "industry": "String", "resumeUrl": "String", "consentGiven": true }`
  * **Success Response (201 Created):** Returns lead object & triggers email/WhatsApp alerts.

* **`POST /api/v1/leads/employer`**
  * **Access:** Public (Rate Limited: 10 per 15 min per IP)
  * **Payload:** `{ "companyName": "String", "contactPerson": "String", "email": "String", "phone": "String", "hiringRole": "String", "requirements": "String", "consentGiven": true }`
  * **Success Response (201 Created):** Returns lead object & triggers email/WhatsApp alerts.

* **`POST /api/v1/leads/status`**
  * **Access:** Public (Rate Limited: 5 per 15 min per IP)
  * **Payload:** `{ "phone": "9876543210" }`
  * **Success Response (200 OK):** Returns privacy-shielded lead status: `{ "fullName": "Navi D.", "preferredLocation": "Ludhiana", "industry": "IT & Software", "status": "SHORTLISTED", "isSolved": false, "updatedAt": "2026-07-23T04:00:00.000Z" }`.

#### 5.4.4 Protected Admin Management (`/api/v1/admin`)
* **`GET /api/v1/admin/candidates`**
  * **Access:** Protected (`ADMIN` or `STAFF`)
  * **Query Parameters:** `page`, `limit`, `status`, `isSolved`, `search`
  * **Success Response (200 OK):** Paginated array of candidate leads.

* **`PATCH /api/v1/admin/candidates/:id/status`**
  * **Access:** Protected (`ADMIN` or `STAFF`)
  * **Payload:** `{ "status": "JOB_PROVIDED", "isSolved": true, "placementNotes": "Placed at Sun Pharma Baddi" }`
  * **Action:** Updates status, sets `solvedAt` timestamp, and records placement notes.

* **`GET /api/v1/admin/employers`**
  * **Access:** Protected (`ADMIN` or `STAFF`)
  * **Query Parameters:** `page`, `limit`, `status`, `search`
  * **Success Response (200 OK):** Paginated array of employer leads.

* **`PATCH /api/v1/admin/employers/:id/status`**
  * **Access:** Protected (`ADMIN` or `STAFF`)
  * **Payload:** `{ "status": "CONTACTED" }`

* **`GET /api/v1/admin/export/candidates` & `GET /api/v1/admin/export/employers`**
  * **Access:** Protected (`ADMIN`)
  * **Response:** CSV File stream download for offline processing.

---

## 6. Database Schemas (MongoDB Atlas)

### Candidate Lead Schema (`CandidateLead`)
```json
{
  "_id": "ObjectId",
  "fullName": "String (Required, Trimmed)",
  "phone": "String (Required, Format Validated)",
  "preferredLocation": "String (Enum: Punjab, Haryana, Himachal Pradesh, Chandigarh, Other)",
  "industry": "String (Required)",
  "resumeUrl": "String (Required, URL Format)",
  "consentGiven": "Boolean (Required, Must be true for DPDP Compliance)",
  "status": "String (Enum: NEW, REVIEWED, SHORTLISTED, JOB_PROVIDED, REJECTED, Default: NEW)",
  "isSolved": "Boolean (Default: false, Set to true when job is provided to candidate)",
  "solvedAt": "ISODate (Optional timestamp when query is marked solved/placed)",
  "placementNotes": "String (Optional admin notes on company/role candidate was placed in)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```
### Employer Lead Schema (`EmployerLead`)
```json
{
  "_id": "ObjectId",
  "companyName": "String (Required, Trimmed)",
  "contactPerson": "String (Required, Trimmed)",
  "email": "String (Required, Email Format)",
  "phone": "String (Required, Format Validated)",
  "hiringRole": "String (Required)",
  "requirements": "String (Optional)",
  "consentGiven": "Boolean (Required, Must be true for DPDP Compliance)",
  "status": "String (Enum: NEW, CONTACTED, CLOSED, Default: NEW)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```
User / Admin Schema (User)
JSON
{
  "_id": "ObjectId",
  "email": "String (Required, Unique, Lowercase)",
  "passwordHash": "String (Required, Bcrypt/Argon2)",
  "role": "String (Enum: ADMIN, STAFF, Default: ADMIN)",
  "createdAt": "ISODate"
}
7. Internal Admin Dashboard Requirements (/admin)
Protected Access: Access restricted via Next.js Middleware (middleware.ts) enforcing valid JWT authentication issued by /api/v1/auth/login.

Token Rotation Strategy: Access tokens stored in-memory; 7-day refresh tokens stored in HttpOnly, Secure, SameSite=Strict cookies.

Candidate Leads Tab: Paginated, filterable data table displaying candidates, phone numbers, industries, application dates, direct PDF resume download links, and a Quick Resolution/Placement Status toggle (`NEW`, `REVIEWED`, `SHORTLISTED`, `JOB PROVIDED / SOLVED`, `REJECTED`). Includes visual status pills (Green for `JOB PROVIDED`, Amber for `SHORTLISTED`) and placement notes editor.

Employer Leads Tab: Searchable data table displaying corporate inquiries with quick status toggles (NEW, CONTACTED, CLOSED).

Resolution & Placement Filtering: Filter bar to toggle between `All Candidates`, `Unresolved Leads`, and `Job Provided / Solved`.

CSV Export Tool: 1-Click [Export Candidates CSV] and [Export Employers CSV] controls for offline team processing.

8. Summary Checklist of Deliverables
[x] Single-Page Next.js Frontend: Single scrolling landing page built with Next.js App Router and Tailwind CSS in Midnight Navy (#161130) theme.

[x] Low-Friction Tabbed Form: Dual-tab lead capture engine for candidates and employers.

[x] DPDP Act 2023 Consent Checkbox: Mandatory consent checkbox enforced on both lead forms and MongoDB schemas.

[x] Direct Clickable Phone Dialer: tel: protocol integration for instant B2B employer lead calls.

[x] Direct Cloud Resume Upload: Bypasses serverless body limits via browser-to-cloud pre-signed upload tokens.

[x] Express 5 API & Security Pipeline: Includes Helmet, CORS, NoSQL sanitization, Rate Limiting, and Zod validation.

[x] Automated Recruitment Notification System: Real-time Email & WhatsApp notification alerts sent to recruitment desk upon lead creation.

[x] MongoDB Atlas Integration: Production schemas for Candidate Leads, Employer Leads, and Admin Users.

[x] Candidate Placement Resolution Tracking: Admin toggle to mark candidate queries as 'Job Provided / Solved' with placement notes and timestamps.

[x] Protected Admin Portal (/admin): JWT email-authenticated lead viewer with status filters and CSV export capabilities.