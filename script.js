document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');
    const resultsContainer = document.querySelector('.overlay');

   
    async function fetchData() {
        try {
            const response = await fetch('./travel_recommendation_api.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        }
    }

    
    function handleSearch(keyword) {
        fetchData().then(data => {
            keyword = keyword.toLowerCase();
            let results = [];

            // Check if keyword matches any category
            if (keyword === 'beach' || keyword === 'beaches') {
                results = data.beach || [];
            } else if (keyword === 'temple' || keyword === 'temples') {
                results = data.temple || [];
            } else if (keyword === 'country' || keyword === 'countries') {
                results = data.country || [];
            } else {
                resultsContainer.innerHTML = 'Destination not found.';
                return;
            }

            displayResults(results);
        }).catch(error => {
            console.error('Error in handleSearch:', error);
            resultsContainer.innerHTML = 'Error fetching data. Please try again later.';
        });
    }

    // Function to display search results
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('result-card');
            card.innerHTML = `
                <img src="${result.imageUrl}" alt="${result.name}">
                <h2>${result.name}</h2>
                <p>${result.description}</p>
                <a href="#book-now" class="book-now-button">Visit</a>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // Event listener for search button click
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        const searchInput = document.getElementById('search-input').value.trim();
        if (searchInput) {
            handleSearch(searchInput);
        } else {
            resultsContainer.innerHTML = '<p>Please enter a keyword.</p>';
        }
    });

    // Event listener for clear button click
    clearButton.addEventListener('click', function() {
        resultsContainer.innerHTML = '';
        document.getElementById('search-input').value = '';
    });
});
