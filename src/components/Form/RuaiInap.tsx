import Input from "../Input";

export default function RuaiInap(){
    return(
        <>
            <div class="grid grid-cols-2 w-full border border-black col-span-full gap-2 p-2">
            <Input name="F27" label="Tarikh Masuk" />
            <Input name="F28" label="Tarikh Keluar"/>
        
            <span class="col-span-full">
            <h3 class="bg-slate-400 col-span-full font-bold text-white text-center border border-black">
                Bilik Perseorangan (HOD)</h3>
            <div class="col-span-full border border-black grid grid-cols-2 gap-2 p-2">
                <Input name="F30" label="L"/>
                <Input name="H30" label="P"/>
            </div>           
            </span>

            <span class="col-span-2">
            <h3 class="bg-slate-400 col-span-full font-bold text-white text-center border border-black">
                Bilik Berkongsi Berdua</h3>
            <div class="col-span-full border border-black grid grid-cols-2 gap-2 p-2">
                <Input name="N30" label="L"/>
                <Input name="P30" label="P"/>
            </div>
            </span>
            
            <label for="D31" class="font-bold">Catatan</label>
            <textarea name="D31" id="D31" class="border border-black rounded"></textarea>
            </div>
        </>
    );
}