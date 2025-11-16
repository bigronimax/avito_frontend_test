import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface BaseModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  children: React.ReactNode;
}

function BaseModal({ isActive, setActive, children }: BaseModalProps) {
  return (
    <div
      className={`fixed left-0 top-0 z-[1001] h-[100%] w-[100%] bg-black bg-opacity-75 transition-opacity duration-200 ease-in-out ${isActive ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div
        className={`absolute left-1/2 top-1/2 z-[1001] w-[22.5em] -translate-x-1/2 -translate-y-1/2 transform rounded-[12px] bg-white p-[3.125em] transition-opacity duration-200 ease-in-out ${isActive ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div
          onClick={() => setActive(false)}
          className="absolute right-[14px] top-[14px] cursor-pointer text-center text-grey transition-colors duration-200 ease-in-out hover:text-black-text"
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
