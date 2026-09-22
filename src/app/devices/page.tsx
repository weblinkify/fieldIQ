import { Cpu } from "lucide-react";

export default function DevicesPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <Cpu size={40} />
      </div>
      <h2 className="placeholder-title">Device Management</h2>
      <div className="placeholder-badge">Coming in Phase 2 & 4</div>
      <p className="placeholder-description">
        Manage your hardware inventory, check battery health, update firmware over-the-air (OTA), 
        and configure physical ESP32 devices when we connect real hardware in Phase 4.
      </p>
    </div>
  );
}
