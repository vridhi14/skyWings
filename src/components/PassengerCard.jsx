
function PassengerCard(props) {
  return (
    <div className="passenger-card">
      <h3>{props.name}</h3>
      <p>Seat: {props.seat}</p>
    </div>
  );
}

export default PassengerCard;
