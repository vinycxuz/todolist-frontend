import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Tasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('secretToken');
      const response = await axios.post('https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/create', 
        { title, description, status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      navigate('/tasks');
    } catch (error) {
      console.error('There was an error creating the task!', error);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div className="flex flex-row gap-3 pb-4">
        <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Crie sua Tarefa</h1>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label className="block mb-2 text-base font-medium text-[#111827]">Title</label>
          <div className="relative text-gray-400">
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" 
              placeholder="Your Title" 
              autoComplete="off" 
            />
          </div>
        </div>
        <div className="pb-2">
          <label className="block mb-2 text-base font-medium text-[#111827]">Description</label>
          <div className="relative text-gray-400">
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" 
              placeholder="Your Description" 
              autoComplete="off" 
            />
          </div>
        </div>
        <div className="pb-6">
          <label className="block mb-2 text-base font-medium text-[#111827]">Status</label>
          <div className="relative text-gray-400">
            <input 
              type="checkbox" 
              checked={status} 
              onChange={() => setStatus(!status)} 
              className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block p-2.5 rounded-l-lg py-3 px-4" 
            />
          </div>
        </div>
        <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Create Task</button>
      </form>
    </div>
  );
};

export default Tasks;