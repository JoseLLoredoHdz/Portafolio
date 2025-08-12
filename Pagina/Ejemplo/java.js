 // ===================== UTILIDADES =====================
const $ = (s,scope=document)=>scope.querySelector(s);
const $$ = (s,scope=document)=>Array.from(scope.querySelectorAll(s));
const storage = {
    get(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback }catch{ return fallback } },
    set(key, val){ localStorage.setItem(key, JSON.stringify(val)) }
};

function showToast(msg){
    const el = $('#toast');
    el.textContent = msg;
    el.style.display = 'block';
    el.style.opacity = '1';
    setTimeout(()=>{ el.style.opacity = '0'; }, 1800);
    setTimeout(()=>{ el.style.display = 'none'; }, 2200);
}

// ===================== TEMA (DARK/LIGHT) =====================
function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    $('#miniTheme').textContent = theme === 'light' ? 'Claro' : 'Oscuro';
}

function initTheme(){
    const saved = storage.get('theme', null);
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved ?? (prefDark ? 'dark' : 'light');
    storage.set('theme', theme);
    applyTheme(theme);
}

// ===================== NAV / MENÚ =====================
function initNav(){
    const btn = $('#btnMenu');
    const menu = $('#mainMenu');
    btn?.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    });
    // cerrar menú al navegar
    menu?.addEventListener('click', (e)=>{
    if(e.target.matches('a')){ menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
}

// ===================== HERO PANEL =====================
function initHeroPanel(){
    // reloj
    const clock = $('#clock');
    const localTime = $('#localTime');
    function tick(){
    const d = new Date();
    clock.textContent = d.toLocaleString();
    localTime.textContent = d.toLocaleTimeString();
    }
    tick(); setInterval(tick,1000);

    // visitas demo
    const v = storage.get('visits', 0) + 1; storage.set('visits', v);
    $('#visits').textContent = v;
}

// ===================== CARRITO (DEMO) =====================
function updateCartUI(){
    const items = storage.get('cart', []);
    $('#cartCount').textContent = items.length;
    $('#miniCart').textContent = items.length;
}

function initCart(){
    updateCartUI();
    $$('#productGrid .add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const items = storage.get('cart', []);
        items.push({ id: btn.dataset.id, name: btn.dataset.name, ts: Date.now() });
        storage.set('cart', items);
        updateCartUI();
        showToast(`Añadido: ${btn.dataset.name}`);
    })
    })
}

// ===================== FILTROS DE PRODUCTO =====================
function initFilters(){
    const grid = $('#productGrid');
    $$('.toolbar [data-filter]').forEach(b=>{
    b.addEventListener('click', ()=>{
        const f = b.dataset.filter;
        $$('#productGrid .product', grid).forEach(card=>{
        card.style.display = (f==='all'|| card.dataset.category===f) ? '' : 'none';
        });
    })
    })
}

// ===================== FORMULARIO =====================
function initForm(){
    const form = $('#contactForm');
    form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    let ok = true;

    // reset errores
    ['name','email','message'].forEach(id=>$('#err-'+id).textContent='');

    if(name.length < 2){ $('#err-name').textContent = 'Ingresa un nombre válido.'; ok=false }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ $('#err-email').textContent = 'Email no válido.'; ok=false }
    if(message.length < 10){ $('#err-message').textContent = 'El mensaje es muy corto.'; ok=false }

    if(ok){
        // demo: guardar en localStorage
        const msgs = storage.get('messages', []);
        msgs.push({ name, email, topic: $('#topic').value, message, newsletter: $('#newsletter').checked, at: new Date().toISOString() });
        storage.set('messages', msgs);
        form.reset();
        showToast('¡Mensaje enviado (demo)!');
    }
    });
}

// ===================== SUSCRIPCIÓN =====================
function initSubscription(){
    $('#btnSub').addEventListener('click', ()=>{
    const email = $('#emailSub').value.trim();
    if(!email){ showToast('Escribe tu email'); return }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showToast('Email no válido'); return }
    const list = storage.get('subs', []);
    list.push({ email, at: new Date().toISOString() });
    storage.set('subs', list);
    $('#emailSub').value='';
    showToast('Suscripción registrada ✅');
    })
}

// ===================== BACK TO TOP =====================
function initToTop(){
    const btn = $('#toTop');
    window.addEventListener('scroll', ()=>{
    btn.style.display = window.scrollY > 600 ? 'block' : 'none';
    });
    btn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
}

// ===================== ARRANQUE =====================
document.addEventListener('DOMContentLoaded', ()=>{
    initTheme();
    initNav();
    initHeroPanel();
    initCart();
    initFilters();
    initForm();
    initSubscription();
    initToTop();

    // toggle theme
    $('#toggleTheme').addEventListener('click', ()=>{
    const next = (storage.get('theme','dark') === 'dark') ? 'light' : 'dark';
    storage.set('theme', next); applyTheme(next);
    });

    // año footer
    $('#year').textContent = new Date().getFullYear();
});