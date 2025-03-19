// Inicialização AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa AOS
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Header Scroll Effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Menu Mobile
  const menuMobile = document.querySelector(".menu-mobile");
  const nav = document.querySelector("nav");
  const body = document.body;

  if (menuMobile) {
    // Garantir que os ícones estão presentes
    if (!menuMobile.querySelector(".menu-icon")) {
      const menuIcon = document.createElement("i");
      menuIcon.className = "fas fa-bars menu-icon";
      menuMobile.appendChild(menuIcon);
    }

    if (!menuMobile.querySelector(".close-icon")) {
      const closeIcon = document.createElement("i");
      closeIcon.className = "fas fa-times close-icon";
      menuMobile.appendChild(closeIcon);
    }

    // Adicionar event listener para o botão de menu
    menuMobile.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      menuMobile.classList.toggle("active");
      nav.classList.toggle("active");

      if (nav.classList.contains("active")) {
        body.classList.add("menu-open");
        body.style.overflow = "hidden";
      } else {
        body.classList.remove("menu-open");
        body.style.overflow = "";
      }
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !menuMobile.contains(e.target)
      ) {
        nav.classList.remove("active");
        menuMobile.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      }
    });

    // Evitar que cliques dentro do nav fechem o menu
    nav.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        menuMobile.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      });
    });
  }

  // Inicializa Particles.js
  setupParticles();

  // Hero Parallax Effect
  setupHeroParallax();

  // Hero Slider com transição melhorada
  setupHeroSlider();

  // Hero Stats
  setupHeroStats();

  // Tabs na seção Sobre
  setupSobreTabs();

  // Contadores animados
  setupAnimatedCounters();

  // Form Validation
  setupFormValidation();

  // Smooth Scroll para links de navegação
  setupSmoothScroll();

  // Popula a grade de clientes
  populateClientesGrid();

  // Adiciona classe ativa ao link do menu atual com base na seção visível
  highlightActiveMenuSection();
});

// Função para destacar o item ativo no menu
function highlightActiveMenuSection() {
  // Obter todas as seções
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Adicionar event listener para o scroll
  window.addEventListener("scroll", () => {
    // Pegar a posição atual do scroll
    let current = "";
    const scrollPosition = window.scrollY + 150; // Adiciona um offset para melhor detecção

    // Verificar qual seção está visível
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Adicionar ou remover a classe 'active' nos links de navegação
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Hero Parallax Effect
function setupHeroParallax() {
  const heroSection = document.getElementById("hero");

  if (!heroSection) return;

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      const parallaxOffset = scrollPosition * 0.4;
      heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;

      // Parallax para os slides
      const slides = document.querySelectorAll(".hero-slide");
      slides.forEach((slide) => {
        if (slide.classList.contains("active")) {
          slide.style.transform = `translateY(${
            parallaxOffset * 0.15
          }px) scale(1)`;
        }
      });
    }
  });
}

// Hero Stats
function setupHeroStats() {
  const heroContent = document.querySelector(".hero-content");

  if (!heroContent) return;

  // Criar uma área de estatísticas
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("hero-stats");

  // Dados das estatísticas
  const stats = [
    { number: 30, text: "Anos de experiência" },
    { number: 5000, text: "Manutenções realizadas" },
    { number: 500, text: "Clientes satisfeitos" },
  ];

  // Criar itens de estatísticas
  stats.forEach((stat) => {
    const statItem = document.createElement("div");
    statItem.classList.add("stat-item");

    const statNumber = document.createElement("span");
    statNumber.classList.add("stat-number");
    statNumber.setAttribute("data-count", stat.number);
    statNumber.textContent = "0";

    const statText = document.createElement("div");
    statText.classList.add("stat-text");
    statText.textContent = stat.text;

    statItem.appendChild(statNumber);
    statItem.appendChild(statText);
    statsDiv.appendChild(statItem);
  });

  heroContent.appendChild(statsDiv);
}

// Função para gerenciar abas na seção Sobre
function setupSobreTabs() {
  const sobreText = document.querySelector(".sobre-text");

  if (!sobreText) return;

  // Conteúdo original
  const originalContent = sobreText.innerHTML;

  // Limpar conteúdo atual
  sobreText.innerHTML = "";

  // Adicionar sistema de abas
  const tabsDiv = document.createElement("div");
  tabsDiv.classList.add("sobre-tabs");

  // Botões de abas
  const tabs = [
    { id: "historia", title: "Nossa História" },
    { id: "missao", title: "Missão" },
    { id: "especializacao", title: "Especialização" },
  ];

  tabs.forEach((tab, index) => {
    const tabBtn = document.createElement("button");
    tabBtn.classList.add("tab-btn");
    tabBtn.textContent = tab.title;
    tabBtn.setAttribute("data-tab", tab.id);

    if (index === 0) tabBtn.classList.add("active");

    tabBtn.addEventListener("click", function () {
      // Remover classe ativa de todos os botões
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Adicionar classe ativa ao botão clicado
      this.classList.add("active");

      // Mostrar conteúdo relacionado
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(tab.id).classList.add("active");
    });

    tabsDiv.appendChild(tabBtn);
  });

  sobreText.appendChild(tabsDiv);

  // Conteúdo das abas
  const tabContents = {
    historia: `
      <h3>30 Anos de Expertise</h3>
      <p>
        A <strong>Moraca LTDA</strong> está no mercado há 30 anos, tempo
        durante o qual nos especializamos profundamente na manutenção,
        instalação e reparo de equipamentos radiológicos
        médico-hospitalares, com ênfase especial na marca Ziehm, líder
        mundial em arcos cirúrgicos.
      </p>
      <p>
        Nossa trajetória de três décadas nos permitiu acumular um conhecimento 
        único no setor, tornando-nos referência nacional em soluções para equipamentos 
        radiológicos.
      </p>
    `,
    missao: `
      <h3>Nossa Missão</h3>
      <p>
        Nossa missão é solucionar problemas que ninguém mais consegue
        resolver. Somos reconhecidos como a maior referência em São Paulo
        e no Brasil quando se trata de manutenção especializada em
        equipamentos radiológicos.
      </p>
      <p>
        Oferecemos suporte técnico completo às instituições de saúde,
        simplificando o trabalho de médicos e operadores, garantindo assim
        a eficiência e segurança dos serviços médicos essenciais para toda
        a população.
      </p>
    `,
    especializacao: `
      <h3>Especialização Técnica</h3>
      <p>
        Somos ultra especializados em manutenção de Raio-X com foco
        especial na marca Ziehm. Nossa equipe de técnicos é altamente treinada
        e constantemente atualizada sobre as mais recentes tecnologias.
      </p>
      <p>
        Nossa reputação nos torna a maior referência em São Paulo e no 
        Brasil, sendo procurados quando ninguém mais consegue resolver 
        problemas complexos em equipamentos radiológicos.
      </p>
    `,
  };

  // Criar elementos de conteúdo para cada aba
  Object.keys(tabContents).forEach((tabId, index) => {
    const tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");
    tabContent.id = tabId;
    tabContent.innerHTML = tabContents[tabId];

    if (index === 0) tabContent.classList.add("active");

    sobreText.appendChild(tabContent);
  });
}

// Função para contadores animados
function setupAnimatedCounters() {
  // Contadores na seção Hero
  const heroStatNumbers = document.querySelectorAll(".hero-stats .stat-number");
  animateCounters(heroStatNumbers);

  // Contadores na seção Sobre
  const destaqueNumeros = document.querySelectorAll(".destaque-numero");
  animateCounters(destaqueNumeros);

  // Observador de interseção para animar quando visível
  const counterElements = document.querySelectorAll(
    ".destaque-numero, .stat-number"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters([entry.target]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => observer.observe(el));
  }
}

// Função auxiliar para animar contadores
function animateCounters(counters) {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 segundos
    const increment = Math.ceil(target / (duration / 16)); // 60 fps

    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      counter.textContent = current;
    };

    const timer = setInterval(updateCounter, 16);
  });
}

// Hero Slider com transição melhorada
function setupHeroSlider() {
  const heroSlider = document.querySelector(".hero-slider");

  if (!heroSlider) return;

  // Adicionar overlay
  const overlay = document.createElement("div");
  overlay.classList.add("hero-overlay");
  heroSlider.parentNode.appendChild(overlay);

  // Imagens modernas de equipamentos de raio-x e arcos cirúrgicos
  const slides = [
    "https://images.unsplash.com/photo-1582719471384-894fbb181db5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  // Cria slides
  slides.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("hero-slide");
    slideElement.style.backgroundImage = `url(${slide})`;

    if (index === 0) {
      slideElement.classList.add("active");
    }

    heroSlider.appendChild(slideElement);
  });

  // Função para alternar slides com transição melhorada
  let currentSlide = 0;

  function nextSlide() {
    const allSlides = document.querySelectorAll(".hero-slide");

    if (allSlides.length === 0) return;

    allSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % allSlides.length;
    allSlides[currentSlide].classList.add("active");
  }

  // Alterna slides a cada 5 segundos
  setInterval(nextSlide, 5000);
}

// Form Validation
function setupFormValidation() {
  const formContato = document.getElementById("formContato");
  const formNewsletter = document.getElementById("formNewsletter");

  if (formContato) {
    formContato.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      formContato.reset();
    });
  }

  if (formNewsletter) {
    formNewsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Inscrição realizada com sucesso! Obrigado por se inscrever em nossa newsletter."
      );
      formNewsletter.reset();
    });
  }
}

// Função para scroll suave
function setupSmoothScroll() {
  // Seleciona todos os links que começam com #
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Fecha o menu mobile se estiver aberto
      const nav = document.querySelector("nav");
      const menuMobile = document.querySelector(".menu-mobile");
      const body = document.body;

      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuMobile.classList.remove("active");
        body.style.overflow = "";
      }

      // Pega o valor do href e encontra o elemento na página
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Posição do elemento em relação ao topo da página
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        // Animação de scroll suave
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Função para popular a grade de clientes
function populateClientesGrid() {
  const clientesGrid = document.querySelector(".clientes-grid");

  if (!clientesGrid) return;

  // Exemplos de clientes fictícios
  const clientes = [
    "Hospital São Paulo",
    "Hospital Albert Einstein",
    "Hospital Sírio-Libanês",
    "Hospital do Coração",
    "Hospital Santa Catarina",
    "Hospital São Camilo",
    "Santa Casa de São Paulo",
    "Hospital Santa Marcelina",
    "Hospital São Luiz",
  ];

  // Limpa o conteúdo atual
  clientesGrid.innerHTML = "";

  // Adiciona os logotipos dos clientes
  clientes.forEach((cliente, index) => {
    const clienteDiv = document.createElement("div");
    clienteDiv.classList.add("cliente-logo");
    clienteDiv.setAttribute("data-aos", "fade-up");
    clienteDiv.setAttribute("data-aos-delay", (index * 50).toString());

    const img = document.createElement("img");
    img.src = `https://via.placeholder.com/150x80/f8f9fa/333333?text=${cliente.replace(
      /\s+/g,
      "+"
    )}`;
    img.alt = cliente;

    clienteDiv.appendChild(img);
    clientesGrid.appendChild(clienteDiv);
  });
}

// Adiciona funcionalidade Particles.js para o Hero
function setupParticles() {
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}
