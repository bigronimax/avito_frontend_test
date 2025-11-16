import { NavLink } from "react-router";

interface NavMenuLinkProps {
  to: string;
  text: string;
}

export default function NavMenuLink({ to, text }: NavMenuLinkProps) {
  return (
    <NavLink
      className="text-[16px] text-blue-link transition-all duration-200 ease-in-out hover:to-blue-link-hover"
      to={to}
    >
      {text}
    </NavLink>
  );
}
