# ✈️ SkyWings — Flight Seat Selection & Passenger Management

A responsive flight seat selection application built with **React.js** that allows passengers to select their seats, switch between aircraft seating configurations, manage individual passenger assignments, and view the total seat-selection cost in real time.

## 🌐 Live Demo

**Live Application:** https://sky-wings-flight.vercel.app

**GitHub Repository:** https://github.com/vridhi14/skyWings

---

## 📌 1. Project Overview

SkyWings is a frontend application developed as part of a Frontend Developer Assessment.

The objective is to provide an intuitive flight seat selection experience where users can:

- Choose the number of passengers.
- View and switch between individual passengers.
- Explore different aircraft seating configurations.
- Select seats for individual passengers.
- Change or remove previously assigned seats.
- View seat categories and their respective prices.
- Calculate the total seat-selection cost dynamically.

The application uses mock data and frontend state management. No backend integration or actual flight booking functionality is required for this assessment.

## 🎯 2. Project Objectives

The main objectives of this project are:

1. Implement dynamic passenger management.
2. Support multiple aircraft seating configurations.
3. Develop a reliable passenger-to-seat assignment mechanism.
4. Prevent duplicate seat assignments.
5. Implement dynamic seat pricing and total cost calculation.
6. Create a clean, responsive and user-friendly interface.
7. Maintain reusable components and understandable application logic.

## ✨ 3. Features and Functionalities

### A. Passenger Management

The application allows users to dynamically manage the number of passengers.

**Functionalities:**

- Increase or decrease the passenger count.
- Generate passenger entries based on the selected count.
- Switch between passengers.
- Display passenger identifiers.
- Display the currently assigned seat for each passenger.
- Maintain individual passenger seat assignments while switching between passengers.

Each passenger can have a maximum of one assigned seat.

### B. Aircraft Seating Configurations

SkyWings supports two aircraft seating configurations.

**1. 3–2 Seating Configuration**

This layout contains:
- Three seats on one side of the aisle.
- Two seats on the other side of the aisle.

**2. 2–3–2 Seating Configuration**

This layout contains:
- Two seats in the first group.
- Three seats in the middle group.
- Two seats in the last group.
- Aisles separating the seat groups.

Users can switch between these configurations through the layout selection controls.

The seat map displays row numbers and seat labels to make seat identification easier.

### C. Seat Availability and Categories

Seats are represented using different visual states and pricing categories.

The application distinguishes between:

| Seat State | Description |
|---|---|
| Available | A seat that can be selected |
| Occupied | A seat that is already unavailable |
| Selected | A seat assigned to the currently active passenger |
| Free | A seat with a selection price of ₹0 |

Seat categories can have different prices depending on their position or category.

Occupied seats cannot be selected.

### D. Passenger-to-Seat Assignment

This is one of the most important parts of the application.

The assignment process works as follows:

1. The user selects a passenger from the passenger list.
2. The application identifies that passenger as the active passenger.
3. The user selects an available seat from the aircraft layout.
4. The selected seat is assigned to the active passenger.
5. The passenger information is updated to display the assigned seat.
6. The seat becomes unavailable for assignment to another passenger.

**Assignment rules:**

- A passenger can have only one seat.
- A seat cannot belong to multiple passengers.
- Occupied seats cannot be assigned.
- Switching passengers does not remove previous assignments.
- Users can change or remove an existing assignment.

These rules help maintain consistency between passenger information and seat availability.

### E. Seat Pricing and Total Cost Calculation

Every seat has an associated price.

Prices may vary according to seat category or position.

The application supports:
- Free seats.
- Standard seats.
- Extra-legroom seats.
- Premium seats.

The price of a selected seat is displayed to the user.

The total seat-selection cost is calculated using the assigned seats of all passengers.

**Conceptual calculation:**

`Total Seat Cost = Sum of Prices of All Assigned Seats`

For example:

| Passenger | Assigned Seat | Price |
|---|---|---:|
| Passenger 1 | 1A | ₹0 |
| Passenger 2 | 1C | ₹350 |
| Passenger 3 | 1E | ₹250 |
| **Total** | | **₹600** |

*This is an illustrative example of the pricing calculation.*

The total updates whenever a passenger's seat is selected, changed or removed.

---

## 🧠 4. State Management and Application Logic

The application uses React state management to maintain passenger information, seat assignments, aircraft configuration and pricing.

The main application component coordinates the shared state and passes the necessary information and event handlers to child components.

### A. Passenger State

Passenger information is maintained as a collection.

Conceptually, each passenger contains:

- A unique identifier.
- Passenger information.
- An assigned seat, if any.

Example:

```js
const passengers = [
  {
    id: 1,
    name: "Passenger 1",
    seatId: null
  },
  {
    id: 2,
    name: "Passenger 2",
    seatId: null
  }
];
```

This structure allows the application to maintain individual seat assignments.

### B. Currently Selected Passenger

The application maintains the identifier of the currently active passenger.

When the user switches passengers, the active passenger identifier changes.

The seat assignment is associated with the passenger's identifier rather than being stored only as a temporary selection.

This ensures that switching passengers does not erase previous assignments.

### C. Aircraft Layout State

The selected aircraft configuration is maintained separately.

The user can switch between:

- 3–2
- 2–3–2

The seat map uses the selected configuration to determine how seats should be displayed.

### D. Seat Assignment Logic

When a user clicks an available seat, the application performs the following logical checks:

1. Identify the currently selected passenger.
2. Check whether the selected seat is available.
3. Ensure the seat is not assigned to another passenger.
4. Assign the seat to the active passenger.
5. Update the passenger information.
6. Recalculate the total seat cost.

If the passenger already has a seat, changing the assignment should update the previous assignment rather than creating a second one.

### E. Total Price Calculation

The total cost is derived from the seat assignments of all passengers.

Conceptually:

```js
const totalSeatCost = passengers.reduce(
  (total, passenger) => {
    if (!passenger.seatId) return total;

    const seat = seats.find(
      seat => seat.id === passenger.seatId
    );

    return total + (seat ? seat.price : 0);
  },
  0
);
```

This is an illustrative calculation. The actual implementation should use the seat identifiers and data structure defined in the project.

Using derived calculations helps keep the displayed total synchronized with passenger assignments.

---

## 🏗️ 5. Component Architecture

The application follows a component-based architecture to separate responsibilities and improve maintainability.

The main responsibilities are divided as follows:

| Component / Module | Responsibility |
|---|---|
| App | Coordinates application state and main application flow |
| Header | Displays flight information and branding |
| Passenger Section | Displays passengers and manages passenger selection |
| SeatMap | Displays the aircraft seating arrangement |
| Seat Component | Represents an individual seat and its state |
| Booking Summary | Displays assigned seats and pricing information |
| Seat Data Module | Contains mock seat information and pricing |

*Component names above describe the intended responsibilities. Refer to the actual source files for the exact filenames and implementation.*

### Why Component-Based Architecture?

- Makes the application easier to maintain.
- Separates UI responsibilities.
- Reduces unnecessary code duplication.
- Makes individual components easier to understand.
- Allows components to be reused across the application.

---

## 🛠️ 6. Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend application development |
| JavaScript | Application logic and interactions |
| HTML5 | Application structure |
| CSS / Tailwind CSS | Styling and responsive UI |
| Vite | Development server and build tooling |
| Git & GitHub | Version control and source code management |
| Vercel | Application deployment |

*Keep only the technologies actually used in the repository.*

---

## 📂 7. Project Structure

The project is organized into reusable components and data modules.

A conceptual structure is shown below:

```text
skyWings/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SeatMap.jsx
│   │   └── BookingSummary.jsx
│   │
│   ├── data/
│   │   └── seats.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*This is an illustrative structure. Update it to match the actual files and folders in the GitHub repository.*

---

## 📱 8. UI/UX and Responsiveness

The interface is designed to provide a simple and intuitive seat-selection experience.

The design focuses on:

- Clear flight information.
- Easy passenger navigation.
- Clearly labelled aircraft seating configurations.
- Visual distinction between seat states.
- Visible seat pricing.
- Clear passenger-to-seat assignment information.
- A transparent breakdown of seat-selection charges.
- Responsive presentation across different screen sizes.

The interface should provide appropriate feedback for invalid actions and unavailable seats.

---

## 🧪 9. Edge Cases and Validation

The application should handle important edge cases to maintain consistent behaviour.

| Scenario | Expected Behaviour |
|---|---|
| Passenger has no assigned seat | Display that no seat has been selected |
| User selects an occupied seat | Prevent the assignment |
| User tries to assign the same seat twice | Prevent duplicate assignment |
| User switches passengers | Preserve existing assignments |
| User changes an assigned seat | Update the passenger's seat |
| User removes an assigned seat | Clear the assignment |
| Seat price is ₹0 | Include zero in the total |
| Passenger count changes | Keep passenger data consistent |
| No seats are assigned | Display a total of ₹0 |

---

## 🚀 10. Installation and Local Setup

Follow these steps to run the project locally.

**Step 1: Clone the repository**

```bash
git clone https://github.com/vridhi14/skyWings.git
```

**Step 2: Navigate to the project directory**

```bash
cd skyWings
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

**Step 5: Open the application**

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

**Step 6: Create a production build**

```bash
npm run build
```

---

## ☁️ 11. Deployment

The application is deployed using Vercel and connected to its GitHub repository.

Deployment workflow:

1. Push the source code to GitHub.
2. Import the GitHub repository into Vercel.
3. Configure the project using the Vite build settings.
4. Deploy the application.
5. Access the deployed application through its Vercel URL.

Vercel can automatically trigger new deployments when changes are pushed to the connected production branch.

---

## 🔮 12. Future Improvements

Possible improvements include:

- Passenger name and personal information forms.
- Meal selection for individual passengers.
- Additional aircraft configurations.
- More detailed seat categories.
- Improved accessibility and keyboard navigation.
- Enhanced seat-selection animations.
- Persistent booking information.
- Backend integration for real booking workflows.

These are potential enhancements and are not claims about the current implementation.

---

## 📋 13. Assessment Requirements Coverage

| Assessment Requirement | Application Area |
|---|---|
| Passenger count selection | Passenger Management |
| Dynamic passenger list | Passenger Management |
| Passenger switching | Passenger Management |
| 3–2 aircraft configuration | Aircraft Seat Layout |
| 2–3–2 aircraft configuration | Aircraft Seat Layout |
| Seat labels and row numbers | Seat Map |
| Available and occupied seats | Seat Availability |
| One seat per passenger | Assignment Logic |
| No duplicate seat assignments | Assignment Logic |
| Change or remove a seat | Assignment Logic |
| Different seat prices | Pricing |
| Dynamic total calculation | Booking Summary |
| Responsive interface | UI/UX |
| Reusable components | Component Architecture |
| State management explanation | Application Logic |

### Evaluation Criteria

The project is developed with the assessment's evaluation areas in mind:

| Evaluation Area | Weight |
|---|---:|
| UI/UX and visual implementation | 20% |
| Seat layout and configuration handling | 20% |
| Passenger and seat assignment logic | 20% |
| Pricing and total calculations | 15% |
| Code quality and component architecture | 15% |
| Responsiveness and edge-case handling | 10% |
| **Total** | **100%** |

---

## 📝 14. Important Notes

- This project uses mock data.
- No backend integration is required.
- The application demonstrates frontend seat-selection and passenger-management functionality.
- It does not perform actual flight reservations or payments.
- Seat availability and pricing are based on the application's predefined data.

---

## 👩‍💻 Author

**Vridhi**
GitHub: https://github.com/vridhi14

---

**SkyWings — Making flight seat selection simple and intuitive.** ✈️
