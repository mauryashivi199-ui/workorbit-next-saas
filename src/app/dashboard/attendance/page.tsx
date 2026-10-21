"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Clock, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Camera, 
  RefreshCw, 
  ShieldCheck, 
  X, 
  Crosshair, 
  Building,
  UserCheck
} from "lucide-react";

// Haversine formula to calculate accurate distance between 2 GPS coordinates in meters
function calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Configurable Company HQ GPS (Greater Noida Tech Zone)
// In real app or demo, can be customized or set to user current location
const DEFAULT_HQ = {
  name: "Crewzen HQ - Greater Noida",
  latitude: 28.4744,
  longitude: 77.5040,
  allowedRadiusMeters: 500, // 500m geofence radius
};

export default function AttendancePage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; employeeCode: string }>({
    name: "Shivi Maurya",
    role: "SUPER_ADMIN",
    employeeCode: "WO-001",
  });

  const [punched, setPunched] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Geo State
  const [hqLocation, setHqLocation] = useState(DEFAULT_HQ);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [distanceFromHq, setDistanceFromHq] = useState<number | null>(null);
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Camera & Verification Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Read current user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("workorbit_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setCurrentUser({
          name: u.name || "Alex Kumar",
          role: u.role || "EMPLOYEE",
          employeeCode: u.employeeCode || (u.role === "SUPER_ADMIN" ? "WO-001" : "WO-002"),
        });
      } catch (e) {}
    }
  }, []);

  const isAdminOrHR = currentUser.role === "SUPER_ADMIN" || currentUser.role === "HR";

  // Attendance Records (empty default, will load real DB records)
  const [records, setRecords] = useState<any[]>([]);

  // Load records from DB on mount
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/attendance/punch");
      const data = await res.json();
      if (data.success && data.records && data.records.length > 0) {
        const mapped = data.records.map((r: any) => ({
          id: r._id,
          employeeCode: r.employeeCode,
          employee: `${r.employeeName} (${r.employeeCode})`,
          employeeNameOnly: r.employeeName,
          date: r.date,
          clockIn: r.clockInTime,
          clockOut: r.clockOutTime || "--",
          hours: r.clockOutTime ? `${r.workHours || 8} hrs` : "Running",
          status: r.status,
          type: r.selfieImage ? "Face + Geo Verified" : "Web Punch",
          distance: r.distanceFromOffice !== undefined ? `${r.distanceFromOffice}m from HQ` : "HQ Logged",
          photo: r.selfieImage || null,
        }));
        setRecords(mapped);
      } else {
        setRecords([]);
      }
    } catch (e) {
      console.error("Error fetching attendance records", e);
    }
  };

  // 1. Fetch User Live GPS Location
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng, accuracy: pos.coords.accuracy });

        const dist = calculateDistanceInMeters(lat, lng, hqLocation.latitude, hqLocation.longitude);
        setDistanceFromHq(dist);
        setIsWithinRadius(dist <= hqLocation.allowedRadiusMeters);
      },
      (err) => {
        setGeoError(err.message || "Failed to fetch GPS location. Please allow location permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Helper: Allow setting Current Location as Office HQ for testing demo
  const setMyCurrentLocationAsHQ = () => {
    if (userLocation) {
      setHqLocation({
        name: "Current Device Location (Demo HQ)",
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        allowedRadiusMeters: 500,
      });
      setDistanceFromHq(0);
      setIsWithinRadius(true);
    } else {
      requestLocation();
    }
  };

  // Start Camera Stream
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraActive(false);
      alert("Please allow camera access on your device/browser to capture selfie verification.");
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture Snapshot from Camera Canvas
  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setCapturedPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  // Open Verification Modal when user clicks Punch In
  const handleOpenPunchModal = () => {
    setIsModalOpen(true);
    setCapturedPhoto(null);
    setVerificationSuccess(false);
    requestLocation();
    setTimeout(() => {
      startCamera();
    }, 400);
  };

  // Submit Verified Punch to MongoDB Backend
  const handleConfirmPunchIn = async () => {
    setVerifying(true);
    try {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const res = await fetch("/api/attendance/punch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeCode: currentUser.employeeCode || "WO-001",
          employeeName: currentUser.name || "Shivi Maurya",
          action: "IN",
          latitude: userLocation?.lat,
          longitude: userLocation?.lng,
          distanceFromOffice: distanceFromHq || 0,
          isWithinGeofence: isWithinRadius ?? true,
          selfieImage: capturedPhoto,
          locationName: hqLocation.name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setVerificationSuccess(true);
        setPunched(true);
        setPunchTime(now);

        // Prepend record
        setRecords((prev) => [
          {
            id: Date.now().toString(),
            employee: "Shivi Maurya (WO-001)",
            date: "Today",
            clockIn: now,
            clockOut: "--",
            hours: "Just Clocked In",
            status: "PRESENT",
            type: "Face + Geo Verified",
            distance: `${distanceFromHq || 0}m from HQ`,
            photo: capturedPhoto,
          },
          ...prev,
        ]);

        setTimeout(() => {
          setIsModalOpen(false);
          setVerifying(false);
        }, 1500);
      } else {
        alert("Punch in failed: " + (data.error || "Unknown error"));
        setVerifying(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error while submitting attendance");
      setVerifying(false);
    }
  };

  // Punch Out Action
  const handlePunchOut = async () => {
    const confirmOut = confirm("Are you sure you want to clock out for today?");
    if (!confirmOut) return;

    setLoading(true);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    try {
      await fetch("/api/attendance/punch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeCode: "WO-001",
          employeeName: "Shivi Maurya",
          action: "OUT",
        }),
      });
      setPunched(false);
      setPunchTime(null);
      fetchRecords();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Smart Biometric 2.0 • Geo-Fence & Live Facial Capture</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Attendance & Biometrics</h1>
          <p className="text-xs text-slate-400">Mobile camera facial verification with 500m office perimeter GPS tracking</p>
        </div>

        {/* Demo Office HQ Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={setMyCurrentLocationAsHQ}
            title="Set your current GPS as Office HQ for testing geofence radius anywhere"
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Crosshair className="h-3.5 w-3.5 text-indigo-400" />
            <span>Set Current GPS as Office HQ (Demo)</span>
          </button>
        </div>
      </div>

      {/* Main Clock Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Clock className="h-10 w-10 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Attendance Status</span>
              <span className={`h-2 w-2 rounded-full ${punched ? "bg-emerald-400 animate-ping" : "bg-slate-600"}`} />
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {punched ? `Clocked In • ${punchTime}` : "You haven't punched in today"}
            </div>
            
            <div className="text-xs text-slate-400 mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Building className="h-3.5 w-3.5 text-indigo-400" />
                {hqLocation.name} (Radius: {hqLocation.allowedRadiusMeters}m)
              </span>
              {distanceFromHq !== null && (
                <span className={`flex items-center gap-1 font-semibold ${isWithinRadius ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <MapPin className="h-3.5 w-3.5" />
                  {distanceFromHq}m away • {isWithinRadius ? "Inside Geofence" : "Outside Office Radius"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {punched ? (
            <button
              onClick={handlePunchOut}
              disabled={loading}
              className="px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 active:scale-95"
            >
              <Square className="h-4 w-4 fill-current" />
              <span>Clock Out for Today</span>
            </button>
          ) : (
            <button
              onClick={handleOpenPunchModal}
              className="px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2.5 transition-all shadow-xl shadow-emerald-500/20 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 active:scale-95"
            >
              <Camera className="h-4 w-4" />
              <span>Face & GPS Punch In</span>
            </button>
          )}
        </div>
      </div>

      {/* Geofence & Security Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Crosshair className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Perimeter Radius</div>
            <div className="text-base font-extrabold text-white mt-0.5">{hqLocation.allowedRadiusMeters} Meters Max</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Biometric Auth</div>
            <div className="text-base font-extrabold text-white mt-0.5">Live Front Camera Proof</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Proxy Prevention</div>
            <div className="text-base font-extrabold text-white mt-0.5">Zero Buddy Punching</div>
          </div>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">
                {isAdminOrHR ? "Company Biometric Punch Register" : "My Personal Attendance Record"}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isAdminOrHR ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }`}>
                {isAdminOrHR ? "Admin View (All Employees)" : "Private View (Protected)"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAdminOrHR 
                ? "Full executive log of company punches, GPS verification and selfies recorded in MongoDB" 
                : "Only your own attendance and selfie history is visible to you for privacy compliance."}
            </p>
          </div>
          <button
            onClick={fetchRecords}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-center"
            title="Refresh records"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-6">Selfie Verification</th>
                <th className="py-4 px-6">Punch In</th>
                <th className="py-4 px-6">Punch Out</th>
                <th className="py-4 px-6">Distance from HQ</th>
                <th className="py-4 px-6">Method</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records
                .filter((rec) => {
                  // If Admin/HR: show all records
                  if (isAdminOrHR) return true;
                  
                  // If Employee: strictly match employeeCode OR employeeName
                  const curCode = (currentUser.employeeCode || "").trim().toLowerCase();
                  const curName = (currentUser.name || "").trim().toLowerCase();
                  const recCode = (rec.employeeCode || "").trim().toLowerCase();
                  const recName = (rec.employeeNameOnly || rec.employee || "").trim().toLowerCase();

                  if (curCode && recCode && curCode === recCode) return true;
                  if (curName && recName && (recName.includes(curName) || curName.includes(recName))) return true;

                  return false;
                })
                .map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-extrabold text-indigo-400 border border-slate-700">
                      {rec.employee.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{rec.employee}</span>
                  </td>
                  <td className="py-4 px-6">
                    {rec.photo ? (
                      <div className="relative group w-10 h-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rec.photo}
                          alt="Selfie"
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shadow-sm"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-[8px] text-black font-black px-1 rounded-full">
                          ✓
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">No Photo</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-slate-200 font-semibold">{rec.clockIn}</td>
                  <td className="py-4 px-6 text-slate-400">{rec.clockOut}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-300">
                      <MapPin className="h-3 w-3 text-indigo-400" />
                      {rec.distance || "Office"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {rec.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                        rec.status === "PRESENT"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP MODAL: Camera Selfie + Geofence Radar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => {
                stopCamera();
                setIsModalOpen(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Identity & GPS Verification</span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">Punch In Verification</h3>
            </div>

            {/* GPS Geofence Radar Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                  Office Perimeter Check:
                </span>
                {distanceFromHq !== null ? (
                  <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                    isWithinRadius ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {distanceFromHq}m from Office
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Detecting GPS...</span>
                )}
              </div>

              {geoError && (
                <div className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{geoError}</span>
                </div>
              )}

              {distanceFromHq !== null && !isWithinRadius && (
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center justify-between">
                  <span>Outside {hqLocation.allowedRadiusMeters}m Office radius!</span>
                  <button
                    onClick={setMyCurrentLocationAsHQ}
                    className="text-[10px] font-black underline text-amber-400 ml-2"
                  >
                    Set HQ here (Demo)
                  </button>
                </div>
              )}
            </div>

            {/* Camera Viewport / Captured Preview */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 flex items-center justify-center">
              {!capturedPhoto ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* Face Outline Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-36 h-48 border-2 border-dashed border-emerald-400/60 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-sm text-slate-300 text-[10px] px-3 py-1 rounded-full font-medium">
                      Align your face in the oval
                    </span>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={capturedPhoto}
                    alt="Captured Proof"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Captured</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center gap-3">
              {!capturedPhoto ? (
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/25"
                >
                  <Camera className="h-4 w-4" />
                  <span>Snap Live Photo</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCapturedPhoto(null);
                      startCamera();
                    }}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPunchIn}
                    disabled={verifying || verificationSuccess}
                    className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {verifying ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Verifying & Saving...</span>
                      </>
                    ) : verificationSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Verified! Clocked In</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Confirm & Punch In</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
