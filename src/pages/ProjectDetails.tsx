
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRole();
    if (id) {
      fetchProjectDetails(id);
    }
  }, [id]);

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

  const fetchProjectDetails = async (projectId: string) => {
    const { data: project, error } = await supabase
      .from('projects')
      .select()
      .eq('id', projectId)
      .single();

    if (error) {
      toast.error("Failed to fetch project details");
      navigate('/projects');
      return;
    }

    setProject(project);
  };

  const handleApplyForProject = async () => {
    if (!project) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('projects')
      .update({ 
        status: 'in_progress',
        assigned_to: user.id 
      })
      .eq('id', project.id);

    if (error) {
      toast.error("Failed to apply for project");
      return;
    }

    toast.success("Successfully applied for project");
    fetchProjectDetails(project.id);
  };

  if (!project) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate('/projects')}
      >
        Back to Projects
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <div className="text-sm text-muted-foreground">Status: {project.status}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{project.description}</p>
            </div>
            {project.detailed_description && (
              <div>
                <h3 className="font-semibold mb-2">Detailed Description</h3>
                <p>{project.detailed_description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Budget</h3>
                <p>${project.budget}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Deadline</h3>
                <p>{new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            
            {userRole === 'company' && project.status === 'open' && (
              <Button onClick={handleApplyForProject} className="w-full">
                Apply for Project
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;
