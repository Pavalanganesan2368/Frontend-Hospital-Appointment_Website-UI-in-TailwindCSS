# Modern Hospital Appointment Booking Website

## Project Description
A complete, modern, and responsive Hospital Appointment Booking Website built entirely with HTML5, Vanilla JavaScript, and Tailwind CSS. The website allows patients to browse available doctors, filter by specialization, and seamlessly book appointments. It includes a complete flow from the homepage to an appointment management dashboard, utilizing `localStorage` to persist appointment data without a backend database.

## Features
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop screens.
- **Home Page**: Features a hero section, quick search form, services cards, and why choose us section.
- **Doctor Directory**: View a list of doctors, search by name, and filter by specialization.
- **Appointment Booking**: Dynamic form that loads doctors based on selected specialization and populates available time slots.
- **Form Validation**: Native HTML5 and JavaScript validation for email, phone, age, and required fields.
- **My Appointments Dashboard**: View confirmed appointments, cancel appointments, and book new ones.
- **Data Persistence**: Uses browser `localStorage` to store and retrieve appointment bookings.

## Technologies Used
- HTML5
- Tailwind CSS (via Tailwind CLI)
- Vanilla JavaScript (ES6)
- FontAwesome Icons
- `localStorage` API

## Folder Structure
```text
hospital-appointment/
│
├── index.html
├── doctors.html
├── appointments.html
├── package.json
├── tailwind.config.js
├── src/
│ └── input.css
├── dist/
│ └── output.css
├── js/
│ ├── main.js
│ ├── doctors.js
│ └── appointments.js
└── README.md
```

## Installation & Setup

1. **Prerequisites**
   - Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. **Clone / Open the Project**
   - Navigate to the project directory: `cd hospital-appointment`

3. **Install Dependencies**
   - Install Tailwind CSS:
     ```bash
     npm install
     ```

## TailwindCSS CLI Commands

To build the CSS for production, run:
```bash
npm run build:css
```
*(This maps to: `npx tailwindcss -i ./src/input.css -o ./dist/output.css`)*

To run Tailwind in watch mode during development:
```bash
npm run watch:css
```
*(This maps to: `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`)*

## How to Run the Project

Since this is a frontend-only project with no backend dependencies, you can simply open the `index.html` file in any modern web browser.
For the best experience, use a local server like **Live Server** (VS Code extension) to serve the files.

1. Open the project in your code editor.
2. Run the Tailwind watch command: `npm run watch:css`
3. Launch `index.html` with Live Server.

## How the Application Works

### JavaScript and Appointment Booking
The logic is divided into three main files:
- **`main.js`**: Contains shared configuration (like the mock `doctors` data array) and global UI events like the mobile navbar toggle.
- **`doctors.js`**: Handles reading the URL parameters (for quick search), filtering the doctors list, and dynamically rendering the doctor cards on the `doctors.html` page.
- **`appointments.js`**: Controls the logic on `appointments.html`. It manages switching between the "My Appointments" list and the "Book Appointment" form.
  - **Dynamic Dropdowns**: When you select a Specialization, JavaScript filters the `doctors` array and populates the Doctor dropdown. When a doctor and date are selected, it dynamically populates the available time slots based on the specific doctor's schedule.

### How `localStorage` is Used
When an appointment is successfully booked:
1. JavaScript creates an `appointment` object.
2. It retrieves any existing appointments from the browser's `localStorage` (parsing the JSON string back to an array).
3. The new appointment is pushed to the array.
4. The array is stringified and saved back to `localStorage` under the key `hospitalAppointments`.
5. On the "My Appointments" tab, JavaScript reads this data from `localStorage` and generates the appointment cards on the screen.
6. When an appointment is canceled, the specific appointment is filtered out of the array and the updated array is saved back to `localStorage`.

## Future Improvements
- **Backend Integration**: Replace `localStorage` with a real database (e.g., MongoDB, PostgreSQL) and a backend API (e.g., Node.js/Express, Python).
- **Authentication**: Add User login and Doctor dashboards for a multi-role application.
- **Payment Gateway**: Integrate Stripe or Razorpay to collect consultation fees at the time of booking.
- **Email/SMS Notifications**: Send automated confirmation messages using services like Twilio or SendGrid.
