Vue.component('product', {
    template: `
    <div class="product">

      <div class="product-image">
         <img :src="image" :alt="altText" />
      </div>

      <div class="product-info">
         <h1>{{ title }}</h1>
         <a :href="link">More products like this</a>
         <p v-if="inStock">In stock</p>
         <p v-else-if="variants.variantQuantity <= 10 && variants.variantQuantity > 0">Almost sold out!</p>
         <p
                 v-else
                 :class="{ outOfStock: !inStock }"
         >
           Out of stock
         </p>
         
         <span v-show="onSale">{{ sale }}</span>
         <p>Shipping: {{ shipping }}</p>
         <product-details/>
         
         <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor }"
            @mouseover="updateProduct(index)"
            >
         </div>

         <ul>
            <li v-for="size in sizes">{{ size }}</li>
         </ul>

         <button 
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
         >
            Add to cart
         </button>
         <button v-on:click="downToCart">Down to cart</button>

      </div>
    </div>
  `,
  data() { 
    return  {
        product: "Socks",
        description: "A pair of warm, fuzzy socks.",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
            },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],    
    }
  },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        downToCart() {
            this.$emit('down-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },         
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },         
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            return this.product + ' ' + this.brand + ' ' + "Проходит распродажа!";
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    },     
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
 // Тут будут описание данных, методов, вычисляемых свойств
 })

 Vue.component('product-details',{
    template: `
    <div>
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    `,
    data() {
        return{
            details: ['80% cotton', '20% polyester', 'Gender-neutral']
        }
    }
 })

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        downToCart() {
            this.cart.pop();
        }, 
    }
 })
 
 

 
