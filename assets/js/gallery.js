// gallery.js
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initialize gallery elements
     * - Container for gallery items
     * - Filter buttons
     * - Lightbox elements (kept for potential future use)
     */
    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.portfolio-filters li');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    
    /**
     * Fetch photo data from external JSON file
     * - Handles network errors
     * - Initial rendering of photos
     */
    fetch('assets/data/photos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(photoData => {
            // Initial render of all photos
            renderPhotos(photoData);
            
            /**
             * Set up filter functionality
             * - Add click handlers to filter buttons
             * - Update active button state
             * - Filter photos based on selected category
             */
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Update active button styling
                    filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                    this.classList.add('filter-active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    if (filter === '*') {
                        renderPhotos(photoData);
                    } else {
                        const filteredPhotos = photoData.filter(photo => 
                            photo.filterClass.includes(filter.replace('.', ''))
                        );
                        renderPhotos(filteredPhotos);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading photo data:', error);
            galleryContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger">Failed to load gallery. Please try again later.</p>
                </div>
            `;
        });
    
    /**
     * Lightbox close handlers (retained but unused)
     * Can be removed completely if lightbox won't be used
     */
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    /**
     * Render photos to the gallery container
     * @param {Array} photos - Array of photo objects
     * - Creates portfolio items for each photo
     * - Displays title and description
     * - Zoom-in functionality has been removed
     */
    function renderPhotos(photos) {
        galleryContainer.innerHTML = '';
        
        photos.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${photo.filterClass}`;
            
            // Portfolio item HTML - zoom link removed
            photoElement.innerHTML = `
                <div class="portfolio-content h-100">
                    <img src="${photo.imageUrl}" class="img-fluid" alt="${photo.title}">
                    <div class="portfolio-info">
                        <h4>${photo.title}</h4>
                        <p>${photo.description}</p>
                        <!-- Zoom-in link has been removed here -->
                    </div>
                </div>
            `;
            
            galleryContainer.appendChild(photoElement);
        });
    }

    /**
     * Isotope layout initialization
     * - Placeholder for potential future use
     * - Currently just logs to console
     */
    function initIsotopeLayout() {
        console.log("Layout initialization placeholder");
        // Future implementation could go here
        // Example: $('.isotope-container').isotope('layout');
    }
});