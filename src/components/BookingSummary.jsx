
function BookingSummary({ passengers, seats, totalPrice }) {
  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      {passengers.map((passenger) => {
        const seat = seats.find(
          (item) => item.id === passenger.seat
        );

        return (
          <div className="summary-item" key={passenger.id}>
            <div>
              <h4>{passenger.name}</h4>
              <p>
                Seat: {seat ? seat.id : "Not selected"}
              </p>
              <p>
                Category: {seat ? seat.category : "—"}
              </p>
            </div>

            <strong>
              ₹{seat ? seat.price : 0}
            </strong>
          </div>
        );
      })}

      <div className="summary-total">
        <h3>Total Amount</h3>
        <h2>₹{totalPrice}</h2>
      </div>
    </div>
  );
}

export default BookingSummary;
