const apiKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMyNWU5ZTExZTAwMThlZGEwOGIiLCJpYXQiOjE2OTcxOTI5OTcsImV4cCI6MTY5ODQwMjU5N30.pR2g7Y1g-e8DebBJCjOGtAJxaGQ1dG0-sloM6QpGHaE"; // Sostituisci con la tua API key
        function openInNewTab(url) {
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
              newWindow.focus();
            } else {
              alert('Il blocco del popup è attivo. Abilita i popup per aprire la nuova pagina.');
            }
          }
          
          
          const homeLink = document.getElementById('homeLink'); 
          homeLink.addEventListener('click', () => {
            openInNewTab(url);
          });
          
      async function fetchData() {
        try {
          const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/product/",
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

          const data = await response.json();
          console.log("Array del pacchetto API:", data);

          data.forEach((product) => {
            createProductCard(product);
          });
        } catch (error) {
          console.error("Errore:", error);
        }
      }

   
      function createProductCard(product) {
        const productCardsDiv = document.getElementById("productCards");

        const card = document.createElement("div");
        card.classList.add("card", "col-4", "mb-3");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerText = product.name;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.innerText = product.description;

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = product.imageUrl;
        image.alt = product.name; 

        cardBody.appendChild(image);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
 

        card.appendChild(cardBody);
        productCardsDiv.appendChild(card);

        card.addEventListener("click", () => {
            // Salva l'ID del prodotto selezionato nella memoria locale
            localStorage.setItem("selectedProductId", product._id);
            // Reindirizza l'utente alla pagina di dettaglio
            window.location.href = "dettagli.html";
          });
      }

    
      function displayProduct(product) {
        createProductCard(product);
      }

      async function handleSubmit(event) {
        event.preventDefault();

        const productData = {
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          brand: document.getElementById("brand").value,
          imageUrl: document.getElementById("imageUrl").value,
          price: parseFloat(document.getElementById("price").value),
        };

        try {
          const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/product/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify(productData),
            }
          );

          if (!response.ok) {
            throw new Error("Errore nell'invio dei dati all'API");
          }

          console.log("Dati inviati con successo all'API:", productData);
        } catch (error) {
          console.error("Errore:", error);
        }
      }

      fetchData(); 

      const productForm = document.getElementById("productForm");
      productForm.addEventListener("submit", handleSubmit);