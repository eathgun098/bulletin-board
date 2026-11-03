import React from 'react';
import type { AdItem } from '../types';
import { BASE_URL } from '../api';

interface AdListProps {
  ads: AdItem[];
  loading: boolean;
  error: string | null;
}

export const AdList: React.FC<AdListProps> = ({ ads, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (ads.length === 0) {
    return <div className="alert alert-info">Объявлений пока нет. Будьте первым!</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {ads.map((ad) => {
        const rawImage = ad.image_url || ad.imageUrl;
        const fullImageUrl = rawImage
          ? (rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`)
          : null;

        return (
          <div key={ad.id} className="col">
            <div className="card h-100 shadow-sm">
              <div style={{ height: '200px', backgroundColor: '#f8f9fa' }} className="d-flex align-items-center justify-content-center overflow-hidden">
                {fullImageUrl ? (
                  <img
                    src={fullImageUrl}
                    alt={ad.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className="text-muted small">Нет изображения</span>
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{ad.title}</h5>
                <h6 className="card-subtitle mb-2 text-success fw-bold">
                  {ad.price.toLocaleString()} сом
                </h6>
                <p className="card-text text-secondary flex-grow-1" style={{ whiteSpace: 'pre-line' }}>
                  {ad.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
