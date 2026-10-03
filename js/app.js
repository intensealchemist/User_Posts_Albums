// ============================================================
//  User Posts & Albums Explorer — Step 1: Static UI
//  Uses hardcoded mock data (no API calls yet)
// ============================================================

// ---------- Mock Data ----------

const MOCK_USERS = [
    { id: 1, name: "Leanne Graham",    username: "Bret",       email: "leanne@example.com",   company: "Romaguera-Crona" },
    { id: 2, name: "Ervin Howell",     username: "Antonette",  email: "ervin@example.com",    company: "Deckow-Crist" },
    { id: 3, name: "Clementine Bauch", username: "Samantha",   email: "clementine@example.com", company: "Romaguera-Jacobson" },
    { id: 4, name: "Patricia Lebsack", username: "Karianne",   email: "patricia@example.com", company: "Robel-Corkery" },
    { id: 5, name: "Chelsey Dietrich", username: "Kamren",     email: "chelsey@example.com",  company: "Keebler LLC" },
    { id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "dennis@example.com", company: "Considine-Lockman" },
    { id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "kurtis@example.com",  company: "Johns Group" },
    { id: 8, name: "Nicholas Runolfsdottir V", username: "Maxime_Nienow", email: "nicholas@example.com", company: "Abernathy Group" },
    { id: 9, name: "Glenna Reichert", username: "Delphine",   email: "glenna@example.com",   company: "Yost and Sons" },
    { id: 10, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "clementina@example.com", company: "Hoeger LLC" },
];

const MOCK_POSTS = {
    1: [
        { id: 1, title: "sunt aut facere repellat provident occaecati", body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam" },
        { id: 2, title: "qui est esse",  body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque" },
        { id: 3, title: "ea molestias quasi exercitationem repellat", body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad" },
    ],
    2: [
        { id: 11, title: "et ea vero quia laudantium autem", body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus" },
        { id: 12, title: "in quibusdam tempore odit est dolorem", body: "itaque id aut magnam praesentium quia et ea odit a sed" },
    ],
    3: [
        { id: 21, title: "nesciunt quas odio", body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est" },
        { id: 22, title: "dolorem eum magni eos aperiam quia", body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid" },
    ],
};

const MOCK_ALBUMS = {
    1: [
        { id: 1, title: "quidem molestiae enim" },
        { id: 2, title: "sunt qui excepturi placeat culpa" },
    ],
    2: [
        { id: 3, title: "omnis laborum odio" },
        { id: 4, title: "non esse culpa molestiae omnis sed optio" },
    ],
    3: [
        { id: 5, title: "eaque aut omnis a" },
        { id: 6, title: "natus impedit quibusdam illo est" },
    ],
};

// ---------- DOM References ----------

const usersList      = document.getElementById("users-list");
const emptyState     = document.getElementById("empty-state");
const detailContent  = document.getElementById("detail-content");
const detailName     = document.getElementById("detail-name");
const detailEmail    = document.getElementById("detail-email");
const detailCompany  = document.getElementById("detail-company");
const postsList      = document.getElementById("posts-list");
const albumsList     = document.getElementById("albums-list");

// ---------- State ----------

let selectedUserId = null;

// ---------- Render Helpers ----------

/**
 * Build the initials string from a full name (e.g. "Leanne Graham" → "LG").
 */
function getInitials(name) {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Render the users list in the left panel.
 */
function renderUsers() {
    usersList.innerHTML = "";

    MOCK_USERS.forEach((user) => {
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

        li.addEventListener("click", () => selectUser(user.id));
        usersList.appendChild(li);
    });
}

/**
 * Handle user selection — update the detail panel.
 */
function selectUser(userId) {
    selectedUserId = userId;

    // Update aria‑selected on all items
    document.querySelectorAll(".user-item").forEach((item) => {
        item.setAttribute("aria-selected", String(Number(item.dataset.userId) === userId));
    });

    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) return;

    // Fill header
    detailName.textContent    = user.name;
    detailEmail.textContent   = user.email;
    detailCompany.textContent = user.company;

    // Fill posts
    const posts = MOCK_POSTS[userId] || [];
    postsList.innerHTML = posts.length
        ? posts.map((p) => `
            <li class="detail-card">
                <p class="detail-card__title">${p.title}</p>
                <p class="detail-card__body">${p.body}</p>
            </li>
        `).join("")
        : `<li class="detail-card"><p class="detail-card__body">No posts yet.</p></li>`;

    // Fill albums
    const albums = MOCK_ALBUMS[userId] || [];
    albumsList.innerHTML = albums.length
        ? albums.map((a) => `
            <li class="detail-card">
                <p class="detail-card__title">${a.title}</p>
            </li>
        `).join("")
        : `<li class="detail-card"><p class="detail-card__body">No albums yet.</p></li>`;

    // Swap empty‑state ↔ detail‑content
    emptyState.hidden    = true;
    detailContent.hidden = false;
}

// ---------- Init ----------

renderUsers();
