// api.js — API calls only using jQuery $.ajax

const API_BASE = "https://jsonplaceholder.typicode.com";

function _get(endpoint) {
    return $.ajax({
        url: `${API_BASE}${endpoint}`,
        method: "GET",
        dataType: "json"
    });
}

function getUsers() {
    return _get("/users");
}

function getUserPosts(userId) {
    return _get(`/users/${userId}/posts`);
}

function getUserAlbums(userId) {
    return _get(`/users/${userId}/albums`);
}
