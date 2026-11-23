
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. LOGIN FORM AUTHENTICATION
    // =====================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const adminEmail = "radha123@gmail.com";
            const adminPassword = "radha123";

            if (email === adminEmail && password === adminPassword) {

                alert("Login Successful! Welcome to SmokeWatch.");

                // Create login session
                sessionStorage.setItem("isLoggedIn", "true");

                // Redirect to main dashboard
                window.location.replace("index.html");

            } else {

                alert("Invalid Email or Password. Please try again.");

            }

        });

    }


    // =====================================
    // 2. DASHBOARD LOGIN SESSION CHECK
    // =====================================

    const sensorTable = document.getElementById("sensorTable");

    // If user is not logged in, redirect to login page
    if (sensorTable) {

        const isLoggedIn = sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn !== "true") {

            window.location.replace("login.html");
            return;

        }

    }


    // =====================================
    // 3. LOGOUT FUNCTION
    // =====================================

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");

            alert("You have been logged out successfully.");

            window.location.replace("login.html");

        });

    }


    // =====================================
    // 4. SIMULATED SENSOR READINGS
    // =====================================

    const sensors = [
        {
            id: "SD-101",
            location: "Kitchen",
            ppm: 24,
            temp: 27,
            status: "Normal"
        },
        {
            id: "SD-102",
            location: "Living Room",
            ppm: 18,
            temp: 26,
            status: "Normal"
        },
        {
            id: "SD-103",
            location: "Bedroom",
            ppm: 82,
            temp: 31,
            status: "Alert"
        },
        {
            id: "SD-104",
            location: "Hallway",
            ppm: 21,
            temp: 28,
            status: "Normal"
        }
    ];

    let alerts = [
        {
            title: "Smoke level above threshold",
            location: "Bedroom · SD-103",
            time: "Recent simulated event",
            active: true
        }
    ];

    const threshold = 70;


    // =====================================
    // 5. DISPLAY SENSOR INFORMATION
    // =====================================

    function renderSensors() {

        const tbody = document.getElementById("sensorTable");

        if (!tbody) return;

        tbody.innerHTML = sensors.map(s => `
            <tr>
                <td class="sensor-id">${s.id}</td>
                <td>${s.location}</td>
                <td class="level ${s.ppm >= threshold ? 'high' : ''}">
                    ${s.ppm} ppm
                </td>
                <td>${s.temp}°C</td>
                <td>
                    <span class="status ${s.status.toLowerCase()}">
                        ${s.status}
                    </span>
                </td>
                <td>
                    ${new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </td>
            </tr>
        `).join("");


        document.getElementById("sensorCount").textContent =
            sensors.length;

        document.getElementById("normalCount").textContent =
            sensors.filter(s => s.status === "Normal").length;

        document.getElementById("alertCount").textContent =
            sensors.filter(s => s.status === "Alert").length;

        document.getElementById("lastUpdated").textContent =
            new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

    }


    // =====================================
    // 6. DISPLAY RECENT ALERTS
    // =====================================

    function renderAlerts() {

        const box = document.getElementById("alertList");

        if (!box) return;

        if (!alerts.length) {

            box.innerHTML =
                '<div class="empty">No demo alerts to display.</div>';

            return;
        }

        box.innerHTML = alerts.map(a => `
            <div class="alert-item ${a.active ? '' : 'cleared'}">

                <div class="alert-symbol">
                    ${a.active ? '⚑' : '✓'}
                </div>

                <div>
                    <strong>${a.title}</strong>
                    <small>${a.location}</small>
                    <small>
                        ${a.time}${a.active ? ' · Active' : ' · Cleared'}
                    </small>
                </div>

            </div>
        `).join("");

    }


    // =====================================
    // 7. REFRESH BUTTON
    // =====================================

    const refreshBtn = document.getElementById("refreshBtn");

    if (refreshBtn) {

        refreshBtn.addEventListener("click", function () {

            renderSensors();
            renderAlerts();

        });

    }


    // =====================================
    // 8. CLEAR ALERTS BUTTON
    // =====================================

    const clearBtn = document.getElementById("clearAlerts");

    if (clearBtn) {

        clearBtn.addEventListener("click", function () {

            alerts = [];

            renderAlerts();

        });

    }


    // =====================================
    // 9. INITIALIZE DASHBOARD
    // =====================================

    renderSensors();
    renderAlerts();

});
