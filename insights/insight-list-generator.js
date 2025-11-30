// Function to fetch data and generate links
function generateInsightLinks() {
    // Ensure the container exists before proceeding
    const container = document.getElementById('topics-container');
    if (!container) {
        console.error('Container element with ID "topics-container" not found.');
        return;
    }

    // 💡 Add a version string that you manually update: e.g., 'insights.json?v=2.0'
    // every time you change the insights.json file. This helps with cache busting.
    const jsonPath = 'insights.json'; 

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(insightsData => {
            // Loop through the data and create the HTML elements
            insightsData.forEach(topic => {
                const link = document.createElement('a');
                link.href = topic.url;
                link.className = "bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow";

                const title = document.createElement('h3');
                title.className = "text-lg font-semibold text-gray-900 mb-1";
                title.textContent = topic.title;

                const description = document.createElement('p');
                description.className = "text-sm text-gray-600";
                description.textContent = topic.description;

                link.appendChild(title);
                link.appendChild(description);
                container.appendChild(link);
            });
            
            // Optional: Add the placeholder div after generation
            if (insightsData.length % 2 !== 0 || insightsData.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = "bg-white border border-dashed border-gray-300 rounded-lg p-6 text-gray-500 flex items-center justify-center";
                placeholder.innerHTML = "Looking for more content? <br> Check back soon!";
                container.appendChild(placeholder);
            }
        })
        .catch(error => {
            console.error('Error fetching or processing insights data:', error);
            container.innerHTML = `<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                <p>Error loading insights. Please try again later.</p>
            </div>`;
        });
}

// Run the main function when the script loads
generateInsightLinks();