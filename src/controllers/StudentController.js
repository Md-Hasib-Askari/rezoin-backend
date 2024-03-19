const studentModel = require('../models/StudentModel');

// Create
exports.register = async (req, res) => {
    req.body['dateOfBirth'] = new Date(req.body['dateOfBirth']);
    req.body['admissionDate'] = new Date(req.body['admissionDate']);
    console.log(req.body)
    const student = new studentModel(req.body);
    try {
        await student.save();
        res.status(201).json({ status:"success",data: student });
    } catch (err) {
        res.status(400).json({ status:"fail", data:err.message });
    }
}

// Read
exports.getStudents = async (req,res) => {
    try {
        const data = await studentModel.find();
        res.status(200).json({ status:"success", data:data })
    } catch (err) {
        res.status(400).json({ status:"fail", data:err.message })
    }
}

exports.getStudentByID = async (req,res) => {
    const id = req.params.id;
    const query = { _id:id };
    try {
        const data = await studentModel.find(query);
        res.status(200).json({ status:"success", data:data })
    } catch (err) {
        res.status(400).json({ status:"fail", data:err.message })
    }
}

// Update
exports.updateStudent = async (req,res) => {
    const id = req.params.id;
    const query = { _id:id };
    const reqBody = req.body;
    try {
        const data = await studentModel.updateOne(query,reqBody);
        res.status(200).json({ status:"success", data:data });
    } catch (err) {
        res.status(400).json({ status:"fail", data:err.message });
    }
}


// Delete
exports.deleteStudent = async (req,res) => {
    let id= req.params.id;
    let query = { _id:id };
    try {
        let data = await studentModel.deleteOne(query);
        res.status(200).json({ status:"success",data:data })
    } catch (err) {
        res.status(400).json({ status:"fail", data:err });
    }
}
