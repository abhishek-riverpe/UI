import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { api } from "../../lib/api";
import { ZYNK_CREATE_ENTITY } from "../../lib/urls";

type PermanentAddress = {
  addressLine1: string;
  addressLine2: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export default function CompleteProfile() {
  const { user, setAuth } = useAppContext();
  const navigate = useNavigate();

  const [type] = useState("individual");
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("US");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [permanentAddress, setPermanentAddress] = useState<PermanentAddress>({
    addressLine1: "",
    addressLine2: "",
    locality: "",
    city: "",
    state: "",
    country: "US",
    postalCode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstName = useMemo(() => user?.first_name || "", [user]);
  const lastName = useMemo(() => user?.last_name || "", [user]);
  const email = useMemo(() => user?.email || "", [user]);

  useEffect(() => {
    if ((user?.status || "").toUpperCase() === "ACTIVE") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        type,
        firstName,
        lastName,
        email,
        phoneNumberPrefix,
        phoneNumber,
        nationality,
        dateOfBirth,
        permanentAddress,
      };
      const res = await api.post(ZYNK_CREATE_ENTITY, payload);
      const { data } = res.data;
      const externalId: string | undefined = data?.entityId;

      // Update user status to ACTIVE and set external_entity_id
      if (externalId) {
        const updatedUser = {
          ...(user || {}),
          status: "ACTIVE",
          external_entity_id: externalId,
        } as any;
        // token remains the same; use accessor to persist user too
        setAuth((api.defaults.headers.common["Authorization"] as string || "").replace("Bearer ", ""), updatedUser);
      }

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Complete your profile</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First name</label>
              <input value={firstName} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last name</label>
              <input value={lastName} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input value={email} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone prefix</label>
              <input value={phoneNumberPrefix} onChange={(e) => setPhoneNumberPrefix(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Phone number</label>
              <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nationality</label>
              <input value={nationality} onChange={(e) => setNationality(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Date of birth</label>
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium">Permanent address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Address line 1</label>
                <input value={permanentAddress.addressLine1} onChange={(e) => setPermanentAddress({ ...permanentAddress, addressLine1: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address line 2</label>
                <input value={permanentAddress.addressLine2} onChange={(e) => setPermanentAddress({ ...permanentAddress, addressLine2: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Locality</label>
                <input value={permanentAddress.locality} onChange={(e) => setPermanentAddress({ ...permanentAddress, locality: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input value={permanentAddress.city} onChange={(e) => setPermanentAddress({ ...permanentAddress, city: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input value={permanentAddress.state} onChange={(e) => setPermanentAddress({ ...permanentAddress, state: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input value={permanentAddress.country} onChange={(e) => setPermanentAddress({ ...permanentAddress, country: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal code</label>
                <input value={permanentAddress.postalCode} onChange={(e) => setPermanentAddress({ ...permanentAddress, postalCode: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="pt-2">
            <button disabled={submitting} type="submit" className="px-4 py-2 bg-black text-white rounded disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


