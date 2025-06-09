import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import {useTrackerStore} from '../../store';
import {Popup} from './Popup';
import {PopupContent} from './PopupContent'

export function Header() {

  const isEnabled = useTrackerStore((state) => state.isEnabled);
  const setIsEnabled = useTrackerStore((state) => state.setIsEnabled);
  const inputValue = useTrackerStore((state) => state.inputValue);
  const setInputValue = useTrackerStore((state) => state.setInputValue);
  const openPopup = useTrackerStore((state) => state.openPopup);
  const selected = useTrackerStore((state) => state.selected);
  const setPendingAssignment = useTrackerStore((state) => state.setPendingAssignment);

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form 
        className={styles.newAssignmentForm}
        onSubmit={(e) => {
          e.preventDefault();
          setPendingAssignment({
            id: Date.now(),
            title: inputValue.trim(),
            completed: false,
            dueDate: null
          });
          setInputValue("");
          setIsEnabled(false);
          openPopup();

        }}>
        <input 
          id="new-assignment"
          placeholder="Add a new assignment" 
          type="text"
          value={inputValue} 
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsEnabled(e.target.value.trim().length > 0);
          }}
          />
        <button disabled={!isEnabled}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
      
      <Popup>
        <PopupContent />
      </Popup>
    </header>
  );
}
