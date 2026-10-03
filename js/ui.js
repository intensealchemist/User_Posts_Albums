// ui.js — DOM rendering and UI state updates via jQuery

const UI = {
    // Helper to generate consistent state messages safely
    _setStateMsg($element, type, message) {
        $element.html(`<li class='state-msg ${type}'>${message}</li>`);
    },

    // --- Users Panel ---
    showUsersLoading() {
        this._setStateMsg($("#users-list"), "loading", "Loading users...");
    },
    showUsersError(message) {
        this._setStateMsg($("#users-list"), "error", message);
    },
    showUsersEmpty() {
        this._setStateMsg($("#users-list"), "empty", "No users found.");
    },
    renderUsers(users) {
        const $list = $("#users-list");
        $list.empty();

        $.each(users, function(_, u) {
            const $btn = $("<button>", {
                class: "user-item",
                "data-id": u.id,
                text: u.name // SAFE DOM API via jQuery
            });
            $("<li>").append($btn).appendTo($list);
        });
    },
    setActiveUser(userId) {
        $(".user-item").removeClass("active");
        $(`.user-item[data-id='${userId}']`).addClass("active");
    },

    // --- Detail Panel ---
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
    
    // Helper method to eliminate redundant rendering logic
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
                text: item.title // SAFE DOM API via jQuery
            }).appendTo($list);
        });
    },

    renderPosts(posts) {
        this._renderDetailList(posts, $("#posts-list"), $("#posts-heading"), "Posts", "No posts found.");
    },
    renderAlbums(albums) {
        this._renderDetailList(albums, $("#albums-list"), $("#albums-heading"), "Albums", "No albums found.");
    }
};
