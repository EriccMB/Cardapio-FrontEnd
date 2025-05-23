import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Card } from "./components/Card";
import { Form } from "./components/Form";
import { useFoodData } from "./hooks/useFoodData";
import { MessagesContainer } from "./components/MessagesContainer";
import { toastifyAdapter } from "./adapters/toastifyAdapter";
function App() {
  const { data, error, isLoading } = useFoodData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOpenCloseForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      toastifyAdapter.dismiss();
      toastifyAdapter.error("Não foi possivel carregar os dados");
    }
  }, [error]);

  return (
    <MessagesContainer>
      <div className={styles.container}>
        <h1>Cardápio</h1>
        {isLoading && <p>Carregando...</p>}
        {!error && !isLoading && (
          <>
            <button onClick={handleOpenCloseForm} className={styles.addButton}>
              Adicionar
            </button>

            <div className={styles.cardGrid}>
              {data?.map((foodData) => (
                <Card
                  key={foodData.id}
                  title={foodData.title}
                  image={foodData.image}
                  price={foodData.price}
                />
              ))}
            </div>
            {isFormOpen && (
              <div className={styles.formm} >
                <Form onClose={handleOpenCloseForm} />
              </div>
            )}
          </>
        )}
      </div>
    </MessagesContainer>
  );
}

export default App;
