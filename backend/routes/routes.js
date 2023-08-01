import express from 'express'
import user from '../controllers/user.js'
import project from '../controllers/project.js'
import task from '../controllers/task.js';

const router = express.Router()

//==========================
// User Endpoints
//==========================
router.get('/user', (req, res) => {
    user.get(req, res);
})

router.post('/user', (req, res) => {
    user.post(req, res);
})

//==========================
// Project Endpoints
//==========================
router.get('/project', (req, res) => {
    project.get(req, res);
})

router.get('/project/:user_id', (req, res) => {
    project.get(req, res);
})

router.post('/project', (req, res) => {
    project.post(req, res);
})

router.patch('/project/:id', (req, res) => {
    project.patch(req, res);
})

router.delete('/project/:id', (req, res) => {
    project.delete(req, res);
})

//==========================
// Task Endpoints
//==========================
router.get('/task/:project_id', (req, res) => {
    task.get(req, res);
})

router.post('/task', (req, res) => {
    task.post(req, res);
})

router.patch('/task/:id', (req, res) => {
    task.patch(req, res);
})

router.delete('/task/:id', (req, res) => {
    task.delete(req, res);
})

export default router