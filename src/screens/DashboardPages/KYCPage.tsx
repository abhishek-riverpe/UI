import React, { useState } from "react";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Upload, 
  FileText, 
  Image, 
  X, 
  Loader2,
  CircleCheckBig
} from "lucide-react";

// Types for KYC states
type KYCStatus = 'pending' | 'verified' | 'failed' | 'in_review' | 'skipped' | 'additional_docs_required';
type DocumentStatus = 'pending' | 'uploading' | 'uploaded' | 'failed';

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image';
  status: DocumentStatus;
  file?: File;
}

interface KYCPageProps {
  currentStatus?: KYCStatus;
}

export const KYCPage: React.FC<KYCPageProps> = ({ 
  currentStatus = 'additional_docs_required' 
}) => {
  const [kycStatus, setKycStatus] = useState<KYCStatus>(currentStatus);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: '1',
      name: 'Government ID.png',
      size: '1.65 MB',
      type: 'image',
      status: 'uploaded'
    },
    {
      id: '2', 
      name: 'Bank Statement - Jane Doe.pdf',
      size: '99.57 KB',
      type: 'pdf',
      status: 'uploaded'
    }
  ]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Required documents list
  const requiredDocuments = [
    'Proof of address (utility bill, bank statement, or government letter)',
    'Bank statement (last 3 months)'
  ];

  // Get status badge styling
  const getStatusBadgeStyle = (status: KYCStatus) => {
    switch (status) {
      case 'pending':
        return {
          backgroundColor: '#FFFBEB',
          borderColor: '#D97706',
          textColor: '#92400E',
          icon: <Clock size={16} color="#92400E" />
        };
      case 'verified':
        return {
          backgroundColor: '#E2F5EE',
          borderColor: '#1FCB92',
          textColor: '#137C59',
          icon: <CheckCircle size={16} color="#137C59" />
        };
      case 'failed':
        return {
          backgroundColor: '#FEF2F2',
          borderColor: '#EF4444',
          textColor: '#DC2626',
          icon: <XCircle size={16} color="#DC2626" />
        };
      case 'in_review':
        return {
          backgroundColor: '#EFF6FF',
          borderColor: '#3B82F6',
          textColor: '#1D4ED8',
          icon: <AlertCircle size={16} color="#1D4ED8" />
        };
      default:
        return {
          backgroundColor: '#FFFBEB',
          borderColor: '#D97706',
          textColor: '#92400E',
          icon: <Clock size={16} color="#92400E" />
        };
    }
  };

  // Get verification status content
  const getVerificationStatusContent = () => {
    switch (kycStatus) {
      case 'verified':
        return {
          title: 'Verification Status - Verified',
          description: 'Your identity has been successfully verified. You can now access all features.',
          iconBg: '#1FCB92'
        };
      case 'failed':
        return {
          title: 'Verification Status - Verification Failed',
          description: 'We were unable to verify your identity. Please check your documents and try again.',
          iconBg: '#EF4444'
        };
      case 'pending':
        return {
          title: 'Verification Status - Pending',
          description: 'Your verification is being reviewed. We\'ll notify you when it\'s complete.',
          iconBg: '#D97706'
        };
      case 'in_review':
        return {
          title: 'Verification Status - In Review',
          description: 'We\'re reviewing your details—no action needed; we\'ll notify you when it\'s done.',
          iconBg: '#005AEE'
        };
      case 'skipped':
        return {
          title: 'Verification Status - Skipped',
          description: 'You have chosen to skip verification. Some features may be limited.',
          iconBg: '#6B7280'
        };
      case 'additional_docs_required':
        return {
          title: 'Verification Status - Additional documents required',
          description: 'We need one more document to finish your verification—upload it to proceed.',
          iconBg: '#005AEE'
        };
      default:
        return {
          title: 'Verification Status - Pending',
          description: 'Your verification is being reviewed. We\'ll notify you when it\'s complete.',
          iconBg: '#D97706'
        };
    }
  };

  const statusContent = getVerificationStatusContent();
  const statusBadge = getStatusBadgeStyle(kycStatus);

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const newDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        status: 'uploading',
        file
      };

      setUploadedDocuments(prev => [...prev, newDoc]);

      // Simulate upload progress
      setTimeout(() => {
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? { ...doc, status: 'uploaded' as DocumentStatus }
              : doc
          )
        );
      }, 2000);
    });
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  // Remove document
  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Submit documents
  const handleSubmitDocuments = () => {
    if (uploadedDocuments.length >= 2) {
      setKycStatus('in_review');
    }
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-8" 
      style={{ gap: "clamp(24px, 5vw, 40px)" }}
    >
      {/* Page Title */}
      <div className="flex flex-col self-stretch" style={{ gap: "12px" }}>
        <h1
          style={{
            fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 5vw, 32px)",
            lineHeight: "1.2",
            color: "#222222"
          }}
        >
          KYC
        </h1>
      </div>

      {/* Verification Status Card */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{
          padding: "clamp(16px, 3vw, 24px)",
          border: "1px solid #ACACAC",
          borderRadius: "12px",
          width: "100%",
          // maxWidth: "855px"
        }}
      >
        <div className="flex items-center w-full sm:w-auto" style={{ gap: "12px" }}>
          {/* Status Icon */}
          <div
            style={{
              width: "clamp(40px, 8vw, 48px)",
              height: "clamp(40px, 8vw, 48px)",
              backgroundColor: statusContent.iconBg,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <CheckCircle size={24} color="#FFFFFF" />
          </div>

          {/* Status Content */}
          <div className="flex flex-col flex-1 w-full min-w-0" style={{ gap: "4px" }}>
            <h2
              style={{
                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(16px, 3vw, 20px)",
                lineHeight: "1.2",
                color: "#222222"
              }}
            >
              {statusContent.title}
            </h2>
            <p
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 2.5vw, 16px)",
                lineHeight: "1.25",
                color: "#575757"
              }}
            >
              {statusContent.description}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className="flex items-center flex-shrink-0"
          style={{
            gap: "8px",
            padding: "4px 12px",
            backgroundColor: statusBadge.backgroundColor,
            border: `2px solid ${statusBadge.borderColor}`,
            borderRadius: "50px"
          }}
        >
          {statusBadge.icon}
          <span
            style={{
              fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(13px, 2.5vw, 16px)",
              lineHeight: "1.5",
              color: statusBadge.textColor
            }}
          >
            {kycStatus === 'additional_docs_required' ? 'Pending' : 
             kycStatus === 'in_review' ? 'Pending' :
             kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
          </span>
        </div>
      </div>

      {/* Documents Submission Section */}
      {kycStatus === 'additional_docs_required' && (
        <div className="flex flex-col" style={{ gap: "clamp(24px, 5vw, 40px)" }}>
          {/* Section Header */}
          <div className="flex flex-col" style={{ gap: "clamp(16px, 3vw, 24px)" }}>
            <div className="flex flex-col" style={{ gap: "12px" }}>
              <h2
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(24px, 5vw, 32px)",
                  lineHeight: "1.2",
                  color: "#222222"
                }}
              >
                Documents submission
              </h2>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 2.5vw, 16px)",
                  lineHeight: "1.25",
                  color: "#575757"
                }}
              >
                Upload the requested document(s) as clear, uncropped images or PDFs to complete verification—ensure details match your legal name.
              </p>
            </div>
          </div>

          {/* Required Documents List */}
          <div
            style={{
              padding: "clamp(16px, 3vw, 25px)",
              border: "1px solid #ACACAC",
              borderRadius: "12px"
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <h3
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(16px, 3vw, 20px)",
                  lineHeight: "1.2",
                  color: "#222222"
                }}
              >
                Required documents to submit
              </h3>
            </div>
            
            <div className="flex flex-col" style={{ gap: "10px" }}>
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center"
                  style={{
                    gap: "12px",
                    padding: "clamp(12px, 2.5vw, 18px) 12px",
                    backgroundColor: "#EFEFEF",
                    borderRadius: "8px"
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#030213",
                      borderRadius: "50%",
                      flexShrink: 0
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 2.5vw, 16px)",
                      lineHeight: "1.25",
                      color: "#000000"
                    }}
                  >
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            style={{
              padding: "clamp(16px, 4vw, 32px)",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ACACAC",
              borderRadius: "16px"
            }}
          >
            {/* Upload Zone */}
            <div
              className="flex flex-col items-center"
              style={{
                gap: "clamp(16px, 4vw, 30px)",
                padding: "clamp(16px, 3vw, 24px) 16px clamp(24px, 5vw, 48px)",
                border: `1px dashed #ACACAC`,
                borderRadius: "8px",
                backgroundColor: isDragOver ? "#F8F9FA" : "transparent"
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Upload Icon */}
              <div style={{ width: "clamp(150px, 30vw, 250px)", height: "clamp(150px, 30vw, 250px)" }}>
                <img src="/illustrations/upload-illustration.svg" alt="upload" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>

              {/* Upload Text */}
              <div className="flex flex-col items-center" style={{ gap: "8px" }}>
                <h3
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(16px, 3vw, 20px)",
                    lineHeight: "1.2",
                    color: "#222222",
                    textAlign: "center"
                  }}
                >
                  Drag & drop or click to upload
                </h3>
                <p
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(13px, 2.5vw, 16px)",
                    lineHeight: "1.2",
                    color: "#8C8C8C",
                    textAlign: "center"
                  }}
                >
                  JPG, PNG, PDF • up to 10MB
                </p>
              </div>

              {/* Choose File Button */}
              <div
                className="flex items-center justify-center w-full sm:w-auto"
                style={{
                  gap: "10px",
                  padding: "clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 24px)",
                  backgroundColor: "#005AEE",
                  borderRadius: "12px"
                }}
              >
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: "1.088",
                    color: "#FFFFFF",
                    cursor: "pointer"
                  }}
                >
                  Choose file
                </label>
              </div>
            </div>

            {/* Uploaded Documents */}
            {uploadedDocuments.length > 0 && (
              <div className="flex flex-col" style={{ gap: "clamp(24px, 4vw, 40px)", marginTop: "clamp(24px, 4vw, 40px)" }}>
                <div className="flex flex-col" style={{ gap: "12px" }}>
                  <h3
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(18px, 3.5vw, 24px)",
                      lineHeight: "1.2",
                      color: "#222222"
                    }}
                  >
                    Upload required documents
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 2.5vw, 16px)",
                      lineHeight: "1.25",
                      color: "#575757"
                    }}
                  >
                    {uploadedDocuments.filter(doc => doc.status === 'uploaded').length} of 2 required documents uploaded
                  </p>
                </div>

                {/* Document List */}
                <div className="flex flex-col" style={{ gap: "12px" }}>
                  {uploadedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      style={{
                        padding: "clamp(12px, 2.5vw, 20px)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #ACACAC",
                        borderRadius: "8px"
                      }}
                    >
                      <div className="flex items-center w-full sm:w-auto" style={{ gap: "clamp(12px, 3vw, 24px)" }}>
                        <div className="flex items-center flex-1 min-w-0" style={{ gap: "clamp(12px, 2.5vw, 16px)" }}>
                          {doc.type === 'pdf' ? (
                            <FileText size={24} color="#222222" className="flex-shrink-0" />
                          ) : (
                            <Image size={24} color="#222222" className="flex-shrink-0" />
                          )}
                          <div className="flex flex-col flex-1 min-w-0" style={{ gap: "4px" }}>
                            <span
                              style={{
                                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 600,
                                fontSize: "clamp(13px, 2.5vw, 16px)",
                                lineHeight: "1.25",
                                color: "#000000",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {doc.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Archivo', sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(11px, 2vw, 12px)",
                                lineHeight: "1.67",
                                color: "#000000"
                              }}
                            >
                              {doc.size}
                            </span>
                          </div>
                        </div>
                        {doc.status === 'uploaded' && (
                          <CircleCheckBig size={24} color="#1AAA7A" className="flex-shrink-0" />
                        )}
                        {doc.status === 'uploading' && (
                          <Loader2 size={24} color="#005AEE" className="animate-spin flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end" style={{ gap: "clamp(12px, 2.5vw, 16px)" }}>
                        {doc.status === 'uploaded' && (
                          <div
                            className="flex items-center"
                            style={{
                              gap: "8px",
                              padding: "4px 12px",
                              backgroundColor: "#E2F5EE",
                              border: "2px solid #1FCB92",
                              borderRadius: "50px"
                            }}
                          >
                            <CheckCircle size={16} color="#137C59" />
                            <span
                              style={{
                                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 600,
                                fontSize: "clamp(13px, 2.5vw, 16px)",
                                lineHeight: "1.5",
                                color: "#137C59"
                              }}
                            >
                              Uploaded
                            </span>
                          </div>
                        )}
                        {doc.status === 'uploading' && (
                          <div
                            className="flex items-center"
                            style={{
                              gap: "8px",
                              padding: "4px 12px",
                              backgroundColor: "#E2E2E2",
                              border: "2px solid #575757",
                              borderRadius: "50px"
                            }}
                          >
                            <Loader2 size={16} color="#575757" className="animate-spin" />
                            <span
                              style={{
                                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 600,
                                fontSize: "clamp(13px, 2.5vw, 16px)",
                                lineHeight: "1.5",
                                color: "#575757"
                              }}
                            >
                              Uploading
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => removeDocument(doc.id)}
                          style={{ cursor: "pointer" }}
                          className="flex-shrink-0"
                        >
                          <X size={24} color="#000000" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            {uploadedDocuments.length >= 2 && (
              <div className="flex justify-center" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
                <button
                  onClick={handleSubmitDocuments}
                  className="flex items-center justify-center w-full"
                  style={{
                    gap: "10px",
                    padding: "clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 24px)",
                    backgroundColor: "#005AEE",
                    borderRadius: "12px",
                    // maxWidth: "791px",
                    cursor: "pointer"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(14px, 2.5vw, 16px)",
                      lineHeight: "1.088",
                      color: "#FFFFFF"
                    }}
                  >
                    Submit documents
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success/Review State */}
      {(kycStatus === 'verified' || kycStatus === 'in_review') && (
        <div
          className="flex flex-col items-center"
          style={{
            padding: "clamp(16px, 3vw, 24px)",
            backgroundColor: "#F8F9FA",
            border: "1px solid #ACACAC",
            borderRadius: "16px",
            textAlign: "center"
          }}
        >
          <CheckCircle size={48} color="#1FCB92" style={{ marginBottom: "16px" }} />
          <h3
            style={{
              fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(16px, 3vw, 20px)",
              lineHeight: "1.2",
              color: "#222222",
              marginBottom: "8px"
            }}
          >
            {kycStatus === 'verified' ? 'Verification Complete!' : 'Documents Submitted for Review'}
          </h3>
          <p
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 2.5vw, 16px)",
              lineHeight: "1.25",
              color: "#575757"
            }}
          >
            {kycStatus === 'verified' 
              ? 'Your identity has been successfully verified.' 
              : 'We\'re reviewing your details—no action needed; we\'ll notify you when it\'s done.'}
          </p>
        </div>
      )}
    </div>
  );
};
