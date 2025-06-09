import { create } from 'zustand'

interface Assignment{
  id: number;
  title: string;
  completed: boolean;
}

interface TrackerState {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  assignments: Assignment[];
  completedAssignments: number;
  setNumberOfCompleted: (id: number) => void;
  addAssignment: (assignment: Assignment) => void;
  removeAssignment: (id: number) => void;
  markComplete: (id: number) => void;
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isEnabled: false,
  setIsEnabled: (value) => set({isEnabled: value}),
  inputValue: '',
  setInputValue: (value) => set({inputValue: value}),
  assignments: [],
  addAssignment: (assignment) => set((state) => ({assignments: [...state.assignments, assignment]})),
  removeAssignment: (id) => set((state) => ({assignments: state.assignments.filter((assignment) => assignment.id != id )})),
  markComplete: (id) => set((state) => ({assignments: state.assignments.map((assignment) => 
    assignment.id == id ? {...assignment, completed: !assignment.completed} : assignment
  ) })),
  completedAssignments: 0,
  setNumberOfCompleted: (id) => set((state)=>{
    const assignStatus = state.assignments.find(a => a.id == id);
    if (assignStatus && !assignStatus.completed){
      return {completedAssignments: state.completedAssignments + 1}; 
    }
    else{
      return {completedAssignments: state.completedAssignments - 1};
    }}),

}))
