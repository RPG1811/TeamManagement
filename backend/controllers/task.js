import url from 'url';
import taskModel from '../models/task.js';

export default {
    get: async (req, res) => {
        try{
            const id = req.params.project_id;
            const tasks = await taskModel.find( { project_id: id });
            res.json(tasks);
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    post: async (req, res) => {
        const tempStart = new Date(req.body.start_date);
        const tempEnd = new Date(req.body.end_date);
    
        const data = new taskModel({
            name: req.body.name,
            description: req.body.description,
            created_by: req.body.created_by,
            status: req.body.status,
            assigned_to: req.body.assigned_to,
            pay_rate: req.body.pay_rate,
            post_hours: 0,
            start_date: tempStart,
            end_date: tempEnd,
            completed_date: null,
            project_id: req.body.project_id
        })
    
        try {
            const dataToSave = data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    patch: async (req, res) => {
        try {
            const id = req.params.id;
            const tempStart = new Date(req.body.start_date);
            const tempEnd = new Date(req.body.end_date);
            
            req.body.start_date = tempStart;
            req.body.end_date = tempEnd;

            const updatedData = req.body;
            const options = { new: true };
    
            const result = await taskModel.findByIdAndUpdate( id, updatedData, options );
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await taskModel.findByIdAndDelete(id)
            res.send(`Document with ${data.name} has been deleted..`)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
}