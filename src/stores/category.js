import { getCategory} from '@/api/shop3'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    category: [],
    currentIndex: 0
  }),
  actions: {
    async initCategory() {
      const res = await getCategory()
      this.category = res.data
    }
  }
})