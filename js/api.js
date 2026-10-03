// api.js — API calls only, no DOM

const API_BASE = "https://jsonplaceholder.typicode.com";

function _get(endpoint) {
    return fetch(`${API_BASE}${endpoint}`).then(r => r.json());
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
