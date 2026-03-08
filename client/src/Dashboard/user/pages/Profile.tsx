import { BASE_URL } from "@/services/base_query";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface TProfile {
  userId?: string;
  birthday: Date;
  baptized: boolean;
  family?: string;
  department?: string;
}

const families = [
  "Upper Kutus",
  "Around School A",
  "Around School B",
  "Waterfall",
  "Garden Estate",
  "Diaspora A",
  "Diaspora B",
  "Ngomongo",
  "Kibugi",
  "Kanjata",
  "Elegant",
  "ACK",
  "Mjini",
];

const departments = [
  "Stewardship",
  "Welfare",
  "MasterGuide",
  "VOP",
  "Welfare",
  "Publishing",
  "Health",
  "Chaplaincy",
  "NRR",
  "Music",
  "Communication",
  "Deaconary",
  "Sabbath School"
]

export default function ProfileData() {
  const [formData, setFormData] = useState<TProfile>({
    birthday: new Date(),
    baptized: false,
  });
   const authState = useSelector((state: RootState) => state.auth);
    const token = authState?.user?.data.tokens.accessToken;

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          birthday: new Date(formData.birthday),
        }),
      });

      if (!res.ok) throw new Error("Failed to create profile");
    } catch (error) {
      console.error(error);
      toast("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium mb-2">Birthday</label>
            <input
              type="date"
              name="birthday"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Family & Department - 2 by 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Family</label>
              <select
                name="family"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select family</option>
                {families.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baptized */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="baptized"
              onChange={handleChange}
              className="h-5 w-5 text-blue-600"
            />
            <label className="text-sm font-medium">I am baptized</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
