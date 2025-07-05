
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
    console.log("CTRL createTask");
    try {
        const { name, description, date, type, author_id } = req.body;

        const data = {
            id: uuidv4(),
            owner_id: req.auth.userId,
            name: name || null,
            description: description || null,
            date: date || null,
            type: type || null,
            author_id: author_id || null
        }


        const keys = Object.keys(data).filter((key) => data[key] !== null);
        const values = keys.map((key) => data[key]);
        const placeholder = keys.map(() => "?").join(", ");

        await pool.execute(`INSERT INTO tasks (${keys.join(", ")}) VALUES(${placeholder})`, values);

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { name, description, type } = req.body;

        const data = {
            name: name || null,
            description: description || null,
            type: type || null,
        }

        const keys = Object.keys(data).filter((key) => data[key] !== null);
        const values = Object.values((value) => value !== null);
        const placeholder = keys.map((key) => `${key} = ?`).join(", ");
        values.push(taskId);

        await pool.execute(`UPDATE tasks SET ${placeholder} WHERE ID = ?`, values);
        return res.status(200).json({ msg: "task updated" })

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        await pool.execute(`DELETE FROM tasks WHERE id = ?`, [taskId]);
        return res.status(200).json({ msg: "task deleted" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};