import { validateStaff, type IStaff } from "../models/Staff";


export default function AddStaff(props:{token:string}){
    return(
       <form 
            class="grid grid-cols-2 gap-2 border border-black"
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
                .then(data=>alert(data.message))
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