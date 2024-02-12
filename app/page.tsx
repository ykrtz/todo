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
  return (
    <div className="overflow-hidden">
      <img
        src="/assets/header.png"
        alt="Header"
        className="w-full h-64 mx-auto"
      />
  
      <h2 className="text-sm font-medium text-gray-500">Pinned Projects</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
        {/* Render projects for row one */}
        <div className="flex flex-col sm:gap-2">
          {projectsRowOne.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </div>
        
        <div className="flex flex-col sm:gap-2">
          {projectsRowTwo.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </div>
        <div className="flex flex-col sm:gap-2">
          {projectsRowThree.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
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
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
            {project.name}
          </a>
          <p className="text-gray-500">{project.members} Members</p>
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
