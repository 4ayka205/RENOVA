document.addEventListener("DOMContentLoaded", () => {
  const filterHeaders = document.querySelectorAll(".filters__header");
  const filterGroups = document.querySelectorAll(".filters__group");

  const hideAllFilters = () => {
      filterGroups.forEach(group => group.classList.remove("active"));
      filterHeaders.forEach(header => {
          const arrow = header.querySelector('img');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
      });
  };

  filterHeaders.forEach(header => {
      const targetId = header.dataset.target;
      const targetGroup = document.getElementById(targetId);

      if (!targetGroup) return;

      const arrow = header.querySelector('img');

      header.addEventListener("mouseover", () => {
          hideAllFilters();
          targetGroup.classList.add("active");
          if (arrow) arrow.style.transform = 'rotate(180deg)';
      });

      const handleMouseLeave = (event) => {
        const related = event.relatedTarget;
        const headersContainer = document.querySelector(".filters__headers");
    
        if (
            (!headersContainer.contains(related) || related === null) &&
            !header.contains(related) &&
            !targetGroup.contains(related)
        ) {
            targetGroup.classList.remove("active"); 
            if (arrow) arrow.style.transform = "rotate(0deg)";
        }
    };

      header.addEventListener("mouseleave", handleMouseLeave);
      targetGroup.addEventListener("mouseleave", handleMouseLeave);
  });

  document.addEventListener("click", (e) => {
      if (!e.target.closest(".filters")) {
          hideAllFilters();
      }
  });
});