import { For, Show, createSignal, onMount } from "solid-js";
import Input from "../Input";
import type { IStaff } from "../../models/Staff";

export default function Petugas(){
    const [staffs,setStaffs] = createSignal<IStaff[]>([]);
    const [anggota,setAnggota] = createSignal<IStaff>();
    const [pegawai,setPegawai] = createSignal<IStaff>();
    onMount(async()=>{
        try{
            const res = await fetch('/api/staffs');
            const data = await res.json();
            if(res.ok){
                const staffsList:IStaff[] = data.staffs
                setStaffs(staffsList);
                return;
            }

            alert(data.message);
        }catch(err){
            console.log(err);
        }
    })
    return(
        <div class="grid grid-cols-2 w-full border border-black col-span-full gap-2 p-2">

            <label for="E15" class="font-bold pl-2">
                Nama Pemohon
                <strong class="font-bold text-red-500">*</strong>
            </label>
            <span class="flex gap-2">
                <input type="search" list="staff_list" id="E15" name="E15" required class="border border-black rounded text-sm w-11/12"
                    onChange={(e)=>{
                        for(const staff of staffs()){
                            if(staff.email === e.target.value){
                                setAnggota(staff);
                                return;
                            }
                        }
                    }}
                />
                <datalist id="staff_list" >
                    <For each={staffs()}>
                    {(staff,i)=>{
                        const email= staff.email.toString();
                        return(
                            <option value={email}>{staff.name}</option>
                        );
                    }}
                    </For>
                </datalist>
            </span>
            <label for="E14" class="font-bold pl-2">Jabatan Pemohon<strong class="font-bold text-red-500">*</strong></label>
            <input type="text" name="E14" id="E14" required value={anggota()?.department??""} class="border border-black rounded text-sm w-11/12"/>
            <label for="E16" class="font-bold pl-2">Telefon Pemohon<strong class="font-bold text-red-500">*</strong></label>
            <input type="text" name="E16" id="E16" required value={anggota()?.phone??""} class="border border-black rounded text-sm w-11/12"/>
            <label for="E17" class="font-bold pl-2">Emel Pemohon<strong class="font-bold text-red-500">*</strong></label>
            <input type="email" name="E17" id="E17" required value={anggota()?.email??""} class="border border-black rounded text-sm w-11/12"/>

            <div class="col-span-full"></div>
            
            <label for="M15" class="font-bold pl-2">
                Nama Pegawai
            </label>
            <span class="flex gap-2">
                <input type="search" list="staff_list" id="M15" name="M15" class="border border-black rounded text-sm w-11/12"
                    onChange={(e)=>{
                        for(const staff of staffs()){
                            if(staff.email === e.target.value){
                                setPegawai(staff);
                                return;
                            }
                        }
                    }}
                />
                <datalist id="staff_list" >
                    <For each={staffs()}>
                    {(staff,i)=>{
                        const email= staff.email.toString();
                        return(
                            <option value={email}>{staff.name}</option>
                        );
                    }}
                    </For>
                </datalist>
            </span>
            <label for="M14" class="font-bold pl-2">Jabatan Pemohon</label>
            <input type="text" name="M14" id="M14" value={pegawai()?.department??""} class="border border-black rounded text-sm w-11/12"/>
            <label for="M16" class="font-bold pl-2">Telefon Pemohon</label>
            <input type="text" name="M16" id="M16" value={pegawai()?.phone??""} class="border border-black rounded text-sm w-11/12"/>
            <label for="M17" class="font-bold pl-2">Emel Pemohon</label>
            <input type="email" name="M17" id="M17" value={pegawai()?.email??""} class="border border-black rounded text-sm w-11/12"/>

        </div>
    );
}