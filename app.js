const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const ticketService = require("./ticketService");

const command = process.argv[2];
const title = process.argv[3];
const filterType = process.argv[3];
const filterValue = process.argv[4];
const searchTitle = process.argv[3];
const id = process.argv[3];
const category = process.argv[4];
const status = process.argv[4];
const priority = process.argv[5];

const filePath = path.join(__dirname, "tickets.json");

async function run() {
  try {
    if (!fs.existsSync(filePath)) {
      await fsPromises.writeFile(filePath, "[]");
    }

    const readData = JSON.parse(await fsPromises.readFile(filePath, "utf8"));

    switch (command) {
      // ADD
      case "add":
        await ticketService.addTicket(
          readData,
          title,
          category,
          priority,
          filePath,
        );
        break;

      // LIST
      case "list":
        ticketService.list(readData);
        break;

      // DELETE
      case "delete":
        await ticketService.deleteTicket(readData, id, filePath);
        break;

      // UPDATE
      case "update":
        await ticketService.updateTicket(readData, id, status, filePath);
        break;

      // SEARCH
      case "search":
        ticketService.search(readData, searchTitle);
        break;

      // FILTER
      case "filter":
        ticketService.filter(readData, filterType, filterValue);
        break;

      default:
        console.log("Unknown command");
        break;
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
