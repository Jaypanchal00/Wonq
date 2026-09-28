import React, { useState } from 'react';
import API from '../services/api';

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');

    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', { title, status, dueDate });
            setTitle('');
            setStatus('Pending');
            setDueDate('');
            fetchTasks(); // Refresh list after adding
        } catch (error) {
            alert('Failed to add task');
        }
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">+ Add New Task</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-2 mb-3">
                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Task Title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Due Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
