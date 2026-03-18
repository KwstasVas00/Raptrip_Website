// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would normally send the data to a server
      // For demo purposes, we'll just show an alert
      alert(
        `Ευχαριστούμε ${name}! Το μήνυμά σας έχει σταλεί. Θα επικοινωνήσουμε σύντομα στο ${email}.`,
      );
      contactForm.reset();
    });
  }

  // Buy ticket buttons
  const buyButtons = document.querySelectorAll(".buy-btn");
  buyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const event = this.getAttribute("data-event");
      alert(
        `Κράτηση για το event: ${event.toUpperCase()}. Σύντομα θα κατευθυνθείτε στη σελίδα πληρωμής.`,
      );
    });
  });

  // Add to cart buttons
  const cartButtons = document.querySelectorAll(".add-to-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productName =
        this.closest(".product-info").querySelector("h3").textContent;
      alert(`Το προϊόν "${productName}" προστέθηκε στο καλάθι σας!`);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  // 1. Active link on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active from all links
      navLinks.forEach((l) => l.classList.remove("active"));
      // Add active to clicked link
      this.classList.add("active");

      // Close mobile menu after click (αν υπάρχει)
      if (navLinksContainer && navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        menuToggle?.classList.remove("active");
      }
    });
  });

  // 2. Active link on scroll
  function setActiveLinkOnScroll() {
    let current = "";
    const scrollPosition = window.scrollY + 200; // Offset για καλύτερη εμπειρία

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1); // Αφαίρεσε το #
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  // 3. Active link on page load (based on URL hash)
  function setActiveLinkFromHash() {
    const currentHash = window.location.hash || "#home";
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      }
    });
  }

  // 4. Event listeners
  window.addEventListener("scroll", setActiveLinkOnScroll);
  window.addEventListener("hashchange", setActiveLinkFromHash);

  // Initialize
  setActiveLinkFromHash();

  // Αν δεν υπάρχει hash, κάνε scroll detection για αρχικοποίηση
  if (!window.location.hash) {
    setActiveLinkOnScroll();
  }
});
