import url from 'url';
import bcrypt from 'bcrypt';
import userModel from '../models/user.js';

const salt = bcrypt.genSaltSync(10);

export default {
    get : async (req, res) => {
        const queryString = url.parse(req.url, true).query;
        
        try{
            if(queryString.email) {
                const user = await userModel.findOne( { email: queryString.email }) ;
                if (user && bcrypt.compareSync(queryString.password, user.password)) {
                    res.json(user);
                } else {
                    throw new Error('User not found.');
                }
            } else {
                const user = await userModel.find();
                res.json(user);
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    post : async (req, res) => {
        const hash = await bcrypt.hashSync(req.body.password, salt);

        const data = new userModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            position: req.body.position,
            email: req.body.email,
            password: hash,
            admin: false
        })

        try {
            const user = await userModel.find( { email: req.body.email });
            
            if (user.length > 0) {
                throw new Error('Email has been used.');
            } else {
                const dataToSave = data.save();
                res.status(200).json(dataToSave);
            }
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}