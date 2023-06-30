import type { HydratedDocument } from "mongoose";
import { For, Show, createSignal, onMount } from "solid-js";
import type { IForm } from "../models/Form";

export default function FormList(props:{token:string}){
    const [forms,setForms] = createSignal<HydratedDocument<IForm>[]>([]);
    const fetchForms = async()=>{
        const res = await fetch('/api/forms',{headers:{'Auth':`Bearer ${props.token}`}})
        const data = await res.json();
        if(res.ok)setForms(data.forms);
        else alert(data.message);
}
    onMount(async()=>await fetchForms())
    return(
        <div class={`w-full border border-black text-center ${forms().length <1?"bg-red-500 text-white font-bold":""}`}>
            <Show when={forms().length > 0} fallback={<strong class="font-bold">Tiada Tempahan</strong>}>
                <h3 class="bg-slate-500 text-white font-bold p-2">Senarai Borang Tempahan</h3>
                <div class="flex flex-col gap-3 p-2">
                    <For each={forms()}>
                    {(form,i)=>
                     (
                         <div class="border border-black rounded font-bold p-2">
                            <span class="font-bold underline">{form.E21}</span><br/>
                            Dari:<span class="underline font-bold text-blue-600">{form.E17}</span>
                            &nbsp;({form.E15}) <br />
                            <button
                             class="bg-red-500 text-white font-bold p-2 rounded text-sm hover:bg-red-600"
                             onClick={async(e)=>{
                                const res = await fetch(`/api/forms/${form._id}`,{
                                    method:"DELETE",
                                    headers:{
                                        "Auth":`Bearer ${props.token}`
                                    }
                                });
                                const data = await res.json();
                                alert(data.message);
                                if(res.ok) await fetchForms();
                            }}>DELETE</button>&nbsp;
                            <button
                             class="bg-blue-500 text-white font-bold p-2 rounded text-sm hover:bg-blue-600" 
                             onClick={async(e)=>{
                                const res = await fetch(`/api/forms/${form._id}`,{
                                    method:"POST",
                                    headers:{"Auth":`Bearer ${props.token}`}
                                });
                                if(res.ok){
                                    const data = await res.blob();
                                    const url = URL.createObjectURL(data);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'Borang Tempahan.xlsx';
                                    link.style.display = 'none';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(url);
                                    
                                    await fetchForms();
                                }else{
                                    const data = await res.json();
                                    alert(data.message);

                                }
                            }}>DOWNLOAD</button>
                        </div>
                     )
                    }
                    </For>
                </div>
            </Show>
        </div>
    );
}