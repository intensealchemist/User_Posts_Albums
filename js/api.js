// API request functions

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// GET https://jsonplaceholder.typicode.com/users
function getUsers() {
    return $.ajax({
        url: `${API_BASE_URL}/users`,
        method: "GET",
        dataType: "json"
    });
}

// GET https://jsonplaceholder.typicode.com/users/{userId}/posts
function getUserPosts(userId) {
    return $.ajax({
        url: `${API_BASE_URL}/users/${userId}/posts`,
        method: "GET",
        dataType: "json"
    });
}

// GET https://jsonplaceholder.typicode.com/users/{userId}/albums
function getUserAlbums(userId) {
    return $.ajax({
        url: `${API_BASE_URL}/users/${userId}/albums`,
        method: "GET",
        dataType: "json"
    });
}
