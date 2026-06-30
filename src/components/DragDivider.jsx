import styles from './DragDivider.module.css';

export default function DragDivider({ onMouseDown, orientation = 'vertical' }) {
  return (
    <div
      className={`${styles.divider} ${orientation === 'horizontal' ? styles.horizontal : styles.vertical}`}
      onMouseDown={onMouseDown}
      role="separator"
      aria-orientation={orientation}
      title={orientation === 'vertical' ? 'Drag to resize panels' : 'Drag to resize sections'}
    />
  );
}