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
      alert('Projects saved successfully!');
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('An error occurred while saving projects.');
    }
  }

  

  function initializeProjects() {
    setProjectsRowOne([
      { id: 1, name: 'Task 1', initials: '', bgColor: 'bg-green-500' },
      { id: 2, name: 'Task 2', initials: '', bgColor: 'bg-green-500' },
      { id: 3, name: 'Task 3', initials: '', bgColor: 'bg-green-500' },
      { id: 4, name: 'Task 4', initials: '+', bgColor: 'bg-green-500' },
    ]);
    setProjectsRowTwo([
      { id: 5, name: 'Task 1', initials: '', bgColor: 'bg-orange-500' },
      { id: 6, name: 'Task 2', initials: '', bgColor: 'bg-orange-500' },
      { id: 7, name: 'Task 3', initials: '', bgColor: 'bg-orange-500' },
      { id: 8, name: 'Task 4', initials: '+', bgColor: 'bg-orange-500' },
    ]);
    setProjectsRowThree([
      { id: 9, name: 'Task 1', initials: '', bgColor: 'bg-red-500' },
      { id: 10, name: 'Task 2', initials: '', bgColor: 'bg-red-500' },
      { id: 11, name: 'Task 3', initials: '', bgColor: 'bg-red-500' },
      { id: 12, name: 'Task 4', initials: '+', bgColor: 'bg-red-500' },
    ]);
  }
  function updateProjectInRow(setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>, updatedProject: ProjectItem) {
    setProjects(prevProjects => prevProjects.map(proj => proj.id === updatedProject.id ? updatedProject : proj));
  }

  return (
    <div className="overflow-hidden">
      <img src="/assets/header.png" alt="Header" className="w-full h-64 mx-auto" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 ml-8">
        <ProjectRow title={urgentTitle} setTitle={setUrgentTitle} projects={projectsRowOne} setProjects={(updatedProjects) => setProjectsRowOne(updatedProjects)} />
        <ProjectRow title={importantTitle} setTitle={setImportantTitle} projects={projectsRowTwo} setProjects={(updatedProjects) => setProjectsRowTwo(updatedProjects)} />
        <ProjectRow title={otherTitle} setTitle={setOtherTitle} projects={projectsRowThree} setProjects={(updatedProjects) => setProjectsRowThree(updatedProjects)} />
      </div>
      <div className="flex justify-center mt-5 mb-5">
        <button type="button" onClick={saveProjects} className="rounded-md bg-green-600 px-4 py-2.5 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
        <div className="block w-96 rounded-md border py-1.5 pl-2 pr-8 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          https://todo-snowy-tau.vercel.app/{uniqueProjectName}
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ project, onUpdateProject }: { project: ProjectItem; onUpdateProject: (project: ProjectItem) => void }) {
  const [name, setName] = useState(project.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    if (name !== project.name) {
      onUpdateProject({ ...project, name });
    }
  };

  return (
    <div className="flex rounded-md shadow-sm">
      <div className={classNames(project.bgColor, 'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white')}>
        {project.initials}
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <input type="text" value={name} onChange={handleNameChange} onBlur={handleBlur} className="flex-1 truncate px-4 py-2 text-sm mt-1 mb-1 ml-2 border-none rounded-md focus:ring-2 focus:ring-indigo-500" autoFocus />
        <div className="flex-shrink-0 pr-2">
          <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ title, setTitle, projects, setProjects }: { title: string; setTitle: React.Dispatch<React.SetStateAction<string>>; projects: ProjectItem[]; setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>> }) {
  return (
    <div className="col-span-1">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="text-xl font-bold text-gray-800 bg-gray-100 mt-4 mb-4 text-center" />
      <div className="flex flex-col sm:gap-2 mr-5 ml-5">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} onUpdateProject={(updatedProject) => setProjects(prevProjects => prevProjects.map(proj => proj.id === updatedProject.id ? updatedProject : proj))} />
        ))}
      </div>
    </div>
  );
}
