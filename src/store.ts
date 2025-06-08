import { create } from 'zustand'

interface TrackerState {
  isEnabled: boolean
  inputValue: string
  toggle: () => void
  setInputValue: (value: string) => void
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isEnabled: false,
  inputValue: '',
  setInputValue: (value) => set({inputValue: value}),
  toggle: () => set((state) => ({isEnabled: !state.isEnabled})),
}))