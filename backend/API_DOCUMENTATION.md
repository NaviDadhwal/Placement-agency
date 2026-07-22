# NextStep Placements Backend API Documentation

Welcome to the official developer documentation for the **NextStep Placements Platform Backend**. This document provides an exhaustive, production-grade guide covering system architecture, environment configuration, database models, state machines, lifecycle scenarios (Approve, Discard, Change), HTTP status codes, error handling contracts, and complete API endpoint specifications.

---

## 📋 Table of Contents
1. [Architecture & Tech Stack](#1-architecture--tech-stack)
2. [Environment Configuration & Setup](#2-environment-configuration--setup)
3. [Database Schemas & Data Models](#3-database-schemas--data-models)
4. [HTTP Status Codes & Error Handling Standard](#4-http-status-codes--error-handling-standard)
5. [Lead State Machine & Lifecycle Scenarios (Approve, Discard, Change)](#5-lead-state-machine--lifecycle-scenarios)
6. [Complete API Endpoints Specification](#6-complete-api-endpoints-specification)
   - [System & Health](#1-system--health)
   - [Public Lead Submissions](#2-public-lead-submissions)
   - [Authentication & Admin Profile](#3-authentication--admin-profile)
   - [File Upload Service](#4-file-upload-service)
   - [Admin Lead Management & CSV Exports](#5-admin-lead-management--csv-exports)
7. [Developer Handoff & Quickstart Guide](#7-developer-handoff--quickstart-guide)

---

## 1. Architecture & Tech Stack

The backend is built as a RESTful web service following modular layered architecture (Routes -> Controllers -> Middleware -> Schemas -> Models -> Services).

- **Core Engine**: Node.js + Express.js (TypeScript)
- **Database**: MongoDB Atlas via Mongoose ORM
- **Validation**: Zod (Type-safe request body & parameter parsing)
- **Authentication**: Dual-token JWT architecture (Short-lived Access Tokens in Bearer Header + HttpOnly Refresh Cookies)
- **File Uploads**: Multer engine (supports `.pdf`, `.doc`, `.docx`) with fallback dev mock generation
- **Security**: CORS, Bcrypt password hashing, DPDP compliance consent tracking

---

## 2. Environment Configuration & Setup

Create a `.env` file in the `backend/` root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@makemyaim.hgaexfh.mongodb.net/makemyaim
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
```

---

## 3. Database Schemas & Data Models

### 3.1 User Model (`users` collection)
Stores administrative users with encrypted credentials.

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | `ObjectId` | Auto | Unique user ID |
| `email` | `String` | Yes | Lowercase unique email address |
| `passwordHash` | `String` | Yes | Bcrypt password hash (salt rounds: 10) |
| `role` | `String` | Yes | Enum: `'ADMIN' \| 'SUPERADMIN'` (default: `'ADMIN'`) |
| `createdAt` | `Date` | Auto | Timestamp |
| `updatedAt` | `Date` | Auto | Timestamp |

### 3.2 CandidateLead Model (`candidateleads` collection)
Stores job applicants submitted via website candidate forms.

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | `ObjectId` | Auto | Lead record ID |
| `fullName` | `String` | Yes | Applicant full name |
| `phone` | `String` | Yes | 10-digit mobile / WhatsApp number |
| `preferredLocation` | `String` | Yes | Preferred job corridor (e.g. `'Ludhiana'`) |
| `industry` | `String` | Yes | Candidate industry category |
| `resumeUrl` | `String` | Yes | Cloud or local static resume URL |
| `consentGiven` | `Boolean` | Yes | DPDP privacy consent verification |
| `status` | `String` | Yes | Enum: `'NEW' \| 'UNDER_REVIEW' \| 'SHORTLISTED' \| 'JOB_PROVIDED' \| 'REJECTED' \| 'SPAM'` |
| `isSolved` | `Boolean` | Yes | Placement flag (default: `false`) |
| `solvedAt` | `Date` | No | Date job placement was confirmed |
| `placementNotes` | `String` | No | Administrative placement notes |

### 3.3 EmployerLead Model (`employerleads` collection)
Stores hiring inquiries submitted by corporate employers.

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | `ObjectId` | Auto | Employer inquiry ID |
| `companyName` | `String` | Yes | Organization name |
| `contactPerson` | `String` | Yes | Primary contact manager |
| `email` | `String` | Yes | Corporate email address |
| `phone` | `String` | Yes | Mobile number |
| `hiringRole` | `String` | Yes | Target hiring role |
| `requirements` | `String` | Yes | Role requirements & experience |
| `consentGiven` | `Boolean` | Yes | DPDP privacy consent verification |
| `status` | `String` | Yes | Enum: `'NEW' \| 'CONTACTED' \| 'REQUIREMENT_GATHERED' \| 'CLOSED' \| 'DISCARDED'` |

---

## 4. HTTP Status Codes & Error Handling Standard

The API enforces standardized JSON error structures and strict HTTP status codes:

### Standardized Error JSON Payload
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_NAME",
    "message": "Human-readable explanation of error",
    "details": []
  }
}
```

### Complete HTTP Status Code Table

| Status Code | Meaning | Common Scenarios | Error Code Examples |
|---|---|---|---|
| `200 OK` | Request Succeeded | Successful read, status update, login, file upload | N/A |
| `201 Created` | Resource Created | Public candidate or employer lead registered | N/A |
| `400 Bad Request` | Client Input Error | Validation failed (Zod schema), missing file, invalid ID | `ZOD_ERROR`, `FILE_MISSING`, `INVALID_FILE_TYPE` |
| `401 Unauthorized` | Authentication Failure | Missing/expired JWT access token, invalid login password | `UNAUTHORIZED`, `INVALID_TOKEN`, `INVALID_CREDENTIALS` |
| `403 Forbidden` | Authorization Error | Accessing admin route without `ADMIN` role | `FORBIDDEN` |
| `404 Not Found` | Resource Missing | Non-existent candidate/employer ID requested | `NOT_FOUND`, `ROUTE_NOT_FOUND` |
| `409 Conflict` | Data Conflict | Registering an account with an existing email | `USER_EXISTS` |
| `422 Unprocessable` | Unprocessable Data | Unhandled business logic error | `UNPROCESSABLE_ENTITY` |
| `500 Internal Error` | Server Exception | Database timeout or unhandled server crash | `INTERNAL_SERVER_ERROR` |

---

## 5. Lead State Machine & Lifecycle Scenarios

When an admin manages candidate or employer leads, status transitions trigger specific system behaviors:

```
[ NEW ] ──┬──> [ UNDER_REVIEW ] ──┬──> [ SHORTLISTED ] ──> [ JOB_PROVIDED ] (Approve Scenario)
          │                       │
          ├──> [ REJECTED ] ──────┴──> [ SPAM ] (Discard Scenario)
          │
          └──> [ CONTACTED ] (Change/In-Progress Scenario)
```

### Scenario 1: Approve / Shortlist Candidate Lead
- **Action**: Admin marks candidate status as `SHORTLISTED` or `JOB_PROVIDED`.
- **System Behavior**:
  - Sets `status = "JOB_PROVIDED"` or `"SHORTLISTED"`.
  - Automatically sets `isSolved = true`.
  - Automatically records `solvedAt = new Date()`.
  - Preserves optional `placementNotes`.

### Scenario 2: Discard / Reject Candidate Lead
- **Action**: Admin marks candidate status as `REJECTED` or `SPAM`.
- **System Behavior**:
  - Sets `status = "REJECTED"` or `"SPAM"`.
  - Automatically sets `isSolved = false`.
  - Clears `solvedAt = undefined`.

### Scenario 3: Change / In-Progress Update
- **Action**: Admin updates lead status to `UNDER_REVIEW` or `CONTACTED` and appends notes.
- **System Behavior**:
  - Updates `status` and `placementNotes`.
  - Keeps `isSolved = false` until placement is finalized.

---

## 6. Complete API Endpoints Specification

### 1. System & Health

#### `GET /api/v1/health`
Checks server and database connection health.
- **Headers**: None
- **Response `200 OK`**:
```json
{
  "status": "online",
  "timestamp": "2026-07-23T03:15:00.000Z",
  "environment": "development",
  "database": "connected"
}
```

---

### 2. Public Lead Submissions

#### `POST /api/v1/leads/candidate`
Registers a job candidate lead.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "fullName": "Navi Dadhwal",
  "phone": "9876543210",
  "preferredLocation": "Ludhiana",
  "industry": "IT & Software",
  "resumeUrl": "https://example.com/resume.pdf",
  "consentGiven": true
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Candidate application submitted successfully",
  "data": {
    "id": "6a610ba99cfc54ae20a0cc09",
    "fullName": "Navi Dadhwal",
    "phone": "9876543210",
    "preferredLocation": "Ludhiana",
    "industry": "IT & Software",
    "status": "NEW",
    "isSolved": false
  }
}
```
- **Error Response `400 Bad Request` (Validation Failure)**:
```json
{
  "success": false,
  "error": {
    "code": "ZOD_ERROR",
    "message": "Validation failed",
    "details": [
      { "path": ["phone"], "message": "Phone number must be at least 10 digits" }
    ]
  }
}
```

#### `POST /api/v1/leads/employer`
Registers a corporate hiring inquiry.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "companyName": "MakeMyAim Tech",
  "contactPerson": "Navi Dadhwal",
  "email": "contact@makemyaim.com",
  "phone": "9876543210",
  "hiringRole": "Senior Node.js Developer",
  "requirements": "3+ years Express.js & MongoDB",
  "consentGiven": true
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Employer inquiry registered successfully",
  "data": {
    "id": "6a6113809cfc54ae20a0cc0f",
    "companyName": "MakeMyAim Tech",
    "status": "NEW"
  }
}
```

---

### 3. Authentication & Admin Profile

#### `POST /api/v1/auth/login`
Authenticates an administrator and returns a JWT access token & sets HttpOnly refresh cookie.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "admin@nextstepplacements.com",
  "password": "AdminPass123!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "user": {
      "id": "6a610ba99cfc54ae20a0cc00",
      "email": "admin@nextstepplacements.com",
      "role": "ADMIN"
    }
  }
}
```

#### `GET /api/v1/auth/me`
Retrieves authenticated user profile.
- **Headers**: `Authorization: Bearer {{accessToken}}`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "6a610ba99cfc54ae20a0cc00",
      "email": "admin@nextstepplacements.com",
      "role": "ADMIN"
    }
  }
}
```

#### `POST /api/v1/auth/refresh`
Refreshes access token using HttpOnly cookie.
- **Headers**: Cookie `refreshToken=...`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": { "accessToken": "eyJhbGciOiJIUzI1Ni..." }
}
```

#### `POST /api/v1/auth/logout`
Clears refresh token cookie and logs out.
- **Response `200 OK`**:
```json
{ "success": true, "message": "Logged out successfully" }
```

---

### 4. File Upload Service

#### `POST /api/v1/uploads/token`
Generates pre-signed / mock upload URL & token.
- **Request Body**:
```json
{
  "filename": "candidate_resume.pdf",
  "contentType": "application/pdf"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "uploadUrl": "http://localhost:5000/api/v1/uploads/file",
    "fileKey": "1784754991612_candidate_resume.pdf",
    "publicUrl": "http://localhost:5000/uploads/resumes/1784754991612_candidate_resume.pdf"
  }
}
```

#### `POST /api/v1/uploads/file`
Uploads resume file (accepts form field `file`, `cv`, `resume`, `document`).
- **Headers**: `multipart/form-data`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileName": "1784755187465_candidate_cv.pdf",
    "originalName": "candidate_cv.pdf",
    "size": 32150,
    "mimeType": "application/pdf",
    "publicUrl": "http://localhost:5000/uploads/resumes/1784755187465_candidate_cv.pdf"
  }
}
```

---

### 5. Admin Lead Management & CSV Exports

#### `GET /api/v1/admin/candidates`
Queries candidates with search, filter, and pagination.
- **Headers**: `Authorization: Bearer {{accessToken}}`
- **Query Params**: `page=1&limit=10&status=NEW&search=Navi`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "_id": "6a610ba99cfc54ae20a0cc09",
        "fullName": "Navi Dadhwal",
        "phone": "9876543210",
        "preferredLocation": "Ludhiana",
        "industry": "IT & Software",
        "status": "NEW",
        "isSolved": false
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
  }
}
```

#### `PATCH /api/v1/admin/candidates/:id/status`
Updates candidate status and placement notes (Approve / Discard / Change).
- **Headers**: `Authorization: Bearer {{accessToken}}`, `Content-Type: application/json`
- **Request Body (Approve Scenario)**:
```json
{
  "status": "JOB_PROVIDED",
  "isSolved": true,
  "placementNotes": "Placed at MakeMyAim Tech as Senior Node.js Developer"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Candidate status updated successfully",
  "data": {
    "_id": "6a610ba99cfc54ae20a0cc09",
    "status": "JOB_PROVIDED",
    "isSolved": true,
    "solvedAt": "2026-07-23T03:15:00.000Z",
    "placementNotes": "Placed at MakeMyAim Tech as Senior Node.js Developer"
  }
}
```

#### `GET /api/v1/admin/export/candidates`
Exports candidate leads as a downloadable CSV.
- **Headers**: `Authorization: Bearer {{accessToken}}`
- **Response `200 OK`**: `Content-Type: text/csv`, attachment filename `"candidates_leads_export.csv"`.

#### `GET /api/v1/admin/export/employers`
Exports employer inquiries as a downloadable CSV.
- **Headers**: `Authorization: Bearer {{accessToken}}`
- **Response `200 OK`**: `Content-Type: text/csv`, attachment filename `"employers_leads_export.csv"`.

---

## 7. Developer Handoff & Quickstart Guide

If a new developer takes over this codebase, follow these exact steps to run and test immediately:

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Build & Start Development Server
```bash
npm run build
npm run dev
```

### Step 3: Run Full Automated Verification Suite
To verify all 15 endpoints in 5 seconds:
```bash
node scratch/verifyBackendSuite.js
```

### Step 4: Sync Postman Collection
To update your Postman cloud workspace:
```bash
node .agents/skills/postman-api-management/scripts/sync_postman_collection.js
```
