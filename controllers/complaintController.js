const express = require('express')
const Complaint = require('../models/Complaint.js')


const addComplaint = async (req, res) => {
    try {
        const { studentName, email, title, description, category, priority, location, status } = req.body

        if (!studentName || !email || !title || !description) {
            return res.status(404).json({ message: "all field must be required" })
        }

        if (category <= 0) {
            return res.status(404).json({ message: "category must be more than 0" })
        }

        const complaint = new Complaint({ ...req.body })

        await complaint.save()

        res.status(200).json({ message: "Data saved successfully", complaint })
    } catch (error) {
        return res.status(500)
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params

        const existComplaint = await Complaint.findById(id)

        if (!existComplaint) {
            return res.status(404).json({ message: "complaint does not exist" })
        }

        res.status(200).json({
            success: true, data: existComplaint
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getAll = async(req,res)=>{
    try {
        const allComplaints = await Complaint.find()

        if(!allComplaints){
            return res.status(404).json({message : "data not found"})
        }

        res.status(200).json({data:allComplaints})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params

        const updateComplaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true })

        if (!updateComplaint) {
            return res.status(404).json({ message: "complaint not found", success: false })
        }

        res.status(200).json({ message: 'Complaint updated successfully', success: true, data: updateComplaint })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const validStatus = ["Open", "In Progress", "Resolved", "Rejected"]

        if (!status || !validStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status" })
        }

        const complaint = await Complaint.findById(id)

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        complaint.status = status
        await complaint.save()

        res.status(200).json({ success: true, message: 'Complaint status updated successfully', data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const deleteComplaint = async(req,res)=>{
    try {
        const {id} = req.params

        const deleteComplaint = await Complaint.findByIdAndDelete(id)

        if(!deleteComplaint){
      return res.status(404).json({message : "complaint not found"})
    }

    res.status(200).json({message:"Complaint deleted successfully",data:{}})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {addComplaint,getById,getAll,updateComplaint,updateStatus,deleteComplaint}