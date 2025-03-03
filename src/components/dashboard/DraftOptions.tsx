import React from "react";
import { PlusCircle, ArrowRight, History } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DraftOption {
  id: string;
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
}

interface RecentDraft {
  id: string;
  title: string;
  date: string;
  participants: number;
  status: "completed" | "in-progress";
}

interface DraftOptionsProps {
  options?: DraftOption[];
  recentDrafts?: RecentDraft[];
}

const DraftOptions = ({
  options = [
    {
      id: "1",
      title: "Create New Draft",
      description:
        "Set up a customized draft with your preferred format and settings",
      action: "Create",
      icon: <PlusCircle className="h-6 w-6" />,
    },
    {
      id: "2",
      title: "Join Existing Draft",
      description: "Enter a draft code or browse public drafts to participate",
      action: "Join",
      icon: <ArrowRight className="h-6 w-6" />,
    },
  ],
  recentDrafts = [
    {
      id: "101",
      title: "Fantasy Football 2023",
      date: "2023-08-15",
      participants: 12,
      status: "completed",
    },
    {
      id: "102",
      title: "Movie Draft Night",
      date: "2023-09-03",
      participants: 8,
      status: "in-progress",
    },
    {
      id: "103",
      title: "Book Club Picks",
      date: "2023-09-10",
      participants: 6,
      status: "completed",
    },
  ],
}: DraftOptionsProps) => {
  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Draft Options</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          View All History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {options.map((option) => (
          <Card key={option.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                {option.icon}
                <CardTitle>{option.title}</CardTitle>
              </div>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">{option.action}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Recent Drafts</h3>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDrafts.map((draft) => (
            <Card key={draft.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{draft.title}</CardTitle>
                <CardDescription className="flex justify-between">
                  <span>{draft.date}</span>
                  <span>{draft.participants} participants</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-0">
                <div className="flex items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${draft.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {draft.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  {draft.status === "completed"
                    ? "View Results"
                    : "Continue Draft"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftOptions;
