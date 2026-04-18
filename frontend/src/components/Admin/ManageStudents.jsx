

import {useUserContext} from "../../context/StudentContext.jsx"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs.jsx";
import {Separator} from "../ui/separator.jsx";
import {ScrollArea, ScrollBar} from "../ui/scroll-area.jsx";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button.jsx";
import StudentUpsertForm from "../Forms/StudentUpsertForm.jsx";
import StudentsList from "../data-table/StudentsList.jsx";
import StudentApi from "../../services/Api/StudentApi.js";




export default function ManageStudents() {
   const { user} = useUserContext()
  return (
    <>  
<div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="items_list" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="parents_list" className="relative">Student</TabsTrigger>
                        <TabsTrigger value="add_item">Add new student</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4 ">
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4"/>
                          Add student 
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="items_list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1 w-full">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            All student
                          </h2>
                          <StudentsList/>
                        </div>
                      </div>
                      <Separator className="my-4"/>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="add_item">
                      <div className="space-y-1">
                       <StudentUpsertForm handleSubmit={(values) => StudentApi.create(values)}/>
                      </div>
                      <Separator className="my-4"/>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

