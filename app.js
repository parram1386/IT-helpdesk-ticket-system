const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const command = process.argv[2];
const title = process.argv[3];
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
      case "add":
        if (!title || !category || !priority) {
          console.log("Missing information");
          break;
        }
        const priorityCheck = ["High", "Medium", "Low"];
        const priorityValidation = priorityCheck.includes(priority);

        if (priorityValidation === false) {
          console.log("Wrong Priority");
          break;
        }

        const ticket = {
          ticketId: uuid(),
          createdAt: new Date().toISOString(),
          ticketTitle: title,
          ticketCategory: category,
          ticketPriority: priority,
          ticketStatus: "Open",
        };
        readData.push(ticket);
        await fsPromises.writeFile(filePath, JSON.stringify(readData, null, 2));
        console.log(ticket);
        break;
      case "list":
        if (!fs.existsSync(filePath)) {
          console.log("No tickets found");
        } else {
          console.log(readData);
        }
        console.log(readData);
        break;
      case "delete":
        const ticketExists = readData.some((ticket) => {
          return ticket.ticketId === id;
        });
        if (ticketExists === false) {
          console.log("Wrong Id");
          break;
        }

        const newdata = readData.filter((item) => {
          return item.ticketId !== id;
        });
        await fsPromises.writeFile(filePath, JSON.stringify(newdata, null, 2));
        break;
      case "update":
        const validStatuses = ["Open", "In-Progress", "Closed"];
        const checkValidStatuses = validStatuses.includes(status);
        if (checkValidStatuses === false) {
          console.log("Wrong status");
          break;
        }
        const updateTicket = readData.find((ticket) => {
          return ticket.ticketId === id;
        });

        if (!updateTicket) {
          console.log("Wrong ID");
          break;
        }

        updateTicket.ticketStatus = status;

        await fsPromises.writeFile(filePath, JSON.stringify(readData, null, 2));
        console.log("Ticket updated");
        break;
      case "search":
        const search = readData.filter((searchItem) => {
          return searchItem.ticketTitle
            .toLowerCase()
            .includes(searchTitle.toLowerCase());
        });

        if (search.length === 0) {
          console.log("No tickets found");
          break;
        }

        console.log(search);
        break;
        case"filter":
        
        const filterDO = readData.filter((filter)=>{
          return filter.ticketStatus === status;
        });
        if(filterDO.length === 0){
          console.log("No tickets found");
          break;
        }
        console.log(filterDO);
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
