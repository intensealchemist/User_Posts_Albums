# User Posts Albums Explorer

A web application that fetches and displays **Users**, **Posts**, and **Albums** data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Project Structure

```
User_Posts_Albums/
│
├── index.html                  # Main HTML entry point
├── css/
│   └── style.css               # Application styles
├── js/
│   └── app.js                  # Application logic
│
├── docs/
│   ├── RUD_v1.1.pdf            # Requirements Understanding Document
│   ├── RUD_v1.0.pdf            # RUD (previous version)
│   ├── RUD_v1.0.docx           # RUD (editable)
│   ├── SRS_v0.1.docx           # Software Requirements Specification
│   ├── HLD_v0.1.md             # High-Level Design (Markdown)
│   ├── HLD_v0.1.pdf            # High-Level Design (PDF)
│   ├── LLD_v0.1.md             # Low-Level Design (Markdown)
│   ├── API-Spec_v0.1.md        # API Specification (Markdown)
│   ├── API-Spec_v0.1.docx      # API Specification (editable)
│   └── Test-Cases_v0.1.xlsx    # Test Cases (Excel) — to be added
│
├── .gitignore
└── README.md                   # This file
```

## Documentation Formats

| Document | Format | Rationale |
|----------|--------|-----------|
| RUD | DOCX + PDF | Formal requirement document; easy to review/share |
| SRS | DOCX + PDF | Formal specification |
| HLD | Markdown + PDF | Excellent for diagrams, architecture notes, version control |
| LLD | Markdown + PDF | Good for technical details and code snippets |
| API Specification | Markdown | Natural for endpoints, request/response examples |
| Test Cases | Excel/XLSX | Better for tabular test cases and execution status |
| README | Markdown | Standard for Git repositories |

## Tech Stack

- **HTML5** — Structure
- **CSS3** — Styling
- **Vanilla JavaScript** — Logic & API integration

## API Reference

| Endpoint | Description |
|----------|-------------|
| `/users` | List of all users |
| `/posts` | List of all posts |
| `/albums` | List of all albums |
| `/users/{id}/posts` | Posts by a specific user |
| `/users/{id}/albums` | Albums by a specific user |

Base URL: `https://jsonplaceholder.typicode.com`

## Getting Started

> _Implementation coming soon._

## License

This project is part of an internship assignment.
