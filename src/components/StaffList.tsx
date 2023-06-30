import type { HydratedDocument } from "mongoose";
import { For, Show, createSignal, onMount } from "solid-js";
import { validateStaff} from "../models/Staff";
import type { IStaff } from "../models/Staff";

export default function StaffList(props:{token:string}){
    const [staffs,setStaffs] = createSignal<HydratedDocument<IStaff>[]>([]);
    const fetchStaffs = async()=>{
        const res = await fetch('/api/staffs',{headers:{'Auth':`Bearer ${props.token}`}})
        const data = await res.json();
        if(res.ok)setStaffs(data.staffs);
        else alert(data.message)
    } 
    onMount(async()=>{
        await fetchStaffs();
    });
    const AddStaff = ()=>{
        return (
            <form 
                class="grid grid-cols-2 gap-2 border border-black w-full"
                onSubmit={(e)=>{
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const valid  = validateStaff.required().strip().safeParse(Object.fromEntries(formData))
                    if(!valid.success){
                        alert('maklumat tidak sah');
                        return;
                    }
                    
                    const payload = new URLSearchParams(new FormData(e.currentTarget) as any);
                    fetch(`/api/staffs`,{
                        headers:{
                            "Content-Type":"application/x-www-form-urlencoded",
                            "Auth":`Bearer ${props.token}`
                        },
                        method:"POST",
                        body:payload,
                        
                    }).then(res=>res.json())
                    .then(async(data)=>{
                        alert(data.message)
                        await fetchStaffs()
                    })
                    .catch(err=>console.log(err));
                    
                }}
            >
            <h2 class="bg-slate-500 text-white font-bold col-span-full text-center p-2">Daftar Anggota</h2>
           <label for="name" class="font-bold pl-2">Nama</label>
           <span class="p-2">
           <input type="text" name="name" required class="border border-black rounded w-fit text-sm"/>
           </span>
    
           <label for="email" class="font-bold pl-2">Emel</label>
           <span class="p-2">
           <input type="email" name="email" required class="border border-black rounded w-fit text-sm"/>
           </span>
    
           <label for="department" class="font-bold pl-2">Jabatan</label>
           <span class="p-2">
           <input type="text" name="department" required class="border border-black rounded w-fit text-sm"/>
           </span>
    
           <label for="phone" class="font-bold pl-2">Telefon</label>
           <span class="p-2">
           <input type="text" name="phone" required class="border border-black rounded w-fit text-sm"/>
           </span>
    
            <span class="col-span-full text-center p-2">
                <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 font-bold rounded ">
                 Daftar Anggota
                </button>
            </span>
           </form>
        );
    }
    return(
    <div>
        <AddStaff/>
        <div class={`w-full border border-black text-center ${staffs().length <1?"bg-red-500 text-white font-bold":""}`}>
            <Show when={staffs().length > 0} fallback={<strong class="font-bold">Tiada Anggota</strong>}>
                <h3 class="bg-slate-500 text-white font-bold p-2">Senarai Anggota</h3>
                <div class="flex flex-col gap-3 p-2">
                    <For each={staffs()}>
                    {(staff,i)=>
                     (
                         <a href={`/staffs/${staff._id}`} 
                         class="border border-black rounded font-bold hover:text-white hover:bg-slate-400">
                            <span class="underline font-bold text-blue-600">{staff.email}</span>
                            &nbsp;({staff.name})
                        </a>
                     )
                    }
                    </For>
                </div>
            </Show>
        </div>
    </div>
    );
}

