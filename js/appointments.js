document.addEventListener('DOMContentLoaded', () => {
    // Only run on appointments page
    const appointmentsList = document.getElementById('appointments-list');
    if (!appointmentsList) return;

    // Elements
    const tabMyAppointments = document.getElementById('tab-my-appointments');
    const tabBookAppointment = document.getElementById('tab-book-appointment');
    const sectionMyAppointments = document.getElementById('section-my-appointments');
    const sectionBookAppointment = document.getElementById('section-book-appointment');
    const btnBookNew = document.getElementById('btn-book-new');
    const noAppointmentsMsg = document.getElementById('no-appointments-msg');

    // Form Elements
    const bookingForm = document.getElementById('appointment-form');
    const specSelect = document.getElementById('form-specialization');
    const doctorSelect = document.getElementById('form-doctor');
    const dateSelect = document.getElementById('form-date');
    const timeSelect = document.getElementById('form-time');
    const doctorInfoCard = document.getElementById('doctor-info-card');
    const bookingSuccess = document.getElementById('booking-success');

    // Tab Switching Logic
    function switchTab(tabId) {
        if (tabId === 'book') {
            tabMyAppointments.classList.remove('bg-white', 'shadow', 'text-primary');
            tabMyAppointments.classList.add('text-gray-600', 'hover:text-gray-900');
            
            tabBookAppointment.classList.add('bg-white', 'shadow', 'text-primary');
            tabBookAppointment.classList.remove('text-gray-600', 'hover:text-gray-900');
            
            sectionMyAppointments.classList.add('hidden');
            sectionBookAppointment.classList.remove('hidden');
        } else {
            tabBookAppointment.classList.remove('bg-white', 'shadow', 'text-primary');
            tabBookAppointment.classList.add('text-gray-600', 'hover:text-gray-900');
            
            tabMyAppointments.classList.add('bg-white', 'shadow', 'text-primary');
            tabMyAppointments.classList.remove('text-gray-600', 'hover:text-gray-900');
            
            sectionBookAppointment.classList.add('hidden');
            sectionMyAppointments.classList.remove('hidden');
            
            // Re-render appointments when switching back to list
            renderAppointments();
        }
    }

    tabMyAppointments.addEventListener('click', () => switchTab('list'));
    tabBookAppointment.addEventListener('click', () => switchTab('book'));
    btnBookNew.addEventListener('click', () => switchTab('book'));

    // Check URL for direct booking
    const urlTab = getQueryParam('tab');
    const urlDoctorId = getQueryParam('doctor');
    
    if (urlTab === 'book') {
        switchTab('book');
    }

    // --- Dynamic Form Logic ---

    // 1. When Specialization Changes -> Update Doctors List
    specSelect.addEventListener('change', function() {
        const selectedSpec = this.value;
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        doctorInfoCard.classList.add('hidden');
        timeSelect.innerHTML = '<option value="">Select a date first</option>';
        timeSelect.disabled = true;

        if (selectedSpec) {
            const filteredDoctors = doctors.filter(doc => doc.specialization === selectedSpec);
            
            if (filteredDoctors.length > 0) {
                filteredDoctors.forEach(doc => {
                    const option = document.createElement('option');
                    option.value = doc.id;
                    option.textContent = doc.name;
                    doctorSelect.appendChild(option);
                });
                doctorSelect.disabled = false;
            } else {
                doctorSelect.innerHTML = '<option value="">No doctors available</option>';
                doctorSelect.disabled = true;
            }
        } else {
            doctorSelect.innerHTML = '<option value="">First select a specialization</option>';
            doctorSelect.disabled = true;
        }
    });

    // 2. When Doctor Changes -> Show Doctor Info
    doctorSelect.addEventListener('change', function() {
        const docId = parseInt(this.value);
        if (docId) {
            const doc = doctors.find(d => d.id === docId);
            if (doc) {
                doctorInfoCard.innerHTML = `
                    <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                        <img src="${doc.image}" alt="${doc.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800">${doc.name}</h4>
                        <p class="text-sm text-gray-600">Fee: ₹${doc.fee} | Available: ${doc.days}</p>
                    </div>
                `;
                doctorInfoCard.classList.remove('hidden');
                
                // If date is already selected, update time slots
                if (dateSelect.value) {
                    generateTimeSlots(doc);
                }
            }
        } else {
            doctorInfoCard.classList.add('hidden');
            timeSelect.innerHTML = '<option value="">Select a doctor first</option>';
            timeSelect.disabled = true;
        }
    });

    // 3. When Date Changes -> Generate Time Slots
    dateSelect.addEventListener('change', function() {
        const docId = parseInt(doctorSelect.value);
        if (docId && this.value) {
            const doc = doctors.find(d => d.id === docId);
            generateTimeSlots(doc);
        } else if (!docId) {
            timeSelect.innerHTML = '<option value="">Select a doctor first</option>';
        }
    });

    function generateTimeSlots(doctor) {
        if (!doctor) return;
        
        timeSelect.innerHTML = '<option value="">Select Time Slot</option>';
        
        doctor.times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
        
        timeSelect.disabled = false;
    }

    // Auto-select doctor if coming from URL
    if (urlDoctorId) {
        const docId = parseInt(urlDoctorId);
        const doc = doctors.find(d => d.id === docId);
        if (doc) {
            specSelect.value = doc.specialization;
            // Trigger change event to populate doctors
            specSelect.dispatchEvent(new Event('change'));
            doctorSelect.value = doc.id;
            // Trigger change event to show doctor info
            doctorSelect.dispatchEvent(new Event('change'));
        }
    }

    // --- Form Submission & LocalStorage Logic ---

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const docId = parseInt(doctorSelect.value);
        const selectedDoctor = doctors.find(d => d.id === docId);

        if (!selectedDoctor) return;

        const appointment = {
            id: Date.now(), // Generate unique ID
            patientName: document.getElementById('patient-name').value,
            age: document.getElementById('patient-age').value,
            gender: document.getElementById('patient-gender').value,
            phone: document.getElementById('patient-phone').value,
            email: document.getElementById('patient-email').value,
            doctor: selectedDoctor.name,
            specialization: selectedDoctor.specialization,
            date: dateSelect.value,
            time: timeSelect.value,
            reason: document.getElementById('form-reason').value,
            status: "Confirmed",
            createdAt: new Date().toISOString()
        };

        // Save to LocalStorage
        let storedAppointments = JSON.parse(localStorage.getItem('hospitalAppointments')) || [];
        storedAppointments.push(appointment);
        localStorage.setItem('hospitalAppointments', JSON.stringify(storedAppointments));

        // Show Success Message
        bookingSuccess.classList.remove('hidden');
        
        // Reset Form
        bookingForm.reset();
        doctorSelect.innerHTML = '<option value="">First select a specialization</option>';
        doctorSelect.disabled = true;
        timeSelect.innerHTML = '<option value="">Select a date first</option>';
        timeSelect.disabled = true;
        doctorInfoCard.classList.add('hidden');

        // Hide success message after 3 seconds and switch to list
        setTimeout(() => {
            bookingSuccess.classList.add('hidden');
            switchTab('list');
        }, 3000);
    });

    // --- Display Appointments Logic ---

    function renderAppointments() {
        let storedAppointments = JSON.parse(localStorage.getItem('hospitalAppointments')) || [];
        
        // Sort by date (newest first)
        storedAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        appointmentsList.innerHTML = '';

        if (storedAppointments.length === 0) {
            noAppointmentsMsg.classList.remove('hidden');
            return;
        }

        noAppointmentsMsg.classList.add('hidden');

        storedAppointments.forEach(apt => {
            // Format Date safely
            let formattedDate = apt.date;
            try {
                formattedDate = new Date(apt.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (e) {}

            const card = document.createElement('div');
            card.className = 'border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition';
            
            card.innerHTML = `
                <div class="flex-grow">
                    <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-bold text-lg text-gray-900">${apt.doctor}</h4>
                        <span class="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">${apt.specialization}</span>
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"><i class="fas fa-check-circle mr-1"></i>${apt.status}</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                        <p><i class="far fa-calendar-alt w-5"></i> ${formattedDate}</p>
                        <p><i class="far fa-clock w-5"></i> ${apt.time}</p>
                        <p><i class="far fa-user w-5"></i> ${apt.patientName} (${apt.age}y, ${apt.gender})</p>
                        <p><i class="fas fa-notes-medical w-5"></i> Reason: <span class="truncate inline-block align-bottom max-w-[150px]">${apt.reason}</span></p>
                    </div>
                </div>
                <div class="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <button onclick="cancelAppointment(${apt.id})" class="w-full text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md transition text-sm font-medium border border-red-100">
                        Cancel Appointment
                    </button>
                </div>
            `;
            appointmentsList.appendChild(card);
        });
    }

    // Initial render
    renderAppointments();

    // Make cancel function global so it can be called from onclick
    window.cancelAppointment = function(id) {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            let storedAppointments = JSON.parse(localStorage.getItem('hospitalAppointments')) || [];
            storedAppointments = storedAppointments.filter(apt => apt.id !== id);
            localStorage.setItem('hospitalAppointments', JSON.stringify(storedAppointments));
            renderAppointments(); // Re-render the list
        }
    };
});
