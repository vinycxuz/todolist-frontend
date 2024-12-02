import { useState, useEffect } from 'react';
import axios from 'axios';

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('secretToken');
        const response = await axios.get('https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('There was an error fetching the tasks!', error);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('secretToken');
      const updatedDate = new Date();
      const response = await axios.put(`https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/update/${taskId}`, 
        { status: newStatus, updated_date: updatedDate }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus, updated_date: updatedDate } : task));
      console.log(response.data);
    } catch (error) {
      console.error('There was an error updating the task status!', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('secretToken');
      await axios.delete(`https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  return (
    <div className="overflow-hidden shadow-md rounded-lg flex flex-col justify-center items-center h-[50vh]">
      <h1 className="font-semibold">Todo List</h1>
      <table className="w-full text-left">
        <thead className="bg-[#557ac5] text-[#fafcff]">
          <tr>
            <th className="py-0 text-center font-bold p-4">Title</th>
            <th className="py-0 text-center font-bold p-4">Description</th>
            <th className="py-0 text-center font-bold p-4">Status</th>
            <th className="py-0 text-center font-bold p-4">Created On</th>
            <th className="py-0 text-center font-bold p-4">Updated On</th>
            <th className="py-0 text-center font-bold p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-500">
          {tasks.map(task => (
            <tr key={task._id} className="py-7">
              <td className="py-7 text-center p-4">{task.title}</td>
              <td className="py-7 text-center p-4">{task.description}</td>
              <td className="py-7 text-center p-4">{task.status ? 'Completed' : 'Pending'}</td>
              <td className="py-7 text-center p-4">{new Date(task.creation_date).toLocaleString()}</td>
              <td className="py-7 text-center p-4">{new Date(task.updated_date).toLocaleString()}</td>
              <td className="py-7 text-center p-4">
                {task.status === false && (
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={() => handleStatusChange(task._id, true)}
                  >
                    Mark as Completed
                  </button>
                )}
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2" 
                  onClick={() => handleDelete(task._id)}
                >
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTasks;

