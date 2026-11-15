
import { Plane, Clock } from "lucide-react";

function Header() {
  return (
    <header className="flight-header">
      <div className="airline-info">
        <div className="airline-logo">
          <Plane size={24} />
        </div>
        <div>
          <h2>SkyWings</h2>
          <p>Flight Booking</p>
        </div>
      </div>

      <div className="flight-details">
        <div className="airport">
          <h2>DEL</h2>
          <p>New Delhi</p>
        </div>

        <div className="flight-route">
          <div className="route-line">
            <span></span>
            <Plane size={20} />
            <span></span>
          </div>
          <p><Clock size={14} /> 2h 15m</p>
        </div>

        <div className="airport">
          <h2>BOM</h2>
          <p>Mumbai</p>
        </div>
      </div>

      <div className="flight-meta">
        <p>Flight: <strong>SW 204</strong></p>
        <p>Date: <strong>20 Nov 2026</strong></p>
      </div>
    </header>
  );
}

export default Header;
