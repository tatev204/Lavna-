import React, { useState } from 'react';
import { translations } from './translations';

const MOCK_PRODUCTS = [
  { id: 1, name: "Ցեմենտ Ararat M-500 (50կգ)", price: 2900, category: "Շինարարական նյութեր", subCategory: "Ցեմենտ և ծավալային նյութեր", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&q=80" },
  { id: 2, name: "Պերֆորատոր Bosch GBH 2-28", price: 85000, category: "Գործիքներ", subCategory: "Գործիքներ", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80" },
  { id: 3, name: "Ինտերիերի ներկ Caparol (10լ)", price: 24000, category: "Շինարարական նյութեր", subCategory: "Ներկեր և ծածկույթներ", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&q=80" },
  { id: 4, name: "Լամինատ 32-րդ դասի (1մ²)", price: 4500, category: "Վերջնական հարդարում", subCategory: "Վերջնական հարդարում", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=300&q=80" },
  { id: 5, name: "Խառնիչ (Խոհանոցի ծորակ)", price: 18000, category: "Սանտեխնիկա", subCategory: "Սանտեխնիկա", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80" },
  { id: 6, name: "Մալուխ NYM 3x2.5 (100մ)", price: 32000, category: "Էլեկտրոնիկա", subCategory: "Էլեկտրոնիկա", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=80" }
];

const CATEGORIES_DATA = {
  "Շինարարական նյութեր": [
    "Ամրացման ցանցեր",
    "Գիպսաստվարաթուղթ և պարագաններ",
    "Եռաթև բետոնե օղակներ հորաքներ",
    "Խաչուկներ և ՍՎՊ",
    "Հիդրոիզոլյացիա",
    "Ներկարարական սպառվող նյութեր",
    "Ներկեր և ծածկույթներ",
    "Չոր շինարարական խառնուրդներ",
    "Ջերմա և ձայնամեկուսացում",
    "Տանիքածածկ և ջրահեռացում",
    "Ցեմենտ և ծավալային նյութեր"
  ],
  "Էլեկտրոնիկա": ["Մալուխներ", "Վարդակներ և անջատիչներ", "Վահանակներ"],
  "Ինճիներական սանտեխնիկա": ["Խողովակներ", "Ֆիտինգներ", "Փականներ"],
  "Սանտեխնիկա": ["Լվացարաններ", "Զուգարանակոնքեր", "Ծորակներ"],
  "Գործիքներ": ["Ձեռքի գործիքներ", "Էլեկտրական գործիքներ", "Աքսեսուարներ"],
  "Ամրացումներ": ["Պտուտակներ", "Մեխեր", "Գայլիկոններ"],
  "Մետաղական սանտեխնիկա": ["Չուգունե խողովակներ", "Մետաղական կցամասեր"],
  "Օդափոխում": ["Խողովակներ", "Օդափոխիչներ", "Զտիչներ"],
  "Գազամատակարարում": ["Գազի խողովակներ", "Կարգավորիչներ"],
  "Ջեռուցում": ["Մարտկոցներ", "Կաթսաներ", "Ջեռուցվող հատակ"],
  "Վերջնական հարդարում": ["Լամինատ", "Պաստառներ", "Սալիկներ"]
};

export default function App() {
  const [lang, setLang] = useState('hy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeHoverCategory, setActiveHoverCategory] = useState("Շինարարական նյութեր");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Զամբյուղ և Հավանածներ
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Էջերի նավիգացիա ('home' | 'cart' | 'checkout' | 'auth' | 'dashboard')
  const [currentView, setCurrentView] = useState('home'); 
  const [authMode, setAuthMode] = useState('register'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [profileTab, setProfileTab] = useState('personal');

  // Պատվերի ձևակերպման վիճակներ
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderLastName, setOrderLastName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Քարտի կցման վիճակներ
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardAttached, setIsCardAttached] = useState(false);

  // Պատվերի հաստատման մոդալ
  const [showOrderConfirmModal, setShowOrderConfirmModal] = useState(false);

  // Հասցեներ և դուրս գալ
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Ֆորմայի տվյալներ (մուտք/գրանցում)
  const [formName, setFormName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const t = translations[lang];

  const goToHome = () => {
    setCurrentView('home');
    setSearchQuery('');
    setSelectedCategory('all');
    setIsCatalogOpen(false);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const filteredProducts = MOCK_PRODUCTS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory || item.subCategory === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = deliveryType === 'delivery' ? 1500 : 0;
  const grandTotal = cartTotal + (cart.length > 0 ? deliveryFee : 0);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { name: `${formName} ${formLastName}`, phone: formPhone, email: formEmail };
    setCurrentUser(newUser);
    setCurrentView('home');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const active = { name: `Տաթևիկ Գրիգորյան`, phone: formPhone, email: 'tatevik@gmail.com' };
    setCurrentUser(active);
    setCurrentView('home');
  };

  const addAddress = (e) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress]);
    setNewAddress('');
  };

  const handleAttachCardSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert('Խնդրում ենք լրացնել քարտի բոլոր տվյալները');
      return;
    }
    setIsCardAttached(true);
    setShowCardModal(false);
    alert('Քարտը հաջողությամբ կցվեց!');
  };

  return (
    <div>
      {/* ՎԵՐԵՎԻ ԲԱՑ ԴԵՂԻՆ ՀԱՏՎԱԾԸ */}
      <header className="header-container">
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span onClick={goToHome} className="logo">
              <i className="fa-solid fa-hard-hat"></i>
              LAVNA
            </span>

            {/* ԿԱՏԱԼՈԳԻ ԿՈՃԱԿ */}
            <div className="catalog-wrapper">
              <button onClick={() => setIsCatalogOpen(!isCatalogOpen)} className="catalog-btn">
                <i className="fa-solid fa-bars"></i>
                <span>{t.catalog}</span>
                <i className={`fa-solid fa-chevron-down ${isCatalogOpen ? 'rotate' : ''}`}></i>
              </button>

              {isCatalogOpen && (
                <div style={{
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.4)',
                  zIndex: 1000,
                  display: 'flex'
                }}>
                  <div style={{
                    width: '750px',
                    height: '100vh',
                    background: 'white',
                    boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'row',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ width: '300px', borderRight: '1px solid #e2e8f0', padding: '20px', overflowY: 'auto', background: '#f8fafc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Կատալոգ</h3>
                        <button onClick={() => setIsCatalogOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button 
                          onClick={() => { setSelectedCategory('all'); setIsCatalogOpen(false); goToHome(); }}
                          style={{ textAlign: 'left', background: selectedCategory === 'all' ? '#fef08a' : 'none', border: 'none', padding: '10px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          Բոլոր ապրանքները
                        </button>
                        {Object.keys(CATEGORIES_DATA).map((cat, index) => (
                          <button 
                            key={index}
                            onMouseEnter={() => setActiveHoverCategory(cat)}
                            onClick={() => { setSelectedCategory(cat); setIsCatalogOpen(false); goToHome(); }}
                            style={{ 
                              textAlign: 'left', 
                              background: activeHoverCategory === cat ? '#fef08a' : 'none', 
                              border: 'none', 
                              padding: '10px 12px', 
                              borderRadius: '6px', 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              cursor: 'pointer', 
                              color: '#334155',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>{cat}</span>
                            <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', color: '#94a3b8' }}></i>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
                      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#0f172a', borderBottom: '2px solid #fef08a', paddingBottom: '8px' }}>
                        {activeHoverCategory}
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {CATEGORIES_DATA[activeHoverCategory]?.map((sub, idx) => (
                          <div 
                            key={idx}
                            onClick={() => { setSelectedCategory(sub); setIsCatalogOpen(false); goToHome(); }}
                            style={{ 
                              padding: '12px 15px', 
                              background: '#f8fafc', 
                              borderRadius: '8px', 
                              cursor: 'pointer', 
                              fontSize: '13.5px', 
                              fontWeight: '500',
                              color: '#1e293b',
                              border: '1px solid #e2e8f0',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fef9c3'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
                          >
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); goToHome(); }}
            />
          </div>

          <div className="header-actions">
            <div className="contact-wrapper">
              <button onClick={() => setIsContactOpen(!isContactOpen)} className="contact-btn">
                <i className="fa-solid fa-phone" style={{ color: '#d97706' }}></i>
                <span>{t.contact}</span>
              </button>
              {isContactOpen && (
                <div className="contact-dropdown">
                  <a href="tel:+37494556867">+374 94 55-68-67</a>
                  <a href="tel:+37493311171">+374 93 31-11-71</a>
                </div>
              )}
            </div>

            {/* ՎԵՐԵՎԻ ԶԱՄԲՅՈՒՂԻ ԿՈՃԱԿ - ԳՆՈՒՄ Է ԶԱՄԲՅՈՒՂԻ ԷՋ */}
            <button onClick={() => setCurrentView('cart')} className="action-btn" title={t.cart}>
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && <span className="badge">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
            </button>

            <button 
              onClick={() => {
                if (currentUser) {
                  setCurrentView('dashboard');
                } else {
                  setCurrentView('auth');
                  setAuthMode('register');
                }
              }} 
              className="action-btn" 
              title={t.profile}
            >
              <i className="fa-regular fa-user"></i>
            </button>

            <div className="lang-switcher">
              <button onClick={() => setLang('hy')} className={lang === 'hy' ? 'active' : ''}>AM</button>
              <button onClick={() => setLang('ru')} className={lang === 'ru' ? 'active' : ''}>RU</button>
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {/* 1. ԳԼԽԱՎՈՐ ԷՋ (ԱՊՐԱՆՔՆԵՐ) */}
      {currentView === 'home' && (
        <main className="main-content">
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>{t.productsTitle} ({selectedCategory === 'all' ? 'Բոլորը' : selectedCategory})</h2>

          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <p style={{ color: '#64748b' }}>Այս կատեգորիայում ապրանքներ չկան։</p>
            ) : (
              filteredProducts.map(product => {
                const isWishlisted = wishlist.some(item => item.id === product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="product-img-wrapper">
                      <img src={product.image} alt={product.name} />
                      <button onClick={() => toggleWishlist(product)} className="wishlist-icon-btn" style={{ color: isWishlisted ? '#e11d48' : '#64748b' }}>
                        <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                      </button>
                    </div>
                    <div className="product-info">
                      <div>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price">{product.price.toLocaleString()} {t.price}</p>
                      </div>
                      {/* ԱՊՐԱՆՔԻ ՄՈՏԻ ԶԱՄԲՅՈՒՂԻ ԿՈՃԱԿ */}
                      <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                        <i className="fa-solid fa-cart-plus"></i>
                        {t.addToCart}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      )}

      {/* 2. ԶԱՄԲՅՈՒՂԻ ԷՋ */}
      {currentView === 'cart' && (
        <div style={{ maxWidth: '900px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-cart-shopping"></i> Զամբյուղ
          </h2>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <p>Ձեր զամբյուղը դատարկ է</p>
              <button onClick={goToHome} style={{ background: '#fde047', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                Անցնել գնումների
              </button>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                  <img src={item.image} alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '15px', margin: 0, color: '#0f172a' }}>{item.name}</h4>
                    <p style={{ fontSize: '14px', color: '#d97706', fontWeight: 'bold', margin: '5px 0 0' }}>{item.price.toLocaleString()} {t.price} x {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }} title="Հեռացնել">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Ընդհանուր գումար՝ {cartTotal.toLocaleString()} {t.price}</span>
                <button 
                  onClick={() => setCurrentView('checkout')}
                  style={{ background: '#0f172a', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}
                >
                  Ձևակերպել պատվեր
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ՊԱՏՎԵՐԻ ՁԵՎԱԿԵՐՊՄԱՆ ԷՋ */}
      {currentView === 'checkout' && (
        <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#0f172a' }}>Կատարել պատվեր</h2>
          
          <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            
            {/* ՁԱԽ ԿՈՂՄ՝ Զամբյուղի ապրանքները */}
            <div style={{ width: '380px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', fontSize: '16px' }}>Ընտրված ապրանքներ</h3>
              <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '15px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <img src={item.image} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '13px', margin: 0 }}>{item.name}</h4>
                      <p style={{ fontSize: '13px', color: '#d97706', fontWeight: 'bold', margin: '4px 0 0' }}>{item.price.toLocaleString()} x {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ընդհանուր կտրոն */}
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#64748b' }}>
                  <span>Ապրանքներ՝</span>
                  <span>{cartTotal.toLocaleString()} {t.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#64748b' }}>
                  <span>Առաքում՝</span>
                  <span>{deliveryFee.toLocaleString()} {t.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold', borderTop: '1px solid #cbd5e1', paddingTop: '8px', color: '#0f172a' }}>
                  <span>Ընդհանուր գումար՝</span>
                  <span>{grandTotal.toLocaleString()} {t.price}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowOrderConfirmModal(true)}
                style={{ width: '100%', background: '#fde047', color: '#0f172a', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', fontSize: '15px' }}
              >
                Հաստատել պատվերը
              </button>
            </div>

            {/* ՄԵՋՏԵՂՈՒՄ՝ Պատվերի լրացման դաշտեր */}
            <div style={{ flex: 1, background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              
              {/* Առաքման եղանակ */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>Առաքման եղանակ</label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                    <input 
                      type="radio" 
                      name="deliveryType" 
                      checked={deliveryType === 'delivery'} 
                      onChange={() => setDeliveryType('delivery')} 
                    />
                    Առաքում
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                    <input 
                      type="radio" 
                      name="deliveryType" 
                      checked={deliveryType === 'pickup'} 
                      onChange={() => setDeliveryType('pickup')} 
                    />
                    Վերցնել խանութսրահից
                  </label>
                </div>
              </div>

              {/* Եթե ընտրված է Առաքում */}
              {deliveryType === 'delivery' && (
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Ընտրել հասցե քարտեզի վրա</label>
                  <div style={{ width: '100%', height: '180px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                    <span style={{ position: 'absolute', background: 'white', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      📍 Քարտեզ (Սեղմեք հասցեն նշելու համար)
                    </span>
                  </div>

                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Նշել պատվերի հասցեն ձեռքով</label>
                  <input 
                    type="text" 
                    placeholder="Օր.՝ Կոմիտասի պող. 12, բն. 45" 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              )}

              {/* Կցել քարտ կոճակ */}
              <div style={{ marginBottom: '25px', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Վճարային քարտ</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      {isCardAttached ? '✅ Քարտը կցված է' : 'Քարտ կցված չէ'}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!currentUser) {
                        alert('Քարտ կցելու համար խնդրում ենք նախ մուտք գործել կամ գրանցվել։');
                        setCurrentView('auth');
                        setAuthMode('login');
                      } else {
                        setShowCardModal(true);
                      }
                    }}
                    style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Կցել քարտ
                  </button>
                </div>
              </div>

              {/* Անձնական տվյալներ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Անուն</label>
                  <input 
                    type="text" 
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    placeholder="Ձեր անունը"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Ազգանուն</label>
                  <input 
                    type="text" 
                    value={orderLastName}
                    onChange={(e) => setOrderLastName(e.target.value)}
                    placeholder="Ձեր ազգանունը"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Հեռախոսահամար</label>
                <input 
                  type="text" 
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  placeholder="+374 XX XXXXXX"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              {/* Առաքման օր (օրացույց) */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Առաքման օրը (Օրացույց)</label>
                <input 
                  type="date" 
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              {/* Առաքման ծառայություն (ազատ հատված) */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Առաքման ծառայություն</label>
                <input 
                  type="text" 
                  disabled 
                  placeholder="Ընտրված չէ (Ազատ հատված)" 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              {/* Լրացուցիչ նշումներ */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#64748b' }}>Լրացուցիչ նշումներ</label>
                <textarea 
                  rows="3"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Հատուկ ցուցումներ առաքիչին..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', resize: 'none' }}
                ></textarea>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ՔԱՐՏԻ ԿՑՄԱՆ ՄՈԴԱԼ (ՄԻԱՅՆ ԳՐԱՆՑՎԱԾՆԵՐԻ ՀԱՄԱՐ) */}
      {showCardModal && (
        <div className="modal-backdrop" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button onClick={() => setShowCardModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Լրացրեք քարտի տվյալները</h3>
            <form onSubmit={handleAttachCardSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Քարտի համար</label>
                <input 
                  type="text" 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Վավեր ժամկետ</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>CVV</label>
                  <input 
                    type="password" 
                    placeholder="123" 
                    maxLength="3"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <button type="submit" style={{ width: '100%', background: '#fde047', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Կցել քարտը
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ՊԱՏՎԵՐԻ ՀԱՍՏԱՏՄԱՆ ՄՈԴԱԼ (Այո / Ոչ) */}
      {showOrderConfirmModal && (
        <div className="modal-backdrop" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '20px', color: '#0f172a' }}>Հաստատել պատվերը</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => {
                  alert('Ձեր պատվերը հաջողությամբ հաստատվեց!');
                  setCart([]);
                  setShowOrderConfirmModal(false);
                  goToHome();
                }}
                style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Այո
              </button>
              <button 
                onClick={() => setShowOrderConfirmModal(false)}
                style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Ոչ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ՄՈՒՏՔԻ / ԳՐԱՆՑՄԱՆ ԷՋ */}
      {currentView === 'auth' && (
        <div style={{ maxWidth: '450px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {authMode === 'login' ? (
            <div>
              <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#0f172a' }}>Մուտք գործել հաշիվ</h2>
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Հեռախոսահամար</label>
                  <input 
                    type="text" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Գաղտնաբառ</label>
                  <input 
                    type="password" 
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <button type="submit" style={{ width: '100%', background: '#fde047', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
                  Մուտք գործել
                </button>
              </form>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                Չունե՞ք հաշիվ։{' '}
                <span onClick={() => setAuthMode('register')} style={{ color: '#0f172a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                  Գրանցվել
                </span>
              </p>
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: 'center', marginBottom: '5px', color: '#0f172a' }}>Ես նոր հաճախորդ եմ</h2>
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Անուն*</label>
                  <input 
                    type="text" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Ազգանուն*</label>
                  <input 
                    type="text" 
                    value={formLastName}
                    onChange={(e) => setFormLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Հեռախոսահամար*</label>
                  <input 
                    type="text" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Էլ. հասցե*</label>
                  <input 
                    type="email" 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Գաղտնաբառ*</label>
                  <input 
                    type="password" 
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <button type="submit" style={{ width: '100%', background: '#fde047', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
                  Գրանցվել
                </button>
              </form>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                Արդեն ունե՞ք հաշիվ։{' '}
                <span onClick={() => setAuthMode('login')} style={{ color: '#0f172a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                  Մուտք գործել
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. ՕԳՏԱՏԻՐՈՋ ԱՄԲՈՂՋԱԿԱՆ ԷՋԸ (DASHBOARD) */}
      {currentView === 'dashboard' && currentUser && (
        <div style={{ maxWidth: '1000px', margin: '30px auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', gap: '40px', position: 'relative' }}>
          <div style={{ width: '250px', borderRight: '1px solid #e2e8f0', paddingRight: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0f172a' }}>Ողջույն՝ {currentUser.name}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => setProfileTab('personal')} style={{ textAlign: 'left', background: profileTab === 'personal' ? '#fde047' : 'none', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Անձնական էջ
              </button>
              <button onClick={() => setProfileTab('addresses')} style={{ textAlign: 'left', background: profileTab === 'addresses' ? '#fde047' : 'none', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Հասցեներ
              </button>
              <button onClick={() => setProfileTab('orders')} style={{ textAlign: 'left', background: profileTab === 'orders' ? '#fde047' : 'none', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Պատվերներ
              </button>
              <button onClick={() => setShowLogoutConfirm(true)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', color: '#ef4444', marginTop: '20px' }}>
                Դուրս գալ
              </button>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            {showLogoutConfirm && (
              <div style={{ position: 'absolute', inset: '0', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '20px' }}>Արդյո՞ք ցանկանում եք դուրս գալ</p>
                <div style={{ display: 'flex', gap: '15px', width: '100%', maxWidth: '250px' }}>
                  <button onClick={() => { setCurrentUser(null); setCurrentView('auth'); setAuthMode('login'); setShowLogoutConfirm(false); }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Այո</button>
                  <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, background: '#cbd5e1', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ոչ</button>
                </div>
              </div>
            )}

            {profileTab === 'personal' && (
              <div>
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Անձնական էջ</h2>
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Անձնական տվյալներ</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '10px 0' }}>Անուն Ազգանուն՝ <strong>{currentUser.name}</strong></p>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '10px 0' }}>Հեռախոսահամար՝ {currentUser.phone}</p>
                </div>
              </div>
            )}

            {profileTab === 'addresses' && (
              <div>
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Առաքման հասցեներ</h2>
                <div style={{ marginBottom: '20px' }}>
                  {addresses.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>Դեռևս հասցեներ ավելացված չեն։</p>
                  ) : (
                    addresses.map((addr, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px' }}>📍 {addr}</div>
                    ))
                  )}
                </div>
                <form onSubmit={addAddress}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#64748b' }}>Ավելացնել նոր հասցե</label>
                    <input type="text" placeholder="Օր.՝ Մաշտոցի 5" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" style={{ background: '#fde047', color: '#0f172a', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ավելացնել հասցե</button>
                </form>
              </div>
            )}

            {profileTab === 'orders' && (
              <div>
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Ձեր պատվերները</h2>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Դուք դեռևս պատվերներ չունեք։</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
