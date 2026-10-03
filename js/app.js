// app.js — State, event handling, orchestration, and request coordination
// Delegates all DOM updates to ui.js and API calls to api.js.

const state = {
    users: [],
    selectedUserId: null
};

// Handle user selection & coordinate fetching details
async function handleUserSelection(userId) {
    if (state.selectedUserId === userId) return;
    state.selectedUserId = userId;

    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    // Show initial UI states for loading
    UI.showDetailHeader(user);
    UI.showDetailsLoading();

    try {
        // Fetch posts and albums concurrently since they are independent requests
        const [posts, albums] = await Promise.all([
            getUserPosts(userId),
            getUserAlbums(userId)
        ]);

        // Render the retrieved data
        UI.renderPosts(posts);
        UI.renderAlbums(albums);
    } catch (err) {
        console.error("Failed to fetch user details:", err);
        UI.showDetailsError();
    }
}

// Init: Application entry point
async function init() {
    UI.showUsersLoading();
    try {
        const users = await getUsers();
        state.users = users;

        if (users.length === 0) {
            UI.showUsersEmpty();
        } else {
            UI.renderUsers(users, handleUserSelection);
        }
    } catch (err) {
        console.error("Failed to fetch users:", err);
        UI.showUsersError("Unable to load user list.");
    }
}

init();
