import React, { useState } from 'react';

interface BranchFormState {
  name: string;
  openingTime: string;
  closingTime: string;
  country: string;
  province: string;
  locality: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  floorNumber: string;
  departmentNumber: string;
  image: File | null;
  enabled: boolean;
}

interface BranchFormsProps {
  onCancel: () => void;
  onConfirm: (data: BranchFormState) => void; // Prop para manejar la confirmación
}

const BranchForms: React.FC<BranchFormsProps> = ({ onCancel, onConfirm }) => {
  const [formData, setFormData] = useState<BranchFormState>({
    name: '',
    openingTime: '08:00',
    closingTime: '18:00',
    country: '',
    province: '',
    locality: '',
    streetName: '',
    streetNumber: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    floorNumber: '',
    departmentNumber: '',
    image: null,
    enabled: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData); // Enviar los datos al componente padre
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
      <h2>Sucursales de Team Polenta</h2>

      {/* Nombre */}
      <input
        type="text"
        name="name"
        placeholder="Ingresa nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Horarios */}
      <label>Horario Apertura</label>
      <input
        type="time"
        name="openingTime"
        value={formData.openingTime}
        onChange={handleChange}
        required
      />
      <label>Horario Cierre</label>
      <input
        type="time"
        name="closingTime"
        value={formData.closingTime}
        onChange={handleChange}
        required
      />

      {/* País, provincia, localidad */}
      <select name="country" value={formData.country} onChange={handleChange} required>
        <option value="">Seleccione un país</option>
        <option value="Argentina">Argentina</option>
        <option value="Brasil">Brasil</option>
        {/* Agrega más opciones según necesites */}
      </select>

      <input
        type="text"
        name="province"
        placeholder="Ingrese provincia"
        value={formData.province}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="locality"
        placeholder="Ingrese localidad"
        value={formData.locality}
        onChange={handleChange}
        required
      />

      {/* Dirección */}
      <input
        type="text"
        name="streetName"
        placeholder="Nombre de la calle"
        value={formData.streetName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="streetNumber"
        placeholder="Número de la calle"
        value={formData.streetNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Código Postal"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />

      {/* Latitud y Longitud */}
      <input
        type="text"
        name="latitude"
        placeholder="Latitud"
        value={formData.latitude}
        onChange={handleChange}
      />
      <input
        type="text"
        name="longitude"
        placeholder="Longitud"
        value={formData.longitude}
        onChange={handleChange}
      />

      {/* Número de piso y departamento */}
      <input
        type="text"
        name="floorNumber"
        placeholder="Ingrese número de piso"
        value={formData.floorNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="departmentNumber"
        placeholder="Ingrese número de depto"
        value={formData.departmentNumber}
        onChange={handleChange}
      />

      {/* Imagen */}
      <label>Elige una imagen</label>
      <input
        type="file"
        onChange={handleFileChange}
      />

      {/* Habilitado */}
      <label>
        <input
          type="checkbox"
          name="enabled"
          checked={formData.enabled}
          onChange={() => setFormData({ ...formData, enabled: !formData.enabled })}
        />
        Habilitado
      </label>

      {/* Botones */}
      <button type="button" onClick={onCancel} style={{ backgroundColor: 'red' }}>Cancelar</button>
      <button type="submit" style={{ backgroundColor: 'green' }}>Confirmar</button>
    </form>
  );
};

export default BranchForms;