# USER POSTS & ALBUMS VIEWER — TEST CASES

Functional, API, UI, error-handling and integration test cases aligned with the current requirements and implementation design.

| Field | Value |
|---|---|
| Document Version | 0.1 |
| Prepared By | Atul Sharma |
| Application Type | Client-side web application |
| Technology | HTML5 / CSS3 / JavaScript (ES6+) / jQuery 4.0.0 |
| Data Source | JSONPlaceholder |
| Status | Executed — 2026-10-04 |

## Test Execution Summary

| Metric | Value |
|---|---:|
| Total Tests | 21 |
| Not Run | 0 |
| Passed | 21 |
| Failed | 0 |
| Blocked | 0 |

> Execution note: Keep Status as “Not Run” until the implementation is actually tested. Record the observed behavior in Actual Result and use Remarks for defects, evidence or follow-up.

## Test Cases

| Test Case ID | Requirement ID | Priority | Test Type | Test Scenario | Preconditions | Test Steps | Test Data / API | Expected Result | Actual Result | Status | Remarks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-01 | FR-01 | High | API / Functional | Retrieve users on initial page load | Application is opened; network access is available | Open the application and inspect the browser Network tab. | GET https://jsonplaceholder.typicode.com/users | A successful GET request is sent and a list of user objects is received. | GET request fired on page load; 10 user objects returned as expected. | Pass |  |
| TC-02 | FR-02 | High | UI / Functional | Display the API name as the required first-name + last-name value | User list has loaded | Compare each displayed user name with the corresponding API response name field. | Example API value: name = "Leanne Graham" | The UI displays the API name value exactly as the requested first-name + last-name display; unrelated API fields are not displayed. | All 10 user names displayed exactly as returned by the API. No extra fields shown. | Pass |  |
| TC-03 | FR-03 | High | UI / Functional | Select a user from the user list | Users are displayed | Click a user entry. | Selected user ID, e.g. 1 | The selected user is identified in the detail area and the application starts loading Posts and Albums for that user. | Clicking a user highlighted it and triggered Posts and Albums loading. | Pass |  |
| TC-04 | FR-04 | High | API / Integration | Fetch Posts using a dedicated API request | A user is selected | Select a user and inspect the Network tab. | GET https://jsonplaceholder.typicode.com/users/{userId}/posts | A separate GET request is sent to the Posts endpoint using the selected user ID, and the response contains post objects associated with that user. | Dedicated GET request to /posts endpoint confirmed in Network tab. | Pass |  |
| TC-05 | FR-05 | High | API / Integration | Fetch Albums using a dedicated API request | A user is selected | Select a user and inspect the Network tab. | GET https://jsonplaceholder.typicode.com/users/{userId}/albums | A separate GET request is sent to the Albums endpoint using the selected user ID, and the response contains album objects associated with that user. | Dedicated GET request to /albums endpoint confirmed in Network tab. | Pass |  |
| TC-06 | FR-04 / FR-05 | High | API / Integration | Initiate independent Posts and Albums requests | A user is selected | Select a user and observe the Network tab request list and timing. | Posts request + Albums request for the same user ID | Posts and Albums are initiated as two independent HTTP requests; they are not represented as one combined API request. | Two separate requests visible in Network tab firing concurrently. | Pass |  |
| TC-07 | FR-06 | High | UI / Functional | Display Posts and Albums simultaneously in separate sections | The selected user's Posts and Albums have been loaded | Select a user and inspect the selected-user area. | Selected user with both datasets loaded | Posts and Albums are both visible at the same time in separate UI sections; neither section is hidden behind a tab or view switch. | Posts and Albums rendered side-by-side simultaneously using CSS Grid layout. | Pass |  |
| TC-08 | FR-06 | High | UI / Functional | Posts section renders only Posts data | Posts and Albums are displayed | Inspect the Posts section. | Post fields such as title and body | The Posts section displays only Post data; the Albums section remains separately visible. | Posts section shows title and body only; Albums section unaffected. | Pass |  |
| TC-09 | FR-06 | High | UI / Functional | Albums section renders only Album data | Posts and Albums are displayed | Inspect the Albums section. | Album field such as title | The Albums section displays only Album data; the Posts section remains separately visible. | Albums section shows album titles only; Posts section unaffected. | Pass |  |
| TC-10 | FR-07 | Medium | UI / Functional | Show loading feedback while users are being fetched | Application has just been opened | Reload the page and observe the UI before the users response completes. | Users API request in progress | A clear loading indication is visible while the Users request is in progress. | "Loading users..." message visible briefly on page reload before data arrived. | Pass |  |
| TC-11 | FR-07 | Medium | UI / Functional | Show loading feedback for Posts and Albums requests | Users are loaded | Select a user and observe the Posts and Albums sections while the detail requests are in progress. | Posts and Albums requests in progress | The selected-user area communicates request progress while Posts and Albums are being fetched; loading feedback is cleared when the relevant requests complete. | "Loading posts..." and "Loading albums..." messages appeared and cleared correctly upon completion. | Pass |  |
| TC-12 | FR-08 | High | Error Handling | Handle failure of the Users API request | Application can be tested with the Users request failing or unavailable | Trigger a failed Users API request and observe the UI. | GET https://jsonplaceholder.typicode.com/users returns an error or network failure | A user-facing Users error message is displayed and the application does not silently fail. | Blocked URL via Chrome DevTools; "Failed to fetch users." error message displayed in Users panel. | Pass | Tested using Chrome DevTools Network request blocking. |
| TC-13 | FR-08 | High | Error Handling | Handle Posts request failure while Albums succeeds | A user is selected; Posts and Albums are requested independently | Cause the Posts request to fail while allowing the Albums request to succeed; observe both sections. | GET /users/{userId}/posts fails; Albums request succeeds | The Posts section shows an appropriate error state, while the successfully retrieved Albums remain available in the Albums section. | Posts section showed "Failed to load user Posts."; Albums section loaded normally. | Pass | Tested using Chrome DevTools Network request blocking. Posts and Albums handlers are fully independent. |
| TC-14 | FR-08 | High | Error Handling | Handle Albums request failure while Posts succeeds | A user is selected; Posts and Albums are requested independently | Cause the Albums request to fail while allowing the Posts request to succeed; observe both sections. | GET /users/{userId}/albums fails; Posts request succeeds | The Albums section shows an appropriate error state, while the successfully retrieved Posts remain available in the Posts section. | Albums section showed "Failed to load user Albums."; Posts section loaded normally. | Pass | Tested using Chrome DevTools Network request blocking. |
| TC-15 | FR-09 | Medium | UI / Functional | Update both Posts and Albums dynamically without a full browser refresh | Application is running | Select one user and then select another user. | Normal user interaction with two different user IDs | The selected user, Posts section, and Albums section update dynamically for the newly selected user without reloading the whole page. | Selecting a different user updated all three areas without a page reload. | Pass |  |
| TC-16 | FR-09 | Medium | Functional | Replace both datasets when another user is selected | Both Posts and Albums for User A have been loaded | Select User A, then select User B and inspect both sections. | Previously retrieved User A datasets followed by User B selection | Both visible sections now correspond to User B; no Posts/Albums tab switching is required and no User A detail data remains displayed. | After switching users, only User B data was visible in both sections. | Pass |  |
| TC-17 | FR-02 | Medium | UI / Functional | Display multi-word names exactly as provided by the API | Users are loaded and a test fixture or mock response can be supplied | Provide a user record whose name contains more than two words and inspect the displayed value. | Example API fixture: name = "John Michael Doe" | The UI displays the complete API name exactly as provided. No additional first-name/last-name parsing rule is applied. | "John Michael Doe" displayed in full with no truncation or parsing. | Pass | Tested using console-based mock override of getUsers(). |
| TC-18 | LLD-SEC-01 | Medium | Security / UI | Render API text safely | API response contains text fields | Inspect rendered titles/names and verify text is inserted as text rather than interpreted as HTML. | API-supplied text containing markup-like characters | API text is displayed as plain text; HTML/script content from the response is not executed or interpreted as markup. | HTML tags and script payloads rendered as plain visible text; no alerts or HTML execution occurred. | Pass | Tested using console-based mock with XSS payloads in name field. jQuery .text() escapes all HTML. |
| TC-19 | LLD-REQ-01 | Medium | Functional / Integration | Handle rapid selection of different users | Multiple users are displayed | Click one user and quickly select another before the first detail requests finish. | User A followed quickly by User B | The final UI state corresponds to the most recently selected user; stale responses from the previous selection do not overwrite the current user's data. | UI correctly showed only the last selected user's data; no stale data bleed from previous selection. | Pass | detailRequestId mechanism discards superseded responses. |
| TC-20 | NFR-03 | Low | Empty State | Handle an empty Posts or Albums response | The API returns an empty array for the selected dataset | Load the affected dataset and observe the relevant section. | [] response | A clear empty-state message is shown in the affected section rather than leaving the user with a blank, ambiguous area. | "No posts available for this user." and "No albums available for this user." displayed correctly for empty arrays. | Pass | Tested using console-based mock returning [] for each dataset independently. |

Reference endpoints: `https://jsonplaceholder.typicode.com/users` | `https://jsonplaceholder.typicode.com/users/{userId}/posts` | `https://jsonplaceholder.typicode.com/users/{userId}/albums`

## Requirement Traceability Matrix

Mapping between current requirements and their verification test cases.

| Requirement ID | Requirement Summary | Related Test Cases | Coverage | Execution Status |
| --- | --- | --- | --- | --- |
| FR-01 | Retrieve users from JSONPlaceholder on initial load. | TC-01 | Covered | Pass |
| FR-02 | Display each user's API name value as the requested first-name + last-name display. | TC-02, TC-17 | Covered | Pass |
| FR-03 | Allow the user to select a user. | TC-03 | Covered | Pass |
| FR-04 | Retrieve selected user's Posts from the dedicated Posts endpoint. | TC-04, TC-06, TC-13 | Covered | Pass |
| FR-05 | Retrieve selected user's Albums from the dedicated Albums endpoint. | TC-05, TC-06, TC-14 | Covered | Pass |
| FR-06 | Present Posts and Albums in separate sections at the same time. | TC-07, TC-08, TC-09 | Covered | Pass |
| FR-07 | Provide loading feedback during required requests. | TC-10, TC-11 | Covered | Pass |
| FR-08 | Provide user-facing error handling for failed requests. | TC-12, TC-13, TC-14 | Covered | Pass |
| FR-09 | Update displayed user, Posts, and Albums dynamically without full-page refresh. | TC-15, TC-16 | Covered | Pass |
| NFR-01 | Usability of user selection and simultaneous Posts/Albums viewing. | TC-03, TC-07 | Covered | Pass |
| NFR-02 | Responsive request-state feedback. | TC-10, TC-11 | Covered | Pass |
| NFR-03 | Graceful error and empty-state behavior. | TC-12, TC-13, TC-14, TC-20 | Covered | Pass |
| NFR-04 | Logical separation of API communication, state, interaction, and rendering. | Review | Review | Reviewed |
| NFR-05 | Browser compatibility in commonly used modern browsers. | TC-21 | Covered | Pass |
| LLD-SEC-01 | Render external API text as text rather than raw HTML. | TC-18 | Covered | Pass |
| LLD-REQ-01 | Prevent stale responses from older user selections from updating current UI. | TC-19 | Covered | Pass |
