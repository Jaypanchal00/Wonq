import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, fetchTasks }) => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('Default');

    // Search and Filter
    let filteredTasks = tasks.filter((task) => {
        const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'All' ? true : task.status === filterStatus;
        return matchSearch && matchStatus;
    });

    // Sort
    if (sortBy === 'Status') {
        filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
    }

    return (
        <div>
            {/* Filters Section */}
            <div className="row g-2 mb-4">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search task by title..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">Filter by Status: All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="Default">Sort By: Default</option>
                        <option value="Status">Status / Situation</option>
                    </select>
                </div>
            </div>

            {/* Tasks List */}
            {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                    <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
                ))
            ) : (
                <div className="alert alert-info text-center">No tasks found</div>
            )}
        </div>
    );
};

export default TaskList;
