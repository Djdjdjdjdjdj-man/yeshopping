import { defineStore } from 'pinia'

export const useShopcartStore = defineStore('shopcart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice(state) {
      return state.items.reduce((total, item) => {
        return total + item.price * item.num
      }, 0).toFixed(2)
    },
    totalNum(state) {
      return state.items.reduce((total, item) => {
        return total + item.num
      }, 0).toFixed(0)
    }
  },
  actions: {
    initShopCart(shopcart) {
      this.items = shopcart || []
    },
    add(item) {
      const goods = this.items.find(v => v.id === item.id)
      if (goods) {
        goods.num++
      } else {
        const obj = {
          id: item.id,
          num: 1,
          price: item.price,
          sell_point: item.sell_point,
          name: item.name,
          image: item.image
        }
        this.items.push(obj)
      }
      localStorage.setItem("shopcart", JSON.stringify(this.items))
    },
    sub(item) {
      const goods = this.items.find(v => v.id === item.id)
      if (goods) {
        if (goods.num > 1) {
          goods.num--
        } else {
          this.items = this.items.filter(v => v.id !== item.id)
        }
        localStorage.setItem("shopcart", JSON.stringify(this.items))
      }
    },
    checkout() {
      this.items = []
      localStorage.removeItem("shopcart")
    }
  }
})
