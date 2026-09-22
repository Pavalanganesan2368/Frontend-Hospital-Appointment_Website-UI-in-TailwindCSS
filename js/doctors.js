document.addEventListener('DOMContentLoaded', () => {
    // Only run on doctors page
    const doctorsContainer = document.getElementById('doctors-container');
    if (!doctorsContainer) return;

    const searchInput = document.getElementById('search-name');
    const filterSelect = document.getElementById('filter-specialization');
    const noDoctorsMsg = document.getElementById('no-doctors-msg');

    // Initial render
    renderDoctors(doctors);

    // Apply filters from URL if coming from Home Page Quick Search
    const urlName = getQueryParam('doctorName');
    const urlSpecialization = getQueryParam('specialization');
    
    if (urlName || urlSpecialization) {
        if (urlName) searchInput.value = urlName;
        if (urlSpecialization) filterSelect.value = urlSpecialization;
        filterDoctors();
    }

    // Event Listeners for filtering
    searchInput.addEventListener('input', filterDoctors);
    filterSelect.addEventListener('change', filterDoctors);

    // Filter Logic
    function filterDoctors() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const specFilter = filterSelect.value;

        const filtered = doctors.filter(doctor => {
            const matchesName = doctor.name.toLowerCase().includes(searchTerm);
            const matchesSpec = specFilter === 'all' || specFilter === '' || doctor.specialization === specFilter;
            return matchesName && matchesSpec;
        });

        renderDoctors(filtered);
    }

    // Render Logic
    function renderDoctors(docsToRender) {
        doctorsContainer.innerHTML = '';
        
        if (docsToRender.length === 0) {
            doctorsContainer.classList.add('hidden');
            noDoctorsMsg.classList.remove('hidden');
            return;
        }

        doctorsContainer.classList.remove('hidden');
        noDoctorsMsg.classList.add('hidden');

        docsToRender.forEach(doctor => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full';
            
            card.innerHTML = `
                <div class="h-48 overflow-hidden">
                    <img src="${doctor.image}" alt="${doctor.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">${doctor.name}</h3>
                            <span class="inline-block bg-blue-100 text-primary text-xs px-2 py-1 rounded-full font-medium mt-1">
                                ${doctor.specialization}
                            </span>
                        </div>
                        <div class="bg-green-50 text-green-700 font-bold px-2 py-1 rounded text-sm">
                            ₹${doctor.fee}
                        </div>
                    </div>
                    
                    <div class="mt-4 space-y-2 text-sm text-gray-600 flex-grow">
                        <p class="flex items-center"><i class="fas fa-briefcase w-5 text-gray-400"></i> ${doctor.experience} years experience</p>
                        <p class="flex items-center"><i class="far fa-calendar-alt w-5 text-gray-400"></i> ${doctor.days}</p>
                    </div>
                    
                    <div class="mt-6">
                        <a href="appointments.html?doctor=${doctor.id}&tab=book" class="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-secondary transition font-medium">
                            Book Appointment
                        </a>
                    </div>
                </div>
            `;
            doctorsContainer.appendChild(card);
        });
    }
});
