const model = require('../models/models');
const mongoose = require('mongoose');
exports.getworkouts = async (req, res) => {
    const workout = await model.find({}).sort({ createdAt: -1 })

    if (!workout) {
        return res.status(400).json({ error: 'no entries' })
    }
    res.status(200).json(workout)
}
exports.getworkout = async (req ,res) => {
    const {id} = req.params
    if (!id || id.trim() === "") {
        return res.status(400).json({ error: "Workout ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID format" });
    }
    const workout = await model.findById(id)
    if(!workout)
        return res.status(404).json({error:"no such workout"})
    res.status(200).json(workout)
}

exports.createworkout = async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyfields =[];
    if (!title) {
        emptyfields.push('title')
    }else if (!load) {
       emptyfields.push('load')  
    }else if(!reps){
     emptyfields.push('reps')
    }
    if(emptyfields.length >0){
        return res.status(400).json({error:' please fill out all the fields' , emptyfields})
    }
    try {
        const workout = await model.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
exports.deleteworkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await model.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
exports.patchworkouts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    try {
     
        const workout = await model.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true } 
        );

        if (!workout) {
            return res.status(404).json({ error: "No such workout" });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}