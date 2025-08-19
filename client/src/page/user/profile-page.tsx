import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import API from "@/lib/axios-client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await API.get("/user/current");
        const user = res.data?.user;
        setProfile({ name: user?.name || "", email: user?.email || "" });
        setUserSkills(user?.userSkills || []);
        setSkillLevel(user?.skillLevel || "");
      } catch (error: any) {
        const message =
          error?.response?.data?.message || error?.message || "Failed to load profile";
        toast({ title: "Error", description: message, variant: "destructive" });
      }
    };
    fetchCurrentUser();
  }, [toast]);

  const handleSave = () => {
    // No profile update endpoint implemented yet; keeping placeholder handler
    console.log("Profile:", profile);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await API.post("/user/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Skills are read-only on this page per requirement; editing removed

  return (
    <>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full name</label>
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Skill level</label>
                        <Input value={skillLevel || "-"} disabled className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          value={profile.email}
                          className="mt-1"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Skills</label>
                        <div className="mt-1 flex flex-wrap gap-2 min-h-10 items-center border rounded-md p-2">
                          {userSkills?.length ? (
                            userSkills.map((s) => (
                              <Badge key={s} variant="secondary">
                                {s}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No skills</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleSave} className="mt-4">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={handleChangePassword}>
                      <div>
                        <label className="text-sm font-medium">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="mt-1"
                          autoComplete="current-password"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          New Password
                        </label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="mt-1"
                          autoComplete="new-password"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="mt-1"
                          autoComplete="new-password"
                        />
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Changing..." : "Change Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills tab removed; showing read-only skills and skill level in Profile tab */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
