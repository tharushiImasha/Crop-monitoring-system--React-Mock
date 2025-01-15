export function Inputs({ label, placeholder, type = 'text', name, value, onChange }) {
    return (
        <>
            <div className="mb-4">
                <label className="block text-[12px] font-medium text-gray-700 mb-3 font-bold" htmlFor={name}>
                    {label}
                </label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="block w-full h-[38px] px-3 py-2 bg-[transparent] border border-gray-300 rounded-[10px] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#026664af] focus:border-[#026664af] text-[12px]"
                />
            </div>
        </>
    );
}