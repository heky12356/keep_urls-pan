// mkd.js

document.addEventListener('DOMContentLoaded', function() {
    const markdownContentDiv = document.getElementById('readme');
    const markdownFileUrl = './readme/README.md';
    fetchAndConvertMarkdown(markdownFileUrl, markdownContentDiv);
});

function fetchAndConvertMarkdown(markdownFileUrl, targetElement) {
    fetch(markdownFileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch Markdown file');
            }
            return response.text();
        })
        .then(markdownText => {
            const htmlContent = marked(markdownText);
            targetElement.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching or converting Markdown:', error);
        });
}
