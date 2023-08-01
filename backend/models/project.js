import { Double } from 'bson'
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
    status: {
        required: true,
        type: String
    },
    task_number: {
        require: false,
        type: Number
    },
    task_complete: {
        require: false,
        type: Number
    },
    total_cost: {
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
})

export default mongoose.model('projects', dataSchema)