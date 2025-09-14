// Aguarda o carregamento completo do DOM para executar TODO o nosso JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------
    // --- LÓGICA DO MENU HAMBURGER (MOBILE) ---
    // ---------------------------------------------
    const hamburger = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (hamburger && navMenu) {
        // Abre/fecha o menu ao clicar no hamburger
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um dos links (útil para navegação na mesma página)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // --- LÓGICA DAS ABAS INTERATIVAS DO ESTUDO DE CASO ---
    // ----------------------------------------------------
    const tabs = document.querySelectorAll('.tab-pill');
    const contents = document.querySelectorAll('.content-panel');

    if (tabs.length > 0 && contents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove a classe 'active' de todas as abas e conteúdos
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Adiciona a classe 'active' à aba clicada e ao seu conteúdo correspondente
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.querySelector(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // ---------------------------------------------
    // --- LÓGICA PARA A ANIMAÇÃO DA TIMELINE ---
    // ---------------------------------------------
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressLine = document.querySelector('.timeline-linha-progresso');

    if (timelineContainer && timelineItems.length > 0 && progressLine) {
        // Função que revela os itens da timeline
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const itemObserver = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        timelineItems.forEach(item => {
            itemObserver.observe(item);
        });

        // Função para animar a linha de progresso
        const animateProgressLine = () => {
            if (!document.body.contains(timelineContainer)) {
                window.removeEventListener('scroll', animateProgressLine);
                return;
            }
            
            const containerRect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startPoint = windowHeight * 0.8;
            
            if (containerRect.top < startPoint) {
                let progress = ((startPoint - containerRect.top) / containerRect.height) * 100;
                progress = Math.min(100, Math.max(0, progress));
                progressLine.style.height = progress + '%';
            } else {
                progressLine.style.height = '0%';
            }
        };

        window.addEventListener('scroll', animateProgressLine);
        animateProgressLine(); // Executa uma vez no início para checar a posição inicial
    }

    // ---------------------------------------------
    // --- LÓGICA PARA O ACORDEÃO DE SERVIÇOS ---
    // ---------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const body = item.querySelector('.accordion-body');
            const content = item.querySelector('.accordion-body-content');

            if (header && body && content) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Fecha todos os outros itens
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.accordion-body').style.maxHeight = '0px';
                        }
                    });

                    // Abre ou fecha o item clicado
                    if (isActive) {
                        item.classList.remove('active');
                        body.style.maxHeight = '0px';
                    } else {
                        item.classList.add('active');
                        // Usamos scrollHeight para obter a altura total do conteúdo
                        body.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });
    }

});