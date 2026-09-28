import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import API from '../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <TaskForm fetchTasks={fetchTasks} />
                        <h4 className="mb-3">My Tasks</h4>
                        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
