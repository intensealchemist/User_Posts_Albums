// app.js — State, event handling, orchestration, and request coordination
// Built with jQuery to match LLD exactly

const state = {
    users: [],
    selectedUserId: null
};

// Handle user selection & coordinate fetching details
function handleUserSelection(userId) {
    if (state.selectedUserId === userId) return;
    state.selectedUserId = userId;

    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    UI.setActiveUser(userId);
    UI.showDetailHeader(user);
    UI.showDetailsLoading();

    // Use $.when for concurrent jQuery promises
    $.when(
        getUserPosts(userId),
        getUserAlbums(userId)
    )
    .done(function(postsRes, albumsRes) {
        // $.when returns an array [data, statusText, jqXHR] for each ajax call
        const posts = postsRes[0];
        const albums = albumsRes[0];

        UI.renderPosts(posts);
        UI.renderAlbums(albums);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Failed to fetch user details:", textStatus, errorThrown);
        UI.showDetailsError();
    });
}

// Bind delegated events via jQuery
function bindEvents() {
    $("#users-list").on("click", ".user-item", function() {
        const userId = Number($(this).data("id"));
        console.log("Selected user ID:", userId);
        handleUserSelection(userId);
    });
}

// Init: Application entry point
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

// Run on document ready
$(function() {
    init();
});
