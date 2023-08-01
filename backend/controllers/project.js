import userModel from '../models/user.js';
import taskModel from '../models/task.js';
import projectModel from '../models/project.js'

export default {
    get: async (req, res) => {
        try {
            const user_id = req.params.user_id;

            if (user_id) {
                const user = await userModel.findOne({ _id: user_id });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const tasks = await taskModel.aggregate([
                    {
                        $match: {
                            'assigned_to.id': user_id,
                            'assigned_to.name': `${user.first_name} ${user.last_name}`
                        }
                    },
                    {
                        $group: {
                            _id: {
                                project_id: '$project_id',
                                user_id: '$assigned_to.id',
                                user_name: '$assigned_to.name'
                            }
                        }
                    }
                ]);

                const projectList = tasks.map(task => task._id.project_id);
                const data = await projectModel.find({ '_id': { $in: projectList } });

                res.json(data);
            } else {
                const data = await projectModel.find();
                res.json(data);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const { name, description, status } = req.body;

        if (!name || !description || !status) {
            return res.status(400).json({ message: 'Name, description, and status are required' });
        }

        const tempStart = new Date(req.body.start_date);
        const tempEnd = new Date(req.body.end_date);

        const data = new projectModel({
            name,
            description,
            status,
            task_number: 0,
            task_complete: 0,
            total_cost: 0,
            start_date: tempStart,
            end_date: tempEnd,
            completed_date: null
        });

        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        } catch (error) {
            res.status(400).json({ message: error.message });
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

            const project = await projectModel.findById(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const result = await projectModel.findByIdAndUpdate(id, updatedData, options);
            res.send(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const project = await projectModel.findById(id);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            await projectModel.findByIdAndDelete(id);
            res.send(`Document with ${project.name} has been deleted.`);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};