import React from 'react';
import styles from './Form.module.css'; // Importando o arquivo CSS Module

const Form = () => {
  return (
    <section className={styles.sectionForm}>
      {/* <Fade bottom duration={2000} distance="40px"> */}
      <div className={styles.containerForm}>
        <div className={styles.containerTitle}>
          <h1 className={styles.formTitle}>CONTATE-NOS</h1>
        </div>
        <div className={styles.form}>
          <form className={styles.contForm}>
            <div className={styles.formName}>
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" placeholder="Nome Completo" className={styles.inputName} />
            </div>
            <div className={styles.formEmail}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Seu Email" className={styles.inputEmail} />
            </div>
            <div className={styles.formMsg}>
              <label htmlFor="msg">Mensagem</label>
              <textarea name="msg" id="msg" placeholder="Mensagem" className={styles.msg}></textarea>
            </div>
          </form>
        </div>
      </div>
      {/* </Fade> */}
    </section>
  );
};

export default Form;
