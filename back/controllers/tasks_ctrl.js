
const pool = require("../connection/sqlConnection");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs').promises;


exports.readTasks = async (req, res, next) => {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks');
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ tasks: tasks });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.readOneTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ tasks: tasks[0] });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.createTask = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateTask = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({ err });
    }
};