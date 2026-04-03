'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  djName: string;
  djWhatsApp: string;
  eventDetails?: {
    location?: string;
    eventType?: string;
    duration?: number;
  };
}

export function WhatsAppButton({
  djName,
  djWhatsApp,
  eventDetails,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    let message = `Hi! I'm interested in booking ${djName} for my event.`;

    if (eventDetails) {
      if (eventDetails.location) {
        message += `\nLocation: ${eventDetails.location}`;
      }
      if (eventDetails.eventType) {
        message += `\nEvent Type: ${eventDetails.eventType}`;
      }
      if (eventDetails.duration) {
        message += `\nDuration: ${eventDetails.duration} hours`;
      }
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${djWhatsApp}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button onClick={handleClick} size="lg" className="w-full md:w-auto">
      <MessageCircle className="mr-2 h-5 w-5" />
      Book via WhatsApp
    </Button>
  );
}
