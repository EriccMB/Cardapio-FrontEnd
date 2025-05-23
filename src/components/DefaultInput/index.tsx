import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText: string;
  value: string | number;
  updateValue(value: unknown): void;
} & React.ComponentProps<"input">;

export const DefaultInput = ({
  id,
  labelText,
  type,
  value,
  updateValue,
  ...props
}: DefaultInputProps) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => updateValue(e.target.value)}
        {...props}
      />
      
    </div >
  );
};
