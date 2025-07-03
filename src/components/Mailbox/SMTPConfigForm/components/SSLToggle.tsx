
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SSLToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SSLToggle({ checked, onCheckedChange }: SSLToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="secure"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="secure">Usar SSL/TLS</Label>
    </div>
  );
}
