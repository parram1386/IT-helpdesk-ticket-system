const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");

// SEARCH
function search(readData, searchTitle) {
  const searchResult = readData.filter((searchItem) => {
    return searchItem.ticketTitle
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
  });

  if (searchResult.length === 0) {
    console.log("No tickets found");
    return;
  }

  console.log(searchResult);
}

// LIST
function list(readData) {
  if (readData.length === 0) {
    console.log("No tickets found");
    return;
  }

  console.log(readData);
}

// DELETE
async function deleteTicket(readData, id, filePath) {
  const ticketExists = readData.some((ticket) => {
    return ticket.ticketId === id;
  });

  if (ticketExists === false) {
    console.log("Wrong Id");
    return;
  }

  const newData = readData.filter((ticket) => {
    return ticket.ticketId !== id;
  });

  await fsPromises.writeFile(filePath, JSON.stringify(newData, null, 2));
}

// FILTER
function filter(readData, filterType, filterValue) {
  const filterV = ["priority", "category", "status"];

  if (!filterV.includes(filterType)) {
    console.log("Unknown Command");
    return;
  }

  if (filterType === "status") {
    const filterDO = readData.filter((ticket) => {
      return ticket.ticketStatus === filterValue;
    });

    if (filterDO.length === 0) {
      console.log("No tickets found");
      return;
    }

    console.log(filterDO);
  }

  if (filterType === "priority") {
    const filterPriority = readData.filter((ticket) => {
      return ticket.ticketPriority === filterValue;
    });

    if (filterPriority.length === 0) {
      console.log("No such priority");
      return;
    }

    console.log(filterPriority);
  }

  if (filterType === "category") {
    const filterCategory = readData.filter((ticket) => {
      return ticket.ticketCategory === filterValue;
    });

    if (filterCategory.length === 0) {
      console.log("No such category");
      return;
    }

    console.log(filterCategory);
  }
}

// ADD
async function addTicket(readData, title, category, priority, filePath) {
  if (!title || !category || !priority) {
    console.log("Missing information");
    return;
  }

  const priorityCheck = ["High", "Medium", "Low"];

  if (!priorityCheck.includes(priority)) {
    console.log("Wrong Priority");
    return;
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
}

// UPDATE
async function updateTicket(readData, id, status, filePath) {
  const validStatuses = ["Open", "In-Progress", "Closed"];

  if (!validStatuses.includes(status)) {
    console.log("Wrong status");
    return;
  }

  const ticket = readData.find((ticket) => {
    return ticket.ticketId === id;
  });

  if (!ticket) {
    console.log("Wrong ID");
    return;
  }

  ticket.ticketStatus = status;

  await fsPromises.writeFile(filePath, JSON.stringify(readData, null, 2));

  console.log("Ticket updated");
}

module.exports = {
  search,
  list,
  deleteTicket,
  filter,
  addTicket,
  updateTicket,
};
