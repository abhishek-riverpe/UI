import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { DEFAULT_ROUTING_ID, ZYNK_KYC_REQUIREMENTS, ZYNK_SUBMIT_KYC } from "../../lib/urls";
import { useAppContext } from "../../context/AppContext";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText
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

interface FormData {
  [fieldId: string]: string | File | null;
}

export const KYCPage: React.FC<KYCPageProps> = ({
  currentStatus = 'additional_docs_required'
}) => {
  const { user } = useAppContext();
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

  // Form data state for all inputs and file uploads
  const [formData, setFormData] = useState<FormData>({});
  const [documentStatuses, setDocumentStatuses] = useState<{[fieldId: string]: DocumentStatus}>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Requirements fetched from backend (supports nested children)
  type Requirement = {
    fieldId: string;
    fieldName: string;
    fieldType: string;
    fieldChoices: any[];
    fieldRequired: boolean;
    fieldDescription?: string | null;
    fieldDefaultValue?: string | null;
    isEditable?: boolean;
    children?: Requirement[];
  };
  const [requirements, setRequirements] = useState<Array<Requirement>>([]);
  const [loadingRequirements, setLoadingRequirements] = useState<boolean>(false);
  const [requirementsError, setRequirementsError] = useState<string | null>(null);
  const [documentRequirements, setDocumentRequirements] = useState<Array<{ id: string; name: string; required: boolean; description?: string | null }>>([]);

  // Extract document fields from nested requirements
  const extractDocumentRequirements = (nodes: Requirement[]): Array<{ id: string; name: string; required: boolean; description?: string | null }> => {
    const list: Array<{ id: string; name: string; required: boolean; description?: string | null }> = [];
    const walk = (arr: Requirement[]) => {
      for (const n of arr) {
        const t = String(n.fieldType || '').toLowerCase();
        if (t === 'document') list.push({ id: n.fieldId, name: n.fieldName, required: !!n.fieldRequired, description: n.fieldDescription });
        if (Array.isArray(n.children) && n.children.length) walk(n.children as any);
      }
    };
    walk(nodes);
    return list;
  };

  // Fallback sample to guarantee UI shows when API lacks document entries
  const FALLBACK_SAMPLE_REQUIREMENTS: Requirement[] = [
    {
      fieldId: 'documents',
      fieldName: 'Documents',
      fieldType: 'section',
      fieldChoices: [],
      fieldRequired: true,
      fieldDescription: 'Identity Documents',
      fieldDefaultValue: null,
      isEditable: true,
      children: [
        {
          fieldId: 'pan_card',
          fieldName: 'PAN Card',
          fieldType: 'section',
          fieldChoices: [],
          fieldRequired: false,
          fieldDescription: 'PAN Card',
          fieldDefaultValue: null,
          isEditable: true,
          children: [
            {
              fieldId: 'document_value',
              fieldName: 'PAN Number',
              fieldType: 'string',
              fieldChoices: [],
              fieldRequired: false,
              fieldDescription: 'PAN number',
              fieldDefaultValue: null,
              isEditable: true,
            },
            {
              fieldId: 'document_content',
              fieldName: 'PAN Card',
              fieldType: 'document',
              fieldChoices: [],
              fieldRequired: false,
              fieldDescription: 'Pan card document in base64 format',
              fieldDefaultValue: null,
              isEditable: true,
            },
          ],
        },
        {
          fieldId: 'aadhar_card',
          fieldName: 'Aadhar Card',
          fieldType: 'section',
          fieldChoices: [],
          fieldRequired: false,
          fieldDescription: 'Aadhar Card',
          fieldDefaultValue: null,
          isEditable: true,
          children: [
            {
              fieldId: 'document_value',
              fieldName: 'Aadhar Number',
              fieldType: 'string',
              fieldChoices: [],
              fieldRequired: false,
              fieldDescription: 'Aadhar number',
              fieldDefaultValue: null,
              isEditable: true,
            },
            {
              fieldId: 'front_side',
              fieldName: 'Aadhar Card Front',
              fieldType: 'document',
              fieldChoices: [],
              fieldRequired: false,
              fieldDescription: 'Front side of Aadhar Card',
              fieldDefaultValue: null,
              isEditable: true,
            },
            {
              fieldId: 'back_side',
              fieldName: 'Aadhar Card Back',
              fieldType: 'document',
              fieldChoices: [],
              fieldRequired: false,
              fieldDescription: 'Back side of Aadhar Card',
              fieldDefaultValue: null,
              isEditable: true,
            },
          ],
        },
        {
          fieldId: 'photo',
          fieldName: 'Photo',
          fieldType: 'document',
          fieldChoices: [],
          fieldRequired: false,
          fieldDescription: 'Photo',
          fieldDefaultValue: null,
          isEditable: true,
        },
      ],
    },
  ];

  // Filter out document-type nodes for the top (non-file) section
  const removeDocumentNodes = (nodes: Requirement[]): Requirement[] => {
    const walk = (arr: Requirement[]): Requirement[] =>
      arr
        .filter((n) => String(n.fieldType || '').toLowerCase() !== 'document')
        .map((n) => ({
          ...n,
          children: Array.isArray(n.children) ? walk(n.children) : [],
        }));
    return walk(nodes);
  };

  // Whenever requirements change, derive the document list (with fallback)
  useEffect(() => {
    const docs = extractDocumentRequirements(requirements);
    if (docs.length > 0) {
      setDocumentRequirements(docs);
    } else if (!loadingRequirements && !requirementsError) {
      setDocumentRequirements(extractDocumentRequirements(FALLBACK_SAMPLE_REQUIREMENTS));
    }
  }, [requirements, loadingRequirements, requirementsError]);

  useEffect(() => {
    let isMounted = true;
    const fetchReq = async () => {
      setLoadingRequirements(true);
      setRequirementsError(null);
      try {
        const res = await api.get(ZYNK_KYC_REQUIREMENTS(DEFAULT_ROUTING_ID));
        const items = res?.data?.data?.kycRequirements || [];
        if (isMounted) setRequirements(items);
      } catch (e: any) {
        if (isMounted) setRequirementsError(e?.response?.data?.message || e?.message || 'Failed to fetch requirements');
      } finally {
        if (isMounted) setLoadingRequirements(false);
      }
    };
    // Only fetch if user is active and has external entity id
    if ((user?.status || '').toUpperCase() === 'ACTIVE') fetchReq();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Handle input changes for form fields
  const handleFormInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = (fieldId: string, file: File) => {
    setDocumentStatuses(prev => ({
      ...prev,
      [fieldId]: 'uploading' as DocumentStatus
    }));

    setFormData(prev => ({
      ...prev,
      [fieldId]: file
    }));

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({
        ...prev,
        [fieldId]: base64
      }));

      setDocumentStatuses(prev => ({
        ...prev,
        [fieldId]: 'uploaded' as DocumentStatus
      }));
    };
    reader.onerror = () => {
      setDocumentStatuses(prev => ({
        ...prev,
        [fieldId]: 'failed' as DocumentStatus
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit KYC data
  const handleSubmitKYC = async () => {
    if (!user?.external_entity_id) {
      setSubmitError('User entity ID not found');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Build simplified payload for personal_details
      const payload = buildSimplePayload(formData);
      console.log('Frontend sending payload:', payload);
      const res = await api.post(ZYNK_SUBMIT_KYC(user.external_entity_id, DEFAULT_ROUTING_ID), payload);

      if (res.data?.success) {
        setKycStatus('in_review');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error: any) {
      setSubmitError(error?.response?.data?.message || error?.message || 'Failed to submit KYC');
    } finally {
      setSubmitting(false);
    }
  };

  // Build simple payload structure for personal_details
  const buildSimplePayload = (formData: FormData) => {
    const personalDetails: any = {};

    // Collect all text inputs
    const textInputs: string[] = [];
    const base64Images: string[] = [];

    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (typeof value === 'string') {
        if (value.startsWith('data:')) {
          // This is a base64 encoded image
          base64Images.push(value);
        } else if (value.trim()) {
          // This is a text input - use the key name for field name
          const fieldName = key.split('.').pop() || key; // Get last part of key
          if (fieldName === 'document_value') {
            // Map document_value fields to appropriate personal_details fields
            if (key.includes('pan_card')) {
              personalDetails.full_name = value;
            } else if (key.includes('aadhar_card')) {
              personalDetails.date_of_birth = value;
            }
          } else {
            // Other text fields
            personalDetails[fieldName] = value;
          }
        }
      }
    });

    // Combine all base64 images into a single comma-separated string
    if (base64Images.length > 0) {
      personalDetails.identity_document = base64Images.join(',');
    }

    return {
      personal_details: personalDetails
    };
  };

  // Build payload structure according to Zynk Labs API requirements
  const buildNestedPayload = (nodes: Requirement[], formData: FormData) => {
    const payload: any = {
      personal_details: {}
    };

    // Walk through requirements and map to correct payload structure
    const walk = (arr: Requirement[], parentPath: string = '') => {
      for (const node of arr) {
        const fieldPath = parentPath ? `${parentPath}.${node.fieldId}` : node.fieldId;

        if (node.fieldType === 'section' && node.children) {
          // Recursively process children
          walk(node.children, fieldPath);
        } else if (node.fieldType === 'string') {
          // Map string fields to personal_details
          if (fieldPath.includes('pan_card.document_value')) {
            payload.personal_details.full_name = formData[fieldPath] || null;
          } else if (fieldPath.includes('aadhar_card.document_value')) {
            payload.personal_details.date_of_birth = formData[fieldPath] || null;
          }
        } else if (node.fieldType === 'document') {
          // Map document files (base64) to identity_document
          // For now, use the first document found, or handle multiple if needed
          if (formData[fieldPath] && typeof formData[fieldPath] === 'string') {
            payload.personal_details.identity_document = formData[fieldPath];
          }
        }
      }
    };

    walk(nodes);
    return payload;
  };

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

  // Legacy file upload handler (for drag & drop)
  const handleGeneralFileUpload = (files: FileList | null) => {
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
    handleGeneralFileUpload(e.dataTransfer.files);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleGeneralFileUpload(e.target.files);
  };

  // Remove document
  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Submit documents (legacy)
  const handleSubmitDocuments = () => {
    handleSubmitKYC();
  };

  const statusContent = getVerificationStatusContent();
  const statusBadge = getStatusBadgeStyle(kycStatus);

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

          {/* Fill Required Fields (non-document) */}
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
                Fill required fields
              </h3>
            </div>
            {loadingRequirements && (
              <div className="text-sm text-gray-600">Loading requirements…</div>
            )}
            {requirementsError && (
              <div className="text-sm text-red-600">{requirementsError}</div>
            )}
            {!loadingRequirements && !requirementsError && (
              <div className="flex flex-col" style={{ gap: "10px" }}>
                {removeDocumentNodes(requirements).map((req, index) => (
                  <RequirementItem
                    key={req.fieldId || index}
                    req={req}
                    level={0}
                    formData={formData}
                    onInputChange={handleFormInputChange}
                    parentPath={req.fieldId}
                  />
                ))}
              </div>
            )}
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
            {/* Required Documents Rows based on requirements */}
            {documentRequirements.length > 0 && (
              <div className="flex flex-col" style={{ gap: "clamp(16px, 3vw, 24px)" }}>
                <div className="flex flex-col" style={{ gap: "8px" }}>
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
                </div>

                <div className="flex flex-col" style={{ gap: "12px" }}>
                  {documentRequirements.map((d) => (
                    <div
                      key={d.id}
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
                          <FileText size={24} color="#222222" className="flex-shrink-0" />
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
                              {d.name}
                            </span>
                            {d.description && (
                              <span
                                style={{
                                  fontFamily: "'Archivo', sans-serif",
                                  fontWeight: 400,
                                  fontSize: "clamp(11px, 2vw, 12px)",
                                  lineHeight: "1.67",
                                  color: "#000000"
                                }}
                              >
                                {d.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Dynamic status chip based on document status */}
                        <div
                          className="flex items-center"
                          style={{
                            gap: "8px",
                            padding: "4px 12px",
                            backgroundColor: documentStatuses[d.id] === 'uploaded' ? '#E2F5EE' :
                                           documentStatuses[d.id] === 'uploading' ? '#EFF6FF' :
                                           documentStatuses[d.id] === 'failed' ? '#FEF2F2' : '#FFFBEB',
                            border: `2px solid ${documentStatuses[d.id] === 'uploaded' ? '#1FCB92' :
                                               documentStatuses[d.id] === 'uploading' ? '#3B82F6' :
                                               documentStatuses[d.id] === 'failed' ? '#EF4444' : '#D97706'}`,
                            borderRadius: "50px"
                          }}
                        >
                          {(documentStatuses[d.id] === 'uploaded' && <CheckCircle size={16} color="#137C59" />) ||
                           (documentStatuses[d.id] === 'uploading' && <Clock size={16} color="#1D4ED8" />) ||
                           (documentStatuses[d.id] === 'failed' && <XCircle size={16} color="#DC2626" />) ||
                           <Clock size={16} color="#92400E" />}
                          <span
                            style={{
                              fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 600,
                              fontSize: "clamp(13px, 2.5vw, 16px)",
                              lineHeight: "1.5",
                              color: documentStatuses[d.id] === 'uploaded' ? '#137C59' :
                                     documentStatuses[d.id] === 'uploading' ? '#1D4ED8' :
                                     documentStatuses[d.id] === 'failed' ? '#DC2626' : '#92400E'
                            }}
                          >
                            {documentStatuses[d.id] === 'uploaded' ? 'Uploaded' :
                             documentStatuses[d.id] === 'uploading' ? 'Uploading' :
                             documentStatuses[d.id] === 'failed' ? 'Failed' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Enabled upload button */}
                      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end" style={{ gap: "clamp(12px, 2.5vw, 16px)" }}>
                        <div
                          className="flex items-center"
                          style={{
                            gap: "8px",
                            padding: "4px 12px",
                            backgroundColor: "#005AEE",
                            borderRadius: "50px",
                            cursor: "pointer"
                          }}
                          onClick={() => document.getElementById(`file-input-${d.id}`)?.click()}
                        >
                          <span
                            style={{
                              fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 600,
                              fontSize: "clamp(13px, 2.5vw, 16px)",
                              lineHeight: "1.5",
                              color: "#FFFFFF"
                            }}
                          >
                            Upload
                          </span>
                        </div>
                        <input
                          id={`file-input-${d.id}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(d.id, file);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Zone */}
            <div
              className="flex flex-col items-center"
              style={{
                gap: "clamp(16px, 4vw, 30px)",
                padding: "clamp(16px, 3vw, 24px) 16px clamp(24px, 5vw, 48px)",
                border: `1px dashed ${isDragOver ? "#005AEE" : "#ACACAC"}`,
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

            {/* Error Message */}
            {submitError && (
              <div className="text-center text-red-600 text-sm mt-4">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
              <button
                onClick={handleSubmitKYC}
                disabled={submitting}
                className="flex items-center justify-center w-full"
                style={{
                  gap: "10px",
                  padding: "clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 24px)",
                  backgroundColor: submitting ? "#CCCCCC" : "#005AEE",
                  borderRadius: "12px",
                  cursor: submitting ? "not-allowed" : "pointer"
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
                  {submitting ? 'Submitting...' : 'Submit documents'}
                </span>
              </button>
            </div>
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

function RequirementItem({ req, level, formData, onInputChange, parentPath }: {
  req: any;
  level: number;
  formData: FormData;
  onInputChange: (fieldId: string, value: string) => void;
  parentPath?: string;
}) {
  const isSection = String(req.fieldType).toLowerCase() === 'section';
  const isDocument = String(req.fieldType).toLowerCase() === 'document';
  const isString = String(req.fieldType).toLowerCase() === 'string';

  // Create unique field ID with parent path (e.g., "pan_card.document_value")
  const uniqueFieldId = parentPath ? `${parentPath}.${req.fieldId}` : req.fieldId;
  const childParentPath = uniqueFieldId;

  return (
    <div
      style={{
        padding: '12px',
        backgroundColor: level === 0 ? '#EFEFEF' : '#FFFFFF',
        border: '1px solid #ACACAC',
        borderRadius: '8px',
        marginLeft: level > 0 ? 12 : 0
      }}
    >
      <div className="flex items-center justify-between" style={{ gap: '12px' }}>
        <div className="flex items-center" style={{ gap: '12px' }}>
          <div style={{ width: 8, height: 8, backgroundColor: '#030213', borderRadius: '50%' }} />
          <div className="flex flex-col">
            <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#000000' }}>{req.fieldName}</span>
            {req.fieldDescription && (
              <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#575757' }}>{req.fieldDescription}</span>
            )}
          </div>
        </div>

        {/* For strings show controlled input */}
        {isString && (
          <input
            type="text"
            value={formData[uniqueFieldId] ? String(formData[uniqueFieldId]) : ''}
            placeholder={req.fieldDescription || req.fieldName}
            onChange={(e) => onInputChange(uniqueFieldId, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        )}
      </div>

      {isSection && Array.isArray(req.children) && req.children.length > 0 && (
        <div className="flex flex-col" style={{ gap: 10, marginTop: 10 }}>
          {req.children.map((child: any, idx: number) => (
            <RequirementItem
              key={child.fieldId || idx}
              req={child}
              level={level + 1}
              formData={formData}
              onInputChange={onInputChange}
              parentPath={childParentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
