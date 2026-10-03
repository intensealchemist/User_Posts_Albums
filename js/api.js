// ============================================================
//  api.js — API Module
//  All JSONPlaceholder calls live here.
//  Each function returns a Promise that resolves with data.
//  No DOM access in this file.
// ============================================================

const API_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Generic fetch wrapper — centralises error handling.
 * @param {string} endpoint  e.g. "/users"
 * @returns {Promise<any>}
 */
async function apiFetch(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API error ${response.status} for ${endpoint}`);
    }
    return response.json();
}

// ---------- Public API Functions ----------

/**
 * Fetch all users.
 * @returns {Promise<User[]>}
 */
function getUsers() {
    return apiFetch("/users");
}

/**
 * Fetch all posts by a specific user.
 * @param {number} userId
 * @returns {Promise<Post[]>}
 */
function getUserPosts(userId) {
    return apiFetch(`/users/${userId}/posts`);
}

/**
 * Fetch all albums by a specific user.
 * @param {number} userId
 * @returns {Promise<Album[]>}
 */
function getUserAlbums(userId) {
    return apiFetch(`/users/${userId}/albums`);
}
