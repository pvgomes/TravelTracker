import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { CountrySearch } from "@/components/country-search";
import { Label } from "@/components/ui/label";
import { CommonDialog } from "@/components/common-dialog"

const loginSchema = insertUserSchema;
const registerSchema = insertUserSchema;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [_, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Add state for dialog control
  const [dialogState, setDialogState] = useState<{ open: boolean; type: "terms" | "privacy" }>({
    open: false,
    type: "terms"
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  // Import the CountrySearch component
  const [selectedHomeCountry, setSelectedHomeCountry] = useState<{
    code: string;
    name: string;
  } | null>(null);
  
  // Register form with extended schema to include full name and born country
  const extendedRegisterSchema = registerSchema.extend({
    fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
    homeCountryCode: z.string().optional(),
    homeCountryName: z.string().optional(),
  });
  
  const registerForm = useForm<z.infer<typeof extendedRegisterSchema>>({
    resolver: zodResolver(extendedRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      homeCountryCode: "",
      homeCountryName: "",
    },
  });

  // Update form fields when a country is selected
  useEffect(() => {
    if (selectedHomeCountry) {
      registerForm.setValue("homeCountryCode", selectedHomeCountry.code);
      registerForm.setValue("homeCountryName", selectedHomeCountry.name);
    }
  }, [selectedHomeCountry, registerForm]);

  const onRegisterSubmit = (values: z.infer<typeof extendedRegisterSchema>) => {
    // Convert to the format expected by the mutation
    registerMutation.mutate(values);
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div 
        className="hidden lg:block lg:w-1/2 xl:w-2/3 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')" 
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center max-w-2xl p-8">
            <h1 className="font-bold text-3xl text-primary mb-2">Globalia</h1>
            <p className="text-lg" style={{ color: "#F8E081", textShadow: "0 1px 8px #4A90E2" }}>
              Track your world adventures
            </p>
            <p className="text-md text-white opacity-80">
              Create your personalized travel map, discover your next destinations, and connect with fellow travelers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 xl:w-1/3 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center space-y-2">
                <img 
                  src="/web-logo-globalia-crop.png"
                  alt="Globalia Logo" 
                  className="h-12 w-auto mb-2 object-contain"
                  loading="eager"
                  // fallback if image fails to load
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Show text fallback
                    const textElement = document.createElement('h1');
                    textElement.className = 'font-bold text-3xl text-primary';
                    textElement.innerText = 'Globalia';
                    e.currentTarget.parentNode?.appendChild(textElement);
                  }}
                />
                <p className="text-muted-foreground">Track your world adventures</p>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm text-muted-foreground"
                        >
                          Remember me
                        </label>
                      </div>
                      
                      <Button variant="link" className="p-0 h-auto" type="button">
                        Forgot password?
                      </Button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Password must be at least 8 characters long
                          </p>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-2">
                      <Label htmlFor="homeCountry">born country</Label>
                      <CountrySearch 
                        onCountrySelect={(country) => setSelectedHomeCountry(country)}
                        selectedCountryCode={selectedHomeCountry?.code}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Select your born country to mark it on the map
                      </p>
                      
                      {/* Hidden fields to store country code and name */}
                      <input 
                        type="hidden" 
                        {...registerForm.register("homeCountryCode")} 
                      />
                      <input 
                        type="hidden" 
                        {...registerForm.register("homeCountryName")} 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground"
                      >
                        I agree to the{" "}
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm" 
                        type="button"
                        onClick={() => setDialogState({ open: true, type: "terms" })}
                      >
                        Terms of Service
                      </Button>
                      {" "}and{" "}
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm" 
                        type="button"
                        onClick={() => setDialogState({ open: true, type: "privacy" })}
                      >
                        Privacy Policy
                      </Button>
                      <CommonDialog
                        open={dialogState.open}
                        onOpenChange={(open) => setDialogState(prev => ({ ...prev, open }))}
                        type={dialogState.type}
                      />
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
