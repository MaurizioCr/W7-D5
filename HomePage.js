document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
  
    // Effettua una richiesta API GET per ottenere i prodotti disponibili
    // Esempio:
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
      method: 'GET',
      headers: {
        'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMyNWU5ZTExZTAwMThlZGEwOGIiLCJpYXQiOjE2OTcxOTI5OTcsImV4cCI6MTY5ODQwMjU5N30.pR2g7Y1g-e8DebBJCjOGtAJxaGQ1dG0-sloM6QpGHaE"'
      }
    })
    .then(response => response.json())
    .then(products => {
      // Popola la lista dei prodotti nella homepage
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Prezzo: $${product.price}</p>
            <button class="btn btn-primary" onclick="showProductDetails(${product.id})">Scopri di più</button>
          </div>
        `;
        productList.appendChild(productCard);
      });
    })
    .catch(error => console.error('Errore nel caricamento dei prodotti:', error));
  });
  
  function showProductDetails(productId) {
    // Implementa la navigazione alla pagina di dettaglio dell'immagine
    // Utilizza productId per ottenere i dettagli del prodotto e passarli alla pagina di dettaglio
  }
  