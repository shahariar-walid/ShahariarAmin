// Function to render blog cards
function renderBlogs(blogs) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.className = 'blog-plate';
        blogElement.innerHTML = `
            <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;flex:1;">
                <div style="width:100%">
                    <div class="flex items-center mb-2" style="width:100%; display:flex; flex-direction:row; justify-content:space-between;">
                        <span class="text-xs text-gray-500" style="font-size:0.92rem;text-align:left;">${blog.date}</span>
                        <span class="tag text-xs font-medium px-2 py-0.5" style="text-align:right;display:inline-block;background-color:#ffeaea;color:#b91c1c;border:1px solid #fca5a5;border-radius:999px;background-clip:padding-box;box-shadow:0 1px 2px rgba(0,0,0,0.03);font-size:0.95rem;line-height:1.1;">${blog.tag}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2" style="word-break:break-word;line-height:1.2;">${blog.title}</h3>
                    <p class="text-gray-600 mb-3" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;min-height:54px;max-height:72px;font-size:0.98rem;">${blog.description}</p>
                </div>
                <div class="flex justify-between items-center w-100 mt-auto" style="width:100%; display:flex; flex-direction:row; align-items:center; justify-content:space-between;">
                    <span class="text-xs text-gray-500" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60%;text-align:left;">${blog.readTime}</span>
                    <a href="${blog.url}" class="text-blue-600 hover:text-blue-800 font-medium flex items-center" style="white-space:nowrap;font-size:0.98rem;text-align:right;margin-left:auto;" target="${blog.url && blog.url.includes('medium.com') ? '_blank' : '_self'}" rel="${blog.url && blog.url.includes('medium.com') ? 'noopener noreferrer' : ''}">Read More <i class="fas fa-arrow-right ml-2"></i></a>
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