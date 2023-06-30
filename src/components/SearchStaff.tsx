import { createSignal } from "solid-js";
import type { IStaff } from "../models/Staff";



export default function SearchStaff(props:{}){
    const [staff,setStaff] = createSignal<IStaff>({name:'',department:'',email:'',phone:''});
    return(
       <>
         <label for="E15" class="font-bold pl-2">
                Nama Pemohon
                <strong class="font-bold text-red-500">*</strong>
            </label>
            <input type="text" id="E15" name="E15" required class="border border-black rounded text-sm w-11/12"/>
            
       </> 
    )
}