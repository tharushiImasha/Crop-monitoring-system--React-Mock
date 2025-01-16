export function AddButton({name}) {
    return (
        <>
            <button
                type="submit"
                className="my-10 px-4 py-2 bg-[#162635] text-white rounded-[10px] hover:bg-[#004463] w-[145px] h-[40px] flex items-center justify-center text-[15px] float-right">
                {name}
            </button>
        </>
    );
}