import Logo from "./Logo";
import NavMenuLink from "./NavMenuLink";

export default function Header() {
  return (
    <>
      <header className="sticky left-0 right-0 top-0 z-50 bg-white">
        <div className="container">
          <div className="flex h-[80px] items-center justify-between py-[20px]">
            <Logo />
            <div className="flex h-[2.5em] items-center gap-[40px]">
              <nav className="flex h-[100%] items-center gap-[40px]">
                <NavMenuLink text={"Список"} to={"/list"} />
                <NavMenuLink text={"Статистика"} to={"/stats"} />
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
