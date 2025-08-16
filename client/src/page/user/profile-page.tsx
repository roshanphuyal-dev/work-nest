import React, { useState } from "react";
import { DisplayJson } from "@/components/displayJSON";
import useWorkspaceId from "@/hooks/use-workspace-id";
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

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "Product Designer",
  });
  //   const [connectedAccounts, setConnectedAccounts] = useState({
  //     github: true,
  //     google: false,
  //     twitter: false,
  //   });

  const handleSave = () => {
    // API call to save profile data to backend
    console.log("Profile saved:", profile);
    // Example: fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(profile) })
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  //   const toggleAccount = (account) => {
  //     setConnectedAccounts((prev) => ({
  //       ...prev,
  //       [account]: !prev[account],
  //     }));
  //     // API call to connect/disconnect account
  //     console.log(`${account} toggled`);
  //   };

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
            <div className="space-y-6">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="text-sm font-medium">Profile</label>
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-medium">Security</label>
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-medium">Notifications</label>
                </div>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First name</label>
                      <Input
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last name</label>
                      <Input
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="mt-1"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Input
                        value={profile.role}
                        onChange={(e) =>
                          setProfile({ ...profile, role: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="mt-4">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
              <Card>
                {/* <CardContent className="p-6">
                <h3 className="text-lg font-medium">Connected Accounts</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">GitHub</span>
                      {connectedAccounts.github && (
                        <span className="text-green-500">● Connected</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toggleAccount("github")}
                    >
                      {connectedAccounts.github ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Google</span>
                      {!connectedAccounts.google && (
                        <span className="text-red-500">● Not Connected</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toggleAccount("google")}
                    >
                      {connectedAccounts.google ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Twitter</span>
                      {!connectedAccounts.twitter && (
                        <span className="text-red-500">● Not Connected</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toggleAccount("twitter")}
                    >
                      {connectedAccounts.twitter ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>
              </CardContent> */}
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
