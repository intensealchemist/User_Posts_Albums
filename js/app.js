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
    usersList.innerHTML = ""; // Clear safely

    users.forEach(u => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "user-btn";
        btn.dataset.id = u.id;
        btn.textContent = u.name; // SAFE: uses textContent to prevent XSS

        btn.addEventListener("click", () => {
            const selectedId = Number(btn.dataset.id);
            console.log("Selected user ID:", selectedId);

            // Update active state
            usersList.querySelectorAll(".user-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const user = users.find(u => u.id === selectedId);
            showUserDetail(user);
        });

        li.appendChild(btn);
        usersList.appendChild(li);
    });
}

// Show selected user's posts & albums
async function showUserDetail(user) {
    detailName.textContent    = user.name;
    detailEmail.textContent   = user.email;
    detailCompany.textContent = user.company.name;

    emptyState.hidden    = true;
    detailContent.hidden = false;

    // 1. Loading State
    document.getElementById("posts-heading").textContent  = "Posts";
    document.getElementById("albums-heading").textContent = "Albums";
    postsList.innerHTML  = "<li class='state-msg loading'>Loading posts...</li>";
    albumsList.innerHTML = "<li class='state-msg loading'>Loading albums...</li>";

    try {
        // Fetch posts and albums concurrently since they are independent requests
        const [posts, albums] = await Promise.all([
            getUserPosts(user.id),
            getUserAlbums(user.id)
        ]);

        // 2. Success / Empty States (Posts)
        document.getElementById("posts-heading").textContent = `Posts: ${posts.length}`;
        postsList.innerHTML = ""; // Clear the loading state
        if (posts.length === 0) {
            postsList.innerHTML = "<li class='state-msg empty'>No posts found.</li>";
        } else {
            posts.forEach(p => {
                const li = document.createElement("li");
                li.className = "detail-card";
                li.textContent = p.title; // SAFE DOM API
                postsList.appendChild(li);
            });
        }

        // 3. Success / Empty States (Albums)
        document.getElementById("albums-heading").textContent = `Albums: ${albums.length}`;
        albumsList.innerHTML = ""; // Clear the loading state
        if (albums.length === 0) {
            albumsList.innerHTML = "<li class='state-msg empty'>No albums found.</li>";
        } else {
            albums.forEach(a => {
                const li = document.createElement("li");
                li.className = "detail-card";
                li.textContent = a.title; // SAFE DOM API
                albumsList.appendChild(li);
            });
        }

    } catch (err) {
        // 4. Error State
        console.error("Failed to fetch user details:", err);
        postsList.innerHTML  = "<li class='state-msg error'>Unable to load posts.</li>";
        albumsList.innerHTML = "<li class='state-msg error'>Unable to load albums.</li>";
    }
}

// Init: Also handle states for the initial users load
async function init() {
    usersList.innerHTML = "<li class='state-msg loading'>Loading users...</li>";
    try {
        const users = await getUsers();
        if (users.length === 0) {
            usersList.innerHTML = "<li class='state-msg empty'>No users found.</li>";
        } else {
            renderUsers(users);
        }
    } catch (err) {
        console.error("Failed to fetch users:", err);
        usersList.innerHTML = "<li class='state-msg error'>Unable to load user list.</li>";
    }
}

init();
