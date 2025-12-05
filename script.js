// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 滚动指示器功能
const indicatorDots = document.querySelectorAll('.indicator-dot');
const slides = document.querySelectorAll('.slide');

// 监听滚动事件，更新滚动指示器和导航栏样式
window.addEventListener('scroll', () => {
    // 更新导航栏样式
    if (window.scrollY > 50) {
        document.querySelector('.navbar').style.background = 'rgba(255, 255, 255, 0.98)';
        document.querySelector('.navbar').style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        document.querySelector('.navbar').style.background = 'rgba(255, 255, 255, 0.95)';
        document.querySelector('.navbar').style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // 更新滚动指示器
    let current = '';
    slides.forEach(slide => {
        const slideTop = slide.offsetTop;
        const slideHeight = slide.clientHeight;
        if (window.scrollY >= slideTop - slideHeight / 3) {
            current = slide.getAttribute('id');
        }
    });

    indicatorDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${current}`) {
            dot.classList.add('active');
        }
    });

    // 更新导航链接激活状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 幻灯片元素动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
const animatedElements = document.querySelectorAll('.intro-item, .feature-card, .material-container, .comparison-table, .scenario-item, .purchase-container');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 材质图层悬停效果已通过CSS实现，保留选择器供后续扩展
const diagramLayers = document.querySelectorAll('.diagram-layer');
// CSS已实现丰富的悬停效果，包括3D旋转、渐变光效和阴影变化
// 如需额外交互，可在此添加事件监听器

// 购买按钮点击效果
const buyButton = document.querySelector('.buy-button');
if (buyButton) {
    buyButton.addEventListener('click', () => {
        // 添加点击动画
        buyButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buyButton.style.transform = '';
        }, 150);
        
        // 这里可以添加跳转逻辑
        alert('感谢您的关注！请访问我们的官方商城进行购买。');
    });
}

// 图片悬停放大效果
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.3s ease';
        img.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = '';
    });
});

// 页面加载完成后的动画
window.addEventListener('load', () => {
    // 首页已经通过CSS动画实现，此处不再需要额外JS动画
});

// 响应式调整
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 添加页面滚动进度条
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #f39c12);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// 为表格添加交互效果
const tableRows = document.querySelectorAll('tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.background = '#e8f4f8';
        row.style.transform = 'translateX(5px)';
        row.style.transition = 'all 0.3s ease';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.background = '';
        row.style.transform = '';
    });
});

// 移除鼠标移动视差效果 - 已不再需要

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    const currentSlide = document.querySelector('.slide.active') || document.querySelector('.slide');
    const slidesArray = Array.from(slides);
    const currentIndex = slidesArray.indexOf(currentSlide);
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextSlide = slidesArray[currentIndex + 1];
        if (nextSlide) {
            nextSlide.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevSlide = slidesArray[currentIndex - 1];
        if (prevSlide) {
            prevSlide.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 场景轮播图拖拽功能
function initScenarioDrag() {
    const scenariosGrid = document.getElementById('scenariosGrid');
    if (!scenariosGrid) return;
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationState = null;
    
    // 鼠标按下事件
    scenariosGrid.addEventListener('mousedown', (e) => {
        isDragging = true;
        scenariosGrid.style.animationPlayState = 'paused';
        animationState = scenariosGrid.style.animationPlayState;
        
        startX = e.pageX - scenariosGrid.offsetLeft;
        scrollLeft = scenariosGrid.scrollLeft;
        
        // 阻止文本选择
        scenariosGrid.style.userSelect = 'none';
    });
    
    // 鼠标移动事件
    scenariosGrid.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.pageX - scenariosGrid.offsetLeft;
        const walk = (x - startX) * 1.5; // 拖拽速度
        scenariosGrid.scrollLeft = scrollLeft - walk;
    });
    
    // 鼠标释放事件
    scenariosGrid.addEventListener('mouseup', () => {
        finishDrag();
    });
    
    // 鼠标离开事件
    scenariosGrid.addEventListener('mouseleave', () => {
        finishDrag();
    });
    
    // 触摸事件支持
    scenariosGrid.addEventListener('touchstart', (e) => {
        isDragging = true;
        scenariosGrid.style.animationPlayState = 'paused';
        animationState = scenariosGrid.style.animationPlayState;
        
        startX = e.touches[0].pageX - scenariosGrid.offsetLeft;
        scrollLeft = scenariosGrid.scrollLeft;
        
        scenariosGrid.style.userSelect = 'none';
    });
    
    scenariosGrid.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.touches[0].pageX - scenariosGrid.offsetLeft;
        const walk = (x - startX) * 1.5;
        scenariosGrid.scrollLeft = scrollLeft - walk;
    });
    
    scenariosGrid.addEventListener('touchend', () => {
        finishDrag();
    });
    
    // 结束拖拽函数
    function finishDrag() {
        isDragging = false;
        scenariosGrid.style.userSelect = '';
        
        // 恢复动画
        setTimeout(() => {
            if (animationState === 'paused') {
                scenariosGrid.style.animationPlayState = 'running';
            }
        }, 1000);
    }
}

// 初始化函数
function init() {
    console.log('宝树之光记忆枕头网页版PPT已加载完成！');
    
    // 添加页面加载完成的类
    document.body.classList.add('loaded');
    
    // 初始化场景轮播图拖拽功能
    initScenarioDrag();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}