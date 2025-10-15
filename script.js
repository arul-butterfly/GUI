
        // Data storage
        let patients = [
            {id: 1, name: 'John Smith', age: 45, gender: 'Male', contact: '555-0101'},
            {id: 2, name: 'Emma Wilson', age: 32, gender: 'Female', contact: '555-0102'},
            {id: 3, name: 'Michael Brown', age: 58, gender: 'Male', contact: '555-0103'},
        ];

        let appointments = [
            {id: 1, patient: 'John Smith', doctor: 'Dr. Sarah Johnson', date: '2025-10-10', time: '10:00', status: 'Scheduled'},
            {id: 2, patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', date: '2025-10-10', time: '14:30', status: 'Scheduled'},
        ];

        let currentUser = '';

        // Page navigation
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
        }

        // Login handler
        function handleLogin(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                currentUser = username;
                document.getElementById('userName').textContent = username.charAt(0).toUpperCase() + username.slice(1);
                showPage('dashboardPage');
                loadDashboard();
            } else {
                alert('Invalid credentials! Use: admin/admin123');
            }
        }

        // Load dashboard
        function loadDashboard() {
            const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('currentDate').textContent = date;
            refreshPatients();
            refreshAppointments();
        }

        // Section navigation
        function showSection(section) {
            document.getElementById('overviewSection').style.display = 'none';
            document.getElementById('patientsSection').style.display = 'none';
            document.getElementById('appointmentsSection').style.display = 'none';

            if (section === 'overview') {
                document.getElementById('overviewSection').style.display = 'block';
            } else if (section === 'patients') {
                document.getElementById('patientsSection').style.display = 'block';
            } else if (section === 'appointments') {
                document.getElementById('appointmentsSection').style.display = 'block';
            }
        }

        // Modal functions
        function openModal(type) {
            document.getElementById(type + 'Modal').classList.add('active');
        }

        function closeModal(type) {
            document.getElementById(type + 'Modal').classList.remove('active');
        }

        // Patient management
        function refreshPatients() {
            const tbody = document.getElementById('patientsBody');
            tbody.innerHTML = '';
            patients.forEach(p => {
                const row = `<tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>${p.gender}</td>
                    <td>${p.contact}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editPatient(${p.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deletePatient(${p.id})">Delete</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
            document.getElementById('totalPatients').textContent = patients.length;
        }

        function addPatient(e) {
            e.preventDefault();
            const patient = {
                id: patients.length + 1,
                name: document.getElementById('patientName').value,
                age: document.getElementById('patientAge').value,
                gender: document.getElementById('patientGender').value,
                contact: document.getElementById('patientContact').value
            };
            patients.push(patient);
            refreshPatients();
            closeModal('addPatient');
            e.target.reset();
        }

        function deletePatient(id) {
            if (confirm('Are you sure you want to delete this patient?')) {
                patients = patients.filter(p => p.id !== id);
                refreshPatients();
            }
        }

        function editPatient(id) {
            alert('Edit functionality - Patient ID: ' + id);
        }

        // Appointment management
        function refreshAppointments() {
            const tbody = document.getElementById('appointmentsBody');
            tbody.innerHTML = '';
            appointments.forEach(a => {
                const row = `<tr>
                    <td>${a.id}</td>
                    <td>${a.patient}</td>
                    <td>${a.doctor}</td>
                    <td>${a.date}</td>
                    <td>${a.time}</td>
                    <td>${a.status}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editAppointment(${a.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="cancelAppointment(${a.id})">Cancel</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
            document.getElementById('todayAppointments').textContent = appointments.length;
        }

        function addAppointment(e) {
            e.preventDefault();
            const appointment = {
                id: appointments.length + 1,
                patient: document.getElementById('appointmentPatient').value,
                doctor: document.getElementById('appointmentDoctor').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                status: 'Scheduled'
            };
            appointments.push(appointment);
            refreshAppointments();
            closeModal('addAppointment');
            e.target.reset();
        }

        function cancelAppointment(id) {
            if (confirm('Cancel this appointment?')) {
                appointments = appointments.filter(a => a.id !== id);
                refreshAppointments();
            }
        }

        function editAppointment(id) {
            alert('Edit functionality - Appointment ID: ' + id);
        }

        // Logout
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                currentUser = '';
                showPage('landingPage');
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showPage('landingPage');
        });
    