'use client';
import { useState, useEffect } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

interface ProjectItem {
  id: number;
  name: string;
  initials?: string;
  bgColor: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [notification, setNotification] = useState({ message: '', show: false });

  const showNotification = (message: string): void => {
    setNotification({ message, show: true });
    setTimeout(() => setNotification({ message: '', show: false }), 3000); // Hide after 3 seconds
  };
  const [urgentTitle, setUrgentTitle] = useState('Urgent');
  const [importantTitle, setImportantTitle] = useState('Important');
  const [otherTitle, setOtherTitle] = useState('Other');
  const [uniqueProjectName, setUniqueProjectName] = useState('');
  const [projectsRowOne, setProjectsRowOne] = useState<ProjectItem[]>([]);
  const [projectsRowTwo, setProjectsRowTwo] = useState<ProjectItem[]>([]);
  const [projectsRowThree, setProjectsRowThree] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const URLidentifier = window.location.pathname.split('/').pop();
    if (URLidentifier && URLidentifier !== "") {
      fetchProject(URLidentifier);
      setUniqueProjectName(URLidentifier);
    } else {
      const name = `${Math.random().toString(36).substr(2, 9)}`;
      setUniqueProjectName(name);
      window.history.replaceState({}, '', `/${name}`);
      initializeProjects();
    }
  }, []);

  async function fetchProject(URLidentifier: string) {
    try {
      const response = await fetch(`/api/data?projectName=${URLidentifier}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const projectData = await response.json();
      setProjectsRowOne(projectData.urgent || []);
      setProjectsRowTwo(projectData.important || []);
      setProjectsRowThree(projectData.other || []);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  async function saveProjects() {
    const projectData = {
      projectName: uniqueProjectName,
      urgent: projectsRowOne,
      important: projectsRowTwo,
      other: projectsRowThree,
    };

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error('Failed to save projects');
      showNotification('Projects saved successfully!');
    } catch (error) {
      console.error('Error saving projects:', error);
      showNotification('An error occurred while saving projects.');
    }
  }



  function initializeProjects() {
    setProjectsRowOne([
      { id: 1, name: 'Task 1', initials: '+', bgColor: 'bg-green-500' },
      { id: 2, name: 'Task 2', initials: '+', bgColor: 'bg-green-500' },
      { id: 3, name: 'Task 3', initials: '+', bgColor: 'bg-green-500' },
      { id: 4, name: 'Task 4', initials: '+', bgColor: 'bg-green-500' },
    ]);
    setProjectsRowTwo([
      { id: 5, name: 'Task 1', initials: '+', bgColor: 'bg-orange-500' },
      { id: 6, name: 'Task 2', initials: '+', bgColor: 'bg-orange-500' },
      { id: 7, name: 'Task 3', initials: '+', bgColor: 'bg-orange-500' },
      { id: 8, name: 'Task 4', initials: '+', bgColor: 'bg-orange-500' },
    ]);
    setProjectsRowThree([
      { id: 9, name: 'Task 1', initials: '+', bgColor: 'bg-red-500' },
      { id: 10, name: 'Task 2', initials: '+', bgColor: 'bg-red-500' },
      { id: 11, name: 'Task 3', initials: '+', bgColor: 'bg-red-500' },
      { id: 12, name: 'Task 4', initials: '+', bgColor: 'bg-red-500' },
    ]);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`https://todo-snowy-tau.vercel.app/${uniqueProjectName}`);
    showNotification('URL copied to clipboard!');
    }

  return (
    <div className="overflow-hidden">
      <img src="/assets/header.png" alt="Header" className="w-full h-64 mx-auto" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 ml-8">
        <ProjectRow title={urgentTitle} projects={projectsRowOne} setProjects={(updatedProjects) => setProjectsRowOne(updatedProjects)} bgColor="bg-green-500" />
        <ProjectRow title={importantTitle} projects={projectsRowTwo} setProjects={(updatedProjects) => setProjectsRowTwo(updatedProjects)} bgColor="bg-orange-500" />
        <ProjectRow title={otherTitle}  projects={projectsRowThree} setProjects={(updatedProjects) => setProjectsRowThree(updatedProjects)} bgColor="bg-red-500" />
      </div>
      <div className="flex justify-center mt-5 mb-5">
        <button type="button" onClick={saveProjects} className="rounded-md bg-green-600 px-4 py-2.5 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
        <div className="mx-2 block w-96 rounded-md border py-1.5 pl-2 pr-8 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          https://todo-snowy-tau.vercel.app/{uniqueProjectName}
        </div>
          <button type="button" onClick={copyToClipboard} className="rounded-md bg-yellow-500 px-4 py-2.5 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Copy
        </button>
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        {notification.show && (
          <div className="bg-blue-500 text-white p-2 rounded">
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
function ProjectItem({ project, onUpdateProject, onAddProject, onDeleteProject }: { project: ProjectItem; onUpdateProject: (project: ProjectItem) => void; onAddProject: (id: number) => void; onDeleteProject: (id: number) => void }) {
  const [name, setName] = useState(project.name);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    if (name !== project.name) {
      onUpdateProject({ ...project, name });
    }
  };

  const handleClickAdd = () => {
    if (project.initials === '+') {
      onAddProject(project.id);
    }
  }

  const handleClickDelete = () => {
    onDeleteProject(project.id);
  };

  return (
    <div className="flex rounded-md shadow-sm">
      <div className={classNames(project.bgColor , 'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white')} onClick={handleClickAdd}>
        <button >
          +
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-none border-b border-r border-t border-gray-200 bg-white">
        <input type="text" value={name} onChange={handleNameChange} onBlur={handleBlur} className="flex-1 truncate px-4 py-2 text-sm border-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className={classNames(project.bgColor, 'flex w-16 flex-shrink-0 items-center justify-center rounded-r-md text-sm font-medium text-white')} onClick={handleClickDelete}>
        <button>
          -
        </button>
      </div>
    </div>
  );

}
function ProjectRow({ title, projects, setProjects, bgColor }: { title: string; projects: ProjectItem[]; setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>; bgColor: string }) {

  const addProject = (afterId: number) => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1; // Ensure unique ID, starts from 1 if empty
    const newProject = {
      id: newId,
      name: 'New',
      initials: '+',
      bgColor: bgColor,
    };

    const index = projects.findIndex(p => p.id === afterId);
    const updatedProjects = [...projects];
    if (index !== -1) {
      updatedProjects.splice(index + 1, 0, newProject);
    } else {
      updatedProjects.push(newProject);
    }

    setProjects(updatedProjects);
  };
  const deleteProject = (projectId: number) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  return (
    <div className="col-span-1">
      <div className="text-xl font-bold text-gray-800 bg-gray-100 mt-4 mb-4 text-center">{title}</div>
      <div className="flex flex-col font-bold sm:gap-2 mr-5 ml-5">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} onUpdateProject={(updatedProject) => setProjects(prevProjects => prevProjects.map(proj => proj.id === updatedProject.id ? updatedProject : proj))} onAddProject={() => addProject(project.id)} onDeleteProject={deleteProject} />
          ))}
      </div>
    </div>
  );
}
