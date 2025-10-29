import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InviteFriendFormProps {
  onSendInvite: (contact: string) => void;
}

export const InviteFriendForm = ({ onSendInvite }: InviteFriendFormProps): JSX.Element => {
  const [contact, setContact] = useState("");

  const handleSubmit = () => {
    if (contact.trim()) {
      onSendInvite(contact);
      setContact("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex space-x-3 items-center">
        <Input
          type="text"
          placeholder="Friend's email or phone"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSubmit}>Send invite</Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">One invite + one reminder. No spam.</p>
    </Card>
  );
};
