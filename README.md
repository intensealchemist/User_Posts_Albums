# User Posts & Albums Explorer

## What is this?
The **User Posts & Albums Explorer** is a lightweight, client-side web application that allows users to view a list of users and simultaneously explore the posts and albums associated with any selected user. It acts as a presentation layer designed to gracefully handle asynchronous data fetching, loading states, and potential errors.

## What are the main features?
- **Interactive User Roster:** Displays a full list of users retrieved dynamically.
- **Simultaneous Detail View:** Clicking a user concurrently fetches and displays both their written Posts and photo Albums side-by-side.
- **Robust State Management:** Handles network loading states and error states independently for Users, Posts, and Albums.
- **Stale-Response Protection:** Prevents race conditions where rapidly clicking between users might cause the wrong data to render.
- **Security-First Rendering:** Uses safe DOM APIs to prevent Cross-Site Scripting (XSS) from external data.
- **No Page Reloads:** Entirely dynamic DOM updates using asynchronous requests.

## What technologies were used?
- **HTML5:** Semantic page structure and accessible UI containers.
- **CSS3:** Custom responsive layouts, styling, and visual states.
- **Vanilla JavaScript (ES6+):** Application state, logic, and request orchestration.
- **jQuery 4.0.0-beta:** Used specifically for simplified DOM manipulation, delegated event handling, and AJAX request coordination (via `$.when`).

## What API does it consume?
The application consumes the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API.

| Resource | Endpoint | Method |
|---|---|---|
| **Users** | `/users` | `GET` |
| **Posts** | `/users/{userId}/posts` | `GET` |
| **Albums** | `/users/{userId}/albums` | `GET` |

## How does it work?
1. **Initialization:** On document ready, the app fetches the initial list of users from the API and renders them as selectable buttons.
2. **User Selection:** When a user is clicked, the app clears any existing detail content and displays loading indicators.
3. **Concurrent Fetching:** The app triggers two independent HTTP `GET` requests simultaneously (one for Posts, one for Albums) using `$.when()`. 
4. **Rendering:** As soon as both requests succeed, the loading indicators are hidden, and the data is rendered safely into the DOM. If either request fails, a targeted error message is shown. 
5. **Separation of Concerns:** The codebase is strictly divided into `api.js` (network transport), `ui.js` (DOM manipulation), and `app.js` (state and orchestration).

## How do I run it?
Because this is a strictly client-side application with no build steps or bundlers, running it is incredibly simple:

**Option 1: Local HTTP Server (Recommended)**
If you have Node.js installed, you can serve the directory locally to avoid any browser CORS/file-protocol restrictions:
```bash
npx serve .
# The app will be available at http://localhost:3000
```

**Option 2: Direct File Open**
Simply open the `index.html` file directly in any modern web browser (Chrome, Firefox, Edge, Safari).
```bash
# On Windows, you can simply run:
start index.html
```

## Any limitations?
- **Read-Only:** The app only consumes `GET` endpoints. There is no ability to create, update, or delete posts or albums.
- **No Pagination:** JSONPlaceholder returns small datasets, so data is rendered in its entirety. Large production datasets would require pagination or infinite scrolling.
- **No Persistence:** Application state is held in memory. Refreshing the page resets the selected user.
- **External Dependency:** The application relies entirely on the external JSONPlaceholder API being online and responsive.

---

### Project Documentation
Detailed specifications for this project can be found in the `docs/` folder, organized by phase:
- `RUD/` (Requirements Understanding)
- `SRS/` (Software Requirements Specification)
- `HLD/` (High-Level Design)
- `LLD/` (Low-Level Design)
- `API-Spec/` (API Specification)
