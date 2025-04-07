document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const adminEmail = "admin@loa";
            const adminPassword = "admin123";

            if (email === adminEmail && password === adminPassword) {
                sessionStorage.setItem("isLoggedIn", "true");
                alert("Login successful! Redirecting to dashboard...");
                window.location.href = "admin-dashboard.html";
            } else {
                alert("Invalid credentials. Only the admin can log in.");
                loginForm.reset();
            }
        });
    }

    if (
        window.location.pathname.includes("admin-dashboard.html") ||
        window.location.pathname.includes("pending_request.html") ||
        window.location.pathname.includes("announcement.html")
    ) {
        let isLoggedIn = sessionStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            alert("Unauthorized access! Redirecting to login page.");
            window.location.href = "index.html";
        }
    }

    document.querySelectorAll(".logout").forEach(logoutBtn => {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("isLoggedIn");
            alert("Logged out successfully.");
            window.location.href = "index.html";
        });
    });

    const announcementText = document.getElementById("announcement-text");
    const postAnnouncementBtn = document.getElementById("post-announcement");
    const notificationList = document.getElementById("notification-list");

    function loadAnnouncements() {
        const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
        notificationList.innerHTML = "";
        
        savedAnnouncements.forEach((announcement, index) => {
            const newAnnouncement = document.createElement("li");
            newAnnouncement.textContent = announcement;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.addEventListener("click", function () {
                savedAnnouncements.splice(index, 1);
                localStorage.setItem("announcements", JSON.stringify(savedAnnouncements));
                loadAnnouncements();
            });

            newAnnouncement.appendChild(deleteBtn);
            notificationList.appendChild(newAnnouncement);
        });
    }

    loadAnnouncements();

    if (postAnnouncementBtn) {
        postAnnouncementBtn.addEventListener("click", function () {
            const announcement = announcementText.value.trim();

            if (announcement) {
                const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
                savedAnnouncements.push(announcement);
                localStorage.setItem("announcements", JSON.stringify(savedAnnouncements));
                loadAnnouncements();
                announcementText.value = "";
                alert("Announcement posted successfully!");
            } else {
                alert("Please enter an announcement before posting.");
            }
        });
    }
});

document.getElementById("toggle-specific").addEventListener("click", function() {
    var specificFields = document.getElementById("specific-student-fields");
    if (specificFields.style.display === "none") {
        specificFields.style.display = "block"; // Show fields
    } else {
        specificFields.style.display = "none"; // Hide fields
    }
});

