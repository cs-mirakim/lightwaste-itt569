"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, SunMedium, CheckCircle2, Sliders, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoomData } from "@/types";

const INITIAL_ROOMS: RoomData[] = [
  {
    id: "room-1",
    name: "Bilik 1: Lab Robotik (Maker UNO #1)",
    makerUnoId: 1,
    ldrValue: 420,
    isOccupied: true,
    lastUpdated: "Baru sahaja",
    lights: [
      { id: "r1-l1", name: "Lampu Zon Hadapan (Papan Putih)", status: "ON", zone: "Zone A" },
      { id: "r1-l2", name: "Lampu Zon Meja Pelajar", status: "OFF", zone: "Zone B" },
    ],
  },
  {
    id: "room-2",
    name: "Bilik 2: Bilik Kuliah 2 (Maker UNO #2)",
    makerUnoId: 2,
    ldrValue: 780,
    isOccupied: false,
    lastUpdated: "2 minit lepas",
    lights: [
      { id: "r2-l1", name: "Lampu Barisan Hadapan", status: "OFF", zone: "Zone A" },
      { id: "r2-l2", name: "Lampu Barisan Belakang", status: "OFF", zone: "Zone B" },
    ],
  },
  {
    id: "room-3",
    name: "Bilik 3: Studio IoT (Maker UNO #3)",
    makerUnoId: 3,
    ldrValue: 310,
    isOccupied: true,
    lastUpdated: "1 minit lepas",
    lights: [
      { id: "r3-l1", name: "Lampu Meja Kerja Utama", status: "ON", zone: "Zone A" },
      { id: "r3-l2", name: "Lampu Zon Ujian Perkakasan", status: "ON", zone: "Zone B" },
    ],
  },
  {
    id: "room-4",
    name: "Bilik 4: Bilik Seminar 4 (Maker UNO #4)",
    makerUnoId: 4,
    ldrValue: 650,
    isOccupied: false,
    lastUpdated: "5 minit lepas",
    lights: [
      { id: "r4-l1", name: "Lampu Pentas Seminar", status: "OFF", zone: "Zone A" },
      { id: "r4-l2", name: "Lampu Tempat Duduk", status: "OFF", zone: "Zone B" },
    ],
  },
];

export default function UserPortalPage() {
  const [rooms, setRooms] = useState<RoomData[]>(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("room-1");

  const activeRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const toggleLight = (lightId: string) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== selectedRoomId) return room;
        return {
          ...room,
          lights: room.lights.map((light) =>
            light.id === lightId
              ? { ...light, status: light.status === "ON" ? "OFF" : "ON" }
              : light
          ),
          lastUpdated: "Terkini (Tempatan)",
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white">
              <ArrowLeft className="size-4 mr-1" /> Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Zap className="size-5 text-amber-400" /> Portal Pengguna: Kawalan Bilik
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Pengurusan pintar pencahayaan bilik kuliah & makmal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800 text-xs text-neutral-300">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          NodeMCU Gateway: Sedia
        </div>
      </div>

      <main className="max-w-4xl mx-auto mt-6 space-y-6">
        {/* Step 1: Room Selector */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 shadow-lg backdrop-blur">
          <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3 flex items-center gap-2">
            <Sliders className="size-4 text-emerald-400" /> Langkah 1: Pilih Bilik Kuliah / Makmal
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId;
              const anyLightOn = room.lights.some((l) => l.status === "ON");
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-950/50"
                      : "border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-neutral-400">Node #{room.makerUnoId}</span>
                    <span
                      className={`size-2 rounded-full ${
                        anyLightOn ? "bg-amber-400 shadow-sm shadow-amber-400" : "bg-neutral-600"
                      }`}
                    />
                  </div>
                  <div className="font-semibold text-sm text-white line-clamp-1">{room.name.split(":")[1]?.trim() || room.name}</div>
                  <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
                    <SunMedium className="size-3 text-amber-400" />
                    LDR: {room.ldrValue}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Rules of Usage Banner */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 md:p-5 flex items-start gap-3.5 text-neutral-200">
          <Info className="size-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs md:text-sm">
            <div className="font-semibold text-amber-200 flex items-center gap-2">
              Panduan & Peraturan Penggunaan Tenaga (Rules of Usage)
            </div>
            <ul className="list-disc list-inside space-y-1 text-neutral-300 text-xs">
              <li>Sila pastikan lampu dipadamkan apabila meninggalkan bilik atau bilik tidak digunakan.</li>
              <li>Manfaatkan cahaya semulajadi sekiranya bacaan sensor LDR bilik berada pada tahap cerah (&gt; 500).</li>
              <li>Sistem dikawal secara berpusat dengan pengawasan pentadbir (Admin Master Override).</li>
            </ul>
          </div>
        </div>

        {/* Step 3: Multi-Light Switches for Selected Room */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lightbulb className="size-5 text-amber-400" /> Kawalan Zon Lampu: {activeRoom.name}
              </h2>
              <p className="text-xs text-neutral-400">
                Setiap Maker UNO mengawal berbilang zon pencahayaan secara berasingan
              </p>
            </div>
            <div className="text-xs text-neutral-400 flex items-center gap-2 self-start sm:self-auto">
              <span>Status: <span className="text-emerald-400 font-medium">{activeRoom.lastUpdated}</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRoom.lights.map((light) => {
              const isOn = light.status === "ON";
              return (
                <div
                  key={light.id}
                  className={`p-5 rounded-xl border transition-all flex items-center justify-between ${
                    isOn
                      ? "border-amber-500/50 bg-amber-950/20 shadow-md shadow-amber-950/20"
                      : "border-neutral-800 bg-neutral-900/40"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {light.zone}
                    </span>
                    <h3 className="font-semibold text-white text-sm md:text-base mt-1">{light.name}</h3>
                    <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${isOn ? "bg-amber-400" : "bg-neutral-600"}`} />
                      Keadaan: <strong className={isOn ? "text-amber-300" : "text-neutral-400"}>{light.status}</strong>
                    </div>
                  </div>

                  <Button
                    onClick={() => toggleLight(light.id)}
                    variant={isOn ? "default" : "outline"}
                    className={
                      isOn
                        ? "bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-4 py-2"
                        : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-white px-4 py-2"
                    }
                  >
                    {isOn ? "Padam (OFF)" : "Buka (ON)"}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Environmental Insight */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
            <div className="flex items-center gap-2">
              <SunMedium className="size-4 text-amber-400" />
              <span>Sensitiviti LDR Semasa: <strong className="text-neutral-200">{activeRoom.ldrValue} / 1024</strong></span>
              {activeRoom.ldrValue > 500 ? (
                <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Bilik Cerah (Jimat Tenaga)
                </span>
              ) : (
                <span className="text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                  Bilik Gelap / Sederhana
                </span>
              )}
            </div>
            <div className="text-neutral-400 text-[11px]">
              Protokol: Maker UNO (I2C/Serial) &larr;&rarr; ESP8266 Gateway
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
