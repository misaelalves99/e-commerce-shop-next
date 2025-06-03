// "app/profile/page.tsx"

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Profile.module.css";
import { UserData } from "../types/user";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    cpf: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("auth") || "{}");
    if (storedUser.email) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: UserData) => u.email === storedUser.email);
      if (user) {
        setUserData(user);
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: UserData) =>
      user.email === userData.email ? userData : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditing(false);
    alert("Dados atualizados com sucesso!");
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Meu Perfil</h2>

      <div className={styles.formGroup}>
        <label>Nome Completo:</label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={userData.cpf}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className={styles.formGroup}>
        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="birthDate"
          value={userData.birthDate}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Gênero:</label>
        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Telefone:</label>
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled
        />
      </div>

      <button className={styles.editButton} onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? "Salvar" : "Editar"}
      </button>
    </div>
  );
};

export default Profile;
