// Importing morgan and express
import morgan from "morgan";
import express, {Express} from "express";
import routes from "./api/v1/routes/routes";

const app : Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined")); // log requests first.
app.use(express.json()); //then parse JSON

// routes 
app.use( "/api/v1",routes);  // then load routes

// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

// employee Endpoints route
app.use("/api/v1/employees", routes)

// branches endpoints route
app.use("/api/v1/branches", routes);

export default app;
