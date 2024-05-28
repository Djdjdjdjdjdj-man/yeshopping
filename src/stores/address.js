import { getAddress } from '@/api/shop3'
import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', {
  state: () => ({
    address: []
  }),
  actions: {
    async initAddress() {
      const res = await getAddress()
      this.address = res.data
    }
  }
})
