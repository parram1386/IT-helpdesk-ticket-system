const http = require("http");
const path = require("path");
const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 3500;

const server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);
  try {
    if (req.url === "/") {
      res.writeHead(200, {
        "content-type": "text/plain",
      });
      res.end("Welcome to Helpdesk");
    } else if (req.url === "/tickets" && req.method === "GET") {
      const fileContent = await fsPromises.readFile(
        path.join(__dirname, "tickets.json"),
        "utf8",
      );
      const tickets = JSON.parse(fileContent);
      res.writeHead(200, {
        "content-type": "application/json",
      });

      res.end(JSON.stringify(tickets, null, 2));
    }

    //tickets POST METHOD
    else if (req.url === "/tickets" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          const newTicket = JSON.parse(body);
          const requiredFields = [
            "ticketTitle",
            "ticketCategory",
            "ticketPriority",
            "ticketStatus",
          ];
          const isValid = requiredFields.every((item) => {
            return (
              Object.hasOwn(newTicket, item) &&
              typeof newTicket[item] === "string" &&
              newTicket[item].trim() !== ""
            );
          });
          if (isValid === false) {
            res.writeHead(400);
            return res.end("Required ticket fields are missing or empty");
          }
          newTicket.ticketId = uuid();
          newTicket.createdAt = new Date().toISOString();
          const fileContent = await fsPromises.readFile(
            path.join(__dirname, "tickets.json"),
            "utf8",
          );
          const tickets = JSON.parse(fileContent);
          tickets.push(newTicket);
          await fsPromises.writeFile(
            path.join(__dirname, "tickets.json"),
            JSON.stringify(tickets, null, 2),
          );

          console.log(newTicket);

          res.writeHead(200, {
            "content-type": "application/json",
          });

          res.end(
            JSON.stringify({
              message: "Ticket received successfully",
              ticket: newTicket,
            }),
          );
        } catch (err) {
          res.writeHead(400, {
            "content-type": "application/json",
          });

          res.end(
            JSON.stringify({
              error: "Invalid JSON",
            }),
          );
        }
      });
    } else {
      res.writeHead(404, {
        "content-type": "text/plain",
      });
      res.end("Page not found");
    }
  } catch (err) {
    console.error(err);

    res.writeHead(500, {
      "content-type": "text/plain",
    });

    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log("Server running on port 3500");
});
