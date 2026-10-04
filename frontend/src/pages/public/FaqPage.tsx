import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqService, FAQItem } from '../../services/faqService';
import { ROUTES } from '../../constants/routes';

export const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  const fallbackFaqs: FAQItem[] = [
    {
      _id: 'f1',
      question: 'What security services does AAA Management Services provide?',
      answer:
        'AAA Management Services provides security manpower such as security guards, security supervisors, security gunmen, and customized security manpower based on your requirements.',
      category: 'general',
      order: 1,
      isActive: true,
    },
    {
      _id: 'f2',
      question: 'How can I request security services?',
      answer:
        'Tell us about your location, security requirements, and the number of personnel you need. Our team can discuss your requirement and prepare a suitable quotation.',
      category: 'general',
      order: 2,
      isActive: true,
    },
    {
      _id: 'f3',
      question: 'How many security personnel can I request?',
      answer:
        'You can tell us how many guards, supervisors, or gunmen you require. We can discuss your requirement and help you plan the appropriate manpower.',
      category: 'manpower',
      order: 3,
      isActive: true,
    },
    {
      _id: 'f4',
      question: 'How do I get a quotation?',
      answer:
        'Submit your requirements through our quote request form or contact us directly at 9045393714.',
      category: 'quotation',
      order: 4,
      isActive: true,
    },
    {
      _id: 'f5',
      question: 'Where is AAA Management Services located?',
      answer:
        'AAA Management Services is located on Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra, Uttar Pradesh.',
      category: 'general',
      order: 5,
      isActive: true,
    },
    {
      _id: 'f6',
      question: 'Can I request security manpower for a specific location?',
      answer:
        'Yes. Share your location and security requirements with us so we can understand your needs.',
      category: 'manpower',
      order: 6,
      isActive: true,
    },
    {
      _id: 'f7',
      question: 'Can I request a customized security arrangement?',
      answer:
        'Yes. Share your requirements with us and we can discuss the appropriate security manpower for your site.',
      category: 'manpower',
      order: 7,
      isActive: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    faqService
      .getFAQs()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setFaqs(res.data);
          setOpenId(res.data[0]._id || null);
        } else {
          setFaqs(fallbackFaqs);
          setOpenId('f1');
        }
      })
      .catch(() => {
        setFaqs(fallbackFaqs);
        setOpenId('f1');
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { label: 'All Questions', value: 'all' },
    { label: 'Services', value: 'general' },
    { label: 'Manpower', value: 'manpower' },
    { label: 'Quotation', value: 'quotation' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory === 'all') return true;
    return faq.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Help & FAQ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Some common questions about our security services.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 border-b border-[#E6E3DA] bg-white sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#141518] text-white shadow-sm'
                      : 'bg-[#F3F1EB] text-[#686873] hover:text-[#141518] hover:bg-[#EBE8E0]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="py-16 md:py-24 border-b border-[#E6E3DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center text-sm text-[#686873]">Loading questions...</div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === (faq._id || String(index));
                return (
                  <div
                    key={faq._id || index}
                    className="bg-white border border-[#E6E3DA] rounded-2xl overflow-hidden transition-colors shadow-card"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq._id || String(index))}
                      className="w-full p-6 text-left flex items-center justify-between gap-4"
                    >
                      <span className="text-base sm:text-lg font-bold text-[#141518]">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#C44D2B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 border-t border-[#E6E3DA]/60">
                        <p className="text-sm sm:text-base text-[#686873] leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Callout */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F1EB] border border-[#E6E3DA] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#141518]">Have questions about your security requirement?</h3>
              <p className="text-sm sm:text-base text-[#686873] leading-relaxed">
                Contact our team to discuss your site needs or request a quotation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.PUBLIC.CONTACT}
                className="px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:9045393714"
                className="px-5 py-3 rounded-full bg-white text-[#141518] hover:bg-[#FAF9F5] text-sm font-mono border border-[#E6E3DA] flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#C44D2B]" />
                <span>9045393714</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
