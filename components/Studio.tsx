
import React, { useState } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { translations, Language } from '../translations';

interface StudioProps {
  language: Language;
}

const Studio: React.FC<StudioProps> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const t = translations[language];
  const getAiStudio = () => (window as any).aistudio;

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const aistudio = getAiStudio();
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await aistudio.openSelectKey();
      }
      const url = await generateImage(prompt, size);
      setGeneratedImageUrl(url);
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes("Requested entity was not found.")) {
        await getAiStudio().openSelectKey();
      } else {
        alert("Error al generar imagen.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = async () => {
    if (!generatedImageUrl || !editPrompt) return;
    setIsEditing(true);
    try {
      const url = await editImage(generatedImageUrl, "image/png", editPrompt);
      setGeneratedImageUrl(url);
      setEditPrompt('');
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes("Requested entity was not found.")) {
        await getAiStudio().openSelectKey();
      } else {
        alert("Error al editar imagen.");
      }
    } finally {
      setIsEditing(false);
    }
  };

  const presetLogo = () => {
    setPrompt("Modern minimalist logo with the word 'Kyvue' in thick white elegant font, centered on a vibrant solid light-blue and cyan circle background, high contrast, professional graphic design, 4k, flat design");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto py-8">
      <section className="bg-white rounded-[3rem] p-10 border border-sky-100 shadow-xl shadow-sky-100/50">
        <h2 className="serif-title text-3xl text-sky-950 mb-2">{t.studioTitle}</h2>
        <p className="text-sky-500 mb-8 font-medium italic">{t.studioDesc}</p>

        <div className="mb-8 p-6 bg-cyan-50 rounded-3xl border border-cyan-100 flex flex-col sm:flex-row gap-4 items-center">
          <div className="text-3xl">🎨</div>
          <div className="text-xs text-sky-700 leading-relaxed">
            <p className="font-bold mb-1 uppercase tracking-widest">{t.designerTitle}</p>
            <p>{t.designerInfo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-sky-800 uppercase tracking-widest ml-2">{t.generationPrompt}</label>
              <textarea
                className="w-full px-6 py-4 bg-sky-50/50 border border-sky-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all text-sky-900 placeholder-sky-200 resize-none h-32"
                placeholder={t.promptPlaceholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex bg-sky-50 p-1 rounded-2xl border border-sky-100">
                {(["1K", "2K", "4K"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      size === s ? 'bg-white text-cyan-600 shadow-sm' : 'text-sky-300 hover:text-sky-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={presetLogo}
                className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-cyan-200 transition-all"
              >
                {t.presetBtn}
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-sky-950 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-sky-900/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </>
              ) : (
                t.generateBtn
              )}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[300px] bg-sky-50/30 border-2 border-dashed border-sky-100 rounded-[3rem] p-4 overflow-hidden relative group">
            {generatedImageUrl ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img src={generatedImageUrl} alt="AI Generated" className="max-w-full max-h-[400px] rounded-2xl shadow-2xl transition-transform group-hover:scale-[1.02]" />
                <div className="mt-6 w-full space-y-4">
                  <div className="h-px bg-sky-100 w-full"></div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-sky-800 uppercase tracking-widest ml-2">{t.editLabel}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={t.editPlaceholder}
                        className="flex-1 px-5 py-3 bg-white border border-sky-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-cyan-400/10"
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                      />
                      <button
                        onClick={handleEdit}
                        disabled={isEditing || !editPrompt}
                        className="bg-cyan-500 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-cyan-600 transition-all disabled:opacity-50"
                      >
                        {isEditing ? '...' : t.editBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-20">
                <div className="text-6xl grayscale opacity-20">✨</div>
                <p className="text-sky-300 font-bold uppercase tracking-[0.2em] text-xs">AI Studio</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
