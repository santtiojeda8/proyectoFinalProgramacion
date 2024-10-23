import { useState } from "react";
import styles from './Direccion.module.css'

interface Direccion {
  pais: string;
  provincia: string;
  localidad: string;
  latitud: number;
  longitud: number;
  calle: string;
  numeroCalle: number;
  codigoPostal: number;
  piso: number;
  departamento: number;
}

const Direccion = () => {
  const [direccion, setDireccion] = useState<Direccion>({
    pais: "",
    provincia: "",
    localidad: "",
    latitud: 0,
    longitud: 0,
    calle: "",
    numeroCalle: 0,
    codigoPostal: 0,
    piso: 0,
    departamento: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.Direccion}>
      <label className={styles.Direccion__label}>Pais:</label>
      <input className={styles.Direccion__input}
        type="text"
        name="pais"
        value={direccion.pais}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Provincia:</label>
      <input className={styles.Direccion__input}
        type="text"
        name="provincia"
        value={direccion.provincia}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Localidad:</label>
      <input className={styles.Direccion__input}
        type="text"
        name="localidad"
        value={direccion.localidad}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Latitud:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="latitud"
        value={direccion.latitud}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Longitud:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="longitud"
        value={direccion.longitud}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Calle:</label>
      <input className={styles.Direccion__input}
        type="text"
        name="calle"
        value={direccion.calle}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Número Calle:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="numeroCalle"
        value={direccion.numeroCalle}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Código Postal:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="codigoPostal"
        value={direccion.codigoPostal}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Piso:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="piso"
        value={direccion.piso}
        onChange={handleChange}
      />
      <br />
      <label className={styles.Direccion__label}>Departamento:</label>
      <input className={styles.Direccion__input}
        type="number"
        name="departamento"
        value={direccion.departamento}
        onChange={handleChange}
      />
      <br />
    </div>
  );
};

export default Direccion;
