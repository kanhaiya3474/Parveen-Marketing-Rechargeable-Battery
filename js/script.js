// Banner Slide Section

const banners = document.querySelectorAll(".banner");
let current = 0;

function showBanner(index) {
  banners.forEach((banner) => banner.classList.remove("active"));
  banners[index].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % banners.length;
  showBanner(current);
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + banners.length) % banners.length;
  showBanner(current);
});

// AUTO SLIDE
setInterval(() => {
  current = (current + 1) % banners.length;
  showBanner(current);
}, 5000);

// ---  Banner Slide Section

// --- 2. Counter Animation ---
const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// --- 3. Scroll Reveal & Intersection Observer ---
const revealElements = document.querySelectorAll(".reveal");
const projectSection = document.querySelector("#projects");
let counterTriggered = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Trigger counter when project section is visible
        if (entry.target.id === "projects" && !counterTriggered) {
          animateCounters();
          counterTriggered = true;
        }
      }
    });
  },
  { threshold: 0.2 },
);

revealElements.forEach((el) => observer.observe(el));
observer.observe(projectSection);

// --- 4. Form Validation & Submission ---
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    e.preventDefault();
    // Simulate professional AJAX submission
    const submitBtn = form.querySelector("button");
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        "Thank you! Your inquiry has been received. Our team will contact you shortly.",
      );
      form.reset();
      form.classList.remove("was-validated");
      submitBtn.innerHTML = "Send Enquiry";
      submitBtn.disabled = false;
    }, 2000);
  }
  form.classList.add("was-validated");
});

// --- 5. Back to Top Button ---
const btt = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btt.classList.remove("d-none");
  } else {
    btt.classList.add("d-none");
  }
});

btt.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your enquiry has been submitted.");
  this.reset();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("contactModal"),
  );
  modal.hide();
});
