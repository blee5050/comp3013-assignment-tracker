import {useTrackerStore} from '../../store';
import styles from "./header.module.css";

interface PopupProps {
    children: React.ReactNode;
}

export const Popup = ({children} : PopupProps) => {
    const isOpen = useTrackerStore((state) => state.isOpen);
    const closePopup = useTrackerStore ((state) => state.closePopup);
    const selected = useTrackerStore((state) => state.selected);
    const setSelected = useTrackerStore((state) => state.setSelected);
    const popupCloseEnabled = useTrackerStore((state) => state.popupCloseEnabled);
    const setPopupCloseEnabled = useTrackerStore((state) => state.setPopupCloseEnabled);
    const addAssignment = useTrackerStore((state) => state.addAssignment);
    const pendingAssignment = useTrackerStore((state) => state.pendingAssignment);

 if(!isOpen) return null;

 return (
    <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
            <h2>Set a due date:</h2>
            {children}
            <br />
            <button disabled={!popupCloseEnabled}
                onClick={()=>{
                    if(pendingAssignment){
                        addAssignment({
                            ...pendingAssignment,
                            dueDate: selected,
                        });
                    }
                    setSelected(undefined);
                    closePopup();
                    setPopupCloseEnabled(false);
                }}>Close</button>
        </div>
    </div>
 );
}; 