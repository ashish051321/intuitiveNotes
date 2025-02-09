// script.js
gsap.to(".hand", {
    y: -10, // Move the hand up
    duration: 0.5, // Animation duration
    repeat: -1, // Infinite loop
    yoyo: true, // Go back and forth
    ease: "power1.inOut", // Smooth easing
  });
  
  // Optional: Add a blinking cursor effect to the text
  const textElement = document.querySelector(".text");
  let cursorVisible = true;
  
  setInterval(() => {
    cursorVisible = !cursorVisible;
    textElement.style.borderRight = cursorVisible ? "2px solid #333" : "none";
  }, 500);