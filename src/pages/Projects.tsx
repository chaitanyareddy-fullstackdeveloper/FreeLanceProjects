import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PlusCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

// Sample projects for new users
const sampleProjects: Omit<Project, 'id' | 'owner_id' | 'created_at' | 'updated_at'>[] = [
  {
    title: "Website Redesign Project",
    description: "Complete redesign of an e-commerce website with modern UI/UX",
    detailed_description: "Looking for experienced designers and developers to revamp our online store",
    budget: 5000,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    status: "open",
    assigned_to: null
  },
  {
    title: "Mobile App Development",
    description: "Create a new fitness tracking mobile application",
    detailed_description: "Develop a cross-platform mobile app for tracking workouts and nutrition",
    budget: 8000,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    status: "open",
    assigned_to: null
  },
  {
    title: "Brand Identity Package",
    description: "Design complete brand identity including logo and guidelines",
    detailed_description: "Create a comprehensive brand package for a new startup",
    budget: 3000,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
    status: "open",
    assigned_to: null
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    detailed_description: "",
    budget: "",
    deadline: "",
  });

  useEffect(() => {
    fetchUserRole();
    fetchProjects();
  }, []);

  const fetchUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (roleData) {
        setUserRole(roleData.role);
      } else {
        // If no role is found, this is a new user
        // Show sample projects by not setting a role
        setProjects(sampleProjects.map(project => ({
          ...project,
          id: Math.random().toString(36).substr(2, 9),
          owner_id: 'sample',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })));
      }
    }
  };

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // If no user is logged in, show sample projects
      setProjects(sampleProjects.map(project => ({
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        owner_id: 'sample',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })));
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!roleData) {
      // If no role is found, show sample projects
      setProjects(sampleProjects.map(project => ({
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        owner_id: 'sample',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })));
      return;
    }

    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch projects");
      return;
    }

    setProjects(projects || []);
  };

  const handleAddProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const projectData = {
      title: newProject.title,
      description: newProject.description,
      detailed_description: newProject.detailed_description,
      budget: parseFloat(newProject.budget),
      deadline: newProject.deadline,
      owner_id: user.id,
      status: 'draft' as const
    };

    const { error } = await supabase
      .from('projects')
      .insert(projectData);

    if (error) {
      toast.error("Failed to create project");
      return;
    }

    toast.success("Project created successfully");
    setIsAddProjectOpen(false);
    fetchProjects();
    setNewProject({
      title: "",
      description: "",
      detailed_description: "",
      budget: "",
      deadline: "",
    });
  };

  const handleBackClick = () => {
    if (showCompleted) {
      setShowCompleted(false);
    } else {
      // Force navigation to the index page
      window.location.href = '/';
    }
  };

  const renderMyProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {showCompleted ? "Completed Projects" : "My Projects"}
        </h2>
        {!showCompleted && (
          <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
            <DialogTrigger asChild>
              <Button className="flex gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={e => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Brief Description"
                  value={newProject.description}
                  onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
                <Textarea
                  placeholder="Detailed Description"
                  value={newProject.detailed_description}
                  onChange={e => setNewProject(prev => ({ ...prev, detailed_description: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Budget"
                  value={newProject.budget}
                  onChange={e => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                />
                <Input
                  type="datetime-local"
                  value={newProject.deadline}
                  onChange={e => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                />
                <Button onClick={handleAddProject}>Create Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {(showCompleted ? projects.filter(p => p.status === 'completed') : projects).map(project => (
        <Card
          key={project.id}
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => {
            if (project.status === 'completed') {
              setShowCompleted(true);
              navigate(`/projects/${project.id}`);
            } else {
              navigate(`/projects/${project.id}`);
            }
          }}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{project.title}</CardTitle>
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Status: {project.status}</div>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
            <div className="mt-2">
              <p>Budget: ${project.budget}</p>
              <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAvailableProjects = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Available Projects</h2>
      {projects
        .filter(project => project.status === 'open')
        .map(project => (
          <Card
            key={project.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{project.title}</CardTitle>
                <ArrowRight className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>Budget: ${project.budget}</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderCurrentProjects = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Current Projects</h2>
      {projects
        .filter(project => project.status === 'in_progress')
        .map(project => (
          <Card
            key={project.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{project.title}</CardTitle>
                <ArrowRight className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>Budget: ${project.budget}</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderCompletedProjects = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Completed Projects</h2>
      {projects
        .filter(project => project.status === 'completed')
        .map(project => (
          <Card
            key={project.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{project.title}</CardTitle>
                <ArrowRight className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>Budget: ${project.budget}</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/98/3f/fc/983ffcc161bec18b0c4dd722fd0bc99c.jpg")'
      }}
    >
      <div className="container mx-auto py-8 space-y-8 bg-white/90 min-h-screen backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
            {showCompleted ? 'Back to Projects' : 'Back to Home'}
          </Button>
          {!showCompleted && userRole && (
            <Button
              variant="outline"
              onClick={() => setShowCompleted(true)}
            >
              View Completed Projects
            </Button>
          )}
        </div>

        {!userRole && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sample Projects</h2>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Sign Up to Post Projects
              </Button>
            </div>
            {projects.map(project => (
              <Card
                key={project.id}
                className="cursor-pointer hover:border-primary transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{project.title}</CardTitle>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                  <div className="mt-2">
                    <p>Budget: ${project.budget}</p>
                    <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {userRole === 'owner' && (
          <>
            {renderMyProjects()}
            {!showCompleted && renderCurrentProjects()}
          </>
        )}
        {userRole === 'company' && (
          <>
            {!showCompleted && renderAvailableProjects()}
            {!showCompleted && renderCurrentProjects()}
            {showCompleted && renderCompletedProjects()}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
