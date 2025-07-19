import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
          <img src={logo} alt="Logo" className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
