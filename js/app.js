// ============================================================
//  app.js — UI Module
//  Handles all DOM rendering and user interaction.
//  All data fetching is delegated to api.js.
// ============================================================

// ---------- DOM References ----------

const usersList     = document.getElementById("users-list");
const emptyState    = document.getElementById("empty-state");
const detailContent = document.getElementById("detail-content");
const detailName    = document.getElementById("detail-name");
const detailEmail   = document.getElementById("detail-email");
const detailCompany = document.getElementById("detail-company");
const postsList     = document.getElementById("posts-list");
const albumsList    = document.getElementById("albums-list");

// ---------- State ----------

let selectedUserId = null;

// ---------- UI Helpers ----------

/**
 * Returns a two-letter initials string from a full name.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Renders a skeleton loading shimmer inside a list.
 * @param {HTMLElement} list
 * @param {number} count  number of skeleton cards to show
 */
function renderSkeleton(list, count = 3) {
    list.innerHTML = Array.from({ length: count })
        .map(
            () => `<li class="detail-card detail-card--skeleton">
                        <div class="skeleton skeleton--title"></div>
                        <div class="skeleton skeleton--body"></div>
                   </li>`
        )
        .join("");
}

/**
 * Renders an inline error message inside a list.
 * @param {HTMLElement} list
 * @param {string} message
 */
function renderListError(list, message) {
    list.innerHTML = `<li class="detail-card detail-card--error">
                          <p class="detail-card__body">⚠️ ${message}</p>
                      </li>`;
}

// ---------- Render Functions ----------

/**
 * Renders the users list in the left panel.
 * @param {User[]} users
 */
function renderUsers(users) {
    usersList.innerHTML = "";

    users.forEach((user) => {
        const li = document.createElement("li");
        li.className = "user-item";
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        li.dataset.userId = user.id;

        li.innerHTML = `
            <span class="user-item__avatar">${getInitials(user.name)}</span>
            <span class="user-item__info">
                <span class="user-item__name">${user.name}</span>
                <span class="user-item__username">@${user.username}</span>
            </span>
        `;

        li.addEventListener("click", () => onUserSelect(user));
        usersList.appendChild(li);
    });
}

/**
 * Renders a loading skeleton in the users panel.
 */
function renderUsersLoading() {
    usersList.innerHTML = Array.from({ length: 8 })
        .map(
            () => `<li class="user-item user-item--skeleton">
                        <span class="skeleton skeleton--avatar"></span>
                        <span class="user-item__info">
                            <span class="skeleton skeleton--name"></span>
                            <span class="skeleton skeleton--username"></span>
                        </span>
                   </li>`
        )
        .join("");
}

/**
 * Renders an error state in the users panel.
 * @param {string} message
 */
function renderUsersError(message) {
    usersList.innerHTML = `<li class="panel-error">⚠️ ${message}</li>`;
}

/**
 * Populates the detail panel header with user info.
 * @param {User} user
 */
function renderDetailHeader(user) {
    detailName.textContent    = user.name;
    detailEmail.textContent   = user.email;
    detailCompany.textContent = user.company.name;
}

/**
 * Renders a list of posts inside the posts section.
 * @param {Post[]} posts
 */
function renderPosts(posts) {
    if (posts.length === 0) {
        postsList.innerHTML = `<li class="detail-card">
            <p class="detail-card__body">No posts found.</p></li>`;
        return;
    }
    postsList.innerHTML = posts
        .map(
            (p) => `<li class="detail-card">
                        <p class="detail-card__title">${p.title}</p>
                        <p class="detail-card__body">${p.body}</p>
                    </li>`
        )
        .join("");
}

/**
 * Renders a list of albums inside the albums section.
 * @param {Album[]} albums
 */
function renderAlbums(albums) {
    if (albums.length === 0) {
        albumsList.innerHTML = `<li class="detail-card">
            <p class="detail-card__body">No albums found.</p></li>`;
        return;
    }
    albumsList.innerHTML = albums
        .map(
            (a) => `<li class="detail-card">
                        <p class="detail-card__title">${a.title}</p>
                    </li>`
        )
        .join("");
}

// ---------- Event Handlers ----------

/**
 * Called when the user clicks a user in the left panel.
 * Coordinates API calls and delegates rendering.
 * @param {User} user
 */
async function onUserSelect(user) {
    // Prevent re-fetching if same user re-clicked
    if (selectedUserId === user.id) return;
    selectedUserId = user.id;

    // Update selection highlight
    document.querySelectorAll(".user-item").forEach((item) => {
        item.setAttribute("aria-selected", String(Number(item.dataset.userId) === user.id));
    });

    // Show detail panel, fill header immediately (no extra fetch needed)
    emptyState.hidden    = true;
    detailContent.hidden = false;
    renderDetailHeader(user);

    // Show skeletons while fetching
    renderSkeleton(postsList, 3);
    renderSkeleton(albumsList, 2);

    // Fetch posts & albums in parallel
    try {
        const [posts, albums] = await Promise.all([
            getUserPosts(user.id),
            getUserAlbums(user.id),
        ]);
        renderPosts(posts);
        renderAlbums(albums);
    } catch (err) {
        console.error("Failed to load user data:", err);
        renderListError(postsList, "Could not load posts.");
        renderListError(albumsList, "Could not load albums.");
    }
}

// ---------- Init ----------

/**
 * Application entry point — loads users on page start.
 */
async function init() {
    renderUsersLoading();

    try {
        const users = await getUsers();
        renderUsers(users);
    } catch (err) {
        console.error("Failed to load users:", err);
        renderUsersError("Could not load users. Check your connection.");
    }
}

init();
