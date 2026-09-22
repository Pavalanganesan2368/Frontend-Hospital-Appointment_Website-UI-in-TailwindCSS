// Shared Data: Mock Doctors Database
const doctors = [
    {
        id: 1,
        name: "Dr. Arun Kumar",
        specialization: "Cardiology",
        experience: 10,
        fee: 500,
        days: "Monday - Friday",
        times: ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"],
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        name: "Dr. Sarah Jenkins",
        specialization: "Neurology",
        experience: 12,
        fee: 750,
        days: "Tuesday - Saturday",
        times: ["10:00 AM", "11:30 AM", "01:00 PM", "04:00 PM"],
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        name: "Dr. Michael Chen",
        specialization: "Orthopedics",
        experience: 8,
        fee: 600,
        days: "Monday, Wednesday, Friday",
        times: ["09:30 AM", "11:00 AM", "02:30 PM", "04:30 PM"],
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        name: "Dr. Priya Sharma",
        specialization: "Pediatrics",
        experience: 15,
        fee: 400,
        days: "Monday - Saturday",
        times: ["08:30 AM", "10:00 AM", "12:00 PM", "03:00 PM"],
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        name: "Dr. David Wilson",
        specialization: "Dermatology",
        experience: 5,
        fee: 450,
        days: "Tuesday, Thursday, Saturday",
        times: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        name: "Dr. Emily Roberts",
        specialization: "General Medicine",
        experience: 20,
        fee: 300,
        days: "Monday - Friday",
        times: ["08:00 AM", "10:00 AM", "01:00 PM", "04:00 PM"],
        image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
];

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.setAttribute('min', today);
        });
    }
});

// Helper Function: Parse URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}