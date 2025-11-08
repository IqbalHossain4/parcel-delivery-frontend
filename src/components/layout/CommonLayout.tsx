import type { ReactNode } from "react";
import Navber from "./Navber";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  console.log(children);
  return (
    <div className="min-h-screen flex flex-col">
      <Navber />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
