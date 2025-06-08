import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import {useTrackerStore} from '../../store';

export function Assignments() {
    
  const setNumberOfAssignments = useTrackerStore((state) => state.setNumberOfAssignments);
  const completedAssignments = useTrackerStore((state) => state.completedAssignments);
  const assignments = useTrackerStore((state) => state.assignments);

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
