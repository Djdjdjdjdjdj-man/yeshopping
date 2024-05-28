import { getImgs } from "@/api/shop3";
import { defineStore } from 'pinia'

export const useGetImgs = defineStore('getImgs', {
    state: () => ({
      imgArr: []
    }),
    actions: {
      async initgetImgs() {
        const res = await getImgs()
        this.imgArr = res.data
      }
    }
  })