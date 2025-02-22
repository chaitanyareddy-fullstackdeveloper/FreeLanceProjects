
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PlusCircle, ArrowRight } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

const Projects = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
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
        .single();
      
      if (roleData) {
        setUserRole(roleData.role);
      }
    }
  };

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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

  const renderMyProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Projects</h2>
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
      </div>

      {projects.map(project => (
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
    <div className="container mx-auto py-8 space-y-8">
      {userRole === 'owner' && (
        <>
          {renderMyProjects()}
          {renderCurrentProjects()}
          {renderCompletedProjects()}
        </>
      )}
      {userRole === 'company' && (
        <>
          {renderAvailableProjects()}
          {renderCurrentProjects()}
          {renderCompletedProjects()}
        </>
      )}
    </div>
  );
};

export default Projects;
