"use client"

import { Monitor, CircuitBoard, Code } from "lucide-react"

import { ScrollArea, ScrollBar } from "@/components/shadcn-ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs"
import CodeViewer from "../client/code-viewer";

type FileSystemObject = {
  type: "file" | "directory";
  name: string;
  children?: FileSystemObject[];
  path: string;
  code?: string;
};


interface TabbedDashboardProps {
  children: React.ReactNode
  archirecture?: React.ReactNode
  fileSystem?: FileSystemObject[]
}

export default function TabbedDashboard({ children, archirecture, fileSystem }: TabbedDashboardProps) {
  return (
    <Tabs defaultValue="tab-1" className="">
      <ScrollArea className=" h-full !outline-none  !border-none">
        <TabsList className=" flex h-full !border-none -space-x-px p-[3px] shadow-xs rtl:space-x-reverse">
          <TabsTrigger
            value="tab-1"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-0 w-[90px]"
          >
            <Monitor
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
            Demo
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-3  w-[90px]"
          >
            <CircuitBoard
              className=" opacity-60"
              size={16}
              aria-hidden="true"
            />
            Architecture
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-0 w-[90px]"
          >
            <Code
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
            Code
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <div className="overflow-hidden  rounded-2xl">
          <div className="bg-muted !h-[clamp(200px,90vh,900px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        {archirecture ||
          <div className="bg-muted !h-[clamp(200px,90vh,900px)] overflow-y-auto rounded-2xl grid place-items-center">
            Content for Tab 2
          </div>
        }
      </TabsContent>
      <TabsContent value="tab-3">
        {fileSystem && fileSystem.length > 0 ? (
          <CodeViewer fileSystem={fileSystem} />
        ) : (
          <div className="bg-muted !h-[clamp(200px,90vh,900px)] overflow-y-auto rounded-2xl grid place-items-center">
            Content for Tab 3
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
