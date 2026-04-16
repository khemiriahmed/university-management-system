import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { AdminParentsColumns } from "./AdminParentsColumns";
import ParentApi from "../../../services/Api/ParentApi";

export default function AdminParentsList(){
    const [data,setData] = useState([])
 useEffect(()=>{
  ParentApi.all().then(({data})=> setData(data.data))
 },[])

    return <>
    <DataTable columns={AdminParentsColumns} data={data}/>
    </>
}