const productId = localStorage.getItem("selectedProductId");
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMyNWU5ZTExZTAwMThlZGEwOGIiLCJpYXQiOjE2OTcxOTI5OTcsImV4cCI6MTY5ODQwMjU5N30.pR2g7Y1g-e8DebBJCjOGtAJxaGQ1dG0-sloM6QpGHaE"; // Sostituisci con la tua API key



async function loadProductDetails(productId) {
    const productImage = document.getElementById("productImage");
    const productName = document.getElementById("productName");
    const productDescription = document.getElementById("productDescription");
    const productBrand = document.getElementById("productBrand");
    const productPrice = document.getElementById("productPrice");
  
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
  
      const product = await response.json();
  
      // Aggiorna i dettagli del prodotto
      productImage.src = product.imageUrl;
      productName.innerText = product.name;
      productDescription.innerText = `Descrizione: ${product.description}`;
      productBrand.innerText = `Brand: ${product.brand}`;
      productPrice.innerText = `Prezzo: ${product.price}`;
    } catch (error) {
      console.error("Errore:", error);
    }
  }
  
 
window.addEventListener("DOMContentLoaded", () => {
  loadProductDetails(productId);
});

// Event listener per il pulsante Modifica
const editButton = document.getElementById("editButton");
editButton.addEventListener("click", () => {

  window.location.href = "edit.html";
});

async function deleteProduct(productId) {

      try {
        // Effettua una richiesta DELETE per cancellare il prodotto dall'API
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/product/${productId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Errore nella cancellazione del prodotto');
        }
  
        // Reindirizza alla pagina di back-office
        window.location.href = 'back-office.html';
      } catch (error) {
        console.error('Errore:', error);
      }
    }
  function getProductIdFromURL() {
    // Estrae l'ID del prodotto dalla URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('productId');
  }
  async function deleteProduct(productId) {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/product/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      );
  
      if (!response.ok) {
        throw new Error('Errore nella cancellazione del prodotto.');
      }
  
      // Reindirizza a back-office.html o fai altre azioni necessarie dopo la cancellazione
      window.location.href = 'back-office.html';
    } catch (error) {
      console.error('Errore:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('deleteButton');
  
    // Ottieni l'ID del prodotto dalla URL
    getProductIdFromURL();
  
    // Aggiungi un evento al click del pulsante "Cancella Prodotto"
    deleteButton.addEventListener('click', async () => {
      try {
        // Chiamata per cancellare il prodotto
        await deleteProduct(productId);
      } catch (error) {
        console.error('Errore:', error);
      }
    });
  });
  
  
  