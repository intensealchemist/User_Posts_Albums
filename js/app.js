// State and orchestration logic

// Client-side state model
const state = {
    users: [],
    selectedUser: null,
    posts: [],
    albums: [],
    usersLoading: false,
    postsLoading: false,
    albumsLoading: false,
    usersError: null,
    postsError: null,
    albumsError: null,
    detailRequestId: 0
};

// Initialize on ready
$(function () {
    loadUsers();
    bindEvents();
});

// Load the initial list of users
function loadUsers() {
    state.usersLoading = true;
    state.usersError = null;
    showUsersLoading();
    clearUsersError();

    return getUsers()
        .done(function (users) {
            state.users = users;
            renderUsers(state.users);
        })
        .fail(function () {
            state.usersError = "Failed to fetch users.";
            showUsersError(state.usersError);
        })
        .always(function () {
            state.usersLoading = false;
            hideUsersLoading();
        });
}

// Handle when a user is clicked
function handleUserSelection(user) {
    if (!user || !user.id) {
        showDetailError("Unable to identify the selected user.");
        return;
    }

    state.selectedUser = user;
    state.posts = [];
    state.albums = [];
    state.postsError = null;
    state.albumsError = null;
    state.detailRequestId += 1;

    // Update selected-user heading
    $("#selected-user").text(user.name);

    // Highlight active user button
    setActiveUser(user.id);

    // Clear previous detail data and errors
    clearPostsContent();
    clearAlbumsContent();
    clearPostsError();
    clearAlbumsError();

    loadUserDetails(user.id, state.detailRequestId);
}

// Load posts and albums concurrently for a user
function loadUserDetails(userId, requestId) {
    state.postsLoading = true;
    state.albumsLoading = true;
    showPostsLoading();
    showAlbumsLoading();

    // Fetch Posts
    getUserPosts(userId)
        .done(function (posts) {
            if (requestId !== state.detailRequestId) { return; }
            state.posts = posts;
            renderPosts(state.posts);
        })
        .fail(function () {
            if (requestId !== state.detailRequestId) { return; }
            state.postsError = "Failed to load user Posts.";
            showPostsError(state.postsError);
        })
        .always(function () {
            if (requestId !== state.detailRequestId) { return; }
            state.postsLoading = false;
            hidePostsLoading();
        });

    // Fetch Albums
    getUserAlbums(userId)
        .done(function (albums) {
            if (requestId !== state.detailRequestId) { return; }
            state.albums = albums;
            renderAlbums(state.albums);
        })
        .fail(function () {
            if (requestId !== state.detailRequestId) { return; }
            state.albumsError = "Failed to load user Albums.";
            showAlbumsError(state.albumsError);
        })
        .always(function () {
            if (requestId !== state.detailRequestId) { return; }
            state.albumsLoading = false;
            hideAlbumsLoading();
        });
}

// Setup event listeners
function bindEvents() {
    $("#users-list").on("click", ".user-item", function () {
        const userId = Number($(this).data("user-id"));
        const user = state.users.find(function (item) {
            return item.id === userId;
        });
        handleUserSelection(user);
    });
}
