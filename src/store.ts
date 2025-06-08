import { create } from 'zustand'

interface Assignment{
  id: number;
  title: string;
  completed: boolean;
}

interface TrackerState {
  // header states
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  // assignments states
  completedAssignments: number;
  setNumberOfAssignments: (value: number) => void;
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isEnabled: false,
  setIsEnabled: (value) => set({isEnabled: value}),
  inputValue: '',
  setInputValue: (value) => set({inputValue: value}),
  toggle: () => set((state) => ({isEnabled: !state.isEnabled})),
  completedAssignments: 0,
  setNumberOfAssignments: (value) => set({createdAssignments: value}),
  assignments: [],
  addAssignment: (assignment) => set((state) => ({assignments: [...state.assignments, assignment]}))
}))