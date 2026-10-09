import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="topbar">
      <a class="brand" href="#"><span class="brand-icon">✿</span> ochni<span class="brand-dot">.</span></a>
      <nav><a href="#shop">Shop</a><a href="#about">Our Story</a><a href="#contact">Contact</a></nav>
      <button class="cart" (click)="cartOpen = !cartOpen">Bag <span>{{ cart.length }}</span></button>
    </header>
    <main>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">LITTLE HANDS. BIG IMAGINATIONS.</p>
          <h1>Play more.<br><em>Make magic.</em></h1>
          <p class="intro">Colorful little things for curious kids — creative kits, playful crafts, and happy moments made by hand.</p>
          <a class="primary" href="#shop">Explore the collection <span>↗</span></a>
          <div class="trust"><span>✦</span> Made for tiny creators <span>•</span> Big on fun</div>
        </div>
        <div class="hero-art">
          <div class="sun"></div><div class="shape shape-one">✿</div><div class="shape shape-two">★</div>
          <div class="craft-card"><div class="rainbow">◡</div><div class="clay clay-pink"></div><div class="clay clay-yellow"></div><div class="clay clay-blue"></div><span>MAKE IT YOURS!</span></div>
          <div class="sparkle s1">✦</div><div class="sparkle s2">✧</div><div class="bubble">PLAY<br/>ALL DAY</div>
        </div>
      </section>
      <section class="ticker"><span>✳ CREATIVE PLAY</span><span>✳ COLORFUL CRAFTS</span><span>✳ LITTLE GIFTS</span><span>✳ BIG SMILES</span></section>
      <section id="shop" class="shop">
        <div class="section-head"><div><p class="eyebrow">THE HAPPY LITTLE SHOP</p><h2>Made to <em>make you smile.</em></h2></div><p>Small crafts, endless possibilities.</p></div>
        <div class="filters"><button [class.active]="category === 'All'" (click)="category = 'All'">Everything</button><button [class.active]="category === 'Craft Kits'" (click)="category = 'Craft Kits'">Craft kits</button><button [class.active]="category === 'Mini Gifts'" (click)="category = 'Mini Gifts'">Mini gifts</button><input aria-label="Search products" placeholder="Search the shop…" [(ngModel)]="search" /></div>
        <div class="products">
          <article class="product" *ngFor="let product of filteredProducts">
            <div class="product-art" [style.background]="product.color"><span class="product-emoji">{{ product.emoji }}</span><span class="tag">{{ product.tag }}</span></div>
            <div class="product-info"><div><h3>{{ product.name }}</h3><p>{{ product.description }}</p></div><strong>Rs. {{ product.price }}</strong></div>
            <button class="add" (click)="addToCart(product.name)">Add to bag <span>＋</span></button>
          </article>
          <p class="empty" *ngIf="filteredProducts.length === 0">No items found. Try another search.</p>
        </div>
      </section>
      <section id="about" class="about"><div class="about-stamp">MADE WITH<br/>LOVE ♡</div><div><p class="eyebrow">A LITTLE ABOUT OCHNI</p><h2>Less scrolling.<br/><em>More creating.</em></h2><p>Ochni is all about giving kids a fun way to imagine, build, paint, and proudly show off what they make. Our starter collection is just the beginning.</p></div></section>
      <section id="contact" class="contact"><div><p class="eyebrow">SAY HELLO</p><h2>Need a hand?</h2><p>Questions about a craft or an order? Drop us a message.</p></div><form (submit)="sendMessage($event)"><input required placeholder="Your name"/><input type="email" required placeholder="Email address"/><textarea required placeholder="What can we help with?"></textarea><button class="primary" type="submit">Send message ↗</button><p class="notice" *ngIf="message">{{ message }}</p></form></section>
    </main>
    <footer><a class="brand" href="#">✿ ochni<span class="brand-dot">.</span></a><p>Little things. Big imagination.</p><span>© 2026 Ochni Kids Play Accessories</span></footer>
    <div class="cart-panel" *ngIf="cartOpen"><button class="close" (click)="cartOpen=false">×</button><h3>Your bag</h3><p *ngIf="cart.length===0">Your bag is waiting for a little something.</p><p *ngFor="let item of cart">♡ {{ item }}</p><button class="primary" (click)="cartOpen=false">Keep exploring</button></div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap');
    :host{display:block;color:#282b25;font-family:'DM Sans',sans-serif}*{box-sizing:border-box}a{color:inherit;text-decoration:none}.topbar{height:82px;padding:0 7%;display:flex;align-items:center;justify-content:space-between;background:#fffdf8}.brand{font-size:28px;font-weight:700;letter-spacing:-1.5px}.brand-icon{color:#e97861}.brand-dot{color:#e97861}.topbar nav{display:flex;gap:34px;font-size:13px;color:#686a60}.topbar nav a:hover{color:#e97861}.cart{border:1px solid #deded4;border-radius:30px;background:transparent;padding:10px 18px;font:inherit;font-size:12px}.cart span{background:#e97861;color:white;border-radius:50%;padding:3px 7px;margin-left:7px}.hero{min-height:540px;background:#f5e8d7;display:grid;grid-template-columns:1fr 1fr;padding:50px 10% 54px;overflow:hidden}.hero-copy{align-self:center;max-width:480px;z-index:1}.eyebrow{font-size:10px;letter-spacing:2.2px;font-weight:700;color:#db775f;margin:0 0 17px}.hero h1{font-size:clamp(48px,6vw,78px);letter-spacing:-4px;line-height:1.04;margin:0 0 22px;font-weight:700}.hero h1 em,h2 em{font-family:'Playfair Display',serif;color:#db775f;font-weight:600}.intro{font-size:14px;line-height:1.9;color:#66675e;max-width:390px;margin-bottom:28px}.primary{display:inline-flex;gap:32px;align-items:center;border:0;border-radius:3px;background:#dc795f;color:#fff;padding:15px 20px;font:600 12px 'DM Sans',sans-serif;cursor:pointer}.primary:hover{background:#c9604a}.trust{font-size:10px;color:#74756b;margin-top:24px}.trust span:first-child{color:#d87960}.trust span:last-child{padding:0 8px}.hero-art{position:relative;min-height:420px;display:flex;align-items:center;justify-content:center}.sun{width:300px;height:300px;background:#edc8a5;border-radius:50%;position:absolute;right:4%;top:7%}.craft-card{position:relative;z-index:1;width:270px;height:300px;border-radius:48% 48% 18px 18px;background:#fffaf0;box-shadow:0 20px 50px #8f67412b;transform:rotate(5deg);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:15px}.craft-card span{font-size:10px;letter-spacing:2px;color:#6c675b}.rainbow{font-size:95px;line-height:.7;color:#e87962;transform:rotate(180deg)}.clay{width:42px;height:42px;border-radius:50%;position:absolute;box-shadow:inset -6px -5px 0 #0000000d}.clay-pink{background:#e88381;left:43px;bottom:68px}.clay-yellow{background:#edc65c;right:47px;bottom:88px}.clay-blue{background:#83b9bc;left:95px;bottom:38px}.shape{position:absolute;font-size:56px;z-index:2}.shape-one{color:#df8066;right:0;top:50px}.shape-two{color:#f1bf51;left:4%;bottom:55px}.sparkle{position:absolute;color:#dc795f;font-size:30px}.s1{top:13%;left:18%}.s2{bottom:16%;right:10%}.bubble{position:absolute;z-index:2;right:1%;bottom:16%;background:#819e87;color:#fff;padding:20px 17px;border-radius:50%;font-size:10px;text-align:center;line-height:1.7;transform:rotate(10deg)}.ticker{background:#819e87;color:white;display:flex;justify-content:space-around;padding:17px 4%;font-size:10px;letter-spacing:1.4px;gap:12px;flex-wrap:wrap}.shop{padding:95px 9% 100px;background:#fffdf8}.section-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:28px}.section-head h2,.about h2,.contact h2{font:700 clamp(30px,4vw,45px) 'DM Sans',sans-serif;letter-spacing:-1.8px;margin:0}.section-head>p{font-size:12px;color:#77786e}.filters{display:flex;align-items:center;gap:8px;margin-bottom:28px;flex-wrap:wrap}.filters button{border:1px solid #e3e0d8;background:transparent;padding:9px 14px;border-radius:25px;font-size:11px;color:#686a60;cursor:pointer}.filters button.active{background:#282b25;color:white;border-color:#282b25}.filters input{margin-left:auto;max-width:220px;border:1px solid #e3e0d8;padding:10px 14px;border-radius:25px;background:#fffdf8;font:12px 'DM Sans',sans-serif}.products{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.product{min-width:0}.product-art{height:240px;border-radius:5px;display:grid;place-items:center;position:relative;overflow:hidden}.product-emoji{font-size:88px;filter:drop-shadow(0 10px 10px #00000012);transition:transform .25s}.product:hover .product-emoji{transform:scale(1.1) rotate(-5deg)}.tag{position:absolute;top:13px;left:13px;background:#fffdf8;padding:6px 9px;font-size:9px;border-radius:2px}.product-info{display:flex;justify-content:space-between;gap:8px;align-items:start;padding:16px 0 13px}.product-info h3{font-size:14px;margin:0 0 5px}.product-info p{font-size:11px;color:#838378;margin:0}.product-info strong{font-size:12px;white-space:nowrap}.add{width:100%;background:transparent;border:1px solid #d9d8cf;padding:11px 13px;display:flex;justify-content:space-between;font:600 11px 'DM Sans',sans-serif;cursor:pointer}.add:hover{background:#282b25;color:white}.empty{grid-column:1/-1;color:#777;font-size:13px}.about{background:#f5e8d7;padding:85px 15%;display:flex;align-items:center;justify-content:center;gap:90px;position:relative}.about>div:last-child{max-width:430px}.about h2{margin-bottom:18px}.about>div:last-child>p:last-child{font-size:13px;line-height:1.9;color:#66675e}.about-stamp{width:145px;height:145px;flex-shrink:0;border:1px solid #dc795f;border-radius:50%;display:grid;place-content:center;text-align:center;color:#dc795f;font-size:13px;letter-spacing:2px;line-height:1.8;transform:rotate(-12deg)}.contact{padding:85px 12%;display:grid;grid-template-columns:1fr 1fr;gap:70px;background:#fffdf8}.contact>div>p:last-child{font-size:13px;color:#77786e;line-height:1.8}.contact form{display:grid;gap:12px}.contact input,.contact textarea{width:100%;border:1px solid #e3e0d8;background:white;padding:14px;font:12px 'DM Sans',sans-serif}.contact textarea{min-height:100px;resize:vertical}.contact form .primary{justify-self:start}.notice{font-size:12px;color:#578260}footer{background:#282b25;color:white;padding:30px 7%;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}footer p,footer>span{font-size:10px;color:#c4c5b9;margin:0}.cart-panel{position:fixed;z-index:10;right:20px;top:90px;width:min(320px,calc(100vw - 40px));background:#fffdf8;padding:28px;box-shadow:0 15px 50px #0002;border:1px solid #eee}.cart-panel h3{margin-top:0}.cart-panel p{font-size:13px;color:#686a60}.close{float:right;border:0;background:none;font-size:25px;cursor:pointer}@media(max-width:760px){.topbar{height:70px;padding:0 5%}.topbar nav{gap:12px;font-size:11px}.topbar nav a:nth-child(2){display:none}.brand{font-size:24px}.cart{padding:8px 11px}.hero{grid-template-columns:1fr;padding:52px 7% 24px}.hero-art{min-height:340px}.sun{width:240px;height:240px;right:8%;top:4%}.craft-card{width:220px;height:245px}.rainbow{font-size:75px}.shop{padding:65px 6%}.section-head{display:block}.section-head>p{margin-top:10px}.products{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.product-art{height:180px}.product-emoji{font-size:64px}.product-info{display:block}.product-info strong{display:block;margin-top:8px}.filters input{margin:5px 0 0;max-width:none;width:100%}.about{padding:60px 8%;gap:25px;flex-direction:column}.about-stamp{width:110px;height:110px;font-size:10px}.contact{padding:60px 7%;grid-template-columns:1fr;gap:25px}footer{justify-content:center;text-align:center;flex-direction:column;gap:10px}}@media(max-width:390px){.topbar nav{gap:8px}.topbar nav a{font-size:10px}.products{grid-template-columns:1fr}.product-art{height:240px}}
  `]
})
export class AppComponent {
  category = 'All';
  search = '';
  cart: string[] = [];
  cartOpen = false;
  message = '';
  products = [
    {name:'Rainbow Craft Kit',description:'A burst of color and creativity',price:450,category:'Craft Kits',emoji:'🌈',color:'#f5d9ce',tag:'BESTSELLER'},
    {name:'Mini Dough Friends',description:'Squishy, silly, handmade fun',price:300,category:'Craft Kits',emoji:'🍩',color:'#f4e6ae',tag:'KID FAVOURITE'},
    {name:'Tiny Art Set',description:'Little tools for big ideas',price:550,category:'Craft Kits',emoji:'🎨',color:'#d5e7dc',tag:'NEW'},
    {name:'Happy Charm',description:'A pocket-sized happy surprise',price:200,category:'Mini Gifts',emoji:'🧸',color:'#e8d9ed',tag:'GIFT PICK'},
    {name:'Color Pop Flowers',description:'Bright little handmade blooms',price:250,category:'Mini Gifts',emoji:'🌼',color:'#f5d8de',tag:'HANDMADE'},
    {name:'Dino Buddy',description:'A tiny friend for playtime',price:350,category:'Mini Gifts',emoji:'🦕',color:'#d4e5e8',tag:'POPULAR'}
  ];
  get filteredProducts() {
    return this.products.filter(p => (this.category === 'All' || p.category === this.category) && (p.name + ' ' + p.description).toLowerCase().includes(this.search.toLowerCase()));
  }
  addToCart(name: string) { this.cart = [...this.cart, name]; }
  sendMessage(event: Event) { event.preventDefault(); this.message = 'Thanks! This demo form is ready for a backend connection.'; }
}
