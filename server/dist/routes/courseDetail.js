"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Courses_1 = require("../mock/Courses");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const idParam = req.query.id;
    if (idParam) {
        const id = parseInt(idParam, 10);
        const result = Courses_1.COURSES.filter((item) => item.id == id)[0];
        res.json(result);
    }
});
exports.default = router;
