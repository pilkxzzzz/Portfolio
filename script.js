document.addEventListener('DOMContentLoaded', () => {
    // Термінальний ефект друку
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Анімація появи елементів
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.querySelector('.subtitle')) {
                    typeWriter(
                        entry.target.querySelector('.subtitle'),
                        entry.target.querySelector('.subtitle').textContent
                    );
                }
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Ефект терміналу для навігації
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('mouseover', function() {
            this.style.color = '#9b30ff';
        });

        anchor.addEventListener('mouseout', function() {
            this.style.color = '#e0e0e0';
        });

        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Додаємо ефект мерехтіння курсору
    setInterval(() => {
        document.querySelector('.cursor').style.opacity = 
            document.querySelector('.cursor').style.opacity === '0' ? '1' : '0';
    }, 500);

    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });

        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Анімація появи секцій при скролі
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Ефект паралаксу для карток проектів
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            
            // Додаємо 3D ефект повороту
            const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
            
            card.style.transform = `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            
            // Плавно повертаємо світіння в центр
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
        
        // Додаємо ефект натискання
        card.addEventListener('mousedown', () => {
            card.style.transform = 'translateY(-5px) scale(0.95)';
        });
        
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    // Додаємо ефект glitch для заголовка
    const title = document.querySelector('#home h1');
    title.setAttribute('data-text', title.textContent);

    // Анімація для технологій
    document.querySelectorAll('.tech-stack').forEach(stack => {
        const technologies = stack.textContent.split(',');
        stack.textContent = '';
        technologies.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech.trim();
            span.style.background = `rgba(155, 48, 255, ${Math.random() * 0.2 + 0.1})`;
            span.style.padding = '3px 8px';
            span.style.borderRadius = '4px';
            stack.appendChild(span);
        });
    });

    // Матричний дощ
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width/fontSize;

    const rainDrops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#9b30ff';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
            
            if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    setInterval(draw, 30);

    // Кастомний курсор
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Додаємо ефект світіння при наведенні на посилання
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(155, 48, 255, 0.1)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });

    // Додаємо ефект хвилі при кліку
    document.addEventListener('click', function(e) {
        let ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        ripple.addEventListener('animationend', function() {
            ripple.remove();
        });
    });

    // Анімація рівня навичок
    document.querySelectorAll('.skill-level').forEach(skill => {
        const level = skill.dataset.level;
        skill.style.setProperty('--level', level + '%');
    });

    // Додаємо анімацію для тегів
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) rotate(3deg)';
        });

        tag.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Секретна комбінація клавіш для гри
    const secretCode = 'game';
    let typedKeys = '';

    document.addEventListener('keydown', (e) => {
        typedKeys += e.key.toLowerCase();
        if (typedKeys.length > secretCode.length) {
            typedKeys = typedKeys.slice(1);
        }
        if (typedKeys === secretCode) {
            startTypingGame();
        }
    });

    // Функція для запуску гри
    function startTypingGame() {
        const gameContainer = document.createElement('div');
        gameContainer.className = 'typing-game';
        gameContainer.innerHTML = `
            <div class="game-window">
                <h3>Terminal Typing Game</h3>
                <p class="target-text"></p>
                <input type="text" class="typing-input" autocomplete="off">
                <div class="game-stats">
                    <span class="wpm">WPM: 0</span>
                    <span class="accuracy">Accuracy: 100%</span>
                </div>
                <button class="close-game">Close</button>
            </div>
        `;
        document.body.appendChild(gameContainer);

        const words = [
            'console.log("Hello, World!");',
            'function coding() { return "fun"; }',
            'const developer = "awesome";',
            'while(coding) { learnMore(); }',
            'git commit -m "New features"'
        ];

        const targetText = gameContainer.querySelector('.target-text');
        const input = gameContainer.querySelector('.typing-input');
        const wpmDisplay = gameContainer.querySelector('.wpm');
        const accuracyDisplay = gameContainer.querySelector('.accuracy');
        let startTime, endTime;

        function newGame() {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            targetText.textContent = randomWord;
            input.value = '';
            startTime = new Date();
        }

        input.addEventListener('input', () => {
            const current = input.value;
            const target = targetText.textContent;
            
            if (current === target) {
                endTime = new Date();
                const timeTaken = (endTime - startTime) / 1000 / 60; // в хвилинах
                const wpm = Math.round((target.length / 5) / timeTaken);
                wpmDisplay.textContent = `WPM: ${wpm}`;
                setTimeout(newGame, 1000);
            }

            // Розрахунок точності
            let correct = 0;
            current.split('').forEach((char, i) => {
                if (char === target[i]) correct++;
            });
            const accuracy = Math.round((correct / current.length) * 100) || 100;
            accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
        });

        gameContainer.querySelector('.close-game').addEventListener('click', () => {
            gameContainer.remove();
        });

        newGame();
    }

    // Додаємо перемикач тем
    const themes = {
        default: {
            '--primary-color': '#9b30ff',
            '--bg-color': '#1a1a1a',
            '--text-color': '#e0e0e0'
        },
        cyberpunk: {
            '--primary-color': '#00ff9f',
            '--bg-color': '#120458',
            '--text-color': '#ff00ff'
        },
        retro: {
            '--primary-color': '#ff8c00',
            '--bg-color': '#2d132c',
            '--text-color': '#ff6b6b'
        }
    };

    function applyTheme(themeName) {
        const theme = themes[themeName];
        Object.entries(theme).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });
        localStorage.setItem('selectedTheme', themeName);
    }

    function createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <div class="theme-btn">🎨</div>
            <div class="theme-options">
                ${Object.keys(themes).map(theme => `
                    <button data-theme="${theme}">${theme}</button>
                `).join('')}
            </div>
        `;
        document.body.appendChild(switcher);

        switcher.querySelector('.theme-btn').addEventListener('click', () => {
            switcher.classList.toggle('active');
        });

        switcher.querySelectorAll('[data-theme]').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeName = btn.dataset.theme;
                applyTheme(themeName);
                switcher.classList.remove('active');
            });
        });

        // Застосовуємо збережену тему при завантаженні
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
            applyTheme(savedTheme);
        }
    }

    createThemeSwitcher();

    // Матричний ефект для секції skills
    const skillsSection = document.querySelector('#skills');
    let matrixCanvas;

    skillsSection.addEventListener('mouseenter', () => {
        if (!matrixCanvas) {
            matrixCanvas = document.createElement('canvas');
            matrixCanvas.className = 'matrix-effect';
            skillsSection.appendChild(matrixCanvas);
            initMatrixEffect(matrixCanvas);
        }
        matrixCanvas.style.opacity = '0.1';
    });

    skillsSection.addEventListener('mouseleave', () => {
        if (matrixCanvas) {
            matrixCanvas.style.opacity = '0';
        }
    });

    function initMatrixEffect(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = skillsSection.offsetWidth;
        canvas.height = skillsSection.offsetHeight;

        const chars = '01';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            ctx.font = fontSize + 'px monospace';

            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, y * fontSize);
                
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }

        setInterval(drawMatrix, 50);
    }
}); 