document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded"); // ✅ Debugging

    // 🔹 Fix for Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navContainer = document.querySelector(".nav-container");

    if (menuToggle && navContainer) {
        menuToggle.addEventListener("click", function () {
            console.log("Menu clicked"); // ✅ Debugging
            navContainer.classList.toggle("active");
        });
    }

    // 🔹 Carousel Functionality
    let slideIndex = 0;
    const slides = document.querySelector(".carousel-images");
    const totalSlides = document.querySelectorAll(".carousel-images img").length;
    const dots = document.querySelectorAll(".dot");

    function updateCarousel() {
        if (!slides) return;
        slides.style.transform = `translateX(${-slideIndex * 100}vw)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[slideIndex].classList.add("active");
    }

    function moveSlide(n) {
        slideIndex += n;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        updateCarousel();
    }

    function jumpToSlide(n) {
        slideIndex = n;
        updateCarousel();
    }

    if (slides) {
        setInterval(() => moveSlide(1), 3000);
        updateCarousel();
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => jumpToSlide(index));
        });
        document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
        document.querySelector(".next").addEventListener("click", () => moveSlide(1));
    } else {
        console.warn("Carousel not found, skipping.");
    }

    // 🔹 Fade-In on Scroll Effect
    const fadeInSections = document.querySelectorAll(".fade-in");
    
    if (fadeInSections.length > 0) {
        console.log("Fade-in sections found:", fadeInSections.length); // ✅ Debugging

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible"); // Adds fade-in effect
                        observer.unobserve(entry.target); // Stops observing once visible
                    }
                });
            },
            { threshold: 0.3 }
        );

        fadeInSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        console.warn("No fade-in sections found.");
    }
});


