import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  User, 
  RefreshCw,
} from 'lucide-react';
import { ChatMessage, Farm, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ChatbotViewProps {
  currentFarm: Farm | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  initialPrompt?: string;
}

export const ChatbotView: React.FC<ChatbotViewProps> = ({
  currentFarm,
  language,
  setLanguage,
  initialPrompt,
}) => {
  const t = TRANSLATIONS[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const getGreeting = (lang: Language) => {
    return lang === 'ta'
      ? 'வணக்கம்! நான் உங்கள் அக்ரிசென்ஸ் ஏஐ வேளாண் விஞ்ஞான ஆலோசகர். பயிர் நோய் மேலாண்மை, இயற்கை மற்றும் இரசாயன தீர்வுகள், நீர் பாசன நேரம், பூச்சி கட்டுப்பாடு குறித்த உங்கள் கேள்விகளைக் கேட்கலாம்.'
      : 'Welcome! I am AgriSense AI, your dedicated agronomic assistant. Ask me about crop diseases, irrigation scheduling, pest IPM, or farm management in English or Tamil!';
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: getGreeting(language),
      timestamp: 'Just now',
      language
    }
  ]);

  // Update welcome greeting when language changes if only 1 message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [{
          id: 'msg-init-1',
          sender: 'assistant',
          text: getGreeting(language),
          timestamp: 'Just now',
          language
        }];
      }
      return prev;
    });
  }, [language]);

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt !== input) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  // Speech Recognition Setup (Web Speech API)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechNotice(language === 'ta' ? 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.' : 'Speech recognition is not supported in this browser. Please type your query.');
      setTimeout(() => setSpeechNotice(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Select recognition dialect
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
      setIsListening(false);
    }
  };

  // Text to Speech playback
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          farmContext: {
            name: currentFarm?.name,
            crop: currentFarm?.mainCrop,
            location: currentFarm?.location
          }
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        const assistantMsg: ChatMessage = {
          id: 'msg-a-' + Date.now(),
          sender: 'assistant',
          text: res.data.reply,
          timestamp: 'Just now',
          language
        };
        setMessages(prev => [...prev, assistantMsg]);
        if (voiceEnabled) {
          speakText(res.data.reply);
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'assistant',
        text: language === 'ta' 
          ? 'மன்னிக்கவும், சேவையகத்துடன் தொடர்பு கொள்வதில் பிழை ஏற்பட்டது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.' 
          : 'Sorry, could not connect to the assistant server. Please try again.',
        timestamp: 'Just now',
        language
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Bilingual quick prompt suggestions
  const quickPrompts = language === 'ta' ? [
    {
      title: '🌿 தக்காளி இலைக்கருகல் நோய்',
      prompt: 'என் தக்காளி பயிரில் இலைக்கருகல் நோய் அறிகுறிகள் தென்படுகின்றன. இதற்கு சிறந்த இயற்கை மற்றும் இரசாயன தீர்வுகள் என்ன?'
    },
    {
      title: '💧 பூக்கும் பருவ சொட்டு நீர் பாசனம்',
      prompt: 'பூக்கும் பருவத்தில் உள்ள தக்காளி பயிருக்கு தினமும் எவ்வளவு நேரம் சொட்டு நீர் பாசனம் செய்ய வேண்டும்?'
    },
    {
      title: '🌾 நெல் குலை நோய் இயற்கை மேலாண்மை',
      prompt: 'நெல் குலை நோயைக் கட்டுப்படுத்த சூடோமோனாஸ் புளோரசன்ஸ் உயிரியல் பூஞ்சைக் கொல்லியை எவ்வாறு பயன்படுத்துவது?'
    },
    {
      title: '🐛 வெள்ளை ஈ மற்றும் இலைச்சுருட்டல்',
      prompt: 'பருத்தி மற்றும் மிளகாயில் வெள்ளை ஈ பூச்சிகள் மற்றும் இலைச்சுருட்டல் வைரஸை கட்டுப்படுத்தும் சிறந்த இயற்கை வழிகள் என்ன?'
    }
  ] : [
    {
      title: '🌿 Tomato Early Blight remedies',
      prompt: 'My tomato crop has concentric dark rings on leaves. What are the best organic and chemical treatments?'
    },
    {
      title: '💧 Smart Irrigation for flowering stage',
      prompt: 'How much water and drip duration does a flowering crop need daily to prevent water stress?'
    },
    {
      title: '🌾 Rice Blast bio-control',
      prompt: 'How to control Rice Blast organically using Pseudomonas fluorescens or Trichoderma?'
    },
    {
      title: '🐛 Whitefly control on Chilli & Cotton',
      prompt: 'What are the best biological ways to stop whiteflies and prevent leaf curl virus transmission?'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>{t.aiConsultantBadge}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t.aiChatTitle}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            {t.aiChatSubtitle}
          </p>
        </div>

        {/* Voice & Lang toggles */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              voiceEnabled ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-stone-50 text-stone-500 border-stone-200'
            }`}
            title="Toggle Voice Readout"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            <span className="hidden sm:inline">{t.voiceOut}</span>
          </button>
        </div>
      </div>

      {speechNotice && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          {speechNotice}
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col h-[560px]">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-emerald-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-xs'
                    : 'bg-stone-50 text-stone-800 border border-stone-200/80 rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed text-[13px]">
                  {msg.text}
                </p>

                {msg.sender === 'assistant' && (
                  <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400">
                    <span>{t.pathologistTag}</span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="text-stone-500 hover:text-emerald-700 p-1 rounded transition-colors"
                      title={t.readAloud}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-emerald-100 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>{t.consultingDiagnostics}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts Bar */}
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-[11px]">
          <span className="text-stone-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
            {t.suggestionsColon}
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.prompt)}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-emerald-900 hover:border-emerald-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              {q.title}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-stone-200 flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
            }`}
            title="Speech to text input"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-700" />}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={isListening ? t.listening : t.chatPlaceholder}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-colors cursor-pointer shrink-0 shadow-xs"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
