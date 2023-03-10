const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            cart: [],
            sortedPrice: true,
            showProducts: 0,
            sortingOrder: "asc",
            sortBy: "name",
            lessons: "https://cw2fetchserver-env-1.eba-ncygsx5p.us-east-1.elasticbeanstalk.com/lessons/",
            orders:
            {
                name: '',
                phone: '',
                slots: [],
            },
            lessonsData: [],
            cartData: []
        }
    },
    methods: {
        onChange(event) {
            this.sortBy = event.target.value
            this.lessons = "https://cw2fetchserver-env-1.eba-ncygsx5p.us-east-1.elasticbeanstalk.com/lessons/" + this.sortingOrder + "/" + event.target.value;

        },
        created() {
            this.loadLessons(this.lessons);
        },
        async loadLessons(ind) {
            const response = await fetch(ind);
            const data = await response.json();
            this.lessonsData = data;
        },
        sortings: function (ind) {
            console.log(ind);
            this.sortingOrder = ind;
        },
        pagesView: function (ind) {
            this.showProducts = ind;
        },
        async decrementPlaces() {
            try {
                const response = await axios.patch(`/lessons/${this.lessonId}/${this.quantity}`);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async toBasket(index) {
            //  console.log(index + String(this.sortingOrder));
            //this.lessonsData[index].spaces--;
            //console.log(index);
            const response = await fetch('https://cw2fetchserver-env-1.eba-ncygsx5p.us-east-1.elasticbeanstalk.com/lessons/' + index);
            const data = await response.json();
            console.log(data);

            this.cart.push(
                {
                    id: data,
                }
            )
        },
        // remove item from basket
        removeBasket(index) {
            const itemIndex = this.cart.findIndex(item => item.id.id === index);
            if (itemIndex !== -1) {
                this.cart.splice(itemIndex, 1);
            }
        },

        confirmOrder() {
            for (let i = 0; i < this.cart.length; i++) {
                const element = this.cart[i];
                //console.log(element);
                this.orders.slots.push({
                    element
                });

                try {
                    const response = fetch(`https://cw2fetchserver-env-1.eba-ncygsx5p.us-east-1.elasticbeanstalk.com/lessons/${element.id}/1`, {
                        method: 'PATCH'
                    });
                    const data = response.json();
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }

                this.showProducts= 0;

                this.cart = [];
                this.showProducts = this.showProducts ? false : true;
                alert('Order Placed Successfully...!');
            }
        },
        sortedArray: function () {
            this.created();
            let sortArray = this.lessonsData;
            return sortArray;
        },
    },
    computed: {
        cartTotal() {
            let val = 0;
            this.cart.forEach(element => {
                val = val + element.id.price;
            });

            return val;
        },
        cartQty() {
            let val = 0;
            this.cart.forEach(element => {
                val++;
            });
            return val;
        },
        async loadOne(ind) {
            console.log(ind);
            const response = await fetch('https://cw2fetchserver-env-1.eba-ncygsx5p.us-east-1.elasticbeanstalk.com/lessons/' + ind.id);
            const data = await response.json();
            return this.cartData = data;
        },
    }
}).mount('#app');