import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import {useTrackerStore} from '../../store';

export function Assignments() {
    
  const completedAssignments = useTrackerStore((state) => state.completedAssignments);
  const assignments = useTrackerStore((state) => state.assignments);
  const current = new Date();
  const selected = useTrackerStore((state) => state.selected);
  const daysDiff = selected
    ? Math.ceil((selected.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedAssignments} of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment) =>(
          <Assignment key={assignment.id} data={assignment} />
        ))}
      </div>
    </section>
  );
}
