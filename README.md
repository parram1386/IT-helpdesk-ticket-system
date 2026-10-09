# Helpdesk Ticket Management API (WIP)

A lightweight backend project built with **Node.js** to practice REST API development, asynchronous programming, request handling, and JSON-based data storage.

## About the Project

This project is a simple Helpdesk Ticket Management API designed to receive, manage, and store support tickets.

It is being developed as a hands-on learning project to strengthen backend development skills and demonstrate practical knowledge of JavaScript and Node.js.

## Technologies Used

- JavaScript
- Node.js
- Built-in HTTP module
- File System (`fs/promises`)
- UUID
- JSON
- Thunder Client for API testing

## Features

- Retrieve all support tickets
- Create new support tickets
- Store tickets in a local JSON file
- Generate unique ticket IDs using UUID
- Record ticket creation timestamps
- Handle asynchronous file operations
- Return JSON responses and HTTP status codes

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/tickets` | Retrieve all tickets |
| POST | `/tickets` | Create a new ticket |

## Example Ticket

```json
{
  "ticketId": "d8de63b1-f35e-4ea7-8a84-97ee91064527",
  "createdAt": "2026-10-02T15:59:52.943Z",
  "ticketTitle": "Printer not working",
  "ticketCategory": "Hardware",
  "ticketPriority": "High",
  "ticketStatus": "Open"
}
```

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/parram1386/IT-helpdesk-ticket-system.git
```

**2. Open the project directory**

```bash
cd IT-helpdesk-ticket-system
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the server**

Run the project's server entry file using Node.js. By default, the API runs on port `3500`.

**5. Test the API**

Use Thunder Client, Postman, or another HTTP client to send requests to:

```text
http://localhost:3500/tickets
```

## Project Structure

The project uses a Node.js server file for handling HTTP requests and a `tickets.json` file for local ticket storage.

## Planned Improvements

- Complete request validation
- Improve error handling
- Update existing tickets
- Delete tickets
- Search and filter tickets
- Add a database
- Add automated API tests

## Project Status

**In Development** — This project is being built incrementally as part of my backend development learning journey.

## Purpose

To gain practical experience in building backend APIs, working with asynchronous JavaScript, handling HTTP requests, and managing structured data.

## License

No license has been specified yet.
