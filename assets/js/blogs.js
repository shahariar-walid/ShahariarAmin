// Function to render blog cards
function renderBlogs(blogs) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = '';
    
    blogs.forEach(blog => {
        // Map tagColor to Tailwind classes
        const colorClasses = {
            blue: 'bg-blue-100 text-blue-800',
            green: 'bg-green-100 text-green-800',
            purple: 'bg-purple-100 text-purple-800',
            red: 'bg-red-100 text-red-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            indigo: 'bg-indigo-100 text-indigo-800'
        };
        
        const tagClass = colorClasses[blog.tagColor] || 'bg-gray-100 text-gray-800';

        const blogElement = document.createElement('div');
        blogElement.className = 'blog-card bg-white rounded-lg overflow-hidden border border-gray-200';
        
        blogElement.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-sm text-gray-500">${blog.date}</span>
                    <span class="tag ${tagClass} text-xs font-medium px-2.5 py-0.5 rounded">${blog.tag}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${blog.title}</h3>
                <p class="text-gray-600 mb-4">${blog.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${blog.platform} • ${blog.readTime}</span>
                    <a href="${blog.url}" class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Read <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        `;
        
        blogContainer.appendChild(blogElement);
    });
}

// Fetch blog data and render when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetch('/assets/data/blogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(blogs => {  // Directly use the array
            renderBlogs(blogs);
            
            // Add click tracking for analytics
            document.querySelectorAll('.blog-card a').forEach(link => {
                link.addEventListener('click', function(e) {
                    console.log('Blog link clicked:', this.href);
                    // In a real implementation, you might send analytics data here
                });
            });
        })
        .catch(error => {
            console.error('Error loading blog data:', error);
            // Optionally show error message to user
            const blogContainer = document.getElementById('blog-container');
            if (blogContainer) {
                blogContainer.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <p class="text-red-500">Failed to load blog posts. Please try again later.</p>
                    </div>
                `;
            }
        });
});