// Mobile Menu 
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        const closeMenu = document.querySelector('.close-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cart 
        const cartBtn = document.querySelector('.cart-btn');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCart = document.querySelector('.close-cart');
        
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

       
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const removeButtons = document.querySelectorAll('.remove-item');
        
        plusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const quantityElement = e.target.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                quantityElement.textContent = quantity + 1;
                updateCartTotal();
            });
        });
        
        minusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const quantityElement = e.target.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 1) {
                    quantityElement.textContent = quantity - 1;
                    updateCartTotal();
                }
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const cartItem = e.target.closest('.cart-item');
                cartItem.remove();
                updateCartCount();
                updateCartTotal();
            });
        });

      
        function updateCartTotal() {
            const cartItems = document.querySelectorAll('.cart-item');
            let subtotal = 0;
            
            cartItems.forEach(item => {
                const priceText = item.querySelector('.cart-item-details p:nth-child(3)').textContent;
                const price = parseFloat(priceText.replace('$', ''));
                const quantity = parseInt(item.querySelector('.quantity').textContent);
                subtotal += price * quantity;
            });
            
            const shipping = 30;
            const taxes = subtotal * 0.1;
            const total = subtotal + shipping + taxes;
            
            document.querySelector('.cart-total-row:nth-child(1) p:last-child').textContent = `$${subtotal.toFixed(2)}`;
            document.querySelector('.cart-total-row:nth-child(3) p:last-child').textContent = `$${taxes.toFixed(2)}`;
            document.querySelector('.cart-total-row.total p:last-child').textContent = `$${total.toFixed(2)}`;
        }

    
        function updateCartCount() {
            const cartItems = document.querySelectorAll('.cart-item');
            document.querySelector('.cart-count').textContent = cartItems.length;
            document.querySelector('.cart-header h3').textContent = `Tu carrito (${cartItems.length})`;
        }

     
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.slider-dot');
        let currentIndex = 0;
        
       
        const firstCard = testimonialCards[0].cloneNode(true);
        testimonialTrack.appendChild(firstCard);
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex % dots.length);
            });
        }
        
      
        setInterval(() => {
            currentIndex++;
            if (currentIndex >= testimonialCards.length) {
                // When reaching the clone, reset without animation
                currentIndex = 0;
                testimonialTrack.style.transition = 'none';
                updateSlider();
                // Force reflow
                void testimonialTrack.offsetWidth;
                testimonialTrack.style.transition = 'transform 0.5s ease';
                currentIndex = 1;
            }
            updateSlider();
        }, 5000);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.category-card, .restaurant-card, .step');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

  
        document.querySelectorAll('.category-card, .restaurant-card, .step').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

     
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        searchButton.addEventListener('click', () => {
            if (searchInput.value.trim() !== '') {
                alert(`Buscando: ${searchInput.value}`);
           
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                alert(`Buscando: ${searchInput.value}`);
            }
        });


        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email.includes('@')) {
                alert(`Gracias por suscribirte con el correo: ${email}`);
                newsletterForm.querySelector('input').value = '';
            } else {
                alert('Por favor ingresa un correo electrónico válido');
            }
        });