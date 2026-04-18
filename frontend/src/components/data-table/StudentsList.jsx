import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

import StudentApi from "../../services/Api/StudentApi";

import { Button } from "../ui/button";
import { ArrowUpDown,MoreHorizontal } from "lucide-react";
import {DataTableColumnHeader} from "./DataTableColumnHeader"



import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import StudentUpsertForm from "../Forms/StudentUpsertForm";





export default function StudentsList(){
    const [data,setData] = useState([])

     const studentColumns = [
    {
      accessorKey: "id",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="#ID"/>
      },
    },
    {
      accessorKey: "firstname",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Firstname"/>
      },
    },
    {
      accessorKey: "lastname",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Lastname"/>
      },
    },
    {
      accessorKey: "gender",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Gender"/>
      },
      cell: ({row}) => {
        const value = row.getValue("gender")
        const gender = value === 'm' ? 'Male' : 'Female'
        return <>{gender}</>
      },
    },
    {
      accessorKey: "blood_type",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Blood Type"/>
      },
    },
    {
      accessorKey: "email",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Email"/>
      },
    },
    {
      accessorKey: "formatted_updated_at",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Updated at"/>
      },
      cell: ({row}) => {
        const date = (row.getValue("formatted_updated_at"))
        // const formatted = new Date(date).toString()

        return <div className="text-right font-medium">{date}</div>
      },
    },

    {
    id: "actions",
    cell: ({ row }) => {
      const {id,firstname,lastname } = row.original
         const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

      return (
      <div className={'flex gap-x-1'} >

      <Sheet  open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
  <SheetTrigger>
    <Button size={'sm'} >Update </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Update Student {firstname},{lastname}</SheetTitle>
      <SheetDescription>
        <StudentUpsertForm values={row.original} handleSubmit={(values) => {
                      const promise = StudentApi.update(id, values)
                      promise.then((response) => {
                        const {student} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return student
                          }
                          return item
                        })
                        setData(elements)
                        setOpenUpdateDialog(false);
                      });

                      return promise
                    }}/>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

      <AlertDialog>
  <AlertDialogTrigger asChild>
   <Button size={'sm'}variant={'destructive' }>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure to delete <span className={'font-bold'}>{firstname} {lastname}</span>?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={async()=>{
        const {data:deletedStudent, status} = await StudentApi.delete(id);
        if(status === 200){
            setData(data.filter((Student) => Student.id !== id))
            console.log("Student Deletes succesfully ${deletedStudent.data.firstname}")

        }
        
       
            
      }}>Delete    </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      
      </div>
      )
    },
  },
  // ...


    
];
 useEffect(()=>{
  StudentApi.all().then(({data})=> setData(data.data))
 },[])

    return <>
    <DataTable columns={studentColumns} data={data}/>
    </>
}