// api.js — API calls only, no DOM

const API_BASE = "https://jsonplaceholder.typicode.com";

function getUsers() {
    return fetch(`${API_BASE}/users`).then(r => r.json());
}

function getUserPosts(userId) {
    return fetch(`${API_BASE}/users/${userId}/posts`).then(r => r.json());
}

function getUserAlbums(userId) {
    return fetch(`${API_BASE}/users/${userId}/albums`).then(r => r.json());
}
