// Main application logic for Poker Night Newsstand

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication for protected pages
    const isLoginPage = document.body.classList.contains('login-page');

    if (!isLoginPage && !protectPage()) {
        return; // Will redirect to login
    }

    // Initialize based on current page
    if (document.body.classList.contains('newsstand-page')) {
        initNewsstand();
    } else if (document.body.classList.contains('zine-page')) {
        initZinePage();
    }
});

// Initialize the newsstand page
function initNewsstand() {
    const zineGrid = document.getElementById('zine-grid');
    const emptyState = document.getElementById('empty-state');
    const logoutBtn = document.getElementById('logout-btn');

    // Setup logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Get all zines
    const allZines = getAllZines();

    if (allZines.length === 0) {
        zineGrid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }

    // Render zine covers
    allZines.forEach(zine => {
        const zineCard = createZineCard(zine);
        zineGrid.appendChild(zineCard);
    });
}

// Create a zine card element
function createZineCard(zine) {
    const card = document.createElement('a');
    card.href = `zine.html?id=${zine.id}`;
    card.className = 'zine-card';

    const hasImage = zine.cover && !zine.cover.includes('placeholder');

    card.innerHTML = `
        <div class="zine-cover" style="background-color: ${zine.coverColor}">
            ${hasImage ? `<img src="${zine.cover}" alt="${zine.title}" onerror="this.style.display='none'">` : ''}
            <div class="cover-content">
                <div class="issue-badge">Issue #${zine.issueNumber}</div>
                <h3 class="zine-title">${zine.title}</h3>
                <p class="zine-subtitle">${zine.subtitle}</p>
                <div class="cover-suits">
                    <span>♠</span><span>♥</span><span>♣</span><span>♦</span>
                </div>
            </div>
        </div>
        <div class="zine-info">
            <span class="zine-date">${formatDate(zine.date)}</span>
            <span class="zine-winner">Winner: ${zine.stats.winner}</span>
        </div>
    `;

    return card;
}

// Initialize the zine viewer page
function initZinePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const zineId = urlParams.get('id');

    const zineContent = document.getElementById('zine-content');
    const notFound = document.getElementById('zine-not-found');

    if (!zineId) {
        showZineNotFound(zineContent, notFound);
        return;
    }

    const zine = getZineById(zineId);

    if (!zine) {
        showZineNotFound(zineContent, notFound);
        return;
    }

    // Update page title
    document.title = `${zine.title} - Poker Night`;

    // Render zine content
    renderZine(zine, zineContent);
}

// Show not found state
function showZineNotFound(content, notFound) {
    content.style.display = 'none';
    notFound.style.display = 'flex';
}

// Render full zine content
function renderZine(zine, container) {
    const hasComicImage = zine.comic && !zine.comic.includes('placeholder');

    container.innerHTML = `
        <header class="zine-title-section" style="background-color: ${zine.coverColor}">
            <div class="issue-number">Issue #${zine.issueNumber}</div>
            <h1 class="zine-main-title">${zine.title}</h1>
            <p class="zine-main-subtitle">${zine.subtitle}</p>
            <div class="zine-date-display">${formatDate(zine.date)}</div>
            <div class="title-suits">
                <span>♠</span><span>♥</span><span>♣</span><span>♦</span>
            </div>
        </header>

        <section class="stats-section">
            <h2 class="section-title">
                <span class="title-icon">🏆</span>
                Night's Results
            </h2>

            <div class="stats-grid">
                <div class="stat-card winner-card">
                    <div class="stat-icon">👑</div>
                    <div class="stat-label">Winner</div>
                    <div class="stat-value">${zine.stats.winner}</div>
                    <div class="stat-detail">${zine.stats.winnings}</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Biggest Pot</div>
                    <div class="stat-value">${zine.stats.biggestPot}</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">🃏</div>
                    <div class="stat-label">Best Hand</div>
                    <div class="stat-value best-hand">${zine.stats.bestHand}</div>
                </div>
            </div>
        </section>

        <section class="leaderboard-section">
            <h2 class="section-title">
                <span class="title-icon">📊</span>
                Final Standings
            </h2>

            <div class="leaderboard">
                ${zine.stats.players.map((player, index) => `
                    <div class="player-row ${index === 0 ? 'first-place' : ''}">
                        <span class="player-position">${getPositionEmoji(player.position)}</span>
                        <span class="player-name">${player.name}</span>
                        <span class="player-chips ${player.chips.startsWith('+') ? 'positive' : 'negative'}">
                            ${player.chips}
                        </span>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="highlights-section">
            <h2 class="section-title">
                <span class="title-icon">✨</span>
                Memorable Moments
            </h2>

            <ul class="highlights-list">
                ${zine.stats.highlights.map(highlight => `
                    <li class="highlight-item">
                        <span class="highlight-bullet">♦</span>
                        ${highlight}
                    </li>
                `).join('')}
            </ul>
        </section>

        <section class="comic-section">
            <h2 class="section-title">
                <span class="title-icon">🎨</span>
                This Week's Comic
            </h2>

            <div class="comic-container">
                <h3 class="comic-title">"${zine.comicTitle}"</h3>
                <div class="comic-frame">
                    ${hasComicImage
                        ? `<img src="${zine.comic}" alt="${zine.comicTitle}" class="comic-image" onerror="this.parentElement.innerHTML='<div class=\\'comic-placeholder\\'><span>🎨</span><p>Comic coming soon!</p></div>'">`
                        : `<div class="comic-placeholder">
                            <span>🎨</span>
                            <p>Comic coming soon!</p>
                           </div>`
                    }
                </div>
            </div>
        </section>

        <div class="zine-end-decoration">
            <span>♠</span>
            <span>♥</span>
            <span>♣</span>
            <span>♦</span>
        </div>
    `;
}

// Get position emoji
function getPositionEmoji(position) {
    const emojis = {
        1: '🥇',
        2: '🥈',
        3: '🥉',
        4: '4th',
        5: '5th',
        6: '6th'
    };
    return emojis[position] || `${position}th`;
}
