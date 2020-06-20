// Efectos

// Este efecto cambia de color los input del form de register y login cuando se hace click
const miInput = [...document.querySelectorAll('.miInput')]
miInput.forEach(function(item) {
    item.addEventListener('click', function() {
      item.style.borderColor= "yellow"
    });
     });

