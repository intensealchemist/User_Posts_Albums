# Requirement Understanding Document
## User Posts and Albums Viewer

**RUD v1.2 | Requirements clarified and updated**  
**Status:** Requirements confirmed; requirements clarification incorporated  
**Prepared By:** Atul Sharma  
**Date:** 04 October 2026  
**Application Type:** Client-side / presentation-layer web application  
**Technology:** HTML5, CSS3, JavaScript (ES6+), jQuery 4.0.0  
**Data Source:** JSONPlaceholder REST API

## 1. Requirements Clarification Incorporated
The latest clarification establishes that the requirements are focused on the **presentation layer** working against a ready-made external business/data layer. No custom backend, database, or application-owned business layer is required.

After a user is selected, **Posts and Albums are retrieved through two separate API requests and both are displayed at the same time in separate UI sections/panels**. Posts means the user's Posts resource, not Photos.

## 2. Project Overview
The application retrieves a list of users, displays the user's name as the requested first-name + last-name presentation value, allows a user to be selected, and retrieves that user's Posts and Albums from separate JSONPlaceholder endpoints. The two datasets remain visually separate but are visible simultaneously. Loading and error feedback are required.

## 3. Objective
- Retrieve and present users from JSONPlaceholder.
- Display each user's requested first-name + last-name value.
- Allow the user to select a specific user.
- Retrieve the selected user's Posts and Albums using separate API requests.
- Display Posts and Albums simultaneously in separate sections.
- Provide loading, empty, and error feedback.
- Update the UI without a manual full-page refresh.

## 4. Scope
### 4.1 In Scope
- User retrieval from `/users`.
- Display of each user's first-name + last-name presentation value.
- User click/selection interaction.
- Retrieval of selected user's Posts from `/users/{userId}/posts`.
- Retrieval of selected user's Albums from `/users/{userId}/albums`.
- Separate Posts and Albums UI sections visible at the same time.
- Loading, error, and empty states for required data.
- Dynamic client-side rendering without full-page refresh.
- Basic responsive and presentable styling.

### 4.2 Out of Scope
- Custom backend development.
- Application-owned business/service layer.
- Custom database or persistent storage.
- Authentication and authorization.
- User registration/login.
- CRUD operations against an application-owned store.
- Administrative features.
- Advanced UI/UX beyond a clean, functional presentation layer.

## 5. Technology and Architecture Understanding
The browser hosts the application presentation and client-side logic. JSONPlaceholder is the ready-made external API/data source used for user, Post, and Album records. No application-owned backend or business layer is introduced.

| Layer | Responsibility |
|---|---|
| Presentation layer | HTML/CSS structure, user list, selected-user area, Posts panel, Albums panel, loading, error, and empty states |
| Client-side application logic | jQuery event handling, API requests, response processing, state, and DOM updates |
| Ready-made external API/data layer | Supplies user, Post, and Album data via REST endpoints |

## 6. Functional Requirements
| ID | Requirement | Description | Status |
|---|---|---|---|
| FR-01 | Retrieve users | Retrieve users from `https://jsonplaceholder.typicode.com/users` using HTTP GET. | Confirmed |
| FR-02 | Display users | Display each retrieved user's first-name + last-name presentation value. | Confirmed |
| FR-03 | Select user | Allow the user to select/click a displayed user. | Confirmed |
| FR-04 | Retrieve posts | After selection, retrieve Posts from `https://jsonplaceholder.typicode.com/users/{userId}/posts`. | Confirmed |
| FR-05 | Retrieve albums | After selection, retrieve Albums from `https://jsonplaceholder.typicode.com/users/{userId}/albums`. | Confirmed |
| FR-06 | Simultaneous Posts and Albums | Display Posts and Albums in separate UI sections and show both at the same time. | Confirmed |
| FR-07 | Loading state | Show appropriate loading indication while required API data is being retrieved. | Confirmed |
| FR-08 | Error handling | Handle API/request failures with an appropriate user-facing message. | Confirmed |
| FR-09 | Dynamic update | Selecting another user updates the related data without a manual full-page refresh. | Confirmed |

## 7. User Flow
1. Application starts.
2. Client requests the Users resource.
3. Users are rendered with the requested name display value.
4. User selects a user.
5. Client starts two independent requests for the selected user: Posts and Albums.
6. Responses are stored in client-side state.
7. Posts and Albums are rendered simultaneously in separate sections.
8. Selecting another user replaces the previous selected-user data and repeats the detail requests.

## 8. API Understanding
| Resource | Method | Complete URL | Purpose |
|---|---|---|---|
| Users | GET | `https://jsonplaceholder.typicode.com/users` | Retrieve users |
| Posts | GET | `https://jsonplaceholder.typicode.com/users/{userId}/posts` | Retrieve selected user's Posts |
| Albums | GET | `https://jsonplaceholder.typicode.com/users/{userId}/albums` | Retrieve selected user's Albums |

**Clarification:** Posts and Albums are separate API resources and therefore separate requests.

## 9. Name Display Understanding
JSONPlaceholder provides one `name` field rather than separate `firstName` and `lastName` fields. For these requirements, the complete `name` value is used for the required first-name + last-name display. Example: `name: "Leanne Graham"` is displayed as **Leanne Graham**. No server-side name transformation is required.

## 10. Non-Functional Requirements
| ID | Requirement | Expected Outcome |
|---|---|---|
| NFR-01 | Usability | User selection and simultaneous access to Posts and Albums are straightforward. |
| NFR-02 | Responsiveness of feedback | The UI clearly communicates request state. |
| NFR-03 | Error handling | Failures are surfaced with meaningful user-facing feedback. |
| NFR-04 | Maintainability | API communication, user interaction, state, and rendering are logically separated. |
| NFR-05 | Browser compatibility | The application works in commonly used modern browsers. |

## 11. High-Level UI Structure
```text
+--------------------------------------------------------------+
| User Posts & Albums Viewer                                   |
+--------------------------+-----------------------------------+
| Users                    | Selected User                     |
|                          |                                   |
| Leanne Graham            | Leanne Graham                     |
| Ervin Howell             +----------------+------------------+
| Clementine Bauch         | Posts          | Albums           |
| ...                      |---------------|------------------|
|                          | Post 1        | Album 1          |
|                          | Post 2        | Album 2          |
|                          | ...           | ...              |
+--------------------------+----------------+------------------+
```

## 12. Confirmed Constraints
- Presentation-layer implementation only.
- JSONPlaceholder is the required external API/data source.
- Posts and Albums are different endpoints and different datasets.
- Both Posts and Albums must be visible at the same time after user selection.
- The application must provide loading and error handling.
- Posts means the Posts resource, not Photos.

## 13. Status and Next Action
**Current Status:** Requirements updated and confirmed based on the clarification received on 04 October 2026.

**Next Action:** Align the SRS, HLD, and LLD with the simultaneous Posts + Albums display and presentation-only architecture, then proceed to implementation.
