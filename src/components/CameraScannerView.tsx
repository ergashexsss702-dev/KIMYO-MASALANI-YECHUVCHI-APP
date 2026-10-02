import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle,
  FileQuestion,
  ChevronRight,
  Eye,
  CameraOff,
} from 'lucide-react';
import { solveChemistryProblem } from '../services/aiSolver';
import { SolvedProblem } from '../types';
import { saveProblemToHistory } from '../utils/storage';
import { SolutionCard } from './SolutionCard';

interface CameraScannerViewProps {
  onNavigate?: (view: string) => void;
}

export const CameraScannerView: React.FC<CameraScannerViewProps> = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('8-sinf');

  // Loading & scientific scanning steps state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);

  // Result state
  const [solutionResult, setSolutionResult] = useState<SolvedProblem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const scanStages = [
    'Rasm skanerlanmoqda...',
    'Kimyoviy formulalar va belgilar o‘qilmoqda...',
    'Berilgan kattaliklar (m, V, n) aniqlanmoqda...',
    'Reaksiya va stokiometrik yechim hisoblanmoqda...',
    'Yakuniy hisob-kitoblar tekshirilmoqda...',
  ];

  // Stop camera stream cleanly when component unmounts or view changes
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Start live webcam / mobile camera video stream
  const startLiveCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera funksiyasi ushbu brauzerda qo‘llab-quvvatlanmaydi.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        setImageSrc(null);
      }
    } catch (err: any) {
      console.warn('Direct camera stream error:', err);
      // Gracefully trigger native device camera input
      setCameraError(
        'Kameraga to‘g‘ridan-to‘g‘ri ulanib bo‘lmadi. Quyidagi "Kamera bilan rasmga olish" tugmasi orqali rasmga oling.'
      );
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  // Capture frame from active video feed
  const capturePhotoFromStream = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImageSrc(dataUrl);
      setMimeType('image/jpeg');
      stopCameraStream();
    }
  };

  // Handle file / gallery uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Iltimos, faqat rasm faylini tanlang (JPG, PNG, WebP).');
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setSolutionResult(null);
      setErrorMsg(null);
      stopCameraStream();
    };
    reader.readAsDataURL(file);
  };

  // Submit image to AI Solver
  const handleAnalyzeImage = async () => {
    if (!imageSrc) {
      setErrorMsg('Avval rasm tanlang yoki kameradan suratga oling.');
      return;
    }

    setIsAnalyzing(true);
    setScanStepIndex(0);
    setErrorMsg(null);

    // Simulate animated scientific steps
    const interval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < scanStages.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    try {
      const result = await solveChemistryProblem({
        imageBase64: imageSrc,
        mimeType: mimeType,
        grade: selectedGrade,
      });

      clearInterval(interval);
      setSolutionResult(result);
      if (result.confidence !== 'unclear') {
        saveProblemToHistory(result);
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorMsg(
        'Masalani tahlil qilishda xatolik yuz berdi. Iltimos, rasmni aniqroq oling yoki matn sifatida kiriting.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetake = () => {
    setImageSrc(null);
    setSolutionResult(null);
    setErrorMsg(null);
    stopCameraStream();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Camera className="w-3.5 h-3.5" />
          <span>AI Optik Tahlil</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Rasm orqali masalani yechish
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Daftar yoki kitobdagi kimyo masalasini suratga oling. AI formulalar, berilganlar va tenglamalarni bosqichma-bosqich yechib beradi.
        </p>
      </div>

      {/* Grade Selector for context */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">Sinfingiz:</span>
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {['5-sinf', '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGrade === g
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {/* Native device camera input (with capture attribute) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Solution Result view if already solved */}
      {solutionResult && (
        <div className="space-y-6">
          <SolutionCard solution={solutionResult} onSolveAnother={handleRetake} />
          <div className="text-center pt-2">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Boshqa rasm yuklash
            </button>
          </div>
        </div>
      )}

      {/* Main Camera / Upload Interface (When not solved) */}
      {!solutionResult && (
        <div className="space-y-6">
          {/* Active Live Camera Stream */}
          {isCameraActive && (
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-[4/3] max-w-xl mx-auto shadow-2xl border-2 border-cyan-500">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-8 border border-white/30 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                </div>
                <div className="text-center text-xs text-white/70 bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full self-center">
                  Masalani to‘rtburchak ichiga to‘g‘rilang
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                </div>
              </div>

              {/* Camera capture triggers */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                <button
                  onClick={stopCameraStream}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 text-white text-xs backdrop-blur-sm"
                >
                  Bekor qilish
                </button>

                <button
                  onClick={capturePhotoFromStream}
                  className="w-16 h-16 rounded-full bg-white p-1 shadow-lg active:scale-90 transition-transform flex items-center justify-center"
                  aria-label="Suratga olish"
                >
                  <div className="w-13 h-13 rounded-full border-2 border-slate-900 bg-cyan-400 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-slate-950" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Captured / Uploaded Image Preview */}
          {imageSrc && !isCameraActive && (
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 max-w-xl mx-auto border border-slate-200 dark:border-slate-800 shadow-xl">
              <img
                src={imageSrc}
                alt="Masala namunasi"
                className="w-full max-h-[420px] object-contain mx-auto"
              />

              {/* Scanning laser animation overlay when analyzing */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-cyan-950/30 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  {/* Laser line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser-scan" />

                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl max-w-sm space-y-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto animate-spin">
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <div className="text-base font-bold text-white">
                      Masala tahlil qilinmoqda...
                    </div>
                    <div className="text-xs font-mono text-cyan-300 min-h-[20px]">
                      {scanStages[scanStepIndex]}
                    </div>
                    {/* Progress dots */}
                    <div className="flex justify-center gap-1.5 pt-2">
                      {scanStages.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i <= scanStepIndex ? 'bg-cyan-400 scale-110' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons under image */}
              {!isAnalyzing && (
                <div className="p-4 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Qayta olish
                  </button>

                  <button
                    onClick={handleAnalyzeImage}
                    className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-bold text-sm shadow-md shadow-cyan-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    Masalani yechish
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Initial State: Clean Camera / Upload Choice Box */}
          {!imageSrc && !isCameraActive && (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mx-auto flex items-center justify-center shadow-inner">
                <Camera className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Rasm tanlang yoki suratga oling
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Darslik, ish daftari yoki test varaqasidagi kimyo masalasini to‘liq ko‘rsating
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (cameraInputRef.current) cameraInputRef.current.click();
                    else startLiveCamera();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  📷 Kamera
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <ImageIcon className="w-4 h-4 text-cyan-500" />
                  🖼 Galereyadan tanlash
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  📄 Fayl yuklash
                </button>
              </div>

              {cameraError && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  {cameraError}
                </p>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 max-w-xl mx-auto">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Tips for best photography */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs text-slate-500 dark:text-slate-400 pt-2">
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                ☀️ Yaxshi yorug‘lik
              </span>
              Soyalar tushmasligiga va matn yaltiramasligiga e’tibor bering.
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                🔍 Aniq fokus
              </span>
              Kimyoviy formulalarning indekslari (masalan H₂SO₄) aniq ko‘rinsin.
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                📐 Faqat masala
              </span>
              Ortiqcha sahifalarni emas, faqat masalani kadrga oling.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
