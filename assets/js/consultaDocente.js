document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/profesor/')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('profesorTableBody');
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      const sidebarItems = document.querySelectorAll('#sidebar .card-body');

      // Función para formatear las fechas a 00-00-0000
      function formatearFecha(fecha) {
        const fechaObj = new Date(fecha);
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const anio = fechaObj.getFullYear();
        return `${dia}-${mes}-${anio}`;
      }

      // Función para mostrar los profesores
      function mostrarProfesores(profesores) {
        tableBody.innerHTML = '';

        // Verificar si no se encontraron resultados
        if (profesores.length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td colspan="5" class="text-center">Asignatura no encontrada</td>
          `;
          tableBody.appendChild(row);
          return;
        }

        profesores.forEach((profesor, index) => {
          const fechaFormateada = formatearFecha(profesor.fechas);
          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${profesor.nombre}</td>
            <td>${profesor.materia}</td>
            <td>${profesor.hora}</td>
            <td>${fechaFormateada}</td>
          `;
          tableBody.appendChild(row);
        });
      }
      mostrarProfesores(data);

      // Filtrar los profesores por materia cuando se hace clic en un ítem del sidebar
      sidebarItems.forEach(item => {
        item.addEventListener('click', (event) => {
          const materiaSeleccionada = event.currentTarget.getAttribute('data-subject');
          const profesoresFiltrados = data.filter(profesor =>
            profesor.materia.toLowerCase() === materiaSeleccionada.toLowerCase()
          );
          mostrarProfesores(profesoresFiltrados);
        });
      });

      // Filtrar los profesores por materia cuando se hace clic en el botón de búsqueda
      searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        const materiaBuscada = searchInput.value.trim().toLowerCase();
        const profesoresFiltrados = data.filter(profesor =>
          profesor.materia.toLowerCase().includes(materiaBuscada)
        );
        mostrarProfesores(profesoresFiltrados);
      });

    })
    .catch(error => {
      console.error('Error al obtener los profesores:', error);
    });
});
