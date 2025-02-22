
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login = ({ isOpen, onClose }: LoginProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!isSignIn && !name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!isResetPassword && !password.trim()) {
      toast.error("Please enter a password");
      return false;
    }
    if (!isSignIn && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Signed in successfully!");
      onClose();
      navigate("/projects");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (authError) {
        if (authError.message.toLowerCase().includes('email already registered')) {
          toast.info("Email already registered. Please sign in instead.");
          setIsSignIn(true);
          setName("");
          return;
        }
        throw authError;
      }

      if (authData.user) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ 
            user_id: authData.user.id, 
            role: 'owner' 
          }]);

        if (roleError) {
          console.error("Role creation error:", roleError);
          toast.error("Note: Role assignment failed, please contact support");
        }

        toast.success("Account created! Please sign in with your credentials.");
        setName("");
        setEmail("");
        setPassword("");
        setIsSignIn(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset instructions sent to your email!");
      setIsResetPassword(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset password email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetPassword) {
      await handleResetPassword();
    } else if (isSignIn) {
      await handleSignIn();
    } else {
      await handleSignUp();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-12 top-6">
          {!isResetPassword && (
            <button 
              onClick={() => setIsSignIn(!isSignIn)} 
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          )}
        </div>

        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            {isResetPassword ? "Reset Password" : (isSignIn ? "Welcome Back" : "Create Account")}
          </DialogTitle>
          <div className="flex justify-center items-center">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </DialogHeader>

        <div className="flex gap-6">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && !isResetPassword && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              {!isResetPassword && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isSignIn ? "Enter your password" : "Create a strong password"}
                      className="w-full pr-10 transition-colors hover:border-purple-400"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isSignIn && !isResetPassword && (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(true)}
                  className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Forgot your password?
                </button>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors rounded-full py-6"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isResetPassword ? "Sending Reset Link..." : (isSignIn ? "Signing In..." : "Creating Account..."))
                  : (isResetPassword ? "Send Reset Link" : (isSignIn ? "Sign In" : "Create Account"))}
              </Button>

              {isResetPassword && (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(false)}
                  className="w-full text-sm text-gray-600 hover:text-purple-600 transition-colors mt-2"
                >
                  Back to Sign In
                </button>
              )}
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
