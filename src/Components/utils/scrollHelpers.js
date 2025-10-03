// utils/scrollHelpers.js
export const scrollToSection = (sectionId) => {
  const element = document.querySelector(`#${sectionId}`);
  if (element) {
    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
