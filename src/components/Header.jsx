import { Plane, ShieldCheck } from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="brand">
        <div className="brand-icon">
          <Plane size={23} />
        </div>

        <div>
          <h2>AEROLUX</h2>
          <span>AIRLINES</span>
        </div>
      </div>

      <div className="secure-label">
        <ShieldCheck size={18} />
        <span>Secure Booking</span>
      </div>

    </header>
  );
}

export default Header;
