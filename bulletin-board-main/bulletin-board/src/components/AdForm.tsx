import React, { useState } from 'react';
import { createAd } from '../api';

interface AdFormProps {
  onAdCreated: () => void;
}

export const AdForm: React.FC<AdFormProps> = ({ onAdCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Укажите корректную цену');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('price', parsedPrice.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      setIsSubmitting(true);
      await createAd(formData);
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      
      const fileInput = document.getElementById('adImageInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      onAdCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm mb-5">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Подать объявление</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="adTitle" className="form-label">Заголовок</label>
            <input
              id="adTitle"
              type="text"
              className="form-control"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Ноутбук ASUS"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adDescription" className="form-label">Описание</label>
            <textarea
              id="adDescription"
              className="form-control"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробное описание товара..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adPrice" className="form-label">Цена (сом)</label>
            <input
              id="adPrice"
              type="number"
              step="0.01"
              className="form-control"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adImageInput" className="form-label">Изображение</label>
            <input
              id="adImageInput"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Публикация...' : 'Опубликовать'}
          </button>
        </form>
      </div>
    </div>
  );
};