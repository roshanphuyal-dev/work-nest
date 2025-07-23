import { HashLoader } from "react-spinners";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <HashLoader color="#155dfc" speedMultiplier={1.5} />
    </div>
  );
}
