import { Link } from "react-router";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link to={"/list"} className="flex items-center">
      <h2 className={`text-3xl font-bold text-blue ${className} `}>
        Авито-тест
      </h2>
    </Link>
  );
}
