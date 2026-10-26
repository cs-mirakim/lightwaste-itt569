"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Power,
  PowerOff,
  Sun,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  Zap,
  TrendingDown,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoomData } from "@/types";

const INITIAL_ADMIN_ROOMS: RoomData[] = [
  {
    id: "room-1",
    name: "Bilik 1: Lab Robotik",
    makerUnoId: 1,
    ldrValue: 420,
    isOccupied: true,
    lastUpdated: "Baru sahaja",
    lights: [
      { id: "r1-l1", name: "Hadapan (Papan Putih)", status: "ON", zone: "Zone A" },
      { id: "r1-l2", name: "Meja Pelajar", status: "OFF", zone: "Zone B" },
    ],
  },
  {
    id: "room-2",
    name: "Bilik 2: Bilik Kuliah 2",
    makerUnoId: 2,
    ldrValue: 780,
    isOccupied: false,
    lastUpdated: "3 minit lepas",
    lights: [
      { id: "r2-l1", name: "Barisan Hadapan", status: "OFF", zone: "Zone A" },
      { id: "r2-l2", name: "Barisan Belakang", status: "OFF", zone: "Zone B" },
    ],
  },
  {
    id: "room-3",
    name: "Bilik 3: Studio IoT",
    makerUnoId: 3,
    ldrValue: 310,
    isOccupied: true,
    lastUpdated: "1 minit lepas",
    lights: [
      { id: "r3-l1", name: "Meja Kerja Utama", status: "ON", zone: "Zone A" },
      { id: "r3-l2", name: "Zon Ujian Perkakasan", status: "ON", zone: "Zone B" },
    ],
  },
  {
    id: "room-4",
    name: "Bilik 4: Bilik Seminar 4",
    makerUnoId: 4,
    ldrValue: 650,
    isOccupied: false,
    lastUpdated: "5 minit lepas",
    lights: [
      { id: "r4-l1", name: "Pentas Seminar", status: "OFF", zone: "Zone A" },
      { id: "r4-l2", name: "Tempat Duduk", status: "OFF", zone: "Zone B" },
    ],
  },
];

export default function AdminDashboardPage() {
  const [rooms, setRooms] = useState<RoomData[]>(INITIAL_ADMIN_ROOMS);
  const [logs, setLogs] = useState<string[]>([
    "Sistem inisialisasi berjaya. Menghubungkan ke NodeMCU V2 Gateway...",
    "Maker UNO #1, #2, #3, #4 dalam status aktif.",
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const toggleSingleLight = (roomId: string, lightId: string) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          lights: room.lights.map((l) => {
            if (l.id !== lightId) return l;
            const newStatus = l.status === "ON" ? "OFF" : "ON";
            addLog(`Togol ${room.name} -> ${l.name} ke ${newStatus}`);
            return { ...l, status: newStatus };
          }),
        };
      })
    );
  };

  const setRoomAllLights = (roomId: string, targetStatus: "ON" | "OFF") => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        addLog(`Master Room: Set semua lampu di ${room.name} ke ${targetStatus}`);
        return {
          ...room,
          lights: room.lights.map((l) => ({ ...l, status: targetStatus })),
        };
      })
    );
  };

  const masterAllOverride = (targetStatus: "ON" | "OFF") => {
    setRooms((prev) =>
      prev.map((room) => ({
        ...room,
        lights: room.lights.map((l) => ({ ...l, status: targetStatus })),
      }))
    );
    addLog(`MASTER OVERRIDE: Semua 4 bilik disetkan ke ${targetStatus}`);
  };

  const totalLights = rooms.reduce((acc, r) => acc + r.lights.length, 0);
  const activeLights = rooms.reduce(
    (acc, r) => acc + r.lights.filter((l) => l.status === "ON").length,
    0
  );
  const estimatedWatts = activeLights * 36; // 36W per fluorescent/LED tube simulation

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white">
              <ArrowLeft className="size-4 mr-1" /> Portal Utama
            </Button>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="size-6 text-indigo-400" /> Papan Pemuka Pentadbir (Admin Dashboard)
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Pengawasan berpusat 4 Bilik (4x Maker UNO) &amp; Gateway ESP8266
            </p>
          </div>
        </div>

        {/* Master Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => masterAllOverride("OFF")}
            className="bg-red-950/60 border border-red-800/80 text-red-200 hover:bg-red-900/80 text-xs md:text-sm gap-2"
          >
            <PowerOff className="size-4 text-red-400" /> Master Padam Semua (All OFF)
          </Button>
          <Button
            onClick={() => masterAllOverride("ON")}
            className="bg-amber-950/60 border border-amber-800/80 text-amber-200 hover:bg-amber-900/80 text-xs md:text-sm gap-2"
          >
            <Power className="size-4 text-amber-400" /> Buka Semua (All ON)
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto mt-6 space-y-6">
        {/* Top Analytics Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span>Jumlah Bilik</span>
              <Building className="size-4 text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white">{rooms.length} Bilik</div>
            <div className="text-[11px] text-emerald-400 mt-1">4x Maker UNO Nodes</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span>Lampu Aktif</span>
              <Zap className="size-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {activeLights} <span className="text-sm font-normal text-neutral-400">/ {totalLights} zon</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Multi-zone status</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span>Anggaran Kuasa</span>
              <TrendingDown className="size-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{estimatedWatts} W</div>
            <div className="text-[11px] text-neutral-400 mt-1">Penjimatan dinamik LDR</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span>NodeMCU Gateway</span>
              <Cpu className="size-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" /> Bersambung
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Firebase RTDB Sync</div>
          </div>
        </div>

        {/* Bento Grid: 4 Rooms */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="size-4 text-emerald-400" /> Bento Grid: Pengurusan 4 Bilik Kuliah
            </h2>
            <span className="text-xs text-neutral-400">Susun atur Bento terpusat</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map((room) => {
              const anyLightOn = room.lights.some((l) => l.status === "ON");
              const roomActiveCount = room.lights.filter((l) => l.status === "ON").length;
              return (
                <div
                  key={room.id}
                  className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700/80 rounded-2xl p-5 shadow-lg backdrop-blur flex flex-col justify-between transition-all"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                            Maker UNO #{room.makerUnoId}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded ${
                              anyLightOn
                                ? "bg-amber-950/50 text-amber-300 border border-amber-800/40"
                                : "bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            {roomActiveCount} Lampu Hidup
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base mt-1.5">{room.name}</h3>
                      </div>

                      {/* Room Master Toggles */}
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setRoomAllLights(room.id, "OFF")}
                          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 text-xs"
                        >
                          Padam Bilik
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setRoomAllLights(room.id, "ON")}
                          className="bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-800/40 text-xs"
                        >
                          Buka Bilik
                        </Button>
                      </div>
                    </div>

                    {/* Sensor Indicator */}
                    <div className="my-3 flex items-center justify-between text-xs bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Sun className="size-4 text-amber-400" />
                        <span>Bacaan Sensor LDR:</span>
                        <strong className="text-white font-mono">{room.ldrValue}</strong>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {room.ldrValue > 500 ? "Keadaan Terang" : "Keadaan Redup/Gelap"}
                      </span>
                    </div>

                    {/* Individual Zone Lights inside Room */}
                    <div className="space-y-2 mt-3">
                      {room.lights.map((light) => {
                        const isOn = light.status === "ON";
                        return (
                          <div
                            key={light.id}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                              isOn
                                ? "border-amber-600/40 bg-amber-950/10 text-white"
                                : "border-neutral-800 bg-neutral-900/30 text-neutral-400"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`size-2.5 rounded-full ${
                                  isOn ? "bg-amber-400 shadow-sm shadow-amber-400" : "bg-neutral-600"
                                }`}
                              />
                              <div>
                                <div className="font-semibold text-white">{light.name}</div>
                                <div className="text-[10px] text-neutral-400 font-mono">{light.zone}</div>
                              </div>
                            </div>

                            <Button
                              size="xs"
                              variant={isOn ? "default" : "outline"}
                              onClick={() => toggleSingleLight(room.id, light.id)}
                              className={
                                isOn
                                  ? "bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold"
                                  : "bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                              }
                            >
                              {isOn ? "Padam" : "Buka"}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Kemaskini: {room.lastUpdated}</span>
                    <span className="font-mono">I2C Addr: 0x0{room.makerUnoId}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time System Audit Log Strip */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
            <Activity className="size-4 text-emerald-400" /> Log Aktiviti Perkakasan &amp; Arahan
          </div>
          <div className="font-mono text-xs text-neutral-300 space-y-1 bg-neutral-950/80 p-3 rounded-lg border border-neutral-800 max-h-36 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                <span className="text-emerald-500">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
