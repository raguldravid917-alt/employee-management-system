const express = require('express');
const cors = require('cors');
const db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
// Uploaded images-ஐ Frontend-ல் பார்க்க இந்த line முக்கியம்
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// 1. GET ALL EMPLOYEES
app.get('/api/employees', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET SINGLE EMPLOYEE
app.get('/api/employees/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. CREATE NEW EMPLOYEE (With Image)
app.post('/api/employees', upload.single('image'), async (req, res) => {
    const { name, empId, department, designation, project, type, status } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const sql = 'INSERT INTO employees (name, empId, department, designation, project, type, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(sql,[name, empId, department, designation, project, type, status, imagePath]);
        res.status(201).json({ id: result.insertId, message: 'Employee added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. UPDATE EMPLOYEE (With Image)
app.put('/api/employees/:id', upload.single('image'), async (req, res) => {
    const { name, empId, department, designation, project, type, status } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        let sql, params;
        if (imagePath) {
            sql = 'UPDATE employees SET name=?, empId=?, department=?, designation=?, project=?, type=?, status=?, image=? WHERE id=?';
            params =[name, empId, department, designation, project, type, status, imagePath, req.params.id];
        } else {
            // If no new image is uploaded, update only text fields
            sql = 'UPDATE employees SET name=?, empId=?, department=?, designation=?, project=?, type=?, status=? WHERE id=?';
            params =[name, empId, department, designation, project, type, status, req.params.id];
        }
        await db.query(sql, params);
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. DELETE EMPLOYEE
app.delete('/api/employees/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM employees WHERE id = ?',[req.params.id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));