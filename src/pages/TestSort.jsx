import React, { useState } from "react";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");
    const [sortType, setSortType] = useState("task"); // Sorting type state

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const addTask = () => {
        if (task.trim() === "" || deadline === "") {
            alert("Please enter a task and select a valid deadline.");
            return;
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("Please select a future date for the deadline.");
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            task,
            priority,
            deadline,
            done: false,
        };

        setTasks([...tasks, newTask]);

        setTask("");
        setPriority("top");
        setDeadline("");
    };

    const markDone = (id) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, done: true } : t
        );
        setTasks(updatedTasks);

        const completedTask = tasks.find((t) => t.id === id);
        if (completedTask) {
            setCompletedTasks([...completedTasks, completedTask]);
        }
    };

    // Sorting Logic
    const sortTasks = (tasksArray) => {
        const priorityOrder = { top: 1, middle: 2, low: 3 }; // Priority order
        return [...tasksArray].sort((a, b) => {
            if (sortType === "task") return a.task.localeCompare(b.task);
            if (sortType === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
            if (sortType === "deadline") return new Date(a.deadline) - new Date(b.deadline);
            return 0;
        });
    };

    const upcomingTasks = sortTasks(tasks.filter((t) => !t.done));
    const sortedCompletedTasks = sortTasks(completedTasks);

    return (
        <div className="App">
            <header>
                <h1>Task Scheduler</h1>
            </header>
            <main>
                <div className="task-form">
                    <input
                        type="text"
                        id="task"
                        placeholder="Enter task..."
                        value={task}
                        onChange={handleTaskChange}
                    />
                    <select
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <option value="top">Top Priority</option>
                        <option value="middle">Middle Priority</option>
                        <option value="low">Less Priority</option>
                    </select>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={handleDeadlineChange}
                    />
                    <button id="add-task" onClick={addTask}>
                        Add Task
                    </button>
                </div>

                <div className="sort-options">
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        id="sort"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="task">Task Name</option>
                        <option value="priority">Priority</option>
                        <option value="deadline">Deadline</option>
                    </select>
                </div>

                <h2 className="heading">Upcoming Tasks</h2>
                <div className="task-list" id="task-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingTasks.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.task}</td>
                                    <td>{t.priority}</td>
                                    <td>{t.deadline}</td>
                                    <td>
                                        {!t.done && (
                                            <button
                                                className="mark-done"
                                                onClick={() => markDone(t.id)}
                                            >
                                                Mark Done
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="completed-task-list">
                    <h2 className="cheading">Completed Tasks</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCompletedTasks.map((ct) => (
                                <tr key={ct.id}>
                                    <td>{ct.task}</td>
                                    <td>{ct.priority}</td>
                                    <td>{ct.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default TaskManager;
