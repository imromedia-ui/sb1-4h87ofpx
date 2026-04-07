import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Peptide {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  price: number;
  suggested_price: number;
  notes: string;
  is_active: boolean;
  display_order: number;
}

const Peptides: React.FC = () => {
  const [peptides, setPeptides] = useState<Peptide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeptides = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const apiUrl = `${supabaseUrl}/functions/v1/peptides`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch peptides');
        }
        const data = await response.json();
        setPeptides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching peptides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeptides();
  }, []);

  const groupedPeptides = peptides.reduce((acc, peptide) => {
    if (!acc[peptide.category]) {
      acc[peptide.category] = [];
    }
    acc[peptide.category].push(peptide);
    return acc;
  }, {} as Record<string, Peptide[]>);

  if (loading) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300" style={{ borderTopColor: '#D4AF37' }}></div>
            <p className="mt-4 text-gray-600">Loading peptides...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading peptides: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-serif font-light text-center mb-8" style={{ color: '#D4AF37' }}>
          Peptide Therapy
        </h1>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
          Advanced peptide treatments designed to optimize your health, enhance recovery, and support anti-aging goals through targeted therapeutic solutions.
        </p>

        {Object.entries(groupedPeptides).map(([category, categoryPeptides]) => (
          <div key={category} className="mb-16">
            <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
              {category}
            </h2>

            <div className="space-y-8">
              {categoryPeptides.sort((a, b) => a.display_order - b.display_order).map((peptide) => (
                <div key={peptide.id} className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl font-serif font-medium text-black mb-2">
                        {peptide.name}
                      </h3>
                      {peptide.price > 0 && (
                        <div className="flex items-baseline space-x-4">
                          <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                            ${peptide.price}
                          </span>
                          {peptide.suggested_price > 0 && (
                            <span className="text-lg text-gray-500">
                              Suggested retail: ${peptide.suggested_price}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {peptide.description}
                  </p>

                  {peptide.benefits.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                        Key Benefits
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {peptide.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="w-5 h-5 mr-3 mt-1 flex-shrink-0" style={{ color: '#D4AF37' }} />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {peptide.notes && (
                    <div className="bg-white border-l-4 p-4 rounded" style={{ borderColor: '#D4AF37' }}>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> {peptide.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-3xl font-serif font-light mb-8 text-black">
            Ready to explore peptide therapy?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss which peptide treatments are right for your health and wellness goals.
          </p>
          <a
            href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
            style={{ backgroundColor: '#D4AF37' }}
          >
            Schedule Peptide Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Peptides;
