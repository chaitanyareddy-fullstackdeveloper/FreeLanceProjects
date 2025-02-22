
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PlusCircle, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string | null;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  deadline: string;
}

interface Review {
  rating: number;
  comment: string;
  created_at: string;
}

const Projects = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<{ [key: string]: Review[] }>({});
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
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch projects");
      return;
    }

    if (projectsData) {
      setProjects(projectsData);
      // Fetch reviews for completed projects
      projectsData
        .filter(p => p.status === 'completed')
        .forEach(project => fetchReviews(project.id));
    }
  };

  const fetchReviews = async (projectId: string) => {
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('project_id', projectId);

    if (reviewsData) {
      setReviews(prev => ({
        ...prev,
        [projectId]: reviewsData
      }));
    }
  };

  const handleAddProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('projects').insert({
      ...newProject,
      owner_id: user.id,
      budget: parseFloat(newProject.budget),
      status: 'draft'
    });

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

  const renderOwnerView = () => (
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
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
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

  const renderCompanyView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Available Projects</h2>
      {projects
        .filter(project => project.status === 'open')
        .map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>Budget: ${project.budget}</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
              <Button className="mt-4">Apply for Project</Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderUserView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Completed Projects</h2>
      {projects
        .filter(project => project.status === 'completed')
        .map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Reviews:</h3>
                {reviews[project.id]?.map((review, index) => (
                  <div key={index} className="mt-2 p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      {userRole === 'owner' && renderOwnerView()}
      {userRole === 'company' && renderCompanyView()}
      {userRole === 'user' && renderUserView()}
    </div>
  );
};

export default Projects;
