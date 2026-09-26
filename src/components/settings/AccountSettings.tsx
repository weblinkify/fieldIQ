export default function AccountSettings() {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700">
          Workspace Name
        </label>

        <input
          type="text"
          defaultValue="FieldIQ"
          className="h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700">
          Administrator Email
        </label>

        <input
          type="email"
          defaultValue="admin@fieldiq.com"
          className="h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500"
        />
      </div>

      <button
        type="button"
        className="inline-flex h-8 items-center justify-center rounded-md bg-blue-600 px-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}