import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";

export const SupportPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support & Help</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-lg font-semibold">Live Chat</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get instant help from our support team via live chat.
          </p>
          <Button className="w-full">
            Start Chat
          </Button>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-lg font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Send us an email and we'll get back to you within 24 hours.
          </p>
          <Button variant="outline" className="w-full">
            Send Email
          </Button>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-lg font-semibold">Phone Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Call us for immediate assistance with your account.
          </p>
          <Button variant="outline" className="w-full">
            Call Now
          </Button>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-lg font-semibold">FAQ</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Find answers to common questions in our FAQ section.
          </p>
          <Button variant="outline" className="w-full">
            Browse FAQ
          </Button>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Support Tickets</h2>
        <p className="text-gray-600">No recent support tickets. If you need help, feel free to reach out!</p>
      </Card>
    </div>
  );
};
