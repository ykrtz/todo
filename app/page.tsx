'use client' // 👈 use it here
import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

// Define separate arrays for each row of projects
const projectsRowOne = [
  { name: 'Task 1', initials: '', bgColor: 'bg-green-500' },
  { name: 'Task 2', initials: '', bgColor: 'bg-green-500' },
  { name: 'Task 3', initials: '', bgColor: 'bg-green-500' },
  { name: 'Task 4', initials: '+', href: '#', members: 12, bgColor: 'bg-green-500' },
];

const projectsRowTwo = [
  { name: 'Task 1', initials: '', bgColor: 'bg-orange-500' },
  { name: 'Task 2', initials: '', bgColor: 'bg-orange-500' },
  { name: 'Task 3', initials: '', bgColor: 'bg-orange-500' },
  { name: 'Task 4', initials: '+', href: '#', members: 12, bgColor: 'bg-orange-500' },
];

const projectsRowThree = [
  { name: 'Task 1', initials: '', bgColor: 'bg-red-500' },
  { name: 'Task 2', initials: '', bgColor: 'bg-red-500' },
  { name: 'Task 3', initials: '', bgColor: 'bg-red-500' },
  { name: 'Task 4', initials: '+', href: '#', members: 12, bgColor: 'bg-red-500' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [urgentTitle, setUrgentTitle] = useState('Urgent');
  const [importantTitle, setImportantTitle] = useState('Important');
  const [otherTitle, setOtherTitle] = useState('Other');

  return (
    <div className="overflow-hidden">
      <img
        src="/assets/header.png"
        alt="Header"
        className="w-full h-64 mx-auto"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 ml-8">
        <div className="col-span-1">
          <input
            type="text"
            value={urgentTitle}
            onChange={(e) => setUrgentTitle(e.target.value)}
            className="text-xl font-bold text-gray-800 bg-gray-100 mt-4 mb-4 text-center"
          />
          <div className="flex flex-col sm:gap-2 mr-5 ml-5">
            {projectsRowOne.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            value={importantTitle}
            onChange={(e) => setImportantTitle(e.target.value)}
            className="text-xl font-bold text-gray-800 bg-gray-100 mt-4 mb-4 text-center"
          />
          <div className="flex flex-col sm:gap-2 mr-5 ml-5">
              {projectsRowTwo.map((project) => (
                <ProjectItem key={project.name} project={project} />
              ))}
            </div>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            value={otherTitle}
            onChange={(e) => setOtherTitle(e.target.value)}
            className="text-xl font-bold text-gray-800 bg-gray-100 mt-4 mb-4 text-center"
          />
          <div className="flex flex-col sm:gap-2 mr-5 ml-5">
              {projectsRowThree.map((project) => (
                <ProjectItem key={project.name} project={project} />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5 mb-5">
  <button
    type="button"
    className="rounded-md bg-green-600 px-4 py-2.5 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Save
  </button>
  <div className="block w-96 rounded-md border py-1.5 pl-2 pr-8 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
  https://todo-snowy-tau.vercel.app/546gdfgd4f
</div>

</div>




    </div>
    
  );
}

// Extract project item into a separate component for better readability
function ProjectItem({ project }: { project: any }) {
  return (
    <div className="flex rounded-md shadow-sm">
      <div
        className={classNames(
          project.bgColor,
          'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
        )}
      >
        {project.initials}
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm mt-1 mb-1 ml-2">
          <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
            {project.name}
          </a>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
