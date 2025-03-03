import React, { useState } from "react";
import { Search, Globe, Lock, Users, ArrowRight, Hash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PublicDraft {
  id: string;
  title: string;
  format: "snake" | "linear" | "auction";
  participants: {
    current: number;
    max: number;
  };
  status: "waiting" | "in-progress";
  creator: string;
  createdAt: string;
}

interface JoinDraftOptionsProps {
  publicDrafts?: PublicDraft[];
  recentInvitations?: {
    id: string;
    title: string;
    from: string;
    date: string;
  }[];
  onJoinByCode?: (code: string) => void;
  onJoinPublicDraft?: (draftId: string) => void;
  onAcceptInvitation?: (invitationId: string) => void;
}

const JoinDraftOptions = ({
  publicDrafts = defaultPublicDrafts,
  recentInvitations = defaultInvitations,
  onJoinByCode = () => {},
  onJoinPublicDraft = () => {},
  onAcceptInvitation = () => {},
}: JoinDraftOptionsProps) => {
  const [draftCode, setDraftCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPublicDrafts = publicDrafts.filter((draft) =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Join a Draft</h2>
        <p className="text-muted-foreground">
          Join an existing draft by entering a code, browsing public drafts, or
          accepting an invitation.
        </p>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Enter Code
          </TabsTrigger>
          <TabsTrigger value="public" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Public Drafts
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enter Draft Code</CardTitle>
              <CardDescription>
                Enter the unique code provided by the draft creator to join a
                private draft.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter draft code (e.g., DRAFT-123456)"
                    value={draftCode}
                    onChange={(e) => setDraftCode(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <Lock className="inline-block h-4 w-4 mr-1" />
                  Private drafts are only accessible with a valid code
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!draftCode.trim()}
                onClick={() => onJoinByCode(draftCode)}
              >
                Join Draft
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="public" className="space-y-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search public drafts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredPublicDrafts.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">
                No public drafts found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "No drafts match your search criteria"
                  : "There are no public drafts available at the moment"}
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPublicDrafts.map((draft) => (
                <Card
                  key={draft.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{draft.title}</CardTitle>
                      <div className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {draft.format.charAt(0).toUpperCase() +
                          draft.format.slice(1)}
                      </div>
                    </div>
                    <CardDescription>
                      Created by {draft.creator} • {draft.createdAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {draft.participants.current}/{draft.participants.max}{" "}
                          participants
                        </span>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${draft.status === "waiting" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {draft.status === "waiting"
                          ? "Waiting to Start"
                          : "In Progress"}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => onJoinPublicDraft(draft.id)}
                    >
                      Join Draft
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          {recentInvitations.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">No invitations</h3>
              <p className="text-muted-foreground">
                You don't have any pending draft invitations
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInvitations.map((invitation) => (
                <Card
                  key={invitation.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{invitation.title}</CardTitle>
                    <CardDescription>
                      Invited by {invitation.from} • {invitation.date}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" className="flex-1">
                        Decline
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => onAcceptInvitation(invitation.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default data for when no props are provided
const defaultPublicDrafts: PublicDraft[] = [
  {
    id: "1",
    title: "Fantasy Football 2023 - Public League",
    format: "snake",
    participants: {
      current: 8,
      max: 12,
    },
    status: "waiting",
    creator: "Alex Johnson",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "NBA All-Stars Draft",
    format: "linear",
    participants: {
      current: 6,
      max: 10,
    },
    status: "waiting",
    creator: "Maria Garcia",
    createdAt: "1 hour ago",
  },
  {
    id: "3",
    title: "Movie Night Picks",
    format: "auction",
    participants: {
      current: 4,
      max: 8,
    },
    status: "in-progress",
    creator: "James Wilson",
    createdAt: "30 minutes ago",
  },
  {
    id: "4",
    title: "Book Club Selections",
    format: "snake",
    participants: {
      current: 5,
      max: 6,
    },
    status: "in-progress",
    creator: "Sarah Brown",
    createdAt: "45 minutes ago",
  },
];

const defaultInvitations = [
  {
    id: "101",
    title: "Fantasy Baseball 2023 - Private League",
    from: "David Lee",
    date: "1 hour ago",
  },
  {
    id: "102",
    title: "Summer Movie Draft",
    from: "Emma Davis",
    date: "3 hours ago",
  },
];

export default JoinDraftOptions;
