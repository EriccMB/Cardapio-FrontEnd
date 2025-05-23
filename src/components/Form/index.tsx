import { useEffect, useRef, useState } from "react";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import type { FoodData } from "../../types/FoodData";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

type FormProps = {
  onClose: () => void;
};

export const Form = ({ onClose }: FormProps) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const formBox = useRef<HTMLFormElement>(null);
  const blurBox = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useFoodDataMutate();

  const sendValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    toastifyAdapter.dismiss();

    if (!title) {
      toastifyAdapter.error("Digite um título!");
      return;
    }
    if (!image) {
      toastifyAdapter.error("Digite uma url de imagem!");
      return;
    }
    if (!price) {
      toastifyAdapter.error("Digite um preço!");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      toastifyAdapter.error("Digite um preço válido");
      return;
    }
    const newFoodData: FoodData = {
      title,
      image,
      price: Number(price),
    };
    mutate(newFoodData);
    toastifyAdapter.success("Cadastrado com sucesso!");
    onClose();
  };

  const closeForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (!isPending) return;
    toastifyAdapter.dismiss();
    toastifyAdapter.info("Postando...");
  }, [isPending]);

  return (
    <>
      <div ref={blurBox} className={styles.blur}></div>
      <div className={styles.formOverlay}>
        <form ref={formBox} className={styles.formBody} action="#">
          <button onClick={closeForm} className={styles.openCloseForm}>
            X
          </button>
          <h1>Cadastrar nova comida</h1>
          <DefaultInput
            id="foodName"
            labelText="Digite o nome da comida"
            type="text"
            value={title}
            updateValue={setTitle}
          />
          <DefaultInput
            id="foodImage"
            labelText="Digite a imagem da comida"
            type="text"
            value={image}
            updateValue={setImage}
          />
          <DefaultInput
            id="foodPrice"
            labelText="Digite o preço da comida"
            type="number"
            value={price}
            updateValue={setPrice}
          />
          <button className={styles.buttonMutate} onClick={sendValues}>
            {isPending ? "Postando" : "Enviar"}
          </button>
        </form>
      </div>
    </>
  );
};
