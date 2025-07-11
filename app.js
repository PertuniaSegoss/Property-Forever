// Properties data
const properties = [
  {
    location: "Pretoria",
    price: "R 4 900 000",
    description: "5 Bedroom House for Sale in Montana",
    images: [
      "https://images.prop24.com/338566739/Crop526x328",
      "https://images.prop24.com/338566737/Crop162x108",
      "https://images.prop24.com/338566738/Crop162x108",
    ],
    link: "#",
  },
  {
    location: "Centurion",
    price: "R 3 048 900",
    description: "4 Bedroom House for Sale in Silver Wood Estate",
    images: [
      "https://images.prop24.com/329516733/Crop526x328",
      "https://images.prop24.com/329516732/Crop162x108",
      "https://images.prop24.com/329516731/Crop162x108",
    ],
    link: "#",
  },
  {
    location: "Midrand",
    price: "R 1 985 000",
    description: "3 Bedroom House On Auction in Carlswald",
    images: [
      "https://images.prop24.com/338836178/Crop526x328",
      "https://images.prop24.com/338660519/Crop162x108",
      "https://images.prop24.com/338766995/Crop162x108",
    ],
    link: "#",
  },
];

// Render listings dynamically
const listingsContainer = document.getElementById("property-listings");

properties.forEach((property, index) => {
  const container = document.createElement("div");
  container.className = "property";
  container.innerHTML = `
    <a class="care" href="${property.link}">${property.location}</a>
    <div class="slider" id="slider-${index}">
      ${property.images
        .map(
          (img, i) => `
        <img src="${img}" class="slide ${i === 0 ? "active" : ""}" alt="${
            property.location
          } image ${i + 1}">
      `
        )
        .join("")}
      <button class="prev" onclick="prevSlide(${index})">&#10094;</button>
      <button class="next" onclick="nextSlide(${index})">&#10095;</button>
    </div>
    <p>${property.price} – ${property.description}</p>
  `;
  listingsContainer.appendChild(container);
});

// Carousel functionality
const slideIndices = Array(properties.length).fill(0);

function showSlide(propertyIndex, n) {
  const slides = document.querySelectorAll(`#slider-${propertyIndex} .slide`);
  slideIndices[propertyIndex] += n;

  if (slideIndices[propertyIndex] >= slides.length)
    slideIndices[propertyIndex] = 0;
  if (slideIndices[propertyIndex] < 0)
    slideIndices[propertyIndex] = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === slideIndices[propertyIndex]);
  });
}

function nextSlide(index) {
  showSlide(index, 1);
}

function prevSlide(index) {
  showSlide(index, -1);
}

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "🌞";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "🌞" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
