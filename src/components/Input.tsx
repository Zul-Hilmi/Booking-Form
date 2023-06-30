import { Show } from "solid-js"

export default function Input(props:{
    name:string,
    label:string,
    type?:string,
    required?:boolean,
}){
    return(
        <>
            <label for={props.name}
                class="font-bold pl-2"
            >
                {props.label}
                <Show when={props.required}>
                <strong class="font-bold text-red-500">*</strong>    
                </Show>
            </label>
            <input 
                type={props.type??"text"} 
                name={props.name} 
                id={props.name}
                required={props.required??false}
                class="border border-black rounded text-sm w-11/12 "
            />
        </>
    )
}