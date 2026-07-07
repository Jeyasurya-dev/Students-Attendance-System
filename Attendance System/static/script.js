const search = document.getElementById("searchInput");
const rows = document.querySelectorAll("#studentTable tbody tr");

// Present & Absent Count
function updateCounts() {
    let present = 0;
    let absent = 0;

    rows.forEach(row => {
        const status = row.cells[2].innerText.trim().toLowerCase();

        if (status.includes("present")) {
            present++;
        } else if (status.includes("absent")) {
            absent++;
        }
    });

    const presentCount = document.getElementById("presentCount");
    const absentCount = document.getElementById("absentCount");

    if (presentCount) presentCount.innerText = present;
    if (absentCount) absentCount.innerText = absent;
}

updateCounts();

// Search
if (search) {
    search.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();

        rows.forEach(row => {
            if (row.innerText.toLowerCase().includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

// Today's Date
const todayDate = document.getElementById("todayDate");

if (todayDate) {
    const today = new Date();

    todayDate.innerHTML = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Row Hover Animation
rows.forEach(row => {
    row.addEventListener("mouseenter", () => {
        row.style.transition = "0.3s";
        row.style.transform = "scale(1.01)";
    });

    row.addEventListener("mouseleave", () => {
        row.style.transform = "scale(1)";
    });
});