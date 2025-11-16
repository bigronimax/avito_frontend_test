interface InputProps {
  className?: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="w-[100%]">
      <input
        className={`h-[3em] w-[100%] rounded-[6px] border-[1px] border-light-grey px-[20px] py-[10px] text-[16px] text-black-text outline-none transition-all placeholder:text-grey hover:border-black-text focus:border-darker-blue ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="border-red-darker text-red shadow-sm"></div>
    </div>
  );
}
