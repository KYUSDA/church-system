import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearSessionAlert } from "./userSlice";
import { useEffect } from "react";

// Auto-dismiss after 10 seconds
export function SessionExpiredAlertWithAutoDismiss() {
  const dispatch = useDispatch();
  const { sessionExpired, logoutReason } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (sessionExpired) {
      const timer = setTimeout(() => {
        dispatch(clearSessionAlert());
      }, 10000); // Auto-dismiss after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [sessionExpired, dispatch]);

  if (!sessionExpired) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md z-50">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-lg animate-pulse"
        role="alert"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            />
          </svg>
          <div>
            <strong className="font-bold">Session Expired!</strong>
            <p className="text-sm mt-1">
              {logoutReason || "Please login again to continue."}
            </p>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={() => dispatch(clearSessionAlert())}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
