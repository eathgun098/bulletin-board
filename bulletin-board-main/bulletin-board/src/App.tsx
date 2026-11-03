import { useEffect, useState, useCallback } from 'react';
import type { AdItem } from './types';
import { fetchAds } from './api';
import { AdForm } from './components/AdForm';
import { AdList } from './components/AdList';

export function App() {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await fetchAds();
      setAds(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки объявлений');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <header className="pb-3 mb-4 border-bottom text-center">
          <h1 className="display-6 fw-bold">Доска объявлений</h1>
        </header>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <AdForm onAdCreated={loadAds} />
          </div>
        </div>

        <section>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Все объявления</h2>
            <button className="btn btn-outline-secondary btn-sm" onClick={loadAds} disabled={loading}>
              Обновить
            </button>
          </div>
          <AdList ads={ads} loading={loading} error={error} />
        </section>
      </div>
    </div>
  );
}

export default App;

