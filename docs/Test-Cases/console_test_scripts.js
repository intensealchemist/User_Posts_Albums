// Console Test Scripts — User Posts & Albums Explorer
// These scripts were used during manual test execution to mock API responses
// directly in the browser console without needing a testing framework.
//
// HOW TO USE:
//   1. Open the application in Chrome/Edge (index.html via local server)
//   2. Open DevTools (F12) and go to the Console tab
//   3. Paste the relevant script below and press Enter
//   4. Refresh the page when done to restore real API calls


// ─── TC-17 ────────────────────────────────────────────────────────────────────
// Requirement: FR-02
// Scenario: Display multi-word names exactly as provided by the API
// Purpose: Verifies no string-splitting or first/last name parsing is applied

getUsers = function () {
    return $.Deferred().resolve([
        { id: 1, name: "John Michael Doe" },
        { id: 2, name: "Mary Jane Watson" }
    ]).promise();
};
loadUsers();


// ─── TC-18 ────────────────────────────────────────────────────────────────────
// Requirement: LLD-SEC-01
// Scenario: Render API text safely (XSS prevention)
// Purpose: Verifies jQuery .text() escapes HTML — no tags are rendered or scripts executed

getUsers = function () {
    return $.Deferred().resolve([
        { id: 1, name: "<img src=x onerror=alert('XSS')>" },
        { id: 2, name: "<b>Bold Name</b>" },
        { id: 3, name: "<script>alert('hacked')</script>" }
    ]).promise();
};
loadUsers();


// ─── TC-19 ────────────────────────────────────────────────────────────────────
// Requirement: LLD-REQ-01
// Scenario: Handle rapid selection of different users (stale-response protection)
// Purpose: Verifies detailRequestId discards superseded responses
// NOTE: This one is tested by clicking users rapidly in the UI — no mock needed.
//       To make it easier to observe, you can add artificial delay in api.js temporarily:
//
//   getUserPosts = function(userId) {
//       var d = $.Deferred();
//       setTimeout(function() { d.resolve([]); }, 3000); // 3 second delay
//       return d.promise();
//   };
//   loadUsers();
//
//   Then click User 1, immediately click User 2. Only User 2's data should appear.


// ─── TC-20 ────────────────────────────────────────────────────────────────────
// Requirement: NFR-03
// Scenario: Handle an empty Posts response (Albums still renders normally)

getUsers = function () {
    return $.Deferred().resolve([{ id: 1, name: "Test User" }]).promise();
};
getUserPosts = function () {
    return $.Deferred().resolve([]).promise();
};
getUserAlbums = function () {
    return $.Deferred().resolve([{ id: 1, title: "A real album" }]).promise();
};
loadUsers();

// ─── TC-20 (variant) ──────────────────────────────────────────────────────────
// Scenario: Handle an empty Albums response (Posts still renders normally)

getUsers = function () {
    return $.Deferred().resolve([{ id: 1, name: "Test User" }]).promise();
};
getUserPosts = function () {
    return $.Deferred().resolve([{ id: 1, title: "A real post", body: "Post body text." }]).promise();
};
getUserAlbums = function () {
    return $.Deferred().resolve([]).promise();
};
loadUsers();
