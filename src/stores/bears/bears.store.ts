import { create } from 'zustand'

interface Bear {
  id: number
  name: string
}

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number

  bears: Bear[]

  computed: {
    totalBears: number
  }

  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void

  doNothing: () => void
  addBear: () => void
  clearBears: () => void
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [
    { id: 1, name: 'Black Bear' },
    { id: 2, name: 'Polar Bear' },
    { id: 3, name: 'Panda Bear' }
  ],

  computed: {
    get totalBears(): number {
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length
    }
  },


  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Bear #${state.bears.length + 1}` }
      ]
    })),
  clearBears: () => set({ bears: [] })
}))
