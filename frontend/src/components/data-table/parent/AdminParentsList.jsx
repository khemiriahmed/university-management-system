import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";

import ParentApi from "../../../services/Api/ParentApi";

import { Button } from "../../ui/button";
import { ArrowUpDown,MoreHorizontal } from "lucide-react";
import {DataTableColumnHeader} from "../DataTableColumnHeader"



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
import ParentUpsertForm from "../../Forms/ParentUpsertForm";




export default function AdminParentsList(){
    const [data,setData] = useState([])

     const AdminParentsColumns = [
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
      accessorKey: "date_of_birth",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Date of birth"/>
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
      accessorKey: "address",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Address"/>
      },
    },
    {
      accessorKey: "phone",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Phone"/>
      },
      cell: ({row}) => {
        const phone = row.getValue("phone")
        return <div className="text-right font-medium">+212-{phone}</div>
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
      <SheetTitle>Update parent {firstname},{lastname}</SheetTitle>
      <SheetDescription>
        <ParentUpsertForm values={row.original} handleSubmit={(values) => ParentApi.update(id,values).then(()=>setOpenUpdateDialog(false))}/>
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
        const {data:deletedParent, status} = await ParentApi.delete(id);
        if(status === 200){
            setData(data.filter((parent) => parent.id !== id))
            console.log("Parent Deletes succesfully ${deletedParent.data.firstname}")

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
  ParentApi.all().then(({data})=> setData(data.data))
 },[])

    return <>
    <DataTable columns={AdminParentsColumns} data={data}/>
    </>
}