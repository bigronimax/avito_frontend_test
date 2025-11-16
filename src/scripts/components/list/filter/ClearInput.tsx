import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ClearInputProps {
  className?: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

function ClearInput({
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
  onClear,
}: ClearInputProps) {
  return (
    <div>
      <div className="relative">
        <input
          className={`h-[2.5em] w-[100%] rounded-[6px] border-[1px] border-light-grey py-[10px] pl-[20px] pr-[2.5em] text-[16px] text-black-text outline-none transition-all placeholder:text-grey hover:border-black-text focus:border-darker-blue ${className}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute right-[0.5em] top-[50%] translate-y-[-50%] cursor-pointer text-grey transition-all hover:text-black-text"
          onClick={onClear}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="input-error error"></div>
    </div>
  );
}

export default ClearInput;
