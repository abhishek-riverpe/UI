import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, FileText } from "lucide-react";

export const KYCPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">KYC Verification</h1>
      
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Identity Verification</h2>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Your identity has been successfully verified.
          </p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Address Verification</h2>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Your address has been successfully verified.
          </p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Bank Account Verification</h2>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Your bank account has been successfully verified.
          </p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3 text-gray-600" />
                <span>Government ID</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Uploaded</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3 text-gray-600" />
                <span>Proof of Address</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Uploaded</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
