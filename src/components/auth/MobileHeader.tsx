import { Link } from "react-router-dom";

const MobileHeader = () => (
  <div
    className="flex md:hidden flex-col items-center justify-center py-8 px-6"
    style={{
      background:
        "linear-gradient(135deg, #5B4FE8 0%, #6C63FF 50%, #3730A3 100%)",
      minHeight: 140,
    }}
  >
    <Link to="/" className="flex items-center gap-2 no-underline hover:opacity-95">
      <span className="text-lg">🎓</span>
      <span className="text-lg font-bold text-white">ESTIN Hub</span>
    </Link>
    <p className="text-white text-[22px] font-bold mt-2">
      Your campus, organized.
    </p>
  </div>
);

export default MobileHeader;

