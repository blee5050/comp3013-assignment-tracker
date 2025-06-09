import {useTrackerStore} from '../../store';
import { DayPicker } from "react-day-picker";
import styles from "./header.module.css";

export const PopupContent = () => {
  
  const selected = useTrackerStore((state) => state.selected);
  const setSelected = useTrackerStore((state) => state.setSelected);
  const setPopupCloseEnabled = useTrackerStore((state) => state.setPopupCloseEnabled);
  
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={(date) => {
        if(date){
          setSelected(date || undefined)
          setPopupCloseEnabled(!!date);
        }
      }}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Set a due date..."
      }/>
  );
};