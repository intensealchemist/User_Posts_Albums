# Low-Level Design (LLD)
## User Posts & Albums Viewer

**Version:** 0.1  
**Status:** Draft  
**Prepared By:** Atul Sharma  
**Technology:** HTML5, CSS3, JavaScript (ES6+), jQuery 4.0.0  
**Data Source:** JSONPlaceholder REST API  
**Application Type:** Client-side / presentation-layer web application  

---

## 1. Purpose

This Low-Level Design translates the confirmed requirements into an implementation-level design for the User Posts & Albums Viewer. It defines the client-side project structure, functions, DOM structure, API interactions, state handling, event handling, loading/error behavior, and rendering responsibilities.

The design is intentionally lightweight because the confirmed scope contains no custom backend, database, authentication, or persistent storage. JSONPlaceholder is the only external data source.

## 2. Requirements Baseline

The LLD is based on the confirmed requirements recorded in RUD v1.1 and the corresponding HLD/SRS.

| ID | Confirmed requirement | LLD response |
|---|---|---|
| FR-01 | Retrieve users from JSONPlaceholder | `getUsers()` + `loadUsers()` |
| FR-02 | Display first name + last name | `renderUsers()` uses the API `name` display value only |
| FR-03 | Allow user selection | Selectable user controls + delegated click handling |
| FR-04 | Retrieve selected user's posts | `getUserPosts(userId)` |
| FR-05 | Retrieve selected user's albums | `getUserAlbums(userId)` |
| FR-06 | Posts and Albums are separate | `activeView` + `renderPosts()` / `renderAlbums()`; one shared content area |
| FR-07 | Loading feedback | Separate users/details loading elements and state flags |
| FR-08 | User-facing API error handling | Separate users/details error elements and failure handlers |
| FR-09 | Update without full page refresh | jQuery DOM updates after requests complete |

## 3. Scope and Design Boundaries

### In scope

- Initial retrieval and rendering of the user list.
- Display of each user's first and last name as the requested display name.
- User selection.
- Retrieval of both posts and albums for the selected user.
- Separate Posts and Albums controls/views.
- Loading, error, and empty states.
- Client-side DOM rendering.
- Basic responsive/presentable CSS.

### Out of scope

- Custom backend or server-side application code.
- Custom database or persistence.
- Authentication and authorization.
- User registration/login.
- CRUD operations against an application-owned data store.
- Advanced UI/UX beyond the confirmed feature structure.

## 4. Proposed Project Structure

```text
user-posts-albums-viewer/
|
+- index.html
+- css/
|  +- style.css
+- js/
|  +- api.js
|  +- ui.js
|  +- app.js
+- docs/
|  +- RUD_User_Posts_Albums_v1.1.pdf
|  +- SRS_User_Posts_Albums_v0.1.pdf
|  +- API_Spec_User_Posts_Albums_v0.1.pdf
|  +- HLD_User_Posts_Albums_v0.1.pdf
|  +- LLD_User_Posts_Albums_v0.1.md
+- README.md
```

### Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Static document structure and stable UI containers |
| `css/style.css` | Layout, responsive behavior, selected state, loading/error/empty styling |
| `js/api.js` | JSONPlaceholder request functions only |
| `js/ui.js` | DOM rendering and UI state updates only |
| `js/app.js` | State, event handling, orchestration, and request coordination |
| `README.md` | Setup, usage, and project overview |

The separation is deliberately small; no framework or additional state-management library is introduced.

## 5. Runtime Flow

![Low-level runtime flow](lld_v0_2_assets/runtime.png)

The runtime sequence is:

1. On document ready, `loadUsers()` starts the initial request.
2. The client requests `GET /users`.
3. Returned users are stored in memory and rendered using the `name` display value.
4. The user selects a user control.
5. The selected user is stored and previous user-specific data is cleared.
6. Posts and Albums requests start concurrently.
7. When both responses are available, the client stores both datasets and enables the separate view controls.
8. The active view is rendered into a single content area.

## 6. Client-Side State Model

The application keeps only session-local state in `app.js`.

```javascript
const state = {
    users: [],
    selectedUser: null,
    posts: [],
    albums: [],
    activeView: "posts",
    usersLoading: false,
    detailsLoading: false,
    usersError: null,
    detailsError: null,
    detailRequestId: 0
};
```

| State field | Type | Responsibility |
|---|---|---|
| `users` | Array | Retrieved user records |
| `selectedUser` | Object / null | Current selected user |
| `posts` | Array | Posts for the selected user |
| `albums` | Array | Albums for the selected user |
| `activeView` | String | `posts` or `albums` |
| `usersLoading` | Boolean | Initial `/users` request state |
| `detailsLoading` | Boolean | Selected-user request state |
| `usersError` | String / null | Initial users error state |
| `detailsError` | String / null | Selected-user error state |
| `detailRequestId` | Number | Prevents stale responses from a previous selection from updating the current UI |

`activeView` defaults to `posts` to match the sample UI state; the user can switch to `albums` after the selected user's detail data is available.

## 7. HTML / DOM Structure

Stable containers are defined in HTML and updated through jQuery.

```html
<body>
    <header>
        <h1>User Posts &amp; Albums Viewer</h1>
    </header>

    <main>
        <section id="users-panel">
            <h2>Users</h2>
            <div id="users-loading" hidden></div>
            <div id="users-error" hidden></div>
            <div id="users-list"></div>
        </section>

        <section id="details-panel">
            <h2 id="selected-user"></h2>

            <div id="content-controls">
                <button id="posts-btn" type="button">Posts</button>
                <button id="albums-btn" type="button">Albums</button>
            </div>

            <div id="loading-message" hidden></div>
            <div id="error-message" hidden></div>
            <div id="content-area"></div>
        </section>
    </main>
</body>
```

| Element | Responsibility |
|---|---|
| `#users-list` | Render selectable users |
| `#users-loading` | Show initial user-list loading state |
| `#users-error` | Show initial user-list error state |
| `#selected-user` | Show selected user's first and last name |
| `#posts-btn` | Activate Posts view |
| `#albums-btn` | Activate Albums view |
| `#loading-message` | Show selected-user loading state |
| `#error-message` | Show selected-user error state |
| `#content-area` | Display either Posts or Albums, never both together |

## 8. API Layer (`api.js`)

`api.js` contains transport logic only. It must not modify the DOM.

### 8.1 Base URL

```javascript
const API_BASE = "https://jsonplaceholder.typicode.com";
```

### 8.2 Internal GET helper

A private `_get` helper centralises the `$.ajax` call to avoid repeating the same pattern across all three public functions.

```javascript
function _get(endpoint) {
    return $.ajax({
        url: `${API_BASE}${endpoint}`,
        method: "GET",
        dataType: "json"
    });
}
```

### 8.3 Retrieve users

```javascript
function getUsers() {
    return _get("/users");
}
```

### 8.4 Retrieve posts

```javascript
function getUserPosts(userId) {
    return _get(`/users/${userId}/posts`);
}
```

### 8.5 Retrieve albums

```javascript
function getUserAlbums(userId) {
    return _get(`/users/${userId}/albums`);
}
```

### API-layer rule

The API layer returns the jQuery Deferred object produced by `$.ajax`. UI rendering, loading messages, and error presentation are handled by `app.js` and `ui.js`.

## 9. Application Logic (`app.js`)

`app.js` owns state, event handling, request orchestration, and selection logic. All DOM updates are delegated to `UI` methods in `ui.js`.

### 9.1 State object

```javascript
const state = {
    users: [],
    selectedUserId: null
};
```

### 9.2 Initialization

```javascript
$(function() {
    init();
});

function init() {
    UI.showUsersLoading();

    getUsers()
        .done(function(users) {
            state.users = users;
            if (users.length === 0) {
                UI.showUsersEmpty();
            } else {
                UI.renderUsers(users);
                bindEvents();
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to fetch users:", textStatus, errorThrown);
            UI.showUsersError("Unable to load user list.");
        });
}
```

### 9.3 Event binding (delegated)

Because user buttons are created dynamically, click events are delegated on the stable `#users-list` container.

```javascript
function bindEvents() {
    $("#users-list").on("click", ".user-item", function() {
        const userId = Number($(this).data("id"));
        handleUserSelection(userId);
    });
}
```

### 9.4 User selection

```javascript
function handleUserSelection(userId) {
    if (state.selectedUserId === userId) return;
    state.selectedUserId = userId;

    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    UI.setActiveUser(userId);
    UI.showDetailHeader(user);
    UI.showDetailsLoading();

    loadUserDetails(userId);
}
```

### 9.5 Loading posts and albums

The two resources are independent, so they are initiated concurrently with `$.when()`.

```javascript
function loadUserDetails(userId) {
    $.when(
        getUserPosts(userId),
        getUserAlbums(userId)
    )
    .done(function(postsRes, albumsRes) {
        // $.when returns [data, statusText, jqXHR] per call
        UI.renderPosts(postsRes[0]);
        UI.renderAlbums(albumsRes[0]);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Failed to fetch user details:", textStatus, errorThrown);
        UI.showDetailsError();
    });
}
```

## 10. UI Rendering Layer (`ui.js`)

`ui.js` performs all DOM updates using jQuery and contains no API transport logic. All methods are grouped inside a single `UI` object, which clearly separates them from application state in `app.js`.

### 10.1 State message helper

A private `_setStateMsg` helper centralises the repeated pattern of clearing a list element and inserting a single status `<li>`.

```javascript
_setStateMsg($element, type, message) {
    $element.html(`<li class='state-msg ${type}'>${message}</li>`);
},
```

Used for loading, error, and empty states across both panels.

### 10.2 Users panel methods

```javascript
showUsersLoading() {
    this._setStateMsg($("#users-list"), "loading", "Loading users...");
},
showUsersError(message) {
    this._setStateMsg($("#users-list"), "error", message);
},
showUsersEmpty() {
    this._setStateMsg($("#users-list"), "empty", "No users found.");
},
```

### 10.3 Render users

JSONPlaceholder exposes a single `name` field for each user. For this assignment, that full display value is treated as the required first-name + last-name presentation. No additional name-parsing rule is introduced.

JQuery `.text()` is used to insert user names safely without HTML injection risk.

```javascript
renderUsers(users) {
    const $list = $("#users-list");
    $list.empty();

    $.each(users, function(_, u) {
        const $btn = $("<button>", {
            class: "user-item",
            "data-id": u.id,
            text: u.name  // SAFE: jQuery .text() prevents HTML injection
        });
        $("<li>").append($btn).appendTo($list);
    });
},
setActiveUser(userId) {
    $(".user-item").removeClass("active");
    $(`.user-item[data-id='${userId}']`).addClass("active");
},
```

### 10.4 Detail panel methods

```javascript
showDetailHeader(user) {
    $("#detail-name").text(user.name);
    $("#detail-email").text(user.email);
    $("#detail-company").text(user.company.name);
    $("#empty-state").prop("hidden", true);
    $("#detail-content").prop("hidden", false);
},
showDetailsLoading() {
    $("#posts-heading").text("Posts");
    $("#albums-heading").text("Albums");
    this._setStateMsg($("#posts-list"), "loading", "Loading posts...");
    this._setStateMsg($("#albums-list"), "loading", "Loading albums...");
},
showDetailsError() {
    this._setStateMsg($("#posts-list"), "error", "Unable to load posts.");
    this._setStateMsg($("#albums-list"), "error", "Unable to load albums.");
},
```

### 10.5 Render Posts and Albums

A shared private `_renderDetailList` helper removes the duplication between `renderPosts` and `renderAlbums`. Both datasets share identical rendering structure (heading with count, list of `<li>` cards, or an empty state message).

```javascript
_renderDetailList(items, $list, $heading, label, emptyMsg) {
    $heading.text(`${label}: ${items.length}`);
    $list.empty();

    if (items.length === 0) {
        this._setStateMsg($list, "empty", emptyMsg);
        return;
    }

    $.each(items, function(_, item) {
        $("<li>", {
            class: "detail-card",
            text: item.title  // SAFE: jQuery .text() prevents HTML injection
        }).appendTo($list);
    });
},

renderPosts(posts) {
    this._renderDetailList(posts, $("#posts-list"), $("#posts-heading"), "Posts", "No posts found.");
},
renderAlbums(albums) {
    this._renderDetailList(albums, $("#albums-list"), $("#albums-heading"), "Albums", "No albums found.");
}
```

## 11. Event Handling

Because the user controls are created dynamically, delegated event handling is used on the stable `#users-list` container.

```javascript
function bindEvents() {
    $("#users-list").on("click", ".user-item", function () {
        const userId = Number($(this).data("user-id"));
        const user = state.users.find(function (item) {
            return item.id === userId;
        });

        handleUserSelection(user);
    });

    $("#posts-btn").on("click", function () {
        handleViewChange("posts");
    });

    $("#albums-btn").on("click", function () {
        handleViewChange("albums");
    });
}
```

### Event sequence

```text
User clicks user
    -> delegated click handler
    -> obtain user ID
    -> find user in state
    -> handleUserSelection(user)
    -> request posts + albums
```

## 12. Detailed User-Selection Sequence

![User-selection sequence](lld_v0_2_assets/sequence.png)

The key low-level behavior is that the selected user is updated immediately, the old content is cleared, and the two user-specific API requests run independently of each other.

## 13. Posts / Albums View Logic

The selected-user panel contains two separate controls:

```text
[ Posts ]    [ Albums ]
```

The content area is shared, but only one view is rendered at any time.

### Posts view

```text
activeView = "posts"
    -> renderPosts(state.posts)
```

### Albums view

```text
activeView = "albums"
    -> renderAlbums(state.albums)
```

Switching views after the two datasets have been loaded does **not** create another API request. It only changes the rendered content.

## 14. Loading, Error, and Empty-State Handling

### 14.1 Initial users loading

```text
Application start
    -> Loading users...
    -> GET /users
       -> success -> render user list
       -> failure -> show users error
```

### 14.2 Selected-user loading

```text
User selected
    -> clear old detail content
    -> Loading posts and albums...
    -> GET posts + GET albums
       -> both succeed -> enable controls + render active view
       -> failure -> hide loading + show error
```

### 14.3 Empty data

A successful response with an empty array should not produce a blank content area. The renderer displays a clear message such as:

```text
No posts available for this user.
```

or:

```text
No albums available for this user.
```

### 14.4 Stale-response protection

When the user selects another user before the previous requests finish, `detailRequestId` ensures that an older result is ignored. This prevents the previously selected user's posts or albums from being rendered under the newly selected user's name.

## 15. Data Shapes Used by the UI

Only fields required by the interface are consumed.

### User

```javascript
{
    id: 1,
    name: "Leanne Graham",
    // other API fields ignored by this UI
}
```

Used fields:

```text
id
name
```

### Post

```javascript
{
    userId: 1,
    id: 1,
    title: "...",
    body: "..."
}
```

Used fields:

```text
id
title
body
```

### Album

```javascript
{
    userId: 1,
    id: 1,
    title: "..."
}
```

Used fields:

```text
id
title
```

## 16. Request and Concurrency Behavior

Posts and Albums are independent resources. The client therefore starts both requests without waiting for one request to complete before starting the other.

```text
                 User selection
                      |
                      v
              +----------------+
              | Start requests |
              +-------+--------+
                      |
              +-------+-------+
              |               |
              v               v
          GET posts       GET albums
              |               |
              v               v
          posts JSON      albums JSON
              |               |
              +-------+-------+
                      |
                      v
                Store both sets
                      |
                      v
                 Render view
```

The currently selected user's data is kept only in memory. No persistent cache is required.

## 17. Security Considerations

- API-provided text is treated as untrusted input for rendering.
- jQuery `.text()` is preferred for API-provided values rather than injecting raw HTML strings.
- No API credentials, tokens, or authentication secrets are required for this assignment.
- No authentication or authorization layer is included because it is outside the confirmed scope.

## 18. Maintainability and Design Rules

1. Keep API communication in `api.js`.
2. Keep DOM rendering in `ui.js`.
3. Keep state and workflow orchestration in `app.js`.
4. Use stable IDs/classes for DOM targeting.
5. Clear or replace the current content before rendering a new dataset.
6. Use the selected user's ID to construct user-specific endpoint URLs.
7. Do not combine Posts and Albums into one view.
8. Avoid unnecessary abstraction because the assignment has a small scope.

## 19. Requirement Traceability

| RUD/SRS requirement | LLD implementation |
|---|---|
| Retrieve users | `getUsers()` + `loadUsers()` |
| Display first + last name | `renderUsers()` using `user.name` |
| Select user | Delegated click handler + `handleUserSelection()` |
| Retrieve posts | `getUserPosts(userId)` |
| Retrieve albums | `getUserAlbums(userId)` |
| Separate Posts/Albums | `activeView`, `renderPosts()`, `renderAlbums()` |
| Loading feedback | `showUsersLoading()`, `showLoading()` and corresponding hide functions |
| Error handling | Separate users/details error handlers |
| Dynamic update | jQuery DOM updates without full page reload |

## 20. Implementation Checklist

- [ ] jQuery 4.0.0 is loaded.
- [ ] `GET /users` works on document ready.
- [ ] Users display first name + last name only.
- [ ] User controls are selectable.
- [ ] Selected user name is shown.
- [ ] Posts and Albums requests use the selected user ID.
- [ ] Posts and Albums requests can run concurrently.
- [ ] Posts and Albums are separate views.
- [ ] Switching views does not combine the two datasets.
- [ ] Loading feedback is visible during retrieval.
- [ ] Initial users errors are shown in the users area.
- [ ] Selected-user errors are shown in the details area.
- [ ] Empty arrays produce meaningful empty states.
- [ ] Selecting another user replaces previous detail data.
- [ ] Stale responses from older selections are ignored.
- [ ] No full-page refresh is required for user selection.
- [ ] API-provided text is rendered safely.
- [ ] No console errors remain during normal use.

## 21. Design Decisions and HLD/LLD Boundary

The following are intentionally low-level implementation decisions:

- jQuery is used for AJAX, event handling, and DOM manipulation.
- API functions are separated from UI rendering functions.
- Posts and Albums are requested concurrently after user selection.
- Both datasets are stored in memory for the current selection so view switching does not require another API request.
- A request ID prevents stale responses from changing the UI after a new user is selected.
- Posts and Albums use separate views in a shared content area.

The HLD remains responsible for the major component architecture and system boundaries. Exact selectors, function names, state fields, and jQuery operations are intentionally kept in this LLD.

## 22. Document Status

**LLD v0.1 - Draft**

This revision incorporates the confirmed RUD requirements, including first-name + last-name display, separate Posts and Albums views, loading/error states, and the client-side-only architecture. It also resolves low-level consistency issues in the earlier draft by separating initial/detail loading and error states, treating the API `name` field as the display name, and protecting against stale user-detail responses.
