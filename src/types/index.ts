export interface Light {
  id: string;
  name: string;
  status: "ON" | "OFF";
  zone: string;
}

export interface RoomData {
  id: string;
  name: string;
  makerUnoId: number; // 1 to 4
  ldrValue: number; // raw ADC or Lux
  isOccupied: boolean;
  lights: Light[];
  lastUpdated: string;
}

export interface SystemStats {
  totalRooms: number;
  totalLights: number;
  activeLights: number;
  gatewayConnected: boolean;
  powerConsumptionEstimateWatts: number;
}
