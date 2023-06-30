import Input from "../Input";

export default function Program(){
    return(
        <>
            <div class="grid grid-cols-2 w-full border border-black col-span-full gap-2 p-2">
            <Input name="E21" label="Nama Program" required={true} />
            <Input name="E22" label="Jumlah Peserta"/>
            <Input name="M21" label="Tarikh Mula"/>
            <Input name="M22" label="Tarikh Akhir"/>
            <Input name="M23" label="Masa Seminar"/>
            </div>
        </>
    );
}