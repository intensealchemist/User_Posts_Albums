// app.js — UI rendering, calls api.js for data

const usersList     = document.getElementById("users-list");
const emptyState    = document.getElementById("empty-state");
const detailContent = document.getElementById("detail-content");
const detailName    = document.getElementById("detail-name");
const detailEmail   = document.getElementById("detail-email");
const detailCompany = document.getElementById("detail-company");
const postsList     = document.getElementById("posts-list");
const albumsList    = document.getElementById("albums-list");

// Render users in left panel
function renderUsers(users) {
    usersList.innerHTML = users.map(u =>
        `<li class="user-item" data-id="${u.id}">${u.name}</li>`
    ).join("");

    usersList.addEventListener("click", e => {
        const li = e.target.closest(".user-item");
        if (!li) return;
        document.querySelectorAll(".user-item").forEach(el => el.classList.remove("selected"));
        li.classList.add("selected");
        const user = users.find(u => u.id === Number(li.dataset.id));
        showUserDetail(user);
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

    const [posts, albums] = await Promise.all([
        getUserPosts(user.id),
        getUserAlbums(user.id)
    ]);

    postsList.innerHTML  = posts.map(p  => `<li class="detail-card">${p.title}</li>`).join("");
    albumsList.innerHTML = albums.map(a => `<li class="detail-card">${a.title}</li>`).join("");
}

// Init
getUsers().then(renderUsers);
