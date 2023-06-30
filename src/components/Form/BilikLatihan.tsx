import Input from "../Input";

export default function BilikLatihan(){
    return(
        <>
            <div class="grid grid-cols-2 w-full col-span-full gap-2 p-2 border border-black">
        
            <span class="col-span-full text-sm border border-black ">
            <h3 class="bg-slate-400 col-span-full font-bold text-white text-center border border-black">
                Maklumat Tempahan Bilik Latihan
            </h3>
                <div class="grid grid-cols-2 gap-2 pb-2 border border-black">
                <span class="bg-slate-300 col-span-full font-bold text-center">Jenis Bilik</span>
                <Input name="E39" label="Bilik Kuliah"/>
                <Input name="E40" label="Bilik Bengkel"/>
                <Input name="E41" label="Bilik Seminar"/>
                <Input name="E42" label="Makmal Komputer"/>
                <Input name="E43" label="Dewan Rempah Ratus"/>
                <Input name="E45" label="Lain-lain (Nyatakan)"/>
                </div>
                <div class="grid grid-cols-2 gap-2 pb-2 border border-black">
                <span class="bg-slate-300 col-span-full font-bold text-center">Susun Atur</span>
                <Input name="I39" label="Classroom"/>
                <Input name="I40" label="Cluster"/>
                <Input name="I41" label="U-Shape"/>
                <Input name="I42" label="Fishbone"/>
                <Input name="I43" label="Theatre"/>
                <Input name="I45" label="Lain-lain (Nyatakan)"/>
                </div>
      
            </span>

            <span class="col-span-full text-sm">
            <h3 class="bg-slate-400 col-span-full font-bold text-white text-center border border-black">
                Maklumat Tempahan (Audio-Visual)</h3>
            <div class="col-span-full border border-black grid grid-cols-2 gap-2 p-2">
                <Input name="O39" label="LCD Projector"/>
                <Input name="O40" label="PA (Cordless/Collar Mic)"/>
                <Input name="O41" label="Portable PA (TOA)"/>
                <Input name="O42" label="Bateri (AAA,AAA)"/>
                <Input name="O43" label="Flip Chart Stand"/>
                <Input name="O44" label="A4 Paper"/>
                <Input name="O45" label="Kertas Mahjong"/>
                <Input name="O46" label="Alat Tulis"/>
                <Input name="O47" label="Lain-lain (Nyatakan)"/>
                <Input name="D47" label="Catatan"/>

            </div>
            </span>
            
            <label for="D47" class="font-bold">Catatan</label>
            <textarea name="D47" id="D47" class="border border-black rounded"></textarea>
            </div>
        </>
    );
}