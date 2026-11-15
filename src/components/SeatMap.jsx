
function SeatMap({
  seats,
  layout,
  passengers,
  selectedPassenger,
  selectedSeat,
  onSeatSelect
}) {

  // Get unique row numbers
  const rows = [...new Set(seats.map((seat) => seat.row))];

  // Group sizes according to aircraft layout
  const groupSizes = layout === "3-2" ? [3, 2] : [2, 3, 2];

  return (
    <div className="seat-map-container">

      <h2>Select Your Seat</h2>

      {/* Seat Legend */}
      <div className="seat-legend">
     <span><i className="legend-dot available-dot"></i> Available</span>
     <span><i className="legend-dot selected-dot"></i> Selected</span>
     <span><i className="legend-dot occupied-dot"></i> Occupied</span>
     <span><i className="legend-dot premium-dot"></i> Premium</span>
     <span><i className="legend-dot extra-dot"></i> Extra Legroom</span>
       </div>

      <div className="aircraft">

        {rows.map((rowNumber) => {

          // Get seats belonging to this row
          const rowSeats = seats.filter(
            (seat) => seat.row === rowNumber
          );

          // Divide seats into groups
          let startIndex = 0;

          const seatGroups = groupSizes.map((size) => {
            const group = rowSeats.slice(
              startIndex,
              startIndex + size
            );

            startIndex += size;

            return group;
          });

          return (
            <div className="seat-row" key={rowNumber}>

              <span className="row-number">
                {rowNumber}
              </span>

              {seatGroups.map((group, index) => (

                <div className="seat-group" key={index}>

                  {group.map((seat) => {

                    // Check if another passenger owns this seat
                    const assignedToOther = passengers.some(
                      (passenger) =>
                        passenger.seat === seat.id &&
                        passenger.id !== selectedPassenger
                    );

                    const isOccupied =
                      seat.status === "occupied" || assignedToOther;

                    // Check whether current passenger selected this seat
                    const isSelected = selectedSeat === seat.id;

                    return (
                      <button
                        key={seat.id}
                        disabled={isOccupied}
                        className={`seat ${
  isOccupied
    ? "occupied"
    : isSelected
    ? "selected"
    : seat.category === "Premium"
    ? "premium"
    : seat.category === "Extra Legroom"
    ? "extra-legroom"
    : "available"
}`}
                        onClick={() => onSeatSelect(seat.id)}
                        title={`${seat.id} - ${seat.category} - ₹${seat.price}`}
                      >
                        {seat.label}
                      </button>
                    );

                  })}

                </div>

              ))}

            </div>
          );

        })}

      </div>

      {/* Selected Seat Details */}
      <div className="selected-info">
  {selectedSeat ? (
    <>
      <h3>Selected Seat: {selectedSeat}</h3>

      <p>
        Category: {
          seats.find((seat) => seat.id === selectedSeat)?.category
        }
      </p>

      <p>
        Price: ₹
        {seats.find((seat) => seat.id === selectedSeat)?.price}
      </p>
    </>
  ) : (
    <h3>Please select a seat</h3>
  )}
</div>

    </div>
  );
}

export default SeatMap;
