// --- 1. MOCK DATA ---
const INITIAL_DOCTORS = [
    { specialty: "Cardiology", name: "Dr. Anya Sharma", status: "Available", bio: "Heart health." },
    { specialty: "Pediatrics", name: "Dr. Ben Carter", status: "Busy", bio: "Children." },
    { specialty: "Dermatology", name: "Dr. Chloe Lee", status: "Available", bio: "Skin care." },
    { specialty: "Orthopedics", name: "Dr. David Cruz", status: "Available", bio: "Bones & Joints." },
    { specialty: "General", name: "Dr. Eva Klein", status: "Available", bio: "General care." }
];

// --- 2. APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Load Doctors immediately
    renderDoctorList(INITIAL_DOCTORS);
    updateDoctorSelect(INITIAL_DOCTORS);
    
    // Load Appointments from LocalStorage
    loadAppointments();

    // Set Date Min to Today
    document.getElementById('appointmentDate').min = new Date().toISOString().split('T')[0];
});

// --- 3. APPOINTMENT HANDLING ---
const form = document.getElementById('appointmentForm');
const formFeedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect Data
    const name = document.getElementById('patientName').value;
    const email = document.getElementById('patientEmail').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const doctor = document.getElementById('doctorSelect').value;

    // Save to Local Storage
    const newAppointment = {
        id: Date.now(), // simple unique id
        patientName: name,
        doctor: doctor,
        date: date,
        time: time,
        email: email
    };

    // Get existing appointments, add new one, save back
    const existingApps = JSON.parse(localStorage.getItem('medpoint_appointments') || '[]');
    existingApps.push(newAppointment);
    localStorage.setItem('medpoint_appointments', JSON.stringify(existingApps));

    // Success Message
    formFeedback.className = "mt-4 text-center p-3 rounded-lg text-sm font-medium bg-green-100 text-green-700 fade-in";
    formFeedback.innerHTML = `✅ Appointment Confirmed for <strong>${doctor}</strong> on ${date} at ${time}!`;
    formFeedback.classList.remove('hidden');
    
    form.reset();
    loadAppointments(); // Refresh the list

    // Auto hide success message
    setTimeout(() => formFeedback.classList.add('hidden'), 5000);
});

function loadAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    const apps = JSON.parse(localStorage.getItem('medpoint_appointments') || '[]');

    // Sort by Date then Time
    apps.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
    });

    if (apps.length === 0) {
        appointmentsList.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <svg class="w-12 h-12 mb-2 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg>
                <p>No appointments scheduled yet.</p>
            </div>`;
        return;
    }

    appointmentsList.innerHTML = apps.map(app => `
        <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-teal-50 transition duration-150 items-center fade-in">
            <div class="col-span-3">
                <div class="font-bold text-gray-800 text-sm">${app.time}</div>
                <div class="text-xs text-gray-400">${app.date}</div>
            </div>
            <div class="col-span-4">
                <span class="inline-block bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-md font-medium truncate w-full">
                    ${app.doctor}
                </span>
            </div>
            <div class="col-span-5 flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                    ${app.patientName.charAt(0).toUpperCase()}
                </div>
                <span class="text-sm text-gray-700 truncate font-medium">${app.patientName}</span>
            </div>
        </div>
    `).join('');
}

// --- 4. RENDER DOCTORS ---
function renderDoctorList(doctors) {
    const container = document.getElementById('doctorListContainer');
    container.innerHTML = doctors.map(d => {
        const isAvailable = d.status === 'Available';
        return `
            <div class="flex items-center justify-between p-3 mb-2 border rounded-lg ${isAvailable ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/30'}">
                <div>
                    <p class="font-semibold text-sm text-gray-800">${d.name}</p>
                    <p class="text-xs text-gray-500">${d.specialty}</p>
                </div>
                <div class="text-right">
                    <span class="text-xs font-bold px-2 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${d.status}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function updateDoctorSelect(doctors) {
    const select = document.getElementById('doctorSelect');
    const specialties = [...new Set(doctors.map(d => d.specialty))].sort();
    let html = '<option value="">-- Choose a Specialist --</option>';
    specialties.forEach(s => html += `<option value="${s}">${s}</option>`);
    select.innerHTML = html;
}

// --- 5. MINI SYMPTOM CHECKER ---
document.getElementById('recommendBtn').addEventListener('click', () => {
    const val = document.getElementById('symptomInput').value.toLowerCase();
    const output = document.getElementById('recommendationOutput');
    let rec = "General";
    
    if(val.includes('heart') || val.includes('chest')) rec = "Cardiology";
    else if(val.includes('child') || val.includes('baby')) rec = "Pediatrics";
    else if(val.includes('skin') || val.includes('rash')) rec = "Dermatology";
    else if(val.includes('bone') || val.includes('knee')) rec = "Orthopedics";

    output.innerHTML = `Recommendation: <strong>${rec}</strong>. <a href="#schedule" class="text-blue-600 underline" onclick="document.getElementById('doctorSelect').value='${rec}'">Select</a>`;
    output.classList.remove('hidden');
});