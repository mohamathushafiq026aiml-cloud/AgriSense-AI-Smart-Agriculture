import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { MARKET_PRICES_DATA, MARKETPLACE_PRODUCTS_DATA, getLocalizedMarketPrice, getLocalizedProduct } from '../data/agriData';

interface MarketplaceViewProps {
  language: Language;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'mandi' | 'products'>('mandi');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  const categoryTranslations: Record<Language, Record<string, string>> = {
    en: {
      'All': 'All',
      'Seeds': 'Seeds',
      'Agricultural Tools': 'Agricultural Tools',
      'Equipment': 'Equipment',
      'Irrigation Equipment': 'Irrigation Equipment',
      'Plant Protection Products': 'Plant Protection Products',
      'Organic Farming Products': 'Organic Farming Products'
    },
    ta: {
      'All': 'அனைத்தும்',
      'Seeds': 'விதைகள்',
      'Agricultural Tools': 'விவசாயக் கருவிகள்',
      'Equipment': 'இயந்திரங்கள்',
      'Irrigation Equipment': 'பாசனக் கருவிகள்',
      'Plant Protection Products': 'பயிர் பாதுகாப்பு பொருட்கள்',
      'Organic Farming Products': 'இயற்கை வேளாண் பொருட்கள்'
    }
  };

  const productCategories = [
    'All',
    'Seeds',
    'Agricultural Tools',
    'Equipment',
    'Irrigation Equipment',
    'Plant Protection Products',
    'Organic Farming Products'
  ];

  const filteredProducts = MARKETPLACE_PRODUCTS_DATA.filter(prod => {
    const locProd = getLocalizedProduct(prod, language);
    const matchesCategory = selectedProductCategory === 'All' || prod.category === selectedProductCategory;
    const matchesSearch = locProd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          locProd.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInquire = (prodName: string) => {
    const message = language === 'ta'
      ? `${prodName} பொருளுக்கான விசாரணை பதிவு செய்யப்பட்டது. விற்பனையாளர் விரைவில் உங்களைத் தொடர்புகொள்வார்.`
      : `Order request submitted for ${prodName}. The supplier will contact you soon.`;
    setOrderNotice(message);
    setTimeout(() => setOrderNotice(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {orderNotice && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-800 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-600 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{orderNotice}</span>
        </div>
      )}

      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>{t.mandiTickerBadge}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t.marketplaceTitle}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            {t.marketplaceSubtitle}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('mandi')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'mandi' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📊 {t.marketPrices}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🛒 {t.farmStoreInputs}
          </button>
        </div>
      </div>

      {activeTab === 'mandi' ? (
        /* APMC Mandi Price Ticker Table */
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t.todaysMandiRates}
            </h2>
            <span className="text-xs text-stone-400">{t.agmarknetSynced}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-y border-stone-200">
                <tr>
                  <th className="py-3 px-3">{t.cropVarietyHeader}</th>
                  <th className="py-3 px-3">{t.marketMandiHeader}</th>
                  <th className="py-3 px-3">{t.districtStateHeader}</th>
                  <th className="py-3 px-3 text-right">{t.minRateHeader}</th>
                  <th className="py-3 px-3 text-right">{t.maxRateHeader}</th>
                  <th className="py-3 px-3 text-right">{t.modalAvgHeader}</th>
                  <th className="py-3 px-3 text-center">{t.trendHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {MARKET_PRICES_DATA.map((rawItem) => {
                  const item = getLocalizedMarketPrice(rawItem, language);

                  return (
                    <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-stone-900">{item.crop}</td>
                      <td className="py-3.5 px-3 text-stone-700">{item.market}</td>
                      <td className="py-3.5 px-3 text-stone-500">{item.district}, {item.state}</td>
                      <td className="py-3.5 px-3 text-right font-medium text-stone-600">₹{item.minPrice}</td>
                      <td className="py-3.5 px-3 text-right font-medium text-stone-600">₹{item.maxPrice}</td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-emerald-800">₹{item.averagePrice}</td>
                      <td className="py-3.5 px-3 text-center">
                        {item.priceTrend === 'up' && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-[11px]">
                            <TrendingUp className="w-3.5 h-3.5" /> {t.upTrend}
                          </span>
                        )}
                        {item.priceTrend === 'down' && (
                          <span className="inline-flex items-center gap-0.5 text-rose-700 font-bold text-[11px]">
                            <TrendingDown className="w-3.5 h-3.5" /> {t.downTrend}
                          </span>
                        )}
                        {item.priceTrend === 'stable' && (
                          <span className="text-stone-400 font-semibold text-[11px]">
                            {t.stableTrend}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Store & Products Section */
        <div className="space-y-4">
          {/* Categories & Search */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchStorePlaceholder}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedProductCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedProductCategory === cat
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {categoryTranslations[language][cat] || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((rawProd) => {
              const prod = getLocalizedProduct(rawProd, language);
              const catLabel = categoryTranslations[language][rawProd.category] || rawProd.category;

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                      <span>{catLabel}</span>
                      {prod.organic && (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {language === 'ta' ? '100% இயற்கை' : '100% Bio'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-stone-900">₹{prod.price}</span>
                      <span className="text-[10px] text-stone-400 block">{prod.unit}</span>
                    </div>

                    <button
                      onClick={() => handleInquire(prod.name)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.inquireButton}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
