import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, ArrowRight, AlertCircle } from "lucide-react";

interface DraftParticipant {
  id: string;
  name: string;
  avatar: string;
}

interface ActiveDraft {
  id: string;
  title: string;
  format: "snake" | "linear" | "auction";
  status: "waiting" | "in-progress" | "your-turn" | "paused";
  participants: DraftParticipant[];
  currentPicker?: DraftParticipant;
  timeRemaining?: number;
  yourTurnPosition?: number;
  completionPercentage: number;
}

interface ActiveDraftsProps {
  drafts?: ActiveDraft[];
}

const ActiveDrafts = ({ drafts = defaultDrafts }: ActiveDraftsProps) => {
  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Active Drafts</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      {drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Active Drafts</h3>
          <p className="text-muted-foreground mb-4">
            You're not participating in any drafts right now.
          </p>
          <Button>Join a Draft</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map((draft) => (
            <DraftCard key={draft.id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  );
};

const DraftCard = ({ draft }: { draft: ActiveDraft }) => {
  const getStatusColor = (status: ActiveDraft["status"]) => {
    switch (status) {
      case "your-turn":
        return "destructive";
      case "in-progress":
        return "secondary";
      case "waiting":
        return "default";
      case "paused":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusText = (status: ActiveDraft["status"]) => {
    switch (status) {
      case "your-turn":
        return "Your Turn!";
      case "in-progress":
        return "In Progress";
      case "waiting":
        return "Waiting to Start";
      case "paused":
        return "Paused";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{draft.title}</CardTitle>
          <Badge variant={getStatusColor(draft.status)}>
            {getStatusText(draft.status)}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          {draft.format.charAt(0).toUpperCase() + draft.format.slice(1)} Draft
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Progress</span>
              <span>{draft.completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${draft.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Current picker info */}
          {draft.status === "in-progress" && draft.currentPicker && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={
                    draft.currentPicker.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${draft.currentPicker.id}`
                  }
                  alt={draft.currentPicker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>
                <span className="font-medium">{draft.currentPicker.name}</span>{" "}
                is picking
              </span>
              {draft.timeRemaining !== undefined && (
                <div className="ml-auto flex items-center text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {Math.floor(draft.timeRemaining / 60)}:
                    {(draft.timeRemaining % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Your turn position */}
          {draft.status === "in-progress" &&
            draft.yourTurnPosition &&
            draft.yourTurnPosition > 0 && (
              <div className="text-sm">
                <span className="text-muted-foreground">Your turn in: </span>
                <span className="font-medium">
                  {draft.yourTurnPosition}{" "}
                  {draft.yourTurnPosition === 1 ? "pick" : "picks"}
                </span>
              </div>
            )}

          {/* Participants */}
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {draft.participants.slice(0, 3).map((participant) => (
                <div
                  key={participant.id}
                  className="w-6 h-6 rounded-full border-2 border-background overflow-hidden"
                >
                  <img
                    src={
                      participant.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.id}`
                    }
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {draft.participants.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  +{draft.participants.length - 3}
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {draft.participants.length} participants
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full"
          variant={draft.status === "your-turn" ? "default" : "secondary"}
        >
          {draft.status === "your-turn" ? "Make Your Pick" : "Enter Draft Room"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Default data for when no props are provided
const defaultDrafts: ActiveDraft[] = [
  {
    id: "1",
    title: "Fantasy Football 2023",
    format: "snake",
    status: "your-turn",
    participants: [
      { id: "user1", name: "Alex Johnson", avatar: "" },
      { id: "user2", name: "Maria Garcia", avatar: "" },
      { id: "user3", name: "James Wilson", avatar: "" },
      { id: "user4", name: "Sarah Brown", avatar: "" },
      { id: "user5", name: "David Lee", avatar: "" },
    ],
    completionPercentage: 35,
  },
  {
    id: "2",
    title: "Movie Draft Night",
    format: "linear",
    status: "in-progress",
    currentPicker: { id: "user3", name: "James Wilson", avatar: "" },
    timeRemaining: 120, // 2 minutes
    yourTurnPosition: 3,
    participants: [
      { id: "user1", name: "Alex Johnson", avatar: "" },
      { id: "user2", name: "Maria Garcia", avatar: "" },
      { id: "user3", name: "James Wilson", avatar: "" },
      { id: "user4", name: "Sarah Brown", avatar: "" },
    ],
    completionPercentage: 62,
  },
  {
    id: "3",
    title: "NBA All-Stars",
    format: "auction",
    status: "waiting",
    participants: [
      { id: "user1", name: "Alex Johnson", avatar: "" },
      { id: "user2", name: "Maria Garcia", avatar: "" },
      { id: "user6", name: "Michael Taylor", avatar: "" },
    ],
    completionPercentage: 0,
  },
  {
    id: "4",
    title: "Book Club Picks",
    format: "snake",
    status: "paused",
    participants: [
      { id: "user1", name: "Alex Johnson", avatar: "" },
      { id: "user4", name: "Sarah Brown", avatar: "" },
      { id: "user5", name: "David Lee", avatar: "" },
      { id: "user7", name: "Emma Davis", avatar: "" },
      { id: "user8", name: "Robert Miller", avatar: "" },
      { id: "user9", name: "Jennifer White", avatar: "" },
    ],
    completionPercentage: 75,
  },
];

export default ActiveDrafts;
