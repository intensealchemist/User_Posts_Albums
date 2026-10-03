// app.js — UI rendering, calls api.js for data

const usersList     = document.getElementById("users-list");
const emptyState    = document.getElementById("empty-state");
const detailContent = document.getElementById("detail-content");
const detailName    = document.getElementById("detail-name");
const detailEmail   = document.getElementById("detail-email");
const detailCompany = document.getElementById("detail-company");
const postsList     = document.getElementById("posts-list");
const albumsList    = document.getElementById("albums-list");

// Render users in left panel — each user is a <button> (action, not navigation)
function renderUsers(users) {
    usersList.innerHTML = users.map(u =>
        `<li>
            <button class="user-btn" data-id="${u.id}">${u.name}</button>
        </li>`
    ).join("");

    usersList.querySelectorAll(".user-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedId = Number(btn.dataset.id);
            console.log("Selected user ID:", selectedId);

            // Update active state
            usersList.querySelectorAll(".user-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const user = users.find(u => u.id === selectedId);
            showUserDetail(user);
        });
    });
}

// Show selected user's posts & albums
async function showUserDetail(user) {
    detailName.textContent    = user.name;
    detailEmail.textContent   = user.email;
    detailCompany.textContent = user.company.name;

    emptyState.hidden    = true;
    detailContent.hidden = false;

    postsList.innerHTML  = "Loading...";
    albumsList.innerHTML = "Loading...";

    // Fetch posts and albums concurrently since they are independent requests
    const [posts, albums] = await Promise.all([
        getUserPosts(user.id),
        getUserAlbums(user.id)
    ]);

    postsList.innerHTML  = posts.map(p  => `<li class="detail-card">${p.title}</li>`).join("");
    albumsList.innerHTML = albums.map(a => `<li class="detail-card">${a.title}</li>`).join("");
}

// Init
getUsers().then(renderUsers);
