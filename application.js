const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            cart: [],
            sortedPrice: true,
            showProducts: true,
            lessons: "http://127.0.0.1:3000/lessons/",
            attribute: 'name',
            sortingOrder: 1,
            // Orders will be save on this object //
            orders:
            {
                name: '',
                phone: '',
                slots: [],
            },
            lessonsData: []
        }
    },
    methods: {
        created() {
            this.loadLessons();
        },
        async loadLessons() {
            const response = await fetch(this.lessons);
            const data = await response.json();
            console.log(response);
            this.lessonsData = data;
        },
        toBasket(index) {
            console.log(index);
            this.lessons[index].spaces--;
            this.cart.push(
                {
                    id: this.lessons[index].id,
                }
            )
        },
        // remove item from basket
        removeBasket(index) {
            for (let idx = 0; idx < this.cart.length; idx++) {
                const element = this.cart[idx];
                if (index === element.id) {
                    this.cart.splice(this.cart.indexOf(index), 1);
                    this.lessons[index].spaces++;
                }
            }
        },
        // confirmorder save into Order array
        confirmOrder() {
            for (let i = 0; i < this.cart.length; i++) {
                const element = this.cart[i].id;
                console.log(element);
                this.orders.slots.push({
                    element
                });
                this.cart = [];
                this.showProducts = this.showProducts ? false : true;
                alert('Order Placed Successfully...!');
            }
        },
        toggleShowProduct: function () {
            if (this.cart.length > 0) { this.showProducts = this.showProducts ? false : true; }
            else if (this.cart.length <= 0 && this.showProducts == false) {
                this.showProducts = true;
            }
        },
    },
    computed: {
        cartTotal() {
            let val = 0;
            this.cart.forEach(element => {
                val = val + this.lessons[element.id].price;
            });
            // console.log(val);
            return val;
        },
        cartQty() {
            let val = 0;
            this.cart.forEach(element => {
                val++;
            });

            return val;
        },
        sortedArray(){
            this.created();
            let sortArray = this.lessonsData;
            return sortArray;

          },
    }
}).mount('#app');