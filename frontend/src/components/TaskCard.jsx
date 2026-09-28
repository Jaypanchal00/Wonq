import React, { useState } from 'react';
import API from '../services/api';

const TaskCard = ({ task, fetchTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // Edit Form State
    const [title, setTitle] = useState(task.title);

    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await API.delete(`/tasks/${task._id}`);
                fetchTasks();
            } catch (error) {
                alert('Failed to delete task');
            }
        }
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/tasks/${task._id}`, { title, status, dueDate });
            setIsEditing(false);
            fetchTasks();
        } catch (error) {
            alert('Failed to update task');
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            await API.put(`/tasks/${task._id}`, { ...task, status: newStatus });
            fetchTasks();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (isEditing) {
        return (
            <div className="card mb-3 shadow-sm border-primary">
                <div className="card-body">
                    <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <select className="form-select mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input type="date" className="form-control mb-3" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    
                    <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{task.title}</h5>
                    <select 
                        className={`form-select form-select-sm w-auto ${status === 'Completed' ? 'bg-success text-white' : ''}`} 
                        value={task.status} 
                        onChange={handleStatusChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {task.dueDate && (
                    <small className="text-danger d-block mb-3">Due: {new Date(task.dueDate).toDateString()}</small>
                )}
                
                <div>
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
