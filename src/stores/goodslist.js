import { getGoodsList } from '@/api/shop3'
import { defineStore } from 'pinia'

export const useGoodsListStore = defineStore('goodslist', {
  state: () => ({
    goodslist: []
  }),
  actions: {
    async initGoodslist() {
      const res = await getGoodsList()
      this.goodslist = res.data
    }
  }
})
