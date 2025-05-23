import styles from "./styles.module.css";

type CardProps = {
  title: string;
  image: string;
  price: number;
};

export const Card = ({ title, image, price }: CardProps) => {
  return (
    <div className={styles.cardBox}>
      {image && <img src={image} alt={title} height={250} width={250} />}
      <div className={styles.cardText}>
        <h3>{title}</h3>
        <span>
          Preço:<b>R${price}</b>
        </span>
      </div>
    </div>
  );
};
