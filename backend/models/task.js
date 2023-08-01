import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    created_by: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    assigned_to: {
        require: true,
        type: Map
    },
    pay_rate: {
        require: true,
        type: Number
    },
    post_hours: {
        require: false,
        type: Number
    },
    start_date: {
        require: true,
        type: Date
    },
    end_date: {
        require: true,
        type: Date
    },
    completed_date: {
        require: false,
        type: Date
    },
    project_id: {
        required: true,
        type: String
    }
})

export default mongoose.model('tasks', dataSchema)