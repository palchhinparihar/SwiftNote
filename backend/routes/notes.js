import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("from notes router");
});

export default router;