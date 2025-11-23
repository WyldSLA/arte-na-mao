(function(){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;

    const sun = document.getElementById('sunIcon');
    const moon = document.getElementById('moonIcon');

    const setTheme = (mode) => {
        if(mode === 'dark'){
            document.body.style.setProperty('--background', 'hsl(0, 0%, 9%)');
            document.body.style.setProperty('--foreground', 'hsl(0, 0%, 95%)');
            document.body.style.setProperty('--card', 'hsl(0, 0%, 12%)');
            document.body.style.setProperty('--card-foreground', 'hsl(0, 0%, 95%)');
            document.body.style.setProperty('--muted', 'hsl(0, 0%, 16%)');
            document.body.style.setProperty('--muted-foreground', 'hsl(0, 0%, 65%)');
            document.body.style.setProperty('--border', 'hsl(0, 0%, 20%)');
            sun && sun.classList.add('hidden');
            moon && moon.classList.remove('hidden');
            localStorage.setItem('artist-theme', 'dark');
        } else {
            // For light theme we remove the overrides so the global :root palette applies
            document.body.style.removeProperty('--background');
            document.body.style.removeProperty('--foreground');
            document.body.style.removeProperty('--card');
            document.body.style.removeProperty('--card-foreground');
            document.body.style.removeProperty('--muted');
            document.body.style.removeProperty('--muted-foreground');
            document.body.style.removeProperty('--border');
            sun && sun.classList.remove('hidden');
            moon && moon.classList.add('hidden');
            localStorage.setItem('artist-theme', 'light');
        }
    };
    
    const saved = localStorage.getItem('artist-theme') || 'dark';
    setTheme(saved);

    btn.addEventListener('click', () => {
        const isDark = (localStorage.getItem('artist-theme') || 'dark') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
    });
})();

// Tab activation: ensure only the selected tab keeps the .active class and shows its content
(function(){
    // Defer until DOM is ready
    function initTabs(){
        const tabsList = document.querySelector('.tabs-list');
        if (!tabsList) return;

        const getTriggers = () => Array.from(document.querySelectorAll('.tab-trigger'));
        const getContents = () => Array.from(document.querySelectorAll('.tab-content'));

        function activate(trigger){
            if (!trigger) return;
            const tabName = trigger.dataset && trigger.dataset.tab;

            // Toggle visual active state on triggers
            getTriggers().forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            // Accessibility hint
            getTriggers().forEach(t => t.setAttribute('aria-selected', 'false'));
            trigger.setAttribute('aria-selected', 'true');

            // Show/hide contents
            getContents().forEach(c => c.classList.remove('active'));
            if (tabName) {
                const target = document.getElementById(tabName + '-content');
                if (target) target.classList.add('active');
            }
        }

        // Delegated click to handle clicks on SVG/text inside button
        tabsList.addEventListener('click', function(e){
            const trigger = e.target.closest('.tab-trigger');
            if (!trigger) return;
            e.preventDefault();
            activate(trigger);
        }, true);

        // Initialize - keep existing .active if present otherwise first
        const initial = document.querySelector('.tab-trigger.active') || getTriggers()[0];
        if (initial) activate(initial);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        // already ready
        initTabs();
    }
})();
