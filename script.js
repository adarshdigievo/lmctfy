document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const generateLink = document.getElementById('generateLink');
    const result = document.getElementById('result');
    const linkInput = document.getElementById('linkInput');
    const copyButton = document.getElementById('copyButton');
    const animation = document.getElementById('animation');
    const searchText = document.getElementById('searchText');
    const redirectText = document.getElementById('redirectText');
    const cursor = document.querySelector('.cursor');
    const queryModal = document.getElementById('queryModal');
    const modalQuery = document.getElementById('modalQuery');
    const copyQuery = document.getElementById('copyQuery');
    const openChatGPT = document.getElementById('openChatGPT');
    const openYou = document.getElementById('openYou');
    const explainer = document.getElementById('explainer');
    const continueBtn = document.getElementById('continueBtn');

    // Handle cursor movement
    document.addEventListener('mousemove', (e) => {
        if (animation.classList.contains('hidden')) {
            cursor.style.display = 'none';
            return;
        }
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Generate shareable link
    generateLink.addEventListener('click', () => {
        const query = encodeURIComponent(searchInput.value.trim());
        if (!query) return;

        const url = `${window.location.href}?q=${query}`;
        linkInput.value = url;
        result.classList.remove('hidden');
    });

    // Copy link to clipboard
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(linkInput.value);
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Copy query to clipboard
    copyQuery.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(modalQuery.textContent);
            copyQuery.innerHTML = '<i class="fas fa-check"></i> Copied! (You\'re doing great!)';
            setTimeout(() => {
                copyQuery.innerHTML = '<i class="fas fa-copy"></i> Copy Query';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Open ChatGPT in new tab
    openChatGPT.addEventListener('click', () => {
        window.open('https://chat.openai.com/', '_blank');
    });

    // Open You.com in new tab with query
    openYou.addEventListener('click', () => {
        const query = modalQuery.textContent.trim();
        const youUrl = `https://you.com/search?q=${encodeURIComponent(query)}&fromSearchBar=true&tbm=youchat`;
        window.open(youUrl, '_blank');
    });

    // Continue button click handler
    continueBtn.addEventListener('click', () => {
        explainer.classList.add('hidden');
        modalQuery.textContent = searchInput.value;
        queryModal.style.display = 'flex';
    });

    // Show explainer steps one by one
    const showExplainerSteps = () => {
        explainer.classList.remove('hidden');
        const steps = document.querySelectorAll('.steps .step-1, .steps .step-2, .steps .step-3, .steps .step-4');
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.remove('opacity-0');
                step.classList.remove('translate-y-4');
            }, index * 1000);
        });
    };

    // Check for query parameter and start animation
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        const decodedQuery = decodeURIComponent(query);
        searchInput.value = decodedQuery;
        result.classList.add('hidden');
        animation.classList.remove('hidden');
        cursor.style.display = 'block';

        // Simulate typing
        let currentText = '';
        const typeText = () => {
            if (currentText.length < decodedQuery.length) {
                currentText += decodedQuery[currentText.length];
                searchText.textContent = currentText;
                searchText.classList.add('typing');
                setTimeout(typeText, 100);
            } else {
                searchText.classList.remove('typing');
                setTimeout(showExplainerSteps, 500);
            }
        };

        // Simulate mouse movement
        const input = document.getElementById('searchInput');
        const inputRect = input.getBoundingClientRect();
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        const endX = inputRect.left + inputRect.width / 2;
        const endY = inputRect.top + inputRect.height / 2;

        cursor.style.left = startX + 'px';
        cursor.style.top = startY + 'px';

        setTimeout(() => {
            cursor.style.left = endX + 'px';
            cursor.style.top = endY + 'px';
            setTimeout(typeText, 1000);
        }, 1000);
    }
});
