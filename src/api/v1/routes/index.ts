import {Router} from "express";

const router = Router();

router.get("/api/v1/items", (req, res) => {
    res.send("Get all items");
});

router.post("/api/v1/items", (req, res) => {
    res.send("Create a new item");
});

router.put("/api/v1/items/:id", (req, res) => {
    res.send("Update an item");
});

router.delete("/api/v1/items/:id", (req, res) => {
    res.send("Delete an item");
});

export default router;