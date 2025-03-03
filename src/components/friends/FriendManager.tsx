import React, { useState } from "react";
import {
  Search,
  UserPlus,
  UserX,
  Users,
  UserCheck,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface FriendRequest {
  id: string;
  name: string;
  avatar?: string;
  status: "incoming" | "outgoing";
  timestamp: string;
}

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "in-draft";
  lastActive?: string;
}

interface FriendManagerProps {
  friends?: Friend[];
  friendRequests?: FriendRequest[];
  onAcceptRequest?: (id: string) => void;
  onRejectRequest?: (id: string) => void;
  onCancelRequest?: (id: string) => void;
  onRemoveFriend?: (id: string) => void;
  onSendRequest?: (username: string) => void;
}

const FriendManager = ({
  friends = defaultFriends,
  friendRequests = defaultFriendRequests,
  onAcceptRequest = () => {},
  onRejectRequest = () => {},
  onCancelRequest = () => {},
  onRemoveFriend = () => {},
  onSendRequest = () => {},
}: FriendManagerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newFriendUsername, setNewFriendUsername] = useState("");

  const incomingRequests = friendRequests.filter(
    (request) => request.status === "incoming",
  );
  const outgoingRequests = friendRequests.filter(
    (request) => request.status === "outgoing",
  );

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: Friend["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "in-draft":
        return "bg-blue-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleSendRequest = () => {
    if (newFriendUsername.trim()) {
      onSendRequest(newFriendUsername.trim());
      setNewFriendUsername("");
    }
  };

  return (
    <div className="w-full bg-background rounded-lg border shadow-sm">
      <Tabs defaultValue="friends">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Connections</h2>
            <TabsList>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">
                Requests
                {friendRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {friendRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="friends" className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search friends..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New Friend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter username"
                    value={newFriendUsername}
                    onChange={(e) => setNewFriendUsername(e.target.value)}
                  />
                  <Button onClick={handleSendRequest}>
                    <UserPlus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Your Friends</h3>
                <Badge variant="outline">{filteredFriends.length}</Badge>
              </div>
              <ScrollArea className="h-[300px]">
                {filteredFriends.length > 0 ? (
                  <div className="space-y-2">
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-accent group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage
                                src={
                                  friend.avatar ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.id}`
                                }
                                alt={friend.name}
                              />
                              <AvatarFallback>
                                {friend.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                                friend.status,
                              )}`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {friend.status === "online"
                                ? "Online"
                                : friend.status === "in-draft"
                                  ? "In a draft"
                                  : `Last seen ${friend.lastActive || "recently"}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onRemoveFriend(friend.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
                    <Users className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No friends match your search"
                        : "You don't have any friends yet"}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="p-4">
          <div className="space-y-6">
            {incomingRequests.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  Incoming Requests
                  <Badge>{incomingRequests.length}</Badge>
                </h3>
                <div className="space-y-2">
                  {incomingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={
                                  request.avatar ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.id}`
                                }
                                alt={request.name}
                              />
                              <AvatarFallback>
                                {request.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Sent {request.timestamp}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => onAcceptRequest(request.id)}
                            >
                              <UserCheck className="h-4 w-4 mr-1" /> Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onRejectRequest(request.id)}
                            >
                              <UserX className="h-4 w-4 mr-1" /> Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {outgoingRequests.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  Outgoing Requests
                  <Badge variant="outline">{outgoingRequests.length}</Badge>
                </h3>
                <div className="space-y-2">
                  {outgoingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={
                                  request.avatar ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.id}`
                                }
                                alt={request.name}
                              />
                              <AvatarFallback>
                                {request.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Sent {request.timestamp}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCancelRequest(request.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {incomingRequests.length === 0 && outgoingRequests.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
                <UserPlus className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">
                  No pending friend requests
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    document.querySelector('button[value="friends"]')?.click()
                  }
                >
                  Add Friends
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default data for when no props are provided
const defaultFriends: Friend[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    status: "online",
  },
  {
    id: "user2",
    name: "Maria Garcia",
    status: "in-draft",
  },
  {
    id: "user3",
    name: "James Wilson",
    status: "offline",
    lastActive: "2 hours ago",
  },
  {
    id: "user4",
    name: "Sarah Brown",
    status: "offline",
    lastActive: "yesterday",
  },
  {
    id: "user5",
    name: "David Lee",
    status: "online",
  },
];

const defaultFriendRequests: FriendRequest[] = [
  {
    id: "req1",
    name: "Michael Taylor",
    status: "incoming",
    timestamp: "2 hours ago",
  },
  {
    id: "req2",
    name: "Emma Davis",
    status: "incoming",
    timestamp: "1 day ago",
  },
  {
    id: "req3",
    name: "Robert Miller",
    status: "outgoing",
    timestamp: "3 hours ago",
  },
];

export default FriendManager;
