// UI rendering and DOM updates

// Users panel functions

function showUsersLoading() {
    $("#users-loading").text("Loading users...").prop("hidden", false);
}

function hideUsersLoading() {
    $("#users-loading").prop("hidden", true).empty();
}

function showUsersError(message) {
    $("#users-error").text(message).prop("hidden", false);
}

function clearUsersError() {
    $("#users-error").prop("hidden", true).empty();
}

// Render users list
function renderUsers(users) {
    const $list = $("#users-list");
    $list.empty();

    if (users.length === 0) {
        $list.append($("<p>").text("No users found."));
        return;
    }

    $.each(users, function (_, user) {
        const $button = $("<button>", {
            type: "button",
            class: "user-item",
            text: user.name,             // SAFE: jQuery .text() prevents HTML injection
            "data-user-id": user.id
        });
        $list.append($button);
    });
}

// Highlights the selected user button
function setActiveUser(userId) {
    $(".user-item").removeClass("active");
    $(`.user-item[data-user-id='${userId}']`).addClass("active");
}

// Posts panel functions

function showPostsLoading() {
    $("#posts-loading").text("Loading posts...").prop("hidden", false);
}

function hidePostsLoading() {
    $("#posts-loading").prop("hidden", true).empty();
}

function showPostsError(message) {
    $("#posts-error").text(message).prop("hidden", false);
}

function clearPostsError() {
    $("#posts-error").prop("hidden", true).empty();
}

function clearPostsContent() {
    $("#posts-content").empty();
}

// Render posts list
function renderPosts(posts) {
    const $content = $("#posts-content");
    $content.empty();

    if (posts.length === 0) {
        $content.append($("<p>").text("No posts available for this user."));
        return;
    }

    const $list = $("<ul>");
    $.each(posts, function (_, post) {
        const $item = $("<li>");
        $("<strong>").text(post.title).appendTo($item);  // SAFE: .text()
        $("<p>").text(post.body).appendTo($item);        // SAFE: .text()
        $item.appendTo($list);
    });
    $content.append($list);
}

// Albums panel functions

function showAlbumsLoading() {
    $("#albums-loading").text("Loading albums...").prop("hidden", false);
}

function hideAlbumsLoading() {
    $("#albums-loading").prop("hidden", true).empty();
}

function showAlbumsError(message) {
    $("#albums-error").text(message).prop("hidden", false);
}

function clearAlbumsError() {
    $("#albums-error").prop("hidden", true).empty();
}

function clearAlbumsContent() {
    $("#albums-content").empty();
}

// Render albums list
function renderAlbums(albums) {
    const $content = $("#albums-content");
    $content.empty();

    if (albums.length === 0) {
        $content.append($("<p>").text("No albums available for this user."));
        return;
    }

    const $list = $("<ul>");
    $.each(albums, function (_, album) {
        $("<li>").text(album.title).appendTo($list);  // SAFE: .text()
    });
    $content.append($list);
}

// Show error in both detail panels

function showDetailError(message) {
    showPostsError(message);
    showAlbumsError(message);
}
