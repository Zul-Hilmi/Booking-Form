import { For, Show } from "solid-js";
import Input from "../Input";

export default function MakanMinum(){
    return(
        <>
        <div class="grid grid-cols-2 w-full border border-black col-span-full gap-2 p-2">
            <Input name="G52" label="Kod Material"/>
            <Input name="G53" label="GL Kod"/>
            <Input name="G54" label="Pusat Kos"/>
            <Input name="G55" label="Bajet Makan Minum Yang Diluluskan"/>
            <Input name="G56" label="Catatan"/>
            <div class="overflow-x-scroll col-span-full text-sm rounded">
            <table>
                <thead>
                    <tr>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Tarikh
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Sarapan<br/>(7:00 AM)
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Minum Pagi<br/>(9:30 AM)
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Makan Tengahari<br/>(12:30 AM)
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Minum Petang<br/>(3:30 PM)
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Makan Malam<br/>(6:30 PM)
                        </td>
                        <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">
                            Minum Malam<br/>(9:30 PM)
                        </td>
                    </tr>
                </thead>
                <tbody>
                    
                <For each={Array.from({ length: 7 }, (_, i) => 59 + i)}>
                    {(number,i)=>{
                        return(
                            <tr>
                                <td class="border border-black text-center">
                                    <input type="date" name={`C${number}`} min=""/>
                                </td>
                                <td class="border border-black text-center"><input type="number" name={`F${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`H${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`J${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`L${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`N${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`P${number}`} min="0" class="text-center" placeholder="PAX"/></td>

                            </tr>
                        );
                    }}
                </For>
                <tr>
                    <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center"></td>
                    <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">Sahur<br/>(4:00 AM)</td>
                    <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">Buka Puasa<br/>(7:00 PM)</td>
                    <td class="border border-black bg-slate-500 text-white font-bold p-2 text-center">Moreh<br/>(9:00 PM)</td>
                    <td class="border border-black bg-slate-500 font-bold" colspan="3" rowspan="6"></td>
                </tr>
                <For each={Array.from({length:5},(_,i)=>67+i)}>
                    {(number,i)=>{
                        return(
                            <tr>
                                <td class="border border-black text-center"><input type="date" name={`C${number}`}/></td>
                                <td class="border border-black text-center"><input type="number" name={`F${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`H${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                                <td class="border border-black text-center"><input type="number" name={`J${number}`} min="0" class="text-center" placeholder="PAX"/></td>
                            </tr>
                        );
                    }}
                </For>
                </tbody>
            </table>
            </div>

            <Input name="E74" label="Dome Set"/>
            <Input name="K74" label="Vegetarian"/>
            <Input name="D76" label="Catatan"/>
        </div>
        </>
    );
}