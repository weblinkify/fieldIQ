"use client";

import {
  Bell,
  CreditCard,
  KeyRound,
  Server,
  Settings,
  User,
} from "lucide-react";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsSection from "@/components/settings/SettingsSection";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SystemSettings from "@/components/settings/SystemSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import BillingSettings from "@/components/settings/BillingSettings";

export default function SettingsPage() {
  return (
    <div className="stagger-in">
      <SettingsHeader />

      <div className="grid gap-5 lg:grid-cols-2">
        <SettingsSection
          icon={<User size={18} />}
          title="Account"
          description="Manage your account and profile preferences."
        >
          <AccountSettings />
        </SettingsSection>

        <SettingsSection
          icon={<Bell size={18} />}
          title="Notifications"
          description="Control how FieldIQ keeps you informed."
        >
          <NotificationSettings />
        </SettingsSection>

        <SettingsSection
          icon={<Server size={18} />}
          title="System"
          description="Configure system-wide monitoring preferences."
        >
          <SystemSettings />
        </SettingsSection>

        <SettingsSection
          icon={<KeyRound size={18} />}
          title="Security & API"
          description="Manage API access and security controls."
        >
          <SecuritySettings />
        </SettingsSection>

        <SettingsSection
          icon={<CreditCard size={18} />}
          title="Billing"
          description="Manage your subscription and billing information."
        >
          <BillingSettings />
        </SettingsSection>
      </div>
    </div>
  );
}
