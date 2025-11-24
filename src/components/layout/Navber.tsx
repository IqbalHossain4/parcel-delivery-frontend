import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { ModeToggle } from "../ui/ModeToggler";
import Logo from "../../assets/icon/Logo";
import { Link } from "react-router";
import {
  authApi,
  useSignoutMutation,
  useUserInfoQuery,
} from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/hook";

const navigationLinks = [
  { href: "/", label: "Home", role: "public" },
  { href: "/about-us", label: "About Us", role: "public" },
  { href: "/contact-us", label: "Contact Us", role: "public" },
  { href: "/admin", label: "Dashboard", role: "admin" },
  { href: "/sender", label: "Dashboard", role: "sender" },
  { href: "/receiver", label: "Dashboard", role: "receiver" },
];

export default function Navber() {
  const [signout] = useSignoutMutation();
  const { data } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();

  console.log(data);
  const handleSignout = async () => {
    await signout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="border-b px-4 md:px-6 container mx-auto">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink href={link.href} className="py-1.5">
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <>
                    {link?.role === "public" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link?.role === data?.data?.role && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {data?.data?.email ? (
            <Button
              variant="outline"
              onClick={handleSignout}
              size="sm"
              className="text-sm"
            >
              SignOut
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
