import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  Users,
  Clock,
  Settings,
  Tag,
  Globe,
  Lock,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// Form schema for validation
const formSchema = z.object({
  // Step 1: Basic Info
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  format: z.enum(["snake", "linear", "auction"]),

  // Step 2: Item Pool
  itemPoolType: z.enum(["custom", "template", "import"]),
  customItems: z.string().optional(),
  templateId: z.string().optional(),
  importFile: z.any().optional(),

  // Step 3: Time Settings
  pickTimeLimit: z.number().min(0),
  roundBreaks: z.boolean(),
  breakDuration: z.number().min(0).optional(),
  autoPick: z.boolean(),

  // Step 4: Privacy & Participants
  privacy: z.enum(["public", "private"]),
  maxParticipants: z.number().min(2),
  allowSpectators: z.boolean(),
  requireApproval: z.boolean(),

  // Step 5: Invitations
  invitedUsers: z.array(z.string()).optional(),
});

interface CreateDraftFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
}

const CreateDraftForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: CreateDraftFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      format: "snake",
      itemPoolType: "custom",
      customItems: "",
      pickTimeLimit: 60,
      roundBreaks: false,
      breakDuration: 300,
      autoPick: true,
      privacy: "private",
      maxParticipants: 10,
      allowSpectators: true,
      requireApproval: false,
      invitedUsers: [],
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  // Mock data for templates and friends
  const draftTemplates = [
    { id: "template1", name: "Fantasy Football" },
    { id: "template2", name: "Fantasy Basketball" },
    { id: "template3", name: "Movie Draft" },
    { id: "template4", name: "Book Club Picks" },
  ];

  const friends = [
    { id: "user1", name: "Alex Johnson", avatar: "" },
    { id: "user2", name: "Maria Garcia", avatar: "" },
    { id: "user3", name: "James Wilson", avatar: "" },
    { id: "user4", name: "Sarah Brown", avatar: "" },
    { id: "user5", name: "David Lee", avatar: "" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Create New Draft</h1>
        <p className="text-muted-foreground">
          Configure your draft settings in 5 simple steps
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > index + 1 ? "bg-primary text-primary-foreground" : currentStep === index + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {currentStep > index + 1 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-xs mt-1 text-muted-foreground">
                {index === 0 && "Basic Info"}
                {index === 1 && "Item Pool"}
                {index === 2 && "Time Settings"}
                {index === 3 && "Privacy"}
                {index === 4 && "Invitations"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Basic Draft Information
                    </CardTitle>
                    <CardDescription>
                      Set the core details for your draft
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Draft Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Fantasy Football 2023"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Give your draft a descriptive name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add details about your draft..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Draft Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="snake">Snake Draft</SelectItem>
                              <SelectItem value="linear">
                                Linear Draft
                              </SelectItem>
                              <SelectItem value="auction">
                                Auction Draft
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            <div className="mt-2">
                              {field.value === "snake" && (
                                <span>
                                  Snake: Draft order reverses each round (1→10,
                                  10→1)
                                </span>
                              )}
                              {field.value === "linear" && (
                                <span>
                                  Linear: Same draft order each round (1→10,
                                  1→10)
                                </span>
                              )}
                              {field.value === "auction" && (
                                <span>
                                  Auction: Participants bid on items using a
                                  budget
                                </span>
                              )}
                            </div>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Item Pool */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Define Item Pool
                    </CardTitle>
                    <CardDescription>
                      Create the list of items that will be available for
                      drafting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="itemPoolType"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Item Source</FormLabel>
                          <Tabs
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="w-full"
                          >
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="custom">
                                Custom List
                              </TabsTrigger>
                              <TabsTrigger value="template">
                                Use Template
                              </TabsTrigger>
                              <TabsTrigger value="import">
                                Import File
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="custom" className="pt-4">
                              <FormField
                                control={form.control}
                                name="customItems"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Custom Items</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Enter items, one per line..."
                                        className="min-h-[200px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Enter each item on a new line
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>

                            <TabsContent value="template" className="pt-4">
                              <FormField
                                control={form.control}
                                name="templateId"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Select Template</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Choose a template" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {draftTemplates.map((template) => (
                                          <SelectItem
                                            key={template.id}
                                            value={template.id}
                                          >
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      Use a pre-defined list of items
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>

                            <TabsContent value="import" className="pt-4">
                              <FormField
                                control={form.control}
                                name="importFile"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Import CSV or Text File
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="file"
                                        accept=".csv,.txt"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          field.onChange(file);
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Upload a CSV or text file with items
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>
                          </Tabs>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Time Settings */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Time Settings
                    </CardTitle>
                    <CardDescription>
                      Configure time limits and automation options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="pickTimeLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pick Time Limit (seconds)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Time allowed for each pick (0 for no limit)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="roundBreaks"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Round Breaks
                            </FormLabel>
                            <FormDescription>
                              Add breaks between draft rounds
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("roundBreaks") && (
                      <FormField
                        control={form.control}
                        name="breakDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Break Duration (seconds)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Length of break between rounds
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="autoPick"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Auto-Pick
                            </FormLabel>
                            <FormDescription>
                              Automatically select an item when time expires
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Privacy & Participants */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Privacy & Participants
                    </CardTitle>
                    <CardDescription>
                      Set visibility and participant options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Draft Visibility</FormLabel>
                          <div className="flex flex-col gap-4">
                            <div
                              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer ${field.value === "public" ? "border-primary" : ""}`}
                              onClick={() => field.onChange("public")}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${field.value === "public" ? "border-primary" : "border-muted-foreground"}`}
                              >
                                {field.value === "public" && (
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  <span className="font-medium">Public</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Anyone can find and join this draft
                                </p>
                              </div>
                            </div>

                            <div
                              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer ${field.value === "private" ? "border-primary" : ""}`}
                              onClick={() => field.onChange("private")}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${field.value === "private" ? "border-primary" : "border-muted-foreground"}`}
                              >
                                {field.value === "private" && (
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  <span className="font-medium">Private</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Only invited users can join this draft
                                </p>
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Participants</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="2"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum number of people who can join the draft
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allowSpectators"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow Spectators
                            </FormLabel>
                            <FormDescription>
                              Let non-participants view the draft
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("privacy") === "public" && (
                      <FormField
                        control={form.control}
                        name="requireApproval"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Require Approval
                              </FormLabel>
                              <FormDescription>
                                Approve participants before they can join
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Invitations */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Invite Participants
                    </CardTitle>
                    <CardDescription>
                      Invite friends to join your draft
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {friends.map((friend) => (
                          <div
                            key={friend.id}
                            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                            onClick={() => {
                              const currentInvites =
                                form.getValues("invitedUsers") || [];
                              if (currentInvites.includes(friend.id)) {
                                form.setValue(
                                  "invitedUsers",
                                  currentInvites.filter(
                                    (id) => id !== friend.id,
                                  ),
                                );
                              } else {
                                form.setValue("invitedUsers", [
                                  ...currentInvites,
                                  friend.id,
                                ]);
                              }
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                              <img
                                src={
                                  friend.avatar ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.id}`
                                }
                                alt={friend.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{friend.name}</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                              {form
                                .watch("invitedUsers")
                                ?.includes(friend.id) && (
                                <Check className="h-3 w-3 text-primary" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          {form.watch("invitedUsers")?.length || 0} friends
                          selected
                        </p>
                      </div>

                      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                        <h3 className="font-medium mb-2">Share Draft Link</h3>
                        <div className="flex gap-2">
                          <Input
                            readOnly
                            value="https://draft-platform.example/join/ABC123"
                            className="bg-background"
                          />
                          <Button variant="outline" className="shrink-0">
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Anyone with this link can join your draft
                          {form.watch("requireApproval") &&
                            " (approval required)"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">Create Draft</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateDraftForm;
