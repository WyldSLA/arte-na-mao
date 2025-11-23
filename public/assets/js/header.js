// Small shared header script: theme toggle (used by header theme button)
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

    try {
        const saved = localStorage.getItem('artist-theme') || 'dark';
        setTheme(saved);

        btn.addEventListener('click', () => {
            const isDark = (localStorage.getItem('artist-theme') || 'dark') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    } catch (e) {
        // localStorage may be blocked; fail silently
        console.warn('header.js: theme toggle failed', e);
    }
})();
