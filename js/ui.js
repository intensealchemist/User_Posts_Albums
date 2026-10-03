// ui.js — DOM rendering and UI state updates only
// No API calls or application state here.

const UI = {
    usersList: document.getElementById("users-list"),
    emptyState: document.getElementById("empty-state"),
    detailContent: document.getElementById("detail-content"),
    detailName: document.getElementById("detail-name"),
    detailEmail: document.getElementById("detail-email"),
    detailCompany: document.getElementById("detail-company"),
    postsList: document.getElementById("posts-list"),
    albumsList: document.getElementById("albums-list"),
    postsHeading: document.getElementById("posts-heading"),
    albumsHeading: document.getElementById("albums-heading"),

    // Helper to generate consistent state messages safely
    _setStateMsg(element, type, message) {
        element.innerHTML = `<li class='state-msg ${type}'>${message}</li>`;
    },

    // --- Users Panel ---
    showUsersLoading() {
        this._setStateMsg(this.usersList, "loading", "Loading users...");
    },
    showUsersError(message) {
        this._setStateMsg(this.usersList, "error", message);
    },
    showUsersEmpty() {
        this._setStateMsg(this.usersList, "empty", "No users found.");
    },
    renderUsers(users, onUserClick) {
        this.usersList.innerHTML = "";
        users.forEach(u => {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.className = "user-btn";
            btn.dataset.id = u.id;
            btn.textContent = u.name; // SAFE DOM API

            btn.addEventListener("click", () => {
                // Visual selection update
                this.usersList.querySelectorAll(".user-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                // Notify app.js
                onUserClick(u.id);
            });

            li.appendChild(btn);
            this.usersList.appendChild(li);
        });
    },

    //Detail Panel 
    showDetailHeader(user) {
        this.detailName.textContent = user.name;
        this.detailEmail.textContent = user.email;
        this.detailCompany.textContent = user.company.name;
        this.emptyState.hidden = true;
        this.detailContent.hidden = false;
    },
    showDetailsLoading() {
        this.postsHeading.textContent = "Posts";
        this.albumsHeading.textContent = "Albums";
        this._setStateMsg(this.postsList, "loading", "Loading posts...");
        this._setStateMsg(this.albumsList, "loading", "Loading albums...");
    },
    showDetailsError() {
        this._setStateMsg(this.postsList, "error", "Unable to load posts.");
        this._setStateMsg(this.albumsList, "error", "Unable to load albums.");
    },
    // Helper method to eliminate redundant rendering logic
    _renderDetailList(items, listEl, headingEl, label, emptyMsg) {
        headingEl.textContent = `${label}: ${items.length}`;
        listEl.innerHTML = "";
        if (items.length === 0) {
            this._setStateMsg(listEl, "empty", emptyMsg);
            return;
        }
        items.forEach(item => {
            const li = document.createElement("li");
            li.className = "detail-card";
            li.textContent = item.title;
            listEl.appendChild(li);
        });
    },

    renderPosts(posts) {
        this._renderDetailList(posts, this.postsList, this.postsHeading, "Posts", "No posts found.");
    },
    renderAlbums(albums) {
        this._renderDetailList(albums, this.albumsList, this.albumsHeading, "Albums", "No albums found.");
    }
};
