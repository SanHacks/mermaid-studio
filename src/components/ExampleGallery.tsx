import React from 'react';
import { Layout, GitBranch, Table, Activity, PieChart, Users, FileText, Share2, Calendar, List } from 'lucide-react';

interface Example {
    id: string;
    name: string;
    icon: React.ReactNode;
    code: string;
}

const EXAMPLES: Example[] = [
    {
        id: 'flowchart',
        name: 'Flowchart',
        icon: <Layout className="w-4 h-4" />,
        code: `graph TD
    Start --> Stop`,
    },
    {
        id: 'sequence',
        name: 'Sequence',
        icon: <Users className="w-4 h-4" />,
        code: `sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!`,
    },
    {
        id: 'gantt',
        name: 'Gantt Chart',
        icon: <Calendar className="w-4 h-4" />,
        code: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2024-01-01, 30d
    Another task     :after a1, 20d`,
    },
    {
        id: 'class',
        name: 'Class Diagram',
        icon: <Table className="w-4 h-4" />,
        code: `classDiagram
    Animal <|-- Duck
    Animal : +int age
    Animal : +String gender
    class Duck{
        +String beakColor
        +swim()
    }`,
    },
    {
        id: 'state',
        name: 'State Diagram',
        icon: <Activity className="w-4 h-4" />,
        code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
    },
    {
        id: 'pie',
        name: 'Pie Chart',
        icon: <PieChart className="w-4 h-4" />,
        code: `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`,
    },
    {
        id: 'er',
        name: 'ER Diagram',
        icon: <Share2 className="w-4 h-4" />,
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains`,
    },
    {
        id: 'user-journey',
        name: 'User Journey',
        icon: <Activity className="w-4 h-4" />,
        code: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go to upstairs: 3: Me
    section Work
      Tea break: 1: Me`,
    },
    {
        id: 'requirement',
        name: 'Requirement',
        icon: <FileText className="w-4 h-4" />,
        code: `requirementDiagram
    requirement test_req {
    id: 1
    text: the test text.
    severity: requirement
    verifymethod: test
    }`,
    },
    {
        id: 'git-graph',
        name: 'Git Graph',
        icon: <GitBranch className="w-4 h-4" />,
        code: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`,
    },
];

interface ExampleGalleryProps {
    onSelect: (code: string) => void;
}

const ExampleGallery: React.FC<ExampleGalleryProps> = ({ onSelect }) => {
    return (
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Templates</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {EXAMPLES.map((example) => (
                    <button
                        key={example.id}
                        onClick={() => onSelect(example.code)}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/60 hover:border-blue-500/50 transition-all group active:scale-95"
                    >
                        <div className="mb-2 text-slate-400 group-hover:text-blue-400 transition-colors">
                            {example.icon}
                        </div>
                        <span className="text-[10px] font-medium text-slate-300 text-center">
                            {example.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExampleGallery;
