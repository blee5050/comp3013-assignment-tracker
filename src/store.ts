import { create } from 'zustand'

interface Assignment{
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date; 
}

interface PendingAssignment{
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
}

interface PopupStore{
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
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
  selected: Date | undefined;
  setSelected: (date: Date | undefined) => void;
  popupCloseEnabled: boolean;
  setPopupCloseEnabled: (value: boolean) => void;
  pendingAssignment: PendingAssignment | null;
  setPendingAssignment: (assignment: PendingAssignment | null) => void;
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isEnabled: false,
  inputValue: '',
  assignments: [],
  completedAssignments: 0,
  isOpen: false,
  selected: undefined,
  popupCloseEnabled: false,
  pendingAssignment: null,
  
  //functino updates the pendingAssignment state with a temporary assignment without the due date
  setPendingAssignment: (assignment) => set({pendingAssignment: assignment}),
  // function updates the popupCloseEnabled state with a given boolean value
  setPopupCloseEnabled: (value) => set({popupCloseEnabled: value}),
  // function updates the selected state with a date object 
  setSelected: (date) => set({selected: date}),
  // functions updates the isOpen state 
  openPopup: () => set({isOpen : true}),
  closePopup: () => set({isOpen: false}), 
  // function updates the inputValue state with a given string
  setInputValue: (value) => set({inputValue: value}),
  // function updates the isEnabled state with a given boolean value
  setIsEnabled: (value) => set({isEnabled: value}),
  // function returns new array with new Assignment added to the end
  addAssignment: (assignment) => set((state) => ({assignments: [...state.assignments, assignment]})),
  /*
  function removes specified assignment from the array based on its ID
  if assignment was was completed, the 'completedAssignments' count is decremented 
  if not, it is left alone
  */
  removeAssignment: (id) => set((state) => {
    const assignStatus = state.assignments.find(a => a.id == id);
    const updatedAssignments = state.assignments.filter((assignment) => assignment.id != id);
    const updateCount = assignStatus && assignStatus.completed
    ? state.completedAssignments - 1
    : state.completedAssignments;
    return{
      assignments: updatedAssignments,
      completedAssignments: updateCount
    };
  }),
  /*
  function updates the assignments state by toggling the completed property
  of the specified assignment, matched by ID 
  */
  markComplete: (id) => set((state) => ({assignments: state.assignments.map((assignment) => 
    assignment.id == id ? {...assignment, completed: !assignment.completed} : assignment
  )})),
  /*
  function updates the completedAssignments state (increments or decrements) 
  based on whether assignment is completed or not 
  */ 
  setNumberOfCompleted: (id) => set((state) => {
    const assignStatus = state.assignments.find(a => a.id == id);
    if (assignStatus && !assignStatus.completed){
      return {completedAssignments: state.completedAssignments + 1}; 
    }
    else{
      return {completedAssignments: state.completedAssignments - 1};
    }}),

}))
