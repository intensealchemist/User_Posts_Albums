# Software Requirements Specification (SRS)

## User Posts & Albums Explorer

**Document ID:** SRS-UPA-001  
**Version:** 0.1  
**Status:** Draft  
**Prepared By:** Atul Sharma  
**Date:** 04 October 2026  
**Technology Stack:** HTML5, CSS3, JavaScript (ES6+), jQuery 4.0.0  
**Data Source:** JSONPlaceholder REST API (`https://jsonplaceholder.typicode.com`)  
**Based On:** RUD v1.1, HLD v0.1, LLD v0.1  

---

## Table of Contents

1. [Introduction](#1-introduction)  
   1.1 [Purpose](#11-purpose)  
   1.2 [Document Scope](#12-document-scope)  
   1.3 [Intended Audience](#13-intended-audience)  
   1.4 [Definitions, Acronyms, and Abbreviations](#14-definitions-acronyms-and-abbreviations)  
   1.5 [References](#15-references)  
   1.6 [Document Conventions](#16-document-conventions)  
2. [Overall Description](#2-overall-description)  
   2.1 [Product Perspective](#21-product-perspective)  
   2.2 [Product Functions (Summary)](#22-product-functions-summary)  
   2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)  
   2.4 [Operating Environment](#24-operating-environment)  
   2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)  
   2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)  
3. [External Interface Requirements](#3-external-interface-requirements)  
   3.1 [User Interfaces](#31-user-interfaces)  
   3.2 [Hardware Interfaces](#32-hardware-interfaces)  
   3.3 [Software Interfaces](#33-software-interfaces)  
   3.4 [Communication Interfaces](#34-communication-interfaces)  
4. [System Features and Functional Requirements](#4-system-features-and-functional-requirements)  
   4.1 [FR-01 — Retrieve User List](#41-fr-01--retrieve-user-list)  
   4.2 [FR-02 — Display User Names](#42-fr-02--display-user-names)  
   4.3 [FR-03 — User Selection](#43-fr-03--user-selection)  
   4.4 [FR-04 — Retrieve Selected User's Posts](#44-fr-04--retrieve-selected-users-posts)  
   4.5 [FR-05 — Retrieve Selected User's Albums](#45-fr-05--retrieve-selected-users-albums)  
   4.6 [FR-06 — Separate Posts and Albums Views](#46-fr-06--separate-posts-and-albums-views)  
   4.7 [FR-07 — Loading Feedback](#47-fr-07--loading-feedback)  
   4.8 [FR-08 — Error Handling](#48-fr-08--error-handling)  
   4.9 [FR-09 — Dynamic DOM Updates (No Full-Page Reload)](#49-fr-09--dynamic-dom-updates-no-full-page-reload)  
   4.10 [FR-10 — Empty State Handling](#410-fr-10--empty-state-handling)  
   4.11 [FR-11 — Stale Response Protection](#411-fr-11--stale-response-protection)  
5. [Non-Functional Requirements](#5-non-functional-requirements)  
   5.1 [NFR-01 — Performance](#51-nfr-01--performance)  
   5.2 [NFR-02 — Usability](#52-nfr-02--usability)  
   5.3 [NFR-03 — Reliability](#53-nfr-03--reliability)  
   5.4 [NFR-04 — Security](#54-nfr-04--security)  
   5.5 [NFR-05 — Maintainability](#55-nfr-05--maintainability)  
   5.6 [NFR-06 — Compatibility](#56-nfr-06--compatibility)  
   5.7 [NFR-07 — Accessibility](#57-nfr-07--accessibility)  
6. [Use Cases](#6-use-cases)  
   6.1 [UC-01 — View User List](#61-uc-01--view-user-list)  
   6.2 [UC-02 — Select a User](#62-uc-02--select-a-user)  
   6.3 [UC-03 — View Posts](#63-uc-03--view-posts)  
   6.4 [UC-04 — View Albums](#64-uc-04--view-albums)  
   6.5 [UC-05 — Handle API Failure](#65-uc-05--handle-api-failure)  
7. [Data Requirements](#7-data-requirements)  
   7.1 [Data Entities](#71-data-entities)  
   7.2 [Data Fields Used by the UI](#72-data-fields-used-by-the-ui)  
8. [External API Specification](#8-external-api-specification)  
9. [Constraints and Exclusions](#9-constraints-and-exclusions)  
10. [Requirement Traceability Matrix](#10-requirement-traceability-matrix)  
11. [UI State Model](#11-ui-state-model)  
12. [Acceptance Criteria](#12-acceptance-criteria)  
13. [Document Revision History](#13-document-revision-history)  

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the complete, confirmed functional and non-functional requirements for the **User Posts & Albums Explorer** web application. It serves as the authoritative requirements baseline for design, implementation, and testing activities. All design documents (HLD, LLD) and test artefacts must be consistent with this SRS.

### 1.2 Document Scope

The **User Posts & Albums Explorer** is a client-side-only web application that:

- Retrieves a list of users from the JSONPlaceholder REST API.
- Displays each user's full name in a selectable list.
- Upon user selection, concurrently retrieves that user's posts and albums from the same API.
- Presents the posts and albums in separate, user-switchable views within a shared content area.
- Provides clear loading and error states throughout the interaction lifecycle.

The application does **not** include any custom backend, database, authentication, persistent storage, or write operations against any data source.

### 1.3 Intended Audience

| Audience | Relevance |
|---|---|
| Developer / Implementer | Primary implementation reference |
| Technical Reviewer / Assessor | Compliance verification |
| QA / Test Engineer | Test-case derivation |
| Project Supervisor / Internship Mentor | Scope and requirement validation |

### 1.4 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|---|---|
| **SRS** | Software Requirements Specification |
| **RUD** | Requirements Understanding Document |
| **HLD** | High-Level Design |
| **LLD** | Low-Level Design |
| **FR** | Functional Requirement |
| **NFR** | Non-Functional Requirement |
| **UC** | Use Case |
| **API** | Application Programming Interface |
| **REST** | Representational State Transfer |
| **AJAX** | Asynchronous JavaScript and XML |
| **DOM** | Document Object Model |
| **JSONPlaceholder** | Free fake REST API for testing — `https://jsonplaceholder.typicode.com` |
| **jQuery** | JavaScript library used for DOM manipulation and AJAX |
| **User** | A data record returned by `GET /users` |
| **Post** | A data record returned by `GET /users/{id}/posts` |
| **Album** | A data record returned by `GET /users/{id}/albums` |
| **Active View** | Either "Posts" or "Albums" — the view currently displayed in the detail panel |
| **Selected User** | The user whose name is currently highlighted and whose data is loaded |

### 1.5 References

| Document | Version | Location |
|---|---|---|
| Requirements Understanding Document | 1.1 | `docs/RUD_v1.1.pdf` |
| High-Level Design | 0.1 | `docs/HLD_v0.1.md` |
| Low-Level Design | 0.1 | `docs/LLD_v0.1.md` |
| API Specification | 0.1 | `docs/API-Spec_v0.1.md` |
| JSONPlaceholder API Documentation | — | https://jsonplaceholder.typicode.com |
| jQuery Documentation | 4.0.0 | https://api.jquery.com |

### 1.6 Document Conventions

- **Shall** — Indicates a mandatory requirement.
- **Should** — Indicates a recommended, but not mandatory, behavior.
- **May** — Indicates an optional behavior.
- Requirement identifiers use the format `FR-NN` (functional) and `NFR-NN` (non-functional).
- Use-case identifiers use the format `UC-NN`.

---

## 2. Overall Description

### 2.1 Product Perspective

The User Posts & Albums Explorer is a standalone, single-page, client-side web application. It does not belong to a larger system. All application logic executes in the user's browser. External data is sourced exclusively from the publicly available JSONPlaceholder REST API via HTTPS GET requests.

```
┌────────────────────────────────────────┐
│        User's Web Browser              │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  User Posts & Albums Explorer    │  │
│  │  (HTML + CSS + JS + jQuery)      │  │
│  └───────────────┬──────────────────┘  │
│                  │ HTTPS GET           │
└──────────────────┼─────────────────────┘
                   │
       ┌───────────▼────────────┐
       │  JSONPlaceholder API   │
       │  /users                │
       │  /users/{id}/posts     │
       │  /users/{id}/albums    │
       └────────────────────────┘
```

There is no server-side application component, no application-owned database, and no authentication layer.

### 2.2 Product Functions (Summary)

| # | Function |
|---|---|
| 1 | Fetch and display a list of all users on application load |
| 2 | Allow the user to select any displayed user |
| 3 | Fetch and display the selected user's posts |
| 4 | Fetch and display the selected user's albums |
| 5 | Allow switching between Posts and Albums views without a new API request |
| 6 | Show loading indicators during data retrieval |
| 7 | Show error messages when API requests fail |
| 8 | Show empty-state messages when a user has no posts or albums |
| 9 | Update the page without a full browser reload |

### 2.3 User Classes and Characteristics

There is a single user class for this application:

**End User (Browser User)**  
A person opening the application in a modern desktop or mobile web browser. No login, account, or technical knowledge is required. The user interacts with the application by clicking on user names and switching between Posts and Albums views.

### 2.4 Operating Environment

| Requirement | Specification |
|---|---|
| Execution environment | Modern web browser (Chrome, Firefox, Edge, Safari — latest stable versions) |
| Network | Active internet connection required to reach JSONPlaceholder |
| Server | Static file server or any environment capable of serving HTML/CSS/JS assets |
| Scripting | JavaScript must be enabled in the browser |
| jQuery | v4.0.0-beta, loaded from CDN (`https://code.jquery.com/jquery-4.0.0-beta.min.js`) |

### 2.5 Design and Implementation Constraints

| ID | Constraint |
|---|---|
| C-01 | The application shall be built using HTML5, CSS3, and JavaScript (ES6+). |
| C-02 | jQuery 4.0.0 shall be used for AJAX requests and DOM manipulation. |
| C-03 | JSONPlaceholder (`https://jsonplaceholder.typicode.com`) shall be the only external data source. |
| C-04 | No custom backend or server-side application logic shall be introduced. |
| C-05 | No custom database or persistent storage mechanism shall be used. |
| C-06 | No authentication or authorization layer shall be implemented. |
| C-07 | All data from the JSONPlaceholder API shall be treated as read-only; no write operations shall be performed. |
| C-08 | The project structure shall follow: `index.html`, `css/style.css`, `js/api.js`, `js/ui.js`, `js/app.js`. |

### 2.6 Assumptions and Dependencies

| ID | Assumption / Dependency |
|---|---|
| A-01 | JSONPlaceholder API is publicly accessible and returns well-formed JSON responses. |
| A-02 | The browser environment supports ES6+ JavaScript features (arrow functions, template literals, `const`/`let`). |
| A-03 | The `name` field returned by `GET /users` is a full display name (first name + last name) and is used as-is. |
| A-04 | The application will be opened in a browser that has JavaScript enabled. |
| A-05 | jQuery 4.0.0-beta CDN is accessible from the user's network. |
| A-06 | The application does not need to handle cross-origin restrictions because JSONPlaceholder supports CORS. |

---

## 3. External Interface Requirements

### 3.1 User Interfaces

The UI consists of two primary panels rendered inside a single HTML page:

#### Users Panel (Left/Top)

- Displays a list of user names fetched from `GET /users`.
- Each user name is rendered as a clickable/selectable control (button inside a list item).
- The currently selected user's control is visually distinguished (e.g., highlighted/active class).
- A loading message is displayed while the users are being fetched.
- An error message is displayed if the fetch fails.

#### Detail Panel (Right/Bottom)

- Displays the full name, email, and company name of the currently selected user as the panel heading.
- Shows a neutral placeholder ("Select a user…") before any user is selected.
- Contains Posts and Albums section headings with their respective item counts.
- Renders posts and albums as separate lists under their respective headings — **both are shown simultaneously** (not toggled) after data is loaded.
- A loading message is displayed in both lists while data is being fetched.
- An error message is displayed in both lists if the fetch fails.

#### General UI Rules

- The page shall not perform a full browser reload for any user interaction.
- All displayed text from the API shall be inserted safely (no raw HTML injection).
- The layout shall be responsive and usable on both desktop and mobile screen sizes.

### 3.2 Hardware Interfaces

Not applicable. The application runs entirely in a standard web browser with no special hardware dependencies.

### 3.3 Software Interfaces

| Interface | Details |
|---|---|
| **jQuery 4.0.0-beta** | DOM manipulation, event binding, AJAX (`$.ajax`, `$.when`) |
| **JSONPlaceholder REST API** | External read-only data source; accessed via HTTPS GET |
| **Browser DOM API** | Native HTML document object model used through jQuery |

### 3.4 Communication Interfaces

| Property | Specification |
|---|---|
| Protocol | HTTPS |
| Method | GET only |
| Data format | JSON |
| Error signaling | HTTP status codes (non-2xx) and jQuery AJAX `.fail()` callback |
| CORS | JSONPlaceholder supports CORS; no proxy is required |

---

## 4. System Features and Functional Requirements

---

### 4.1 FR-01 — Retrieve User List

**Priority:** Critical  
**Trigger:** Application load (document ready)

#### Description

The application shall automatically initiate a GET request to the `/users` endpoint when the page loads. The response shall be parsed and stored in memory for rendering and subsequent user selection.

#### Requirements

| ID | Requirement |
|---|---|
| FR-01.1 | The application **shall** send `GET https://jsonplaceholder.typicode.com/users` automatically when the DOM is ready. |
| FR-01.2 | The application **shall** parse the JSON response and store the user array in client-side memory. |
| FR-01.3 | The application **shall** show a loading indicator in the users panel before the request completes. |
| FR-01.4 | The application **shall** render the user list upon a successful response (see FR-02). |
| FR-01.5 | The application **shall** show a user-facing error message if the request fails (see FR-08). |

---

### 4.2 FR-02 — Display User Names

**Priority:** Critical  
**Trigger:** Successful `GET /users` response

#### Description

Each user returned from the API shall be displayed in the users panel as a selectable control. The display text shall be the user's `name` field value from the API response, which represents the full name.

#### Requirements

| ID | Requirement |
|---|---|
| FR-02.1 | The application **shall** render one selectable control per user in the users panel. |
| FR-02.2 | The display text for each user **shall** be the `name` field from the API response (full name). |
| FR-02.3 | User names **shall** be inserted using a safe text method (e.g., jQuery `.text()`) to prevent HTML injection. |
| FR-02.4 | The rendered user controls **shall** be contained within the stable `#users-list` element. |

---

### 4.3 FR-03 — User Selection

**Priority:** Critical  
**Trigger:** User clicks a user control in the users panel

#### Description

When the user clicks on a user control, that user becomes the selected user. The application shall visually indicate the selection, display the selected user's profile header in the detail panel, and initiate fetching of that user's posts and albums.

#### Requirements

| ID | Requirement |
|---|---|
| FR-03.1 | The application **shall** respond to a click on any user control in the users panel. |
| FR-03.2 | The selected user's control **shall** be visually distinguished from unselected controls (e.g., an "active" CSS class). |
| FR-03.3 | The selected user's full name, email, and company name **shall** be displayed as a header in the detail panel. |
| FR-03.4 | Re-clicking the currently selected user **shall** produce no additional API requests. |
| FR-03.5 | Selecting a different user **shall** clear the previous user's detail content before loading new data. |
| FR-03.6 | Event binding for user controls **shall** use delegated events on the stable `#users-list` container. |

---

### 4.4 FR-04 — Retrieve Selected User's Posts

**Priority:** Critical  
**Trigger:** User selection (FR-03)

#### Description

Upon selecting a user, the application shall retrieve all posts authored by that user using the user's unique ID.

#### Requirements

| ID | Requirement |
|---|---|
| FR-04.1 | The application **shall** send `GET /users/{selectedUserId}/posts` after a user is selected. |
| FR-04.2 | The `selectedUserId` used in the endpoint **shall** be the `id` field of the selected user record. |
| FR-04.3 | The response **shall** be parsed and stored for rendering. |
| FR-04.4 | The posts request **shall** run concurrently with the albums request (FR-05). |

---

### 4.5 FR-05 — Retrieve Selected User's Albums

**Priority:** Critical  
**Trigger:** User selection (FR-03)

#### Description

Upon selecting a user, the application shall retrieve all albums owned by that user using the user's unique ID.

#### Requirements

| ID | Requirement |
|---|---|
| FR-05.1 | The application **shall** send `GET /users/{selectedUserId}/albums` after a user is selected. |
| FR-05.2 | The `selectedUserId` used in the endpoint **shall** be the `id` field of the selected user record. |
| FR-05.3 | The response **shall** be parsed and stored for rendering. |
| FR-05.4 | The albums request **shall** run concurrently with the posts request (FR-04), using `$.when()`. |

---

### 4.6 FR-06 — Separate Posts and Albums Views

**Priority:** Critical  
**Trigger:** Both `GET /users/{id}/posts` and `GET /users/{id}/albums` succeed

#### Description

Posts and Albums shall be presented as two distinct, clearly labeled sections within the detail panel. Both sections are visible simultaneously (not toggled). Each section shows a count of items and renders each item as a list entry.

#### Requirements

| ID | Requirement |
|---|---|
| FR-06.1 | The detail panel **shall** contain a separate section for Posts and a separate section for Albums. |
| FR-06.2 | Each section **shall** display a heading that includes the label and item count (e.g., "Posts: 10", "Albums: 10"). |
| FR-06.3 | Posts and Albums **shall** be rendered in separate, independent list containers (`#posts-list`, `#albums-list`). |
| FR-06.4 | Switching the view **shall not** require an additional API request after both datasets are loaded. |
| FR-06.5 | Each post and album item **shall** display its `title` field. |

---

### 4.7 FR-07 — Loading Feedback

**Priority:** High  
**Trigger:** During any active API request

#### Description

The application shall display meaningful loading messages to the user whenever an API request is in progress. Loading feedback shall be displayed in the relevant panel or section, and shall be replaced by content or an error once the request completes.

#### Requirements

| ID | Requirement |
|---|---|
| FR-07.1 | A loading message **shall** be shown in the users panel while `GET /users` is in progress. |
| FR-07.2 | Loading messages **shall** be shown in both the posts list and albums list while user-detail requests are in progress. |
| FR-07.3 | Loading messages **shall** be removed or replaced when the corresponding request completes (success or failure). |
| FR-07.4 | Loading messages **shall** be scoped to the area they relate to (users area or detail area). |

---

### 4.8 FR-08 — Error Handling

**Priority:** High  
**Trigger:** Any API request returns a non-2xx HTTP status or fails at the network level

#### Description

The application shall display a user-facing error message when an API request fails. The error state shall be displayed in the area corresponding to the failed request. The user shall not be left in a permanent loading state.

#### Requirements

| ID | Requirement |
|---|---|
| FR-08.1 | If `GET /users` fails, a user-facing error message **shall** be displayed in the users panel. |
| FR-08.2 | If the posts or albums request fails, a user-facing error message **shall** be displayed in the affected list section(s) of the detail panel. |
| FR-08.3 | Error messages **shall** be written in plain, human-readable language. |
| FR-08.4 | The loading state **shall** be cleared when an error is displayed; the user **shall not** see a loading message and an error message simultaneously. |
| FR-08.5 | The error **shall** be logged to the browser console in addition to being surfaced in the UI. |

---

### 4.9 FR-09 — Dynamic DOM Updates (No Full-Page Reload)

**Priority:** Critical  
**Trigger:** Any state change (user selection, view switch, data load)

#### Description

All UI updates — including rendering user lists, displaying detail content, showing loading states, and switching views — shall be performed via in-place DOM manipulation. No full browser page reload shall be required or triggered.

#### Requirements

| ID | Requirement |
|---|---|
| FR-09.1 | Rendering the user list **shall not** reload the page. |
| FR-09.2 | Selecting a user **shall not** reload the page. |
| FR-09.3 | Loading and rendering posts and albums **shall not** reload the page. |
| FR-09.4 | All DOM updates **shall** use jQuery methods (e.g., `.html()`, `.text()`, `.append()`, `.empty()`, `.prop()`). |

---

### 4.10 FR-10 — Empty State Handling

**Priority:** Medium  
**Trigger:** API returns a successful response with an empty array

#### Description

When an API endpoint returns a successful response that contains zero items, the application shall display a meaningful message rather than leaving the content area blank.

#### Requirements

| ID | Requirement |
|---|---|
| FR-10.1 | If `GET /users` returns an empty array, a message such as "No users found." **shall** be shown in the users panel. |
| FR-10.2 | If `GET /users/{id}/posts` returns an empty array, a message such as "No posts found." **shall** be shown in the posts list. |
| FR-10.3 | If `GET /users/{id}/albums` returns an empty array, a message such as "No albums found." **shall** be shown in the albums list. |

---

### 4.11 FR-11 — Stale Response Protection

**Priority:** Medium  
**Trigger:** User selects a new user before the previous user's requests have completed

#### Description

If the user selects a different user while a previous user's API requests are still in flight, the result of the older request shall be discarded. Only data for the most recently selected user shall be rendered.

#### Requirements

| ID | Requirement |
|---|---|
| FR-11.1 | The application **shall** track a monotonically increasing request identifier (`detailRequestId`) for user-detail requests. |
| FR-11.2 | When a detail request completes, it **shall** compare its captured request ID against the current `detailRequestId`. |
| FR-11.3 | If the IDs do not match, the response **shall** be silently discarded without updating the UI. |

---

## 5. Non-Functional Requirements

### 5.1 NFR-01 — Performance

| ID | Requirement |
|---|---|
| NFR-01.1 | The initial users list **shall** be displayed within a reasonable time after the JSONPlaceholder API responds (no artificial delay introduced by the application). |
| NFR-01.2 | Posts and albums requests **shall** be initiated concurrently (not sequentially) to minimize total loading time. |
| NFR-01.3 | Switching between already-loaded Posts and Albums views **shall** be instantaneous (no additional API request). |
| NFR-01.4 | The application **shall not** load data for users that have not been selected. |

### 5.2 NFR-02 — Usability

| ID | Requirement |
|---|---|
| NFR-02.1 | The UI **shall** clearly indicate which user is currently selected at all times. |
| NFR-02.2 | Loading indicators **shall** provide enough feedback that a user understands data is being fetched. |
| NFR-02.3 | Error messages **shall** clearly communicate that something went wrong, without exposing raw technical details. |
| NFR-02.4 | The detail panel **shall** show a neutral placeholder message before any user is selected (e.g., "Select a user to see their posts & albums."). |
| NFR-02.5 | The layout **shall** be responsive and usable on screen widths commonly found on desktop and mobile devices. |

### 5.3 NFR-03 — Reliability

| ID | Requirement |
|---|---|
| NFR-03.1 | The application **shall** handle API request failures gracefully without crashing or freezing. |
| NFR-03.2 | Stale API responses (from a previously selected user) **shall** never corrupt the currently displayed user's data (see FR-11). |
| NFR-03.3 | Multiple rapid user selections **shall** not result in data from an incorrect user being displayed. |

### 5.4 NFR-04 — Security

| ID | Requirement |
|---|---|
| NFR-04.1 | All text values received from the JSONPlaceholder API **shall** be treated as untrusted input. |
| NFR-04.2 | API-provided text **shall** be inserted into the DOM using jQuery `.text()` or equivalent safe methods; `.html()` **shall not** be used for API-provided content. |
| NFR-04.3 | No authentication credentials, API keys, or secrets are required or stored, because JSONPlaceholder is a public API. |
| NFR-04.4 | The application **shall not** expose any server-side attack surface, as it has no custom backend. |

### 5.5 NFR-05 — Maintainability

| ID | Requirement |
|---|---|
| NFR-05.1 | API communication logic **shall** be isolated in `js/api.js` and **shall not** perform DOM updates. |
| NFR-05.2 | DOM rendering logic **shall** be isolated in `js/ui.js` and **shall not** contain AJAX calls. |
| NFR-05.3 | State management, event handling, and orchestration **shall** be isolated in `js/app.js`. |
| NFR-05.4 | Stable DOM selectors (`id` attributes) **shall** be used for all elements targeted by JavaScript. |
| NFR-05.5 | Code **shall** avoid unnecessary abstraction; the solution shall remain proportionate to the assignment scope. |

### 5.6 NFR-06 — Compatibility

| ID | Requirement |
|---|---|
| NFR-06.1 | The application **shall** function correctly in the latest stable versions of Google Chrome, Mozilla Firefox, and Microsoft Edge. |
| NFR-06.2 | The application **shall** use only standard ES6+ JavaScript features that are natively supported by modern browsers without a transpilation step. |
| NFR-06.3 | jQuery 4.0.0-beta **shall** be loaded from the official CDN: `https://code.jquery.com/jquery-4.0.0-beta.min.js`. |

### 5.7 NFR-07 — Accessibility

| ID | Requirement |
|---|---|
| NFR-07.1 | Interactive user controls **shall** be implemented as `<button>` elements to ensure native keyboard and screen-reader support. |
| NFR-07.2 | The page **shall** include a meaningful `<title>` tag. |
| NFR-07.3 | Headings **shall** follow a logical, hierarchical structure (`<h1>` → `<h2>` → `<h3>`). |
| NFR-07.4 | The application **shall** use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<ul>`, `<li>`). |

---

## 6. Use Cases

### 6.1 UC-01 — View User List

| Attribute | Value |
|---|---|
| **Use Case ID** | UC-01 |
| **Name** | View User List |
| **Actor** | End User |
| **Pre-condition** | The browser has loaded `index.html` and JavaScript is enabled. |
| **Trigger** | Document ready event fires. |

**Main Success Scenario:**

1. The application displays a loading message in the users panel.
2. The application sends `GET /users` to JSONPlaceholder.
3. The API responds with a JSON array of user objects.
4. The application renders one button per user, displaying each user's name.
5. The loading message is removed.

**Alternative Flows:**

| Step | Condition | Action |
|---|---|---|
| 3a | Response is an empty array | Display "No users found." in the users panel (FR-10). |
| 3b | Request fails | Display a user-facing error message in the users panel (FR-08). |

**Post-condition:** The users panel displays the user list or an appropriate message.

---

### 6.2 UC-02 — Select a User

| Attribute | Value |
|---|---|
| **Use Case ID** | UC-02 |
| **Name** | Select a User |
| **Actor** | End User |
| **Pre-condition** | The user list has been rendered (UC-01 success). |
| **Trigger** | End user clicks a user control in the users panel. |

**Main Success Scenario:**

1. The application marks the clicked user's control as active.
2. The previous detail content (if any) is cleared.
3. The selected user's name, email, and company name are shown in the detail panel header.
4. Loading messages appear in the posts list and albums list.
5. `GET /users/{id}/posts` and `GET /users/{id}/albums` are initiated concurrently.
6. Both responses are received and processed.
7. Posts are rendered in the posts list with a count heading; albums are rendered in the albums list with a count heading.

**Alternative Flows:**

| Step | Condition | Action |
|---|---|---|
| 1a | Clicked user is already selected | No action taken; no API request sent (FR-03.4). |
| 6a | Either or both requests fail | Error messages are shown in the affected list sections (FR-08). |

**Post-condition:** The detail panel shows the selected user's profile and either their posts/albums or an error state.

---

### 6.3 UC-03 — View Posts

| Attribute | Value |
|---|---|
| **Use Case ID** | UC-03 |
| **Name** | View Posts |
| **Actor** | End User |
| **Pre-condition** | A user has been selected and posts have been loaded successfully (UC-02 success). |
| **Trigger** | The posts data has loaded, or the user is already viewing the detail panel. |

**Main Success Scenario:**

1. Posts are rendered under the "Posts" heading in the detail panel.
2. The posts heading includes the count (e.g., "Posts: 10").
3. Each post is displayed as a list item showing its `title`.

**Alternative Flows:**

| Step | Condition | Action |
|---|---|---|
| 3a | The posts array is empty | "No posts found." is displayed in the posts list (FR-10). |

**Post-condition:** The posts list is populated or shows an appropriate empty/error state.

---

### 6.4 UC-04 — View Albums

| Attribute | Value |
|---|---|
| **Use Case ID** | UC-04 |
| **Name** | View Albums |
| **Actor** | End User |
| **Pre-condition** | A user has been selected and albums have been loaded successfully (UC-02 success). |
| **Trigger** | The albums data has loaded, or the user is already viewing the detail panel. |

**Main Success Scenario:**

1. Albums are rendered under the "Albums" heading in the detail panel.
2. The albums heading includes the count (e.g., "Albums: 10").
3. Each album is displayed as a list item showing its `title`.

**Alternative Flows:**

| Step | Condition | Action |
|---|---|---|
| 3a | The albums array is empty | "No albums found." is displayed in the albums list (FR-10). |

**Post-condition:** The albums list is populated or shows an appropriate empty/error state.

---

### 6.5 UC-05 — Handle API Failure

| Attribute | Value |
|---|---|
| **Use Case ID** | UC-05 |
| **Name** | Handle API Failure |
| **Actor** | System (triggered by API failure) |
| **Pre-condition** | An API request has been initiated. |
| **Trigger** | The jQuery AJAX `.fail()` callback is triggered. |

**Main Success Scenario:**

1. The AJAX request fails (network error or non-2xx HTTP status).
2. The application invokes the `.fail()` handler.
3. The error is logged to the browser console.
4. The loading state is removed from the relevant panel.
5. A user-friendly error message is displayed in the affected area.

**Post-condition:** The user sees a human-readable error message and no loading indicator is stuck on screen.

---

## 7. Data Requirements

### 7.1 Data Entities

The application consumes three data entities from JSONPlaceholder. No application-owned data store exists.

#### User

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": { ... },
  "phone": "1-770-736-0988 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "...",
    "bs": "..."
  }
}
```

#### Post

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum..."
}
```

#### Album

```json
{
  "userId": 1,
  "id": 1,
  "title": "quidem molestiae enim"
}
```

### 7.2 Data Fields Used by the UI

The application only consumes the fields it renders. All other API fields are ignored.

| Entity | Field | Used For |
|---|---|---|
| User | `id` | User selection, endpoint construction |
| User | `name` | User list display text; detail panel heading |
| User | `email` | Detail panel sub-heading |
| User | `company.name` | Detail panel sub-heading |
| Post | `id` | (Internal) list rendering key |
| Post | `title` | Post list item display text |
| Album | `id` | (Internal) list rendering key |
| Album | `title` | Album list item display text |

---

## 8. External API Specification

**Base URL:** `https://jsonplaceholder.typicode.com`  
**Protocol:** HTTPS  
**Method:** GET (read-only)  
**Response Format:** JSON  
**Authentication:** None required  
**CORS:** Supported by JSONPlaceholder  

| # | Endpoint | Usage | Trigger |
|---|---|---|---|
| 1 | `GET /users` | Retrieve all users | Document ready |
| 2 | `GET /users/{id}/posts` | Retrieve posts for selected user | User selection |
| 3 | `GET /users/{id}/albums` | Retrieve albums for selected user | User selection |

#### Response Status Codes

| HTTP Code | Meaning | Application Behavior |
|---|---|---|
| 200 OK | Success | Parse JSON and render data |
| 4xx / 5xx | Client/server error | Show user-facing error message (FR-08) |
| Network failure | Connectivity issue | Show user-facing error message (FR-08) |

> **Note:** Endpoints 2 and 3 in the table above are initiated concurrently using `$.when(getUserPosts(id), getUserAlbums(id))`.

---

## 9. Constraints and Exclusions

The following items are **explicitly out of scope** for this application and version:

| Item | Reason |
|---|---|
| Custom backend or server-side logic | Not required; assignment is client-side only |
| Custom database or persistent data store | JSONPlaceholder is the only data source |
| User authentication or authorization | Out of confirmed assignment scope |
| User registration or account management | Not required |
| Create / Update / Delete (CUD) operations | JSONPlaceholder is used as read-only for this assignment |
| Advanced UI/UX beyond confirmed feature structure | Out of confirmed assignment scope |
| Search, filtering, or sorting of users/posts/albums | Not required in confirmed requirements |
| Pagination of users, posts, or albums | Not required in confirmed requirements |
| Offline / PWA support | Out of scope |
| Unit or integration test automation | Tracked separately (Test-Cases_v0.1.xlsx) |
| Internationalisation (i18n) / localisation | Out of scope |

---

## 10. Requirement Traceability Matrix

| Requirement ID | Description | Source (RUD/UC) | Design Reference | Test Reference |
|---|---|---|---|---|
| FR-01 | Retrieve user list | RUD FR-01 | LLD §8.3, §9.2 | TC-01 |
| FR-02 | Display user names | RUD FR-02 | LLD §10.3 | TC-02 |
| FR-03 | User selection | RUD FR-03 | LLD §9.3, §9.4 | TC-03 |
| FR-04 | Retrieve user posts | RUD FR-04 | LLD §8.4, §9.5 | TC-04 |
| FR-05 | Retrieve user albums | RUD FR-05 | LLD §8.5, §9.5 | TC-05 |
| FR-06 | Separate Posts/Albums views | RUD FR-06 | LLD §10.5, §13 | TC-06 |
| FR-07 | Loading feedback | RUD FR-07 | LLD §10.2, §14 | TC-07 |
| FR-08 | Error handling | RUD FR-08 | LLD §14.1–§14.2 | TC-08 |
| FR-09 | Dynamic DOM updates | RUD FR-09 | LLD §9.5 | TC-09 |
| FR-10 | Empty state handling | RUD (implied) | LLD §14.3 | TC-10 |
| FR-11 | Stale response protection | RUD (implied) | LLD §14.4 | TC-11 |
| NFR-01 | Performance | — | LLD §16 | TC-12 |
| NFR-04 | Security (XSS prevention) | — | LLD §17 | TC-13 |

---

## 11. UI State Model

The application manages client-side state within `app.js`. At any point in time, the UI is in one of the following states:

| State | Condition | Users Panel | Detail Panel |
|---|---|---|---|
| **Initializing** | `GET /users` in flight | Shows loading message | Shows placeholder ("Select a user…") |
| **Users Loaded** | Users available, no selection | Shows user list | Shows placeholder ("Select a user…") |
| **Users Error** | `GET /users` failed | Shows error message | Shows placeholder |
| **No Users** | `GET /users` returned `[]` | Shows empty message | Shows placeholder |
| **Detail Loading** | A user selected; requests in flight | Shows user list + active item | Shows user header + loading in both lists |
| **Detail Loaded** | Both posts & albums loaded | Shows user list + active item | Shows user header + posts list + albums list |
| **Detail Error** | Posts or albums request failed | Shows user list + active item | Shows user header + error message in affected lists |

**State object shape (`app.js`):**

```javascript
const state = {
    users:           [],     // Array of user objects from GET /users
    selectedUserId:  null,   // ID of the currently selected user
    posts:           [],     // Posts for the selected user
    albums:          [],     // Albums for the selected user
    activeView:      "posts" // "posts" | "albums" (if a single shared view is used)
};
```

---

## 12. Acceptance Criteria

The implementation shall be considered complete when all of the following acceptance criteria are satisfied:

| AC ID | Criterion |
|---|---|
| AC-01 | On page load, a loading message appears in the users panel, followed by a list of user names. |
| AC-02 | Each user name displayed matches the `name` field from `GET /users`. |
| AC-03 | Clicking a user name highlights that user and displays their name, email, and company in the detail panel. |
| AC-04 | Clicking the same user a second time does not trigger a new API request. |
| AC-05 | After selecting a user, loading messages appear in both the posts section and albums section. |
| AC-06 | After loading completes, the posts section displays all post titles with a count heading. |
| AC-07 | After loading completes, the albums section displays all album titles with a count heading. |
| AC-08 | Posts and Albums are displayed as separate, labeled sections — both visible simultaneously. |
| AC-09 | Selecting a different user clears the previous user's posts and albums before displaying new data. |
| AC-10 | If `GET /users` fails, a human-readable error message appears in the users panel. |
| AC-11 | If the posts or albums request fails, a human-readable error message appears in the affected section(s). |
| AC-12 | Empty arrays produce a descriptive "No … found." message in the relevant section. |
| AC-13 | No full browser page reload occurs during any user interaction. |
| AC-14 | No unhandled JavaScript errors appear in the browser console during normal use. |
| AC-15 | Rapidly selecting multiple users in succession never displays stale data from a previous selection. |
| AC-16 | All API-provided text is inserted safely (no XSS vulnerability through raw HTML injection). |

---

## 13. Document Revision History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 0.1 | 04 October 2026 | Atul Sharma | Initial draft — based on confirmed RUD v1.1, HLD v0.1, and LLD v0.1 |

---

*End of SRS — User Posts & Albums Explorer v0.1*
